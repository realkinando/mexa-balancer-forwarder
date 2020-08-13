const { expect } = require("chai");

// will initialise BalancerForwarder and mexDSProxyFactory

// will mock BActions using a contract which:
// - transfers tokens from the forwarder to itself
// - approves the bpoolMock to spend the received token
// - calls bpoolMock
// - receives bpoolMock tokens back
// - transfers those tokens to the receiver

// Will mock BPool using a contract that does the following
// - receives tokenA in, and mints tokenB 1:1

// Token A is the WETH9.sol

// Account1 setup
// - convert 90ETH into WETH
// - approve BalancerForwarder to spend WETH

// Test 1
// - sign metaTx for MetaBuild(account0,BalancerForwarder)
// - transmit it using account0
// - check owner + authority are correct
// - sign metaTx for MetaBuild(account1,BalancerForwarder) INCORRECTLY (same nonce again)
// - sign metaTx for MetaBuild(account1,BalancerForwarder) INCORRECTLY (account0 signature)
// - check second and third attempts fail

// Test 2
// - build call data
// - sign metaTx for BalancerForwarder
// - call BalancerForwarder with metaTx data using account 0
// - check WETH and tokenB balances are correct
// - sign metaTx INCORRECTLY (same nonce again)
// - sign metaTx INCORRECTLY (account0 signature)
// - check second and third attempts fail


describe("Biconomy x Balancer Contracts", function() {

  before(async function(){

    // Deploy WETH
    // Deploy TestToken
    // Deploy MockActions
    // Deploy BalancerFactory
    // Deploy MexaDSProxyFactory

  });

});
