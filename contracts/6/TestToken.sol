pragma solidity ^0.6.8;

import "@openzepellin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20{
    ERC20 internal WETH;

    constructor(address _WETH) public ERC20("TEST","TEST"){
        WETH = ERC20(_WETH);
    }

    function mint(uint256 amount){
        WETH.transferFrom(msg.sender,address(this),amount);
        _mint(msg.sender,amount);
    }

}