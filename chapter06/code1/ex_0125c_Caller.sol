// SPDX-License-Identifier: GPL-3.0

// 라이브러리 계약을 위임호출 (delegatecall)하는 계약.
// 저대로 작동함.

pragma solidity >=0.7.0 <0.9.0;

contract Caller {

    uint public start = 1;                  // 순서 주의!
    uint public calculatedNumber;           // 순서 주의!
    address public addrLibrary;
    uint public myCounter;

    // 먼저 배포된 Library 계약의 주소를 인자로 넣고 실행해야 한다.
    constructor(address _addrLibrary) {   
        addrLibrary = _addrLibrary;
    }
 
    // Library 함수를 사용해서 calculatedNumber를 업데이트 해준다.
    function updateCalculatedNumber() public {
        myCounter += 1;
        (bool result, ) = 
        addrLibrary.delegatecall( abi.encodeWithSignature("setNumber(uint256)", myCounter));
        require(result, "Delegatecall failed!");
    }

}