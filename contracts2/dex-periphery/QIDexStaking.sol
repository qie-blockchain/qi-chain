// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.6;

import './interfaces/IERC20.sol';
import './interfaces/IQIDexStaking.sol';
import './libraries/Address.sol';
import './libraries/SafeMath.sol';

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() public {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and make it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;

    }
}

contract QIDexStaking is Ownable, ReentrancyGuard, IQIDexStaking {
    using SafeMath for uint256;

    uint256 public duration = 365; // 365 days
    uint256 public rewardPerBlock;
    uint256 public accTokenPerShare;
    uint256 public lastRewardBlock;

    uint256 public depositFee;
    uint256 public withdrawFee;

    // Whether a limit is set for users
    bool public hasUserLimit;
    // The pool limit (0 if none)
    uint256 public poolLimitPerUser;

    // The block number when staking starts.
    uint256 public startBlock;

    // The precision factor
    uint256 public PRECISION_FACTOR = 1e24;
    uint256 public totalStaked;
    uint256 private totalRewards;

    IERC20 public rewardToken;

    uint256 constant MAX_STAKES = 256;
    uint256 public totalUsers;

    mapping(address => Stake[]) public userStakes;
    mapping(address => UserInfo) public userStaked;
    mapping(address => bool) public staked;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    // event EmergencyWithdraw(address indexed user, uint256 amount);
    event AdminTokenRecovered(address tokenRecovered, uint256 amount);

    event NewPoolLimit(uint256 poolLimitPerUser);
    event DurationUpdated(uint256 _duration);
    event RewardPerBlockUpdated(uint256 _rewardPerBlock);
    event FeeUpdated(uint256 _depositFee, uint256 _withdrawFee);

    constructor(uint256 _rewardPerBlock, uint256 _depositFee, uint256 _withdrawFee, uint256 _poolLimitPerUser, address _rewardToken) public {
        
        startBlock = block.number.add(1);
        lastRewardBlock = startBlock;
        
        rewardPerBlock = _rewardPerBlock;
        depositFee = _depositFee;
        withdrawFee = _withdrawFee;

        rewardToken = IERC20(_rewardToken);

        if (_poolLimitPerUser > 0) {
            hasUserLimit = true;
            poolLimitPerUser = _poolLimitPerUser;
        }
    }
    function setAccTokenPerShare(uint256 newValue) external onlyOwner nonReentrant {
        accTokenPerShare = newValue;
    }
    /**
     * @notice Deposit staked tokens and collect reward tokens (if any)
     */
    function deposit() external override payable nonReentrant{
        uint _amount = msg.value;
        require(_amount > 0, "Amount should be greator than 0");

        _updatePool();

        UserInfo storage user = userStaked[msg.sender];
        Stake[] storage stakes = userStakes[msg.sender];

        uint256 pending = 0;

        if (hasUserLimit) {
            require(
                _amount.add(user.amount) <= poolLimitPerUser,
                "User amount above limit"
            );
        }
        
        for(uint256 j = 0; j < stakes.length; j++) {
            Stake storage stake = stakes[j];
            if(stake.amount == 0) continue;

            uint256 _pending = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt);

            pending = pending.add(_pending);

            stake.rewardDebt = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
        }

        if (pending > 0) {
            require(availableRewardTokens() >= pending, "Insufficient reward tokens");
            safeTokenTransfer(msg.sender, pending);            
            if(totalRewards > pending) {
                totalRewards = totalRewards.sub(pending);
            } else {
                totalRewards = 0;
            }
        }

        if (_amount > 0) {
            user.amount = user.amount.add(_amount);
            user.count = user.count.add(1);

            totalStaked = totalStaked.add(_amount);
        }
        
        if (depositFee > 0) {
            uint256 fee = _amount.mul(depositFee).div(10000);
            if (fee > 0) {
                payable(owner()).transfer(fee);
                _amount = _amount.sub(fee);
            }
        }
        
        _addStake(msg.sender, _amount);

        if (staked[msg.sender] == false) {
            staked[msg.sender] = true;
            totalUsers = totalUsers.add(1);
        } 

        emit Deposit(msg.sender, _amount);
    }
    function depositAdmin(address _actualStaker) external payable nonReentrant onlyOwner{
        uint _amount = msg.value;
        require(_amount > 0, "Amount should be greator than 0");

        _updatePool();

        UserInfo storage user = userStaked[_actualStaker];
        Stake[] storage stakes = userStakes[_actualStaker];

        uint256 pending = 0;

        if (hasUserLimit) {
            require(
                _amount.add(user.amount) <= poolLimitPerUser,
                "User amount above limit"
            );
        }
        
        for(uint256 j = 0; j < stakes.length; j++) {
            Stake storage stake = stakes[j];
            if(stake.amount == 0) continue;

            uint256 _pending = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt);

            pending = pending.add(_pending);

            stake.rewardDebt = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
        }

        if (pending > 0) {
            require(availableRewardTokens() >= pending, "Insufficient reward tokens");
            safeTokenTransfer(_actualStaker, pending);            
            if(totalRewards > pending) {
                totalRewards = totalRewards.sub(pending);
            } else {
                totalRewards = 0;
            }
        }

        if (_amount > 0) {
            user.amount = user.amount.add(_amount);
            user.count = user.count.add(1);

            totalStaked = totalStaked.add(_amount);
        }
        
        if (depositFee > 0) {
            uint256 fee = _amount.mul(depositFee).div(10000);
            if (fee > 0) {
                payable(owner()).transfer(fee);
                _amount = _amount.sub(fee);
            }
        }
        
        _addStake(_actualStaker, _amount);

        if (staked[_actualStaker] == false) {
            staked[_actualStaker] = true;
            totalUsers = totalUsers.add(1);
        } 

        emit Deposit(_actualStaker, _amount);
    }

    function _addStake(address _account, uint256 _amount) internal {
        Stake[] storage stakes = userStakes[_account];

        uint256 end = block.timestamp.add(duration.mul(1 days));
        uint256 i = stakes.length;
        require(i < MAX_STAKES, "Max stakes");

        stakes.push(); // grow the array
        // find the spot where we can insert the current stake
        // this should make an increasing list sorted by end
        while (i != 0 && stakes[i - 1].end > end) {
            // shift it back one
            stakes[i] = stakes[i - 1];
            i -= 1;
        }
        
        // insert the stake
        Stake storage newStake = stakes[i];
        newStake.duration = duration;
        newStake.end = end;
        newStake.amount = _amount;
        newStake.rewardDebt = newStake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
    }

    /**
     * @notice Withdraw staked tokens and collect reward tokens
     * @param _amount: amount to withdraw (in earnedToken)
     */
    function withdraw(uint256 _amount) external override nonReentrant {
        require(_amount > 0, "Amount should be greator than 0");

        _updatePool();

        UserInfo storage user = userStaked[msg.sender];
        Stake[] storage stakes = userStakes[msg.sender];
        
        uint256 pending = 0;
        uint256 remained = _amount;

        for(uint256 j = 0; j < stakes.length; j++) {
            Stake storage stake = stakes[j];
            if(stake.amount == 0) continue;
            if(remained == 0) break;   

            uint256 _pending = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt);
            pending = pending.add(_pending);
            
            if(stake.end < block.timestamp) {
                if(stake.amount > remained) {
                    stake.amount = stake.amount.sub(remained);
                    remained = 0;
                } else {
                    remained = remained.sub(stake.amount);
                    stake.amount = 0;
                }
            }

            stake.rewardDebt = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
        }

        if (pending > 0) {
            require(availableRewardTokens() >= pending, "Insufficient reward tokens");
            safeTokenTransfer(msg.sender, pending);
            
            if(totalRewards > pending) {
                totalRewards = totalRewards.sub(pending);
            } else {
                totalRewards = 0;
            }
        }

        uint256 realAmount = _amount.sub(remained);

        if(realAmount > 0) {
            if (withdrawFee > 0) {
                uint256 fee = realAmount.mul(withdrawFee).div(10000);
                payable(owner()).transfer(fee);
                realAmount = realAmount.sub(fee);
            }

            user.amount = user.amount.sub(realAmount);
            
            payable(msg.sender).transfer(realAmount);

            totalStaked = totalStaked.sub(realAmount);
        }

        emit Withdraw(msg.sender, _amount);
    }

    function claimReward() external override nonReentrant {
        
        if(startBlock == 0) return;

        _updatePool();

        // UserInfo storage user = userStaked[msg.sender];
        Stake[] storage stakes = userStakes[msg.sender];

        uint256 pending = 0;
        for(uint256 j = 0; j < stakes.length; j++) {
            Stake storage stake = stakes[j];
            if(stake.amount == 0) continue;
            uint256 _pending = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt);
            
            pending = pending.add(_pending);

            stake.rewardDebt = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
        }

        if (pending > 0) {
            require(availableRewardTokens() >= pending, "Insufficient reward tokens");
            safeTokenTransfer(msg.sender, pending);
            
            if(totalRewards > pending) {
                totalRewards = totalRewards.sub(pending);
            } else {
                totalRewards = 0;
            }
        }
    }

    function safeTokenTransfer(address to, uint256 amount) internal returns (uint256) {
        uint256 tokenBalance = rewardToken.balanceOf(address(this));
        if (amount > tokenBalance) {
            rewardToken.transfer(to, tokenBalance);
            return tokenBalance;
        } else {
            rewardToken.transfer(to, amount);
            return amount;
        }
    }

    /**
     * @notice Available amount of reward token
     */
    function availableRewardTokens() public view returns (uint256) {

        return rewardToken.balanceOf(address(this));        
    }

    function userInfo(address _account) public override view returns (uint256 amount, uint256 available, uint256 locked) {
        Stake[] storage stakes = userStakes[_account];
        
        for(uint256 i = 0; i < stakes.length; i++) {
            Stake storage stake = stakes[i];

            if(stake.amount == 0) continue;
            
            amount = amount.add(stake.amount);
            if(block.timestamp > stake.end) {
                available = available.add(stake.amount);
            } else {
                locked = locked.add(stake.amount);
            }
        }
    }

    /*
     * @notice View function to see pending reward on frontend.
     * @param _user: user address
     * @return Pending reward for a given user
     */
    function pendingReward(address _account) external view returns (uint256) {
        if(startBlock == 0) return 0;

        Stake[] storage stakes = userStakes[_account];

        if(totalStaked == 0) return 0;
        
        uint256 adjustedTokenPerShare = accTokenPerShare;
        if (block.number > lastRewardBlock && totalStaked != 0) {
            uint256 multiplier = block.number.sub(lastRewardBlock);
            uint256 reward = multiplier.mul(rewardPerBlock);
            adjustedTokenPerShare =
                accTokenPerShare.add(
                    reward.mul(PRECISION_FACTOR).div(totalStaked)
                );
        }

        uint256 pending = 0;
        for(uint256 i = 0; i < stakes.length; i++) {
            Stake storage stake = stakes[i];
            if(stake.amount == 0) continue;

            pending = pending.add(
                stake.amount.mul(adjustedTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt)
            );
        }
        return pending;
    }

    /**
     * @notice It allows the admin to recover wrong tokens sent to the contract
     * @param _tokenAddress: the address of the token to withdraw
     * @param _tokenAmount: the number of tokens to withdraw
     * @dev This function is only callable by admin.
     */
    function recoverWrongTokens(address _tokenAddress, uint256 _tokenAmount)
        external
        onlyOwner
    {
        if(_tokenAddress == address(0x0)) {
            payable(msg.sender).transfer(_tokenAmount);
        } else {
            IERC20(_tokenAddress).transfer(address(msg.sender), _tokenAmount);
        }

        emit AdminTokenRecovered(_tokenAddress, _tokenAmount);
    }

    function updateRewardToken(address _rewardToken) external onlyOwner {
        rewardToken = IERC20(_rewardToken);
    }

    /*
     * @notice Update pool limit per user
     * @dev Only callable by owner.
     * @param _hasUserLimit: whether the limit remains forced
     * @param _poolLimitPerUser: new pool limit per user
     */
    function updatePoolLimitPerUser( bool _hasUserLimit, uint256 _poolLimitPerUser) external onlyOwner {
        require(hasUserLimit, "Must be set");
        if (_hasUserLimit) {
            require(
                _poolLimitPerUser > poolLimitPerUser,
                "New limit must be higher"
            );
            poolLimitPerUser = _poolLimitPerUser;
        } else {
            hasUserLimit = _hasUserLimit;
            poolLimitPerUser = 0;
        }
        emit NewPoolLimit(poolLimitPerUser);
    }

    function updateDuration(uint256 _duration) external onlyOwner {
        // require(startBlock == 0, "Pool was already started");
        // require(_duration >= 30, "lower limit reached");

        duration = _duration;
        emit DurationUpdated(_duration);
    }

    function updateFee(uint256 _depositFee, uint256 _withdrawFee) external onlyOwner {

        depositFee = _depositFee;
        withdrawFee = _withdrawFee;
        emit FeeUpdated(_depositFee, _withdrawFee);
    }

    function updateRewardPerBlock(uint256 _rewardPerBlock) external onlyOwner {

        rewardPerBlock = _rewardPerBlock;
        emit RewardPerBlockUpdated(_rewardPerBlock);
    }

    /************************
    ** Internal Methods
    *************************/
    /*
     * @notice Update reward variables of the given pool to be up-to-date.
     */
    function _updatePool() internal {

        if (block.number <= lastRewardBlock) return;

        if (totalStaked == 0) {
            lastRewardBlock = block.number;
            return;
        }

        uint256 multiplier = block.number.sub(lastRewardBlock);
        uint256 _reward = multiplier.mul(rewardPerBlock);
        rewardToken.mint(address(this), _reward);
        accTokenPerShare = accTokenPerShare.add(
            _reward.mul(PRECISION_FACTOR).div(totalStaked)
        );
        lastRewardBlock = block.number;
    }

    receive() external payable {}
}