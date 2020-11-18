pragma solidity ^0.5.0;

import "./ContractB.sol";

contract Factory {

  ContractB public contractB;

  function deployContractB() public {
    contractB = new ContractB();
  }

  function wrappedAdd() public view returns (uint) {
    return ContractB(contractB).add();
  }
}