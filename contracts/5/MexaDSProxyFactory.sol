pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import "./dsProxy.sol";
import "./EIP712.sol";

contract MexaDSProxyFactory is DSProxyFactory, EIP712(42) {
    //42 = KOVAN

    bytes32 internal constant META_TRANSACTION_TYPEHASH = 
    keccak256(bytes("MetaTransaction(address holder,address authority,uint256 nonce)"));
    mapping(address => uint256) public nonces;

    function metaBuild(address holder,address authority, Signature calldata signature) external returns (address payable proxy){

        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        META_TRANSACTION_TYPEHASH,
                        holder,
                        authority,
                        nonces[holder]
                    )
                )
            )
        );
        require(holder != address(0), "invalid-address-0");
        require(
            holder == ecrecover(digest, signature.v, signature.r, signature.s),
            "invalid-signatures"
        );

        proxy = address(new DSProxy(address(cache)));
        emit Created(msg.sender, holder, address(proxy), address(cache));
        DSProxy(proxy).setAuthority(DSAuthority(authority));
        DSProxy(proxy).setOwner(holder);
        isProxy[proxy] = true;

    }

}