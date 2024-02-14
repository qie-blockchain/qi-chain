//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

// File: @openzeppelin/contracts/utils/Context.sol

// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
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

// File: @openzeppelin/contracts/access/Ownable.sol

// OpenZeppelin Contracts v4.4.1 (access/Ownable.sol)

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

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() public {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
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
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

// File: @openzeppelin/contracts/security/ReentrancyGuard.sol

// OpenZeppelin Contracts v4.4.1 (security/ReentrancyGuard.sol)

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
     * by making the `nonReentrant` function external, and making it call a
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

// File: @openzeppelin/contracts/utils/Address.sol

// OpenZeppelin Contracts (last updated v4.5.0) (utils/Address.sol)

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            codehash := extcodehash(account)
        }
        return (codehash != accountHash && codehash != 0x0);
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(
            address(this).balance >= amount,
            "Address: insufficient balance"
        );

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain`call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data)
        internal
        returns (bytes memory)
    {
        return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return _functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return
            functionCallWithValue(
                target,
                data,
                value,
                "Address: low-level call with value failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(
            address(this).balance >= value,
            "Address: insufficient balance for call"
        );
        return _functionCallWithValue(target, data, value, errorMessage);
    }

    function _functionCallWithValue(
        address target,
        bytes memory data,
        uint256 weiValue,
        string memory errorMessage
    ) private returns (bytes memory) {
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{value: weiValue}(
            data
        );
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}

// File: contracts/contract_Practice/distribution.sol

// import "hardhat/console.sol";

interface IDistribution {
    struct userDistribution {
        bool isExist;
        uint256 id;
        uint256 lastTimeStamp;
        uint256 currentLevel;
        uint256 totalReferralAmount;
        uint256 pendingReferralAmount;
        uint256[] referralLevelAmount;
        uint256[] referralLevelCount;
    }

    function claimReferralPayout() external;

    event ReferralRewardIntialization(uint256[] rewardArray);
    event regLevelEvent(
        address indexed _user,
        address indexed _referrer,
        uint256 _time
    );
    event buyLevelEvent(address indexed _user, uint256 _lvl, uint256 _time);
}

/// @dev Fetches price from Chainlink Oracles and allocates Daddy to the user for Vesting and a referral based reward mechanism.
contract Distribution is IDistribution, Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using Address for address;

    uint256 UPLINE_1_LVL_LIMIT = 5;

    uint256 public lastId; // Count for Number of users
    // uint256 public totalDeposited; // Total deposited amount
    uint256 public totalClaimable; // Total Claimable referral rewards
    // uint256 public adminClaimable;   // Admin total collected revenue;
    uint256 public numberOfReferralsReq = 1; // Total Claimable referral rewards
    bool public referralIntialized; // Check for referral structure initialization. PENDING
    address[] public trees; // Saving All Individual New Trees

    address public marketplaceContract;

    mapping(address => userDistribution) public userInfo; // User Info
    mapping(address => address) public referrerParent; // User to Referrer
    mapping(uint256 => uint256) public refReward; // LevelWise Referral Rewards
    mapping(uint256 => uint256) public LVL_COST;
    // mapping(uint256 => address) public userList;

    mapping(address => mapping(uint256 => address[]))
        private _referralsPerLevel; // Tracking referral addresses at each level

    constructor() public {}

    function setMarketplaceContract(address _marketplace) public onlyOwner {
        marketplaceContract = _marketplace;
    }

    /// @notice Sets up the Referral reward structure percentages
    function initReferralRewards(
        uint256[] memory _refReward,
        uint256[] memory _LVL_COST
    ) external onlyOwner {
        require(!referralIntialized, "Already initialized");
        require(_refReward.length == 5, "There has to be 5 levels only");
        for (uint256 index = 0; index < _refReward.length; index++) {
            refReward[index] = _refReward[index];
            LVL_COST[index] = _LVL_COST[index];
        }
        referralIntialized = true;
        emit ReferralRewardIntialization(_refReward);
    }

    function updateReferralRewards(
        uint256[] memory _refReward,
        uint256[] memory _LVL_COST
    ) external onlyOwner {
        require(referralIntialized, "Not initialized");
        require(_refReward.length == 5, "There has to be 5 levels only");
        for (uint256 index = 0; index < _refReward.length; index++) {
            refReward[index] = _refReward[index];
            LVL_COST[index] = _LVL_COST[index];
        }
    }

    function updateReferralsReq(uint256 _numberOfReferralsReq)
        external
        onlyOwner
    {
        numberOfReferralsReq = _numberOfReferralsReq;
    }

    function updateUplineLimit(uint256 _UPLINE_1_LVL_LIMIT) external onlyOwner {
        UPLINE_1_LVL_LIMIT = _UPLINE_1_LVL_LIMIT;
    }

    function regUser(address _referrer) public payable {
        require(referralIntialized, "Not initialized");
        userDistribution storage user = userInfo[msg.sender];

        require(!user.isExist, "User exists");

        if (msg.sender != owner()) {
            require(msg.value == LVL_COST[0], "Incorrect Value");

            if (_referrer == address(0)) {
                _referrer = owner();
            }
        }

        user.isExist = true;
        user.currentLevel = 1;

        if (msg.sender != owner()) {
            if (
                userInfo[_referrer].referralLevelCount[0] >= UPLINE_1_LVL_LIMIT
            ) {
                _referrer = findFreeUpline(_referrer);
            }
        }

        // totalDeposited = totalDeposited.add(msg.value);
        // adminClaimable = adminClaimable.add(msg.value);

        _allocateForDistribution(_referrer);

        emit regLevelEvent(msg.sender, _referrer, block.timestamp);
    }
    function regUserAdmin(address _referrer, address _acutalUser) public payable onlyOwner{
        require(referralIntialized, "Not initialized");
        userDistribution storage user = userInfo[_acutalUser];

        require(!user.isExist, "User exists");

        if (_acutalUser != owner()) {
            require(msg.value == LVL_COST[0], "Incorrect Value");

            if (_referrer == address(0)) {
                _referrer = owner();
            }
        }

        user.isExist = true;
        user.currentLevel = 1;

        if (_acutalUser != owner()) {
            if (
                userInfo[_referrer].referralLevelCount[0] >= UPLINE_1_LVL_LIMIT
            ) {
                _referrer = findFreeUpline(_referrer);
            }
        }

        // totalDeposited = totalDeposited.add(msg.value);
        // adminClaimable = adminClaimable.add(msg.value);

        _allocateForDistributionForAdmin(_referrer, _acutalUser);

        emit regLevelEvent(_acutalUser, _referrer, block.timestamp);
    }


    // Admin function to store data for a user
    function storeUserDataByAdmin(
        address userAddress,
        uint256 id,
        uint256[] memory referralLevelAmount,
        uint256[] memory referralLevelCount
    ) public onlyOwner {
        // Create a new UserDistribution struct
        userDistribution memory newUserDistribution = userDistribution({
            isExist: true,
            id: id,
            lastTimeStamp: block.timestamp,
            currentLevel: 1,
            totalReferralAmount: 0,
            pendingReferralAmount: 0,
            referralLevelAmount: referralLevelAmount,
            referralLevelCount: referralLevelCount
        });

        // Store the user data in the userInfo mapping
        userInfo[userAddress] = newUserDistribution;
        lastId++;
    }

    function buyLevel(uint256 _lvl) public payable {
        userDistribution storage user = userInfo[msg.sender];

        require(user.isExist, "User doesn't exist");
        require(_lvl > 1 && _lvl <= 5, "Incorrect level");
        require(_lvl.sub(user.currentLevel) == 1, "Buy the previous level");
        require(
            userInfo[msg.sender].referralLevelCount[_lvl - 2] >=
                numberOfReferralsReq,
            "Not enough referrals on current level"
        );

        if (msg.sender != owner()) {
            require(msg.value == LVL_COST[_lvl - 1], "Incorrect Value");
        }

        user.currentLevel = _lvl;

        // totalDeposited = totalDeposited.add(msg.value);
        // adminClaimable = adminClaimable.add(msg.value);

        _allocateForDistribution(referrerParent[msg.sender]);

        emit buyLevelEvent(msg.sender, _lvl, block.timestamp);
    }

    /// @notice User can claim his pending referral amount, allocated to him during referral rewards
    /// @dev Contract should hold enough Tether tokens to reward to the users
    function claimReferralPayout() external virtual override nonReentrant {
        // require(paused == false, "Contract Paused");
        userDistribution storage user = userInfo[msg.sender];
        require(user.id != 0, "Invalid User");
        require(user.pendingReferralAmount > 0, "Nothing to claim");

        // require(
        //     address(this).balance >= totalClaimable,
        //     "Not enough token for referral rewards"
        // );
        payable(msg.sender).transfer(user.pendingReferralAmount); // Inconsistence with 6 decimals as Tether as 6 decimals
        totalClaimable -= user.pendingReferralAmount;
        user.pendingReferralAmount = 0;
    }

    /// @notice Admin Qi withdraw
    function adminWithdraw(uint256 _amount) external onlyOwner {
        // require(address(this).balance > 0, "Zero Balance");
        require(_amount > 0, "Cannot withdraw 0 amount");
        payable(owner()).transfer(_amount);
    }

    /// @notice Returns referral address at every level upto 5 levels
    function referralsPerLevel(address user, uint256 _level)
        public
        view
        returns (address[] memory)
    {
        return _referralsPerLevel[user][_level - 1];
    }

    /// @notice Fetches User Details
    function userDetails(address _user)
        public
        view
        returns (userDistribution memory user)
    {
        user = userInfo[_user];
    }

    /// @notice Fetches List of all Individual referral structure ie, who have no parent
    function individualTrees() public view returns (address[] memory) {
        return trees;
    }

    function _allocateForDistribution(address referrer) internal {
        require(
            referrer == address(0) ? true : userInfo[referrer].id != 0,
            "Invalid Referrer"
        );
        require(msg.sender != referrer, "User cannot be Referrer");

        uint256 _id = userInfo[msg.sender].id != 0 // Assigning an ID, uses old ID if already allocated
            ? userInfo[msg.sender].id
            : ++lastId;

        referrerParent[msg.sender] = userInfo[msg.sender].id == 0 // Assigning a referral parent, uses old referrer if already allocated
            ? referrer
            : referrerParent[msg.sender]; // Referrer Cannot be Changed once set

        if (userInfo[msg.sender].currentLevel == 1) {
            if (referrerParent[msg.sender] == address(0))
                trees.push(msg.sender); // Tracking new individual trees with address(0) as parent
        }

        // Creates new user information or uses old info if already present
        userInfo[msg.sender] = userDistribution({
            isExist: userInfo[msg.sender].isExist,
            id: _id,
            lastTimeStamp: block.timestamp,
            currentLevel: userInfo[msg.sender].currentLevel,
            totalReferralAmount: userInfo[msg.sender].id != 0
                ? userInfo[msg.sender].totalReferralAmount
                : 0,
            referralLevelAmount: userInfo[msg.sender].id != 0
                ? userInfo[msg.sender].referralLevelAmount
                : new uint256[](5),
            referralLevelCount: userInfo[msg.sender].id != 0
                ? userInfo[msg.sender].referralLevelCount
                : new uint256[](5),
            pendingReferralAmount: userInfo[msg.sender].id != 0
                ? userInfo[msg.sender].pendingReferralAmount
                : 0
        });

        pushReferral(msg.sender);
    }
    function _allocateForDistributionForAdmin(address referrer, address _actualUser) internal onlyOwner {
        require(
            referrer == address(0) ? true : userInfo[referrer].id != 0,
            "Invalid Referrer"
        );
        // require(msg.sender != referrer, "User cannot be Referrer");

        uint256 _id = userInfo[_actualUser].id != 0 // Assigning an ID, uses old ID if already allocated
            ? userInfo[_actualUser].id
            : ++lastId;

        referrerParent[_actualUser] = userInfo[_actualUser].id == 0 // Assigning a referral parent, uses old referrer if already allocated
            ? referrer
            : referrerParent[_actualUser]; // Referrer Cannot be Changed once set

        if (userInfo[_actualUser].currentLevel == 1) {
            if (referrerParent[_actualUser] == address(0))
                trees.push(_actualUser); // Tracking new individual trees with address(0) as parent
        }

        // Creates new user information or uses old info if already present
        userInfo[_actualUser] = userDistribution({
            isExist: userInfo[_actualUser].isExist,
            id: _id,
            lastTimeStamp: block.timestamp,
            currentLevel: userInfo[_actualUser].currentLevel,
            totalReferralAmount: userInfo[_actualUser].id != 0
                ? userInfo[_actualUser].totalReferralAmount
                : 0,
            referralLevelAmount: userInfo[_actualUser].id != 0
                ? userInfo[_actualUser].referralLevelAmount
                : new uint256[](5),
            referralLevelCount: userInfo[_actualUser].id != 0
                ? userInfo[_actualUser].referralLevelCount
                : new uint256[](5),
            pendingReferralAmount: userInfo[_actualUser].id != 0
                ? userInfo[_actualUser].pendingReferralAmount
                : 0
        });

        pushReferral(_actualUser);
    }

    function pushReferral(address _user) internal {
        address referrer = referrerParent[_user];

        for (uint256 index = 1; index <= 5; index++) {
            if (referrer == address(0)) {
                break;
            } else {
                bool status = fetchPresence(
                    _referralsPerLevel[referrer][index - 1],
                    _user
                );

                if (!status) {
                    _referralsPerLevel[referrer][index - 1].push(_user);
                    userInfo[referrer].referralLevelCount[index - 1] += 1;
                }
            }
            referrer = referrerParent[referrer];
        }
    }

    /// @notice Pays out referral rewards upto 5 levels
    /// @dev Uses mapping referrerParent for vertical travelling and referralLevelCount[0] will contain the horizontal children
    /// @param _amount amount of dollar deposited
    /// @param _user user's address
    function refPayout(uint256 _amount, address _user) external {
        require(
            msg.sender == marketplaceContract,
            "Can be called only from Marketplace contract"
        );

        address referrer = referrerParent[_user];

        for (uint256 index = 1; index <= 5; index++) {
            uint256 currentLevelAmount = 0;
            if (userInfo[referrer].currentLevel >= index) {
                currentLevelAmount =
                    (_amount.mul(refReward[index - 1])) /
                    10000;
            }
            if (referrer == address(0)) {
                break;
            } else {
                // Send referrer reward in two cases
                // 1) Direct referral child ie: referralLevelCount[0]
                // 2) Each parent at a particular level should have atleast 'level' amount of referrals

                totalClaimable += currentLevelAmount;
                // adminClaimable -= currentLevelAmount;
                userInfo[referrer].referralLevelAmount[
                    index - 1
                ] += currentLevelAmount;

                userInfo[referrer].totalReferralAmount += currentLevelAmount;

                userInfo[referrer].pendingReferralAmount += currentLevelAmount;
            }
            referrer = referrerParent[referrer];
        }
    }

    /// @notice Finds an element from an array
    function fetchPresence(address[] memory arr, address element)
        public
        pure
        returns (bool status)
    {
        for (uint256 index = 0; index < arr.length; index++) {
            if (element == arr[index]) {
                status = true;
            } else {
                status = false;
            }
        }
    }

    function findFreeUpline(address _user) public view returns (address) {
        if (userInfo[_user].referralLevelCount[0] < UPLINE_1_LVL_LIMIT) {
            return _user;
        }

        address FreeUpline;
        bool noFreeUpline = true;

        for (uint256 i = 1; i < 4; i++) {
            uint256 count = userInfo[_user].referralLevelCount[i - 1];
            for (uint256 j = 0; j < count; j++) {
                if (
                    userInfo[referralsPerLevel(_user, i)[j]].referralLevelCount[
                        0
                    ] < UPLINE_1_LVL_LIMIT
                ) {
                    noFreeUpline = false;
                    FreeUpline = referralsPerLevel(_user, i)[j];
                    break;
                }
            }
        }
        require(!noFreeUpline, "No Free Upline");
        return FreeUpline;
    }

    receive() external payable {}

    fallback() external payable {}
}