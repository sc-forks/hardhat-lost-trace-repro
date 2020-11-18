pragma solidity ^0.5.0;

library Lib{

  function lib_trace(bytes4 x) public pure {}

	function add(uint base) pure public returns (uint newAmount){
    lib_trace(0xaaaaaaaa);
		return base + 5;
	}
}
