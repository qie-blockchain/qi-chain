package staking

import (
	"fmt"
	"math/big"
	"time"

	"github.com/0xPolygon/polygon-edge/command"
	"github.com/0xPolygon/polygon-edge/command/helper"
	sidechainHelper "github.com/0xPolygon/polygon-edge/command/sidechain"
	"github.com/0xPolygon/polygon-edge/contracts"
	"github.com/0xPolygon/polygon-edge/txrelayer"
	"github.com/0xPolygon/polygon-edge/types"
	"github.com/spf13/cobra"
	"github.com/umbracle/ethgo"
	"github.com/umbracle/ethgo/abi"
)

var (
	params           stakeParams
	stakeABI         = abi.MustNewMethod("function stake()")
	delegateABI      = abi.MustNewMethod("function delegate(address validator, bool restake)")
	stakeEventABI    = abi.MustNewEvent("event Staked(address indexed validator, uint256 amount)")
	delegateEventABI = abi.MustNewEvent("event Delegated(address indexed delegator," +
		"address indexed validator, uint256 amount)")
)

func GetCommand() *cobra.Command {
	stakeCmd := &cobra.Command{
		Use:     "stake",
		Short:   "Stakes the amount sent for validator or delegates its stake to another account",
		PreRunE: runPreRun,
		RunE:    runCommand,
	}

	helper.RegisterJSONRPCFlag(stakeCmd)
	setFlags(stakeCmd)

	return stakeCmd
}

func setFlags(cmd *cobra.Command) {
	cmd.Flags().StringVar(
		&params.accountDir,
		sidechainHelper.AccountDirFlag,
		"",
		"the directory path where validator key is stored",
	)

	cmd.Flags().BoolVar(
		&params.self,
		sidechainHelper.SelfFlag,
		false,
		"indicates if its a self stake action",
	)

	cmd.Flags().Uint64Var(
		&params.amount,
		sidechainHelper.AmountFlag,
		0,
		"amount to stake or delegate to another account",
	)

	cmd.Flags().StringVar(
		&params.delegateAddress,
		delegateAddressFlag,
		"",
		"account address to which stake should be delegated",
	)

	cmd.MarkFlagsMutuallyExclusive(sidechainHelper.SelfFlag, delegateAddressFlag)
}

func runPreRun(cmd *cobra.Command, _ []string) error {
	params.jsonRPC = helper.GetJSONRPCAddress(cmd)

	return params.validateFlags()
}

func runCommand(cmd *cobra.Command, _ []string) error {
	outputter := command.InitializeOutputter(cmd)
	defer outputter.WriteOutput()

	validatorAccount, err := sidechainHelper.GetAccountFromDir(params.accountDir)
	if err != nil {
		return err
	}

	txRelayer, err := txrelayer.NewTxRelayer(txrelayer.WithIPAddress(params.jsonRPC),
		txrelayer.WithReceiptTimeout(150*time.Millisecond))
	if err != nil {
		return err
	}

	var encoded []byte
	if params.self {
		encoded, err = stakeABI.Encode([]interface{}{})
		if err != nil {
			return err
		}
	} else {
		delegateToAddress := types.StringToAddress(params.delegateAddress)
		encoded, err = delegateABI.Encode([]interface{}{ethgo.Address(delegateToAddress), false})
		if err != nil {
			return err
		}
	}

	txn := &ethgo.Transaction{
		From:     validatorAccount.Ecdsa.Address(),
		Input:    encoded,
		To:       (*ethgo.Address)(&contracts.ValidatorSetContract),
		Value:    big.NewInt(int64(params.amount)),
		GasPrice: sidechainHelper.DefaultGasPrice,
	}

	receipt, err := txRelayer.SendTransaction(txn, validatorAccount.Ecdsa)
	if err != nil {
		return err
	}

	if receipt.Status == uint64(types.ReceiptFailed) {
		return fmt.Errorf("staking transaction failed on block %d", receipt.BlockNumber)
	}

	result := &stakeResult{
		validatorAddress: validatorAccount.Ecdsa.Address().String(),
	}

	var foundLog bool

	// check the logs to check for the result
	for _, log := range receipt.Logs {
		if stakeEventABI.Match(log) {
			event, err := stakeEventABI.ParseLog(log)
			if err != nil {
				return err
			}

			result.isSelfStake = true
			result.amount = event["amount"].(*big.Int).Uint64() //nolint:forcetypeassert

			foundLog = true

			break
		} else if delegateEventABI.Match(log) {
			event, err := delegateEventABI.ParseLog(log)
			if err != nil {
				return err
			}

			result.amount = event["amount"].(*big.Int).Uint64()              //nolint:forcetypeassert
			result.delegatedTo = event["validator"].(ethgo.Address).String() //nolint:forcetypeassert

			foundLog = true

			break
		}
	}

	if !foundLog {
		return fmt.Errorf("could not find an appropriate log in receipt that stake or delegate happened")
	}

	outputter.WriteCommandResult(result)

	return nil
}
