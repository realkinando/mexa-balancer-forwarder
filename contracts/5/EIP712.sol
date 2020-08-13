pragma solidity 0.5.12;

contract EIP712 {
    
mapping(address => uint256) public nonces;

struct EIP712Domain {
  string name;
  string version;
  uint256 chainId;
  address verifyingContract;
  }

struct Signature {
  bytes32 r;
  bytes32 s;
  uint8 v;
  }
  
bytes32 internal constant EIP712_DOMAIN_TYPEHASH = keccak256(bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"));
bytes32 internal  DOMAIN_SEPARATOR;

constructor(uint256 _chainId) public{

  // inspired by how they did it in the Dai token contract
  DOMAIN_SEPARATOR = keccak256(abi.encode(
  EIP712_DOMAIN_TYPEHASH,
  keccak256(bytes("balancer")),
  keccak256(bytes("1")),
  _chainId, // Kovan
  address(this)
  ));

  }

}