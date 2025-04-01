// SPDX-License-Identifier: UNLICENSED

pragma solidity =0.5.16;

import './interfaces/IQIDexFactory.sol';
import './QIDexPair.sol';

contract QIDexFactory is IQIDexFactory {
    address public feeTo;
    address public feeToSetter;

    address public staking;

    uint public minStakeToAddLiq = 20000000000000000000000;
    uint public minStakeForLessFee = 30000000000000000000000;

    uint public tradeFee = 30;
    uint public relaxedTradeFee = 20;
    
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    constructor(address _feeToSetter, address _staking) public {
        feeToSetter = _feeToSetter;
        staking = _staking;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'QIDex: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'QIDex: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'QIDex: PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(QIDexPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IQIDexPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'QIDex: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'QIDex: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }

    function updateMinStakeForLessFee(uint _minStakeForLessFee) external {
        require(msg.sender == feeToSetter, 'QIDex: FORBIDDEN');

        minStakeForLessFee = _minStakeForLessFee;
    }

    function updateMinStakeToAddLiq(uint _minStakeToAddLiq) external {
        require(msg.sender == feeToSetter, 'QIDex: FORBIDDEN');

        minStakeToAddLiq = _minStakeToAddLiq;
    }

    function updateTradeFee(uint _tradeFee) external {
        require(msg.sender == feeToSetter, 'QIDex: FORBIDDEN');

        tradeFee = _tradeFee;
    }

    function updateRelaxedTradeFee(uint _relaxedTradeFee) external {
        require(msg.sender == feeToSetter, 'QIDex: FORBIDDEN');

        relaxedTradeFee = _relaxedTradeFee;
    }

    function updateStakingContract(address _staking) external {
        require(msg.sender == feeToSetter, 'QIDex: FORBIDDEN');

        staking = _staking;
    }
}
