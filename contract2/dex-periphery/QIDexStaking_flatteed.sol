
// // File: contracts/dex-platform-qi-21084022-cpp/amm-contracts/contracts/dex-periphery/libraries/SafeMath.sol



// pragma solidity >=0.6.6 <0.8.0;

// // a library for performing overflow-safe math, courtesy of DappHub (https://github.com/dapphub/ds-math)

// library SafeMath {
//     function add(uint x, uint y) internal pure returns (uint z) {
//         require((z = x + y) >= x, 'ds-math-add-overflow');
//     }

//     function sub(uint x, uint y) internal pure returns (uint z) {
//         require((z = x - y) <= x, 'ds-math-sub-underflow');
//     }

//     function mul(uint x, uint y) internal pure returns (uint z) {
//         require(y == 0 || (z = x * y) / y == x, 'ds-math-mul-overflow');
//     }

//     function div(uint256 a, uint256 b) internal pure returns (uint256) {
//         require(b > 0, "SafeMath: division by zero");
//         return a / b;
//     }
// }

// // File: contracts/dex-platform-qi-21084022-cpp/amm-contracts/contracts/dex-periphery/libraries/Address.sol



// pragma solidity >=0.6.6 <0.8.0;

// /**
//  * @dev Collection of functions related to the address type
//  */
// library Address {
//     /**
//      * @dev Returns true if `account` is a contract.
//      *
//      * [IMPORTANT]
//      * ====
//      * It is unsafe to assume that an address for which this function returns
//      * false is an externally-owned account (EOA) and not a contract.
//      *
//      * Among others, `isContract` will return false for the following
//      * types of addresses:
//      *
//      *  - an externally-owned account
//      *  - a contract in construction
//      *  - an address where a contract will be created
//      *  - an address where a contract lived, but was destroyed
//      * ====
//      */
//     function isContract(address account) internal view returns (bool) {
//         // This method relies on extcodesize, which returns 0 for contracts in
//         // construction, since the code is only stored at the end of the
//         // constructor execution.

//         uint256 size;
//         // solhint-disable-next-line no-inline-assembly
//         assembly { size := extcodesize(account) }
//         return size > 0;
//     }

//     /**
//      * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
//      * `recipient`, forwarding all available gas and reverting on errors.
//      *
//      * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
//      * of certain opcodes, possibly making contracts go over the 2300 gas limit
//      * imposed by `transfer`, making them unable to receive funds via
//      * `transfer`. {sendValue} removes this limitation.
//      *
//      * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
//      *
//      * IMPORTANT: because control is transferred to `recipient`, care must be
//      * taken to not create reentrancy vulnerabilities. Consider using
//      * {ReentrancyGuard} or the
//      * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
//      */
//     function sendValue(address payable recipient, uint256 amount) internal {
//         require(address(this).balance >= amount, "Address: insufficient balance");

//         // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
//         (bool success, ) = recipient.call{ value: amount }("");
//         require(success, "Address: unable to send value, recipient may have reverted");
//     }

//     /**
//      * @dev Performs a Solidity function call using a low level `call`. A
//      * plain`call` is an unsafe replacement for a function call: use this
//      * function instead.
//      *
//      * If `target` reverts with a revert reason, it is bubbled up by this
//      * function (like regular Solidity function calls).
//      *
//      * Returns the raw returned data. To convert to the expected return value,
//      * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
//      *
//      * Requirements:
//      *
//      * - `target` must be a contract.
//      * - calling `target` with `data` must not revert.
//      *
//      * _Available since v3.1._
//      */
//     function functionCall(address target, bytes memory data) internal returns (bytes memory) {
//       return functionCall(target, data, "Address: low-level call failed");
//     }

//     /**
//      * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
//      * `errorMessage` as a fallback revert reason when `target` reverts.
//      *
//      * _Available since v3.1._
//      */
//     function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
//         return functionCallWithValue(target, data, 0, errorMessage);
//     }

//     /**
//      * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
//      * but also transferring `value` wei to `target`.
//      *
//      * Requirements:
//      *
//      * - the calling contract must have an ETH balance of at least `value`.
//      * - the called Solidity function must be `payable`.
//      *
//      * _Available since v3.1._
//      */
//     function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
//         return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
//     }

//     /**
//      * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
//      * with `errorMessage` as a fallback revert reason when `target` reverts.
//      *
//      * _Available since v3.1._
//      */
//     function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
//         require(address(this).balance >= value, "Address: insufficient balance for call");
//         require(isContract(target), "Address: call to non-contract");

