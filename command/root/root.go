package root

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"

	"github.com/0xPolygon/polygon-edge/command/backup"
	"github.com/0xPolygon/polygon-edge/command/genesis"
	"github.com/0xPolygon/polygon-edge/command/helper"
	"github.com/0xPolygon/polygon-edge/command/ibft"
	"github.com/0xPolygon/polygon-edge/command/license"
	"github.com/0xPolygon/polygon-edge/command/loadbot"
	"github.com/0xPolygon/polygon-edge/command/monitor"
	"github.com/0xPolygon/polygon-edge/command/peers"
	"github.com/0xPolygon/polygon-edge/command/polybft"
	"github.com/0xPolygon/polygon-edge/command/polybftmanifest"
	"github.com/0xPolygon/polygon-edge/command/polybftsecrets"
	"github.com/0xPolygon/polygon-edge/command/rootchain"
	"github.com/0xPolygon/polygon-edge/command/secrets"
	"github.com/0xPolygon/polygon-edge/command/server"
	"github.com/0xPolygon/polygon-edge/command/status"
	"github.com/0xPolygon/polygon-edge/command/txpool"
	"github.com/0xPolygon/polygon-edge/command/version"
	"github.com/0xPolygon/polygon-edge/command/whitelist"
)

type RootCommand struct {
	baseCmd *cobra.Command
}

func NewRootCommand() *RootCommand {
	rootCommand := &RootCommand{
		baseCmd: &cobra.Command{
			Short: "QI is a framework for building Ethereum-compatible Blockchain networks",
		},
	}

	helper.RegisterJSONOutputFlag(rootCommand.baseCmd)

	rootCommand.registerSubCommands()

	return rootCommand
}

func (rc *RootCommand) registerSubCommands() {
	rc.baseCmd.AddCommand(
		version.GetCommand(),
		txpool.GetCommand(),
		status.GetCommand(),
		secrets.GetCommand(),
		peers.GetCommand(),
		rootchain.GetCommand(),
		monitor.GetCommand(),
		loadbot.GetCommand(),
		ibft.GetCommand(),
		backup.GetCommand(),
		genesis.GetCommand(),
		server.GetCommand(),
		whitelist.GetCommand(),
		license.GetCommand(),
		polybftsecrets.GetCommand(),
		polybft.GetCommand(),
		polybftmanifest.GetCommand(),
	)
}

func (rc *RootCommand) Execute() {
	if err := rc.baseCmd.Execute(); err != nil {
		_, _ = fmt.Fprintln(os.Stderr, err)

		os.Exit(1)
	}
}
