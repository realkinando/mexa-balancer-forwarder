const { expect } = require("chai");
const { networks } = require("../buidler.config");
const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');

let domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" }
];

let metaBuildType = [
  {name:"holder",type:"address"},
  {name:"authority",type:"address"},
  {name:"nonce",type:"uint256"}
];

let balancerForwarderType = [
  {name:"signer", type:"address"},
  {name:"to", type:"address"},
  {name:"data", type:"bytes"},
  {name:"value", type:"uint256"},
  {name:"inputToken", type:"address"},
  {name:"outputToken", type:"address"},
  {name:"nonce", type:"uint256"}
];

let metaBuildBasicSignature = ethers.utils.id("metaBuildWithBasicSign(address,address,Signature)").substr(0,10);

let mexaDSProxyFactory;
let balancerForwarder;
let account0;
let account1;
let account2;

// Test 2


// Test 3

describe("Biconomy x Balancer Contracts", function() {

  before(async function(){

    // Deploy WETH
    const _WETH9 = await ethers.getContractFactory("WETH9");
    const WETH = await _WETH9.deploy();
    await WETH.deployed();

    // Deploy TestToken
    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = await TestToken.deploy(WETH.address);
    await testToken.deployed();

    // Deploy MockActions
    const MockActions = await ethers.getContractFactory("MockActions");
    const mockActions = await MockActions.deploy(WETH.address,testToken.address);
    await mockActions.deployed();

    // Deploy BalancerForwarder
    const BalancerForwarder = await ethers.getContractFactory("BalancerForwarder");
    balancerForwarder = await BalancerForwarder.deploy();
    await balancerForwarder.deployed();

    // Deploy MexaDSProxyFactory
    const MexaDSProxyFactory = await ethers.getContractFactory("MexaDSProxyFactory");
    mexaDSProxyFactory = await MexaDSProxyFactory.deploy();
    await mexaDSProxyFactory.deployed();

    // Account1 setup
    [account0, account1, account2] = await ethers.getSigners();
    // - convert 90ETH into WETH
    await WETH.connect(account1).deposit({value:ethers.utils.parseEther("90")});
    // - approve BalancerForwarder to spend WETH
    await WETH.connect(account1).approve(balancerForwarder.address,ethers.utils.parseEther("90"));

  });

  it("MetaBuild",async function(){

    const factoryDomainData = {
      name : "MexaDSProxyFactory",
      version : "1",
      chainId : 42,
      verifyingContract : mexaDSProxyFactory.address
    };

    const dataToSign = {
      types: {
          EIP712Domain: domainType,
          MetaTransaction: metaBuildType
        },
        domain: factoryDomainData,
        primaryType: "MetaTransaction",
        message: {
          holder: await account1.getAddress(),
          authority: balancerForwarder.address,
          nonce: 0
        }
      };

    // - sign metaTx for MetaBuild(account1,BalancerForwarder)
    const metaBuildSig0 = await ethers.provider.send("eth_signTypedData",[await account1.getAddress(),dataToSign]);
    const signature = metaBuildSig0.substring(2);
    const _r = "0x" + signature.substring(0, 64);
    const _s = "0x" + signature.substring(64, 128);
    const _v = parseInt(signature.substring(128, 130), 16);

    // - transmit it using account0
    const proxy0Deployment = await mexaDSProxyFactory.metaBuild(await account1.getAddress(), balancerForwarder.address, {v:_v,r:_r,s:_s});
    const proxy0CreatedEvent = await mexaDSProxyFactory.queryFilter(mexaDSProxyFactory.filters.Created(null,await account1.getAddress(),null,null),proxy0Deployment.blockHash);
    // expect(await proxy0.owner()).to.equal(await account1.getAddress());
    // - check owner + authority are correct
    // - sign metaTx for MetaBuild(account1,BalancerForwarder) INCORRECTLY (same nonce again)
    // - sign metaTx for MetaBuild(account1,BalancerForwarder) INCORRECTLY (account0 signature)
    // - check second and third attempts fail
  });

  it("MetaBuildWithBasicSign", async function(){
    // - sign metaTx for MetaBuildWithBasicSign(account1,BalancerForwarder)
    // - transmit it using account0
    // - check owner + authority are correct
    // - sign metaTx for MetaBuildWithBasicSign(account1,BalancerForwarder) INCORRECTLY (same nonce again)
    // - sign metaTx for MetaBuildWithBasicSign(account1,BalancerForwarder) INCORRECTLY (account0 signature)
    // - check second and third attempts fail
  });

  it("BalancerForwarder", async function(){
    // - build call data
    // - sign metaTx for BalancerForwarder
// - call BalancerForwarder with metaTx data using account 0
// - check WETH and tokenB balances are correct
// - sign metaTx INCORRECTLY (same nonce again)
// - sign metaTx INCORRECTLY (account0 signature)
// - check second and third attempts fail
  });

});