//         // solhint-disable-next-line avoid-low-level-calls
//         (bool success, bytes memory returndata) = target.call{ value: value }(data);
//         return _verifyCallResult(success, returndata, errorMessage);
//     }

//     /**
//      * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
//      * but performing a static call.
//      *
//      * _Available since v3.3._
//      */
//     function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
//         return functionStaticCall(target, data, "Address: low-level static call failed");
//     }

//     /**
//      * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
//      * but performing a static call.
//      *
//      * _Available since v3.3._
//      */
//     function functionStaticCall(address target, bytes memory data, string memory errorMessage) internal view returns (bytes memory) {
//         require(isContract(target), "Address: static call to non-contract");

//         // solhint-disable-next-line avoid-low-level-calls
//         (bool success, bytes memory returndata) = target.staticcall(data);
//         return _verifyCallResult(success, returndata, errorMessage);
//     }

//     /**
//      * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
//      * but performing a delegate call.
//      *
//      * _Available since v3.4._
//      */
//     function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
//         return functionDelegateCall(target, data, "Address: low-level delegate call failed");
//     }

//     /**
//      * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
//      * but performing a delegate call.
//      *
//      * _Available since v3.4._
//      */
//     function functionDelegateCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
//         require(isContract(target), "Address: delegate call to non-contract");

//         // solhint-disable-next-line avoid-low-level-calls
//         (bool success, bytes memory returndata) = target.delegatecall(data);
//         return _verifyCallResult(success, returndata, errorMessage);
//     }

//     function _verifyCallResult(bool success, bytes memory returndata, string memory errorMessage) private pure returns(bytes memory) {
//         if (success) {
//             return returndata;
//         } else {
//             // Look for revert reason and bubble it up if present
//             if (returndata.length > 0) {
//                 // The easiest way to bubble the revert reason is using memory via assembly

//                 // solhint-disable-next-line no-inline-assembly
//                 assembly {
//                     let returndata_size := mload(returndata)
//                     revert(add(32, returndata), returndata_size)
//                 }
//             } else {
//                 revert(errorMessage);
//             }
//         }
//     }
// }
// // File: contracts/dex-platform-qi-21084022-cpp/amm-contracts/contracts/dex-periphery/interfaces/IQIDexStaking.sol



// pragma solidity 0.6.6;

// interface IQIDexStaking {

//     struct UserInfo {
//         uint256 amount; // How many staked tokens the user has provided
//         uint256 count;
//         uint256 locked;
//         uint256 available;
//     }

//     struct Stake {
//         uint256 amount;     // amount to stake
//         uint256 duration;   // the lockup duration of the stake
//         uint256 end;        // when does the staking period end
//         uint256 rewardDebt; // Reward debt
//     }

//     function deposit() external payable;
//     function withdraw(uint256 amount) external;
//     function claimReward() external;
//     // function emergencyWithdraw() external;

//     function userInfo(address _user) external view returns(uint256, uint256, uint256);
// }
// // File: contracts/dex-platform-qi-21084022-cpp/amm-contracts/contracts/dex-periphery/interfaces/IERC20.sol

// //SPDX-License-Identifier: UNLICENSED

// pragma solidity >=0.5.0;

// interface IERC20 {
//     event Approval(address indexed owner, address indexed spender, uint value);
//     event Transfer(address indexed from, address indexed to, uint value);

//     function name() external view returns (string memory);
//     function symbol() external view returns (string memory);
//     function decimals() external view returns (uint8);
//     function totalSupply() external view returns (uint);
//     function balanceOf(address owner) external view returns (uint);
//     function allowance(address owner, address spender) external view returns (uint);
    
//     function mint(address to, uint256 amount) external ;
//     function approve(address spender, uint value) external returns (bool);
//     function transfer(address to, uint value) external returns (bool);
//     function transferFrom(address from, address to, uint value) external returns (bool);
// }

// // File: contracts/dex-platform-qi-21084022-cpp/amm-contracts/contracts/dex-periphery/QIDexStaking.sol


// pragma solidity 0.6.6;





