// SPDX-License-Identifier: GPL-3.0

// Library 예시 2.
// 양의 정수 (unsigned integer) 관련 함수 라이브러리.
// 출처: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.5/contracts/utils/math/Math.sol

pragma solidity ^0.8.0;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.5/contracts/utils/math/Math.sol";  // 아래 라이브러리를 이렇게 대체할 수도 있음.


library Math {
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    // 안전하게 평균을 구해준다.
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 는 overflow가 발생할 수 있기 때문에 다음과 같이 실행한다.
        return (a & b) + (a ^ b) / 2;         // & 는 bitwise AND, ^ 는 bitwise XOR을 의미한다
    }

     // 안전하게 a/b의 ceiling을 구해줌. 항상 round up을 해주는 것과도 같음.
    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b - 1) / b는 overflow가 발생할 수 있기 때문에 다음과 같이 실행한다.
        return a / b + (a % b == 0 ? 0 : 1);
    }
}

// 배포 필요.
// Library 함수를 테스트해보는 계약.
contract TestLibrary {
    using Math for uint;    // Math 라이브러리의 모든 함수를 uint에 attach 해준다.

    function getMax(uint a, uint b ) public pure returns (uint){
        return Math.max(a, b);
//        return a.max(b);
    }

    function getMin(uint a, uint b ) public pure returns (uint){
        return Math.min(a, b);
//        return a.min(b);
    }

    function getAverage(uint a, uint b ) public pure returns (uint){
        return Math.average(a, b);
//        return a.average(b);
    }

    function getCeilDiv(uint a, uint b ) public pure returns (uint){
        return Math.ceilDiv(a, b);
//        return a.ceilDiv(b);
    }

}
