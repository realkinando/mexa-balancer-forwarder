pragma solidity ^0.6.8;

import "@openzepellin/contracts/token/ERC20/IERC20.sol";
import "./TestToken.sol";

// DON'T CALL THIS CONTRACT, USE DELEGATE CALL
// DESIGNED TO BE CALLED BY DSProxy

contract MockActions{
    IERC20 internal WETH;
    TestToken internal TokenB;

    constructor(address _WETH,address _TokenB){
        WETH = IERC20(_WETH);
        TokenB = TestToken(_TokenB);
    }

    function joinPool(amount){
        WETH.transferFrom(msg.sender,address(this),amount);
        TokenB.mint(amount);
        TokenB.transfer(msg.sender,amount);
    }
}