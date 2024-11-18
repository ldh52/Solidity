// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {		
    uint storedData;			    	     // State 변수 선언.
    function set(uint x) public {	 	     // 아무나 호출할 수 있는 공개된 함수.
        storedData = x;			     // 주의 this. 나 .self는 필요 없음!
    }
    function get() public view returns (uint) {	      // 아무나 호출할 수 있는 공개된 함수.
        return storedData;
    }
}