// /*
//  * @dev Provides information about the current execution context, including the
//  * sender of the transaction and its data. While these are generally available
//  * via msg.sender and msg.data, they should not be accessed in such a direct
//  * manner, since when dealing with GSN meta-transactions the account sending and
//  * paying for execution may not be the actual sender (as far as an application
//  * is concerned).
//  *
//  * This contract is only required for intermediate, library-like contracts.
//  */
// abstract contract Context {
//     function _msgSender() internal view virtual returns (address payable) {
//         return msg.sender;
//     }

//     function _msgData() internal view virtual returns (bytes memory) {
//         this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
//         return msg.data;
//     }
// }

// /**
//  * @dev Contract module which provides a basic access control mechanism, where
//  * there is an account (an owner) that can be granted exclusive access to
//  * specific functions.
//  *
//  * By default, the owner account will be the one that deploys the contract. This
//  * can later be changed with {transferOwnership}.
//  *
//  * This module is used through inheritance. It will make available the modifier
//  * `onlyOwner`, which can be applied to your functions to restrict their use to
//  * the owner.
//  */
// abstract contract Ownable is Context {
//     address private _owner;

//     event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

//     /**
//      * @dev Initializes the contract setting the deployer as the initial owner.
//      */
//     constructor () internal {
//         address msgSender = _msgSender();
//         _owner = msgSender;
//         emit OwnershipTransferred(address(0), msgSender);
//     }

//     /**
//      * @dev Returns the address of the current owner.
//      */
//     function owner() public view returns (address) {
//         return _owner;
//     }

//     /**
//      * @dev Throws if called by any account other than the owner.
//      */
//     modifier onlyOwner() {
//         require(_owner == _msgSender(), "Ownable: caller is not the owner");
//         _;
//     }

//     /**
//      * @dev Leaves the contract without owner. It will not be possible to call
//      * `onlyOwner` functions anymore. Can only be called by the current owner.
//      *
//      * NOTE: Renouncing ownership will leave the contract without an owner,
//      * thereby removing any functionality that is only available to the owner.
//      */
//     function renounceOwnership() public virtual onlyOwner {
//         emit OwnershipTransferred(_owner, address(0));
//         _owner = address(0);
//     }

//     /**
//      * @dev Transfers ownership of the contract to a new account (`newOwner`).
//      * Can only be called by the current owner.
//      */
//     function transferOwnership(address newOwner) public virtual onlyOwner {
//         require(newOwner != address(0), "Ownable: new owner is the zero address");
//         emit OwnershipTransferred(_owner, newOwner);
//         _owner = newOwner;
//     }
// }

// /**
//  * @dev Contract module that helps prevent reentrant calls to a function.
//  *
//  * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
//  * available, which can be applied to functions to make sure there are no nested
//  * (reentrant) calls to them.
//  *
//  * Note that because there is a single `nonReentrant` guard, functions marked as
//  * `nonReentrant` may not call one another. This can be worked around by making
//  * those functions `private`, and then adding `external` `nonReentrant` entry
//  * points to them.
//  *
//  * TIP: If you would like to learn more about reentrancy and alternative ways
//  * to protect against it, check out our blog post
//  * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
//  */
// abstract contract ReentrancyGuard {
//     // Booleans are more expensive than uint256 or any type that takes up a full
//     // word because each write operation emits an extra SLOAD to first read the
//     // slot's contents, replace the bits taken up by the boolean, and then write
//     // back. This is the compiler's defense against contract upgrades and
//     // pointer aliasing, and it cannot be disabled.

//     // The values being non-zero value makes deployment a bit more expensive,
//     // but in exchange the refund on every call to nonReentrant will be lower in
//     // amount. Since refunds are capped to a percentage of the total
//     // transaction's gas, it is best to keep them low in cases like this one, to
//     // increase the likelihood of the full refund coming into effect.
//     uint256 private constant _NOT_ENTERED = 1;
//     uint256 private constant _ENTERED = 2;

//     uint256 private _status;

//     constructor() public {
//         _status = _NOT_ENTERED;
//     }

//     /**
//      * @dev Prevents a contract from calling itself, directly or indirectly.
//      * Calling a `nonReentrant` function from another `nonReentrant`
//      * function is not supported. It is possible to prevent this from happening
//      * by making the `nonReentrant` function external, and make it call a
//      * `private` function that does the actual work.
//      */
//     modifier nonReentrant() {
//         // On the first call to nonReentrant, _notEntered will be true
//         require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

//         // Any calls to nonReentrant after this point will fail
//         _status = _ENTERED;

//         _;

