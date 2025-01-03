// SPDX-License-Identifier: GPL-3.0

// 함수 예시.

pragma solidity >=0.7.0 <0.9.0;

contract FunctionExample{

    uint private counter = 0;            // State 변수. private 해서 외부에 노출되지는 않는다.

    // 여러 값을 반환하는 함수.
    function myFunction1() public pure returns ( uint, uint, bool) {
        uint a = 111;
        uint b = 222;
        bool c = false;        
        return (a, b, c);
    }

    // 반환값에 이름이 있는 함수. 반환값을 담을 변수를 먼저 선언해 주는 효과.
    function myFunction2() public pure returns ( uint a, uint b, bool c) {
        a = 111;
        b = 222;
        c = false;
    }

    // 반환값이 여렀 있을 때 받는 방법.
    function myFunction3() public pure returns (uint) {
        (uint x, uint y, bool z) = myFunction1();
        if (z) { return x + y;} else {return y - x;}
    }

    // State 변수를 읽어 오는 함수.
    function getCounter() public view returns (uint) {
        return counter;
    }

    // State 변수의 내용을 변경할 수 있는 함수.
    function updateCounter(uint _n ) public {
        counter += _n;
    }

} 