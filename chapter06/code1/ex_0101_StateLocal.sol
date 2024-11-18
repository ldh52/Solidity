// SPDX-License-Identifier: GPL-3.0

// State 변수와 Local 변수.

pragma solidity >=0.7.0 <0.9.0;

contract StateLocal {
    string public name = "John";    // State 변수. 전개하면 보임.      
    uint public age = 27;           // State 변수. 전개하면 보임. 
    string public constant symbol = "KRW";   // Constant한 state 변수 선언과 값 정의!
    address private immutable owner;         // Immutable 한 state 변수 선언.
    
    constructor(){
        owner = msg.sender;                  //  Immutable 한 state 변수의 값 정의 (1회)!
    }

    function getResult() public returns (uint){
        age = 21;                   // State 변수 변경 가능.
//        symbol = "ETC";           // 오류!   Constant한 state 변수는 변경 불가능!
//        owner = msg.sender;       // 오류!   Immutable한 state 변수는 변경 불가능!
        uint a = 11;                // Local 변수. 외부에서 볼 수 없음.
        uint b = 22;                // Local 변수. 외부에서 볼 수 없음.
        uint res = a + b;           // Local 변수. 외부에서 볼 수 없음.
        return res;
    }
}