//         // By storing the original value once again, a refund is triggered (see
//         // https://eips.ethereum.org/EIPS/eip-2200)
//         _status = _NOT_ENTERED;

//     }
// }

// contract QIDexStaking is Ownable, ReentrancyGuard, IQIDexStaking {
//     using SafeMath for uint256;

//     uint256 public duration = 365; // 365 days
//     uint256 public rewardPerBlock;
//     uint256 public accTokenPerShare;
//     uint256 public lastRewardBlock;

//     uint256 public depositFee;
//     uint256 public withdrawFee;

//     // Whether a limit is set for users
//     bool public hasUserLimit;
//     // The pool limit (0 if none)
//     uint256 public poolLimitPerUser;

//     // The block number when staking starts.
//     uint256 public startBlock;

//     // The precision factor
//     uint256 public PRECISION_FACTOR = 1e24;
//     uint256 public totalStaked;
//     uint256 private totalRewards;

//     IERC20 public rewardToken;

//     uint256 constant MAX_STAKES = 256;
//     uint256 public totalUsers;

//     mapping(address => Stake[]) public userStakes;
//     mapping(address => UserInfo) public userStaked;
//     mapping(address => bool) public staked;

//     event Deposit(address indexed user, uint256 amount);
//     event Withdraw(address indexed user, uint256 amount);
//     // event EmergencyWithdraw(address indexed user, uint256 amount);
//     event AdminTokenRecovered(address tokenRecovered, uint256 amount);

//     event NewPoolLimit(uint256 poolLimitPerUser);
//     event DurationUpdated(uint256 _duration);
//     event RewardPerBlockUpdated(uint256 _rewardPerBlock);
//     event FeeUpdated(uint256 _depositFee, uint256 _withdrawFee);

//     constructor(uint256 _rewardPerBlock, uint256 _depositFee, uint256 _withdrawFee, uint256 _poolLimitPerUser, address _rewardToken) public {
        
//         startBlock = block.number.add(1);
//         lastRewardBlock = startBlock;
        
//         rewardPerBlock = _rewardPerBlock;
//         depositFee = _depositFee;
//         withdrawFee = _withdrawFee;

//         rewardToken = IERC20(_rewardToken);

//         if (_poolLimitPerUser > 0) {
//             hasUserLimit = true;
//             poolLimitPerUser = _poolLimitPerUser;
//         }
//     }

//     /**
//      * @notice Deposit staked tokens and collect reward tokens (if any)
//      */
//     function deposit() external override payable {
//         uint _amount = msg.value;
//         require(_amount > 0, "Amount should be greator than 0");

//         _updatePool();

//         UserInfo storage user = userStaked[msg.sender];
//         Stake[] storage stakes = userStakes[msg.sender];

//         uint256 pending = 0;

//         if (hasUserLimit) {
//             require(
//                 _amount.add(user.amount) <= poolLimitPerUser,
//                 "User amount above limit"
//             );
//         }
        
//         for(uint256 j = 0; j < stakes.length; j++) {
//             Stake storage stake = stakes[j];
//             if(stake.amount == 0) continue;

//             uint256 _pending = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt);

//             pending = pending.add(_pending);

//             stake.rewardDebt = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
//         }

//         if (pending > 0) {
//             require(availableRewardTokens() >= pending, "Insufficient reward tokens");
//             safeTokenTransfer(msg.sender, pending);            
//             if(totalRewards > pending) {
//                 totalRewards = totalRewards.sub(pending);
//             } else {
//                 totalRewards = 0;
//             }
//         }

//         if (_amount > 0) {
//             user.amount = user.amount.add(_amount);
//             user.count = user.count.add(1);

//             totalStaked = totalStaked.add(_amount);
//         }
        
//         if (depositFee > 0) {
//             uint256 fee = _amount.mul(depositFee).div(10000);
//             if (fee > 0) {
//                 payable(owner()).transfer(fee);
//                 _amount = _amount.sub(fee);
//             }
//         }
        
//         _addStake(msg.sender, _amount);

//         if (staked[msg.sender] == false) {
//             staked[msg.sender] = true;
//             totalUsers = totalUsers.add(1);
//         } 

//         emit Deposit(msg.sender, _amount);
//     }

//     function _addStake(address _account, uint256 _amount) internal {
//         Stake[] storage stakes = userStakes[_account];

//         uint256 end = block.timestamp.add(duration.mul(1 days));
//         uint256 i = stakes.length;
//         require(i < MAX_STAKES, "Max stakes");

