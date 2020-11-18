pragma solidity ^0.5.0;

contract ContractB {
  uint x;

  function b_trace(bytes4 b) public pure {}

  function add() public view returns(uint newAmount){
    b_trace(0xaaaaaaaa);
    return x + 5;
  }
}
