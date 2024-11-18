// SPDX-License-Identifier: GPL-3.0

// 위임호출 (delegatecall)될 라이브러리 계약.

pragma solidity >=0.7.0 <0.9.0;

contract Library {
    uint public start;
    uint public calculatedNumber;

    function setNumber(uint n) public {
        calculatedNumber = fibonacci(n);                      // 피보나치 수열 계산.
    }

    function fibonacci(uint n) internal returns (uint) {    // 피보나치 수열 함수. 재귀호출 될 수도 있음.
        if (n == 0) return start;
        else if (n == 1) return start + 1;
        else return fibonacci(n - 1) + fibonacci(n - 2);
   }
} 
