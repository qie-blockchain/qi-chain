// SPDX-License-Identifier: MIT

pragma solidity 0.6.6;

interface IQIDexStaking {

    struct UserInfo {
        uint256 amount; // How many staked tokens the user has provided
        uint256 count;
        uint256 locked;
        uint256 available;
    }

    struct Stake {
        uint256 amount;     // amount to stake
        uint256 duration;   // the lockup duration of the stake
        uint256 end;        // when does the staking period end
        uint256 rewardDebt; // Reward debt
    }

    function deposit() external payable;
    function withdraw(uint256 amount) external;
    function claimReward() external;
    // function emergencyWithdraw() external;

    function userInfo(address _user) external view returns(uint256, uint256, uint256);
}