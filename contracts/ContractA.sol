pragma solidity ^0.5.0;

import "./Lib.sol";

contract ContractA {
	uint x;

  function a_trace(bytes4 b) public pure {}

  function add() public view returns(uint newAmount){
    a_trace(0xaaaaaaaa);
    return x + 5;
  }

  function addViaLib() public view returns(uint newAmount){
    return Lib.add(x);
  }


}
