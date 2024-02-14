pragma solidity =0.5.16;

import '../QIDexERC20.sol';

contract ERC20 is QIDexERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