//         stakes.push(); // grow the array
//         // find the spot where we can insert the current stake
//         // this should make an increasing list sorted by end
//         while (i != 0 && stakes[i - 1].end > end) {
//             // shift it back one
//             stakes[i] = stakes[i - 1];
//             i -= 1;
//         }
        
//         // insert the stake
//         Stake storage newStake = stakes[i];
//         newStake.duration = duration;
//         newStake.end = end;
//         newStake.amount = _amount;
//         newStake.rewardDebt = newStake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
//     }

//     /**
//      * @notice Withdraw staked tokens and collect reward tokens
//      * @param _amount: amount to withdraw (in earnedToken)
//      */
//     function withdraw(uint256 _amount) external override nonReentrant {
//         require(_amount > 0, "Amount should be greator than 0");

//         _updatePool();

//         UserInfo storage user = userStaked[msg.sender];
//         Stake[] storage stakes = userStakes[msg.sender];
        
//         uint256 pending = 0;
//         uint256 remained = _amount;

//         for(uint256 j = 0; j < stakes.length; j++) {
//             Stake storage stake = stakes[j];
//             if(stake.amount == 0) continue;
//             if(remained == 0) break;   

//             uint256 _pending = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt);
//             pending = pending.add(_pending);
            
//             if(stake.end < block.timestamp) {
//                 if(stake.amount > remained) {
//                     stake.amount = stake.amount.sub(remained);
//                     remained = 0;
//                 } else {
//                     remained = remained.sub(stake.amount);
//                     stake.amount = 0;
//                 }
//             }

//             stake.rewardDebt = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
//         }

//         if (pending > 0) {
//             require(availableRewardTokens() >= pending, "Insufficient reward tokens");
//             safeTokenTransfer(msg.sender, pending);
            
//             if(totalRewards > pending) {
//                 totalRewards = totalRewards.sub(pending);
//             } else {
//                 totalRewards = 0;
//             }
//         }

//         uint256 realAmount = _amount.sub(remained);

//         if(realAmount > 0) {
//             if (withdrawFee > 0) {
//                 uint256 fee = realAmount.mul(withdrawFee).div(10000);
//                 payable(owner()).transfer(fee);
//                 realAmount = realAmount.sub(fee);
//             }

//             user.amount = user.amount.sub(realAmount);
            
//             payable(msg.sender).transfer(realAmount);

//             totalStaked = totalStaked.sub(realAmount);
//         }

//         emit Withdraw(msg.sender, _amount);
//     }

//     function claimReward() external override nonReentrant {
        
//         if(startBlock == 0) return;

//         _updatePool();

//         // UserInfo storage user = userStaked[msg.sender];
//         Stake[] storage stakes = userStakes[msg.sender];

//         uint256 pending = 0;
//         for(uint256 j = 0; j < stakes.length; j++) {
//             Stake storage stake = stakes[j];
//             if(stake.amount == 0) continue;
//             uint256 _pending = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt);
            
//             pending = pending.add(_pending);

//             stake.rewardDebt = stake.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
//         }

//         if (pending > 0) {
//             require(availableRewardTokens() >= pending, "Insufficient reward tokens");
//             safeTokenTransfer(msg.sender, pending);
            
//             if(totalRewards > pending) {
//                 totalRewards = totalRewards.sub(pending);
//             } else {
//                 totalRewards = 0;
//             }
//         }
//     }

//     function safeTokenTransfer(address to, uint256 amount) internal returns (uint256) {
//         uint256 tokenBalance = rewardToken.balanceOf(address(this));
//         if (amount > tokenBalance) {
//             rewardToken.transfer(to, tokenBalance);
//             return tokenBalance;
//         } else {
//             rewardToken.transfer(to, amount);
//             return amount;
//         }
//     }

//     /**
//      * @notice Available amount of reward token
//      */
//     function availableRewardTokens() public view returns (uint256) {

//         return rewardToken.balanceOf(address(this));        
//     }

//     function userInfo(address _account) public override view returns (uint256 amount, uint256 available, uint256 locked) {
//         Stake[] storage stakes = userStakes[_account];
        
//         for(uint256 i = 0; i < stakes.length; i++) {
//             Stake storage stake = stakes[i];

//             if(stake.amount == 0) continue;
            
//             amount = amount.add(stake.amount);
//             if(block.timestamp > stake.end) {
//                 available = available.add(stake.amount);
//             } else {
//                 locked = locked.add(stake.amount);
//             }
//         }
//     }

//     /*
//      * @notice View function to see pending reward on frontend.
//      * @param _user: user address
//      * @return Pending reward for a given user
//      */
//     function pendingReward(address _account) external view returns (uint256) {
//         if(startBlock == 0) return 0;

//         Stake[] storage stakes = userStakes[_account];

//         if(totalStaked == 0) return 0;
        
//         uint256 adjustedTokenPerShare = accTokenPerShare;
//         if (block.number > lastRewardBlock && totalStaked != 0) {
//             uint256 multiplier = block.number.sub(lastRewardBlock);
//             uint256 reward = multiplier.mul(rewardPerBlock);
//             adjustedTokenPerShare =
//                 accTokenPerShare.add(
//                     reward.mul(PRECISION_FACTOR).div(totalStaked)
//                 );
//         }

//         uint256 pending = 0;
//         for(uint256 i = 0; i < stakes.length; i++) {
//             Stake storage stake = stakes[i];
//             if(stake.amount == 0) continue;

//             pending = pending.add(
//                 stake.amount.mul(adjustedTokenPerShare).div(PRECISION_FACTOR).sub(stake.rewardDebt)
//             );
//         }
//         return pending;
//     }

//     /**
//      * @notice It allows the admin to recover wrong tokens sent to the contract
//      * @param _tokenAddress: the address of the token to withdraw
//      * @param _tokenAmount: the number of tokens to withdraw
//      * @dev This function is only callable by admin.
//      */
//     function recoverWrongTokens(address _tokenAddress, uint256 _tokenAmount)
//         external
//         onlyOwner
//     {
//         if(_tokenAddress == address(0x0)) {
//             payable(msg.sender).transfer(_tokenAmount);
//         } else {
//             IERC20(_tokenAddress).transfer(address(msg.sender), _tokenAmount);
//         }

//         emit AdminTokenRecovered(_tokenAddress, _tokenAmount);
//     }

//     function updateRewardToken(address _rewardToken) external onlyOwner {
//         rewardToken = IERC20(_rewardToken);
//     }

//     /*
//      * @notice Update pool limit per user
//      * @dev Only callable by owner.
//      * @param _hasUserLimit: whether the limit remains forced
//      * @param _poolLimitPerUser: new pool limit per user
//      */
//     function updatePoolLimitPerUser( bool _hasUserLimit, uint256 _poolLimitPerUser) external onlyOwner {
//         require(hasUserLimit, "Must be set");
//         if (_hasUserLimit) {
//             require(
//                 _poolLimitPerUser > poolLimitPerUser,
//                 "New limit must be higher"
//             );
//             poolLimitPerUser = _poolLimitPerUser;
//         } else {
//             hasUserLimit = _hasUserLimit;
//             poolLimitPerUser = 0;
//         }
//         emit NewPoolLimit(poolLimitPerUser);
//     }

//     function updateDuration(uint256 _duration) external onlyOwner {
//         // require(startBlock == 0, "Pool was already started");
//         // require(_duration >= 30, "lower limit reached");

//         duration = _duration;
//         emit DurationUpdated(_duration);
//     }

//     function updateFee(uint256 _depositFee, uint256 _withdrawFee) external onlyOwner {

//         depositFee = _depositFee;
//         withdrawFee = _withdrawFee;
//         emit FeeUpdated(_depositFee, _withdrawFee);
//     }

//     function updateRewardPerBlock(uint256 _rewardPerBlock) external onlyOwner {

//         rewardPerBlock = _rewardPerBlock;
//         emit RewardPerBlockUpdated(_rewardPerBlock);
//     }

//     /************************
//     ** Internal Methods
//     *************************/
//     /*
//      * @notice Update reward variables of the given pool to be up-to-date.
//      */
//     function _updatePool() internal {

//         if (block.number <= lastRewardBlock) return;

//         if (totalStaked == 0) {
//             lastRewardBlock = block.number;
//             return;
//         }

//         uint256 multiplier = block.number.sub(lastRewardBlock);
//         uint256 _reward = multiplier.mul(rewardPerBlock);
//         rewardToken.mint(address(this), _reward);
//         accTokenPerShare = accTokenPerShare.add(
//             _reward.mul(PRECISION_FACTOR).div(totalStaked)
//         );
//         lastRewardBlock = block.number;
//     }

//     receive() external payable {}
// }
