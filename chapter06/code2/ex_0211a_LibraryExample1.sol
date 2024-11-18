// SPDX-License-Identifier: GPL-3.0

// Library 예시 1.
// 출처: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.5/contracts/utils/Counters.sol

// unckecked {}   :  Solidity 0.8.0 이후 under/overflow에 대한 check이 포함 되어서 더하기, 곱하기, 나누기에 gas가 더 많이 소비된다.
//                :  unchecked 블록안에서는 이와같은 check이 실행되지 않아서 gas를 절약할 수 있게된다.
// storage 키워드  : reference를 만들기 위해서 사용된다.

pragma solidity ^0.8.0;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.5/contracts/utils/Counters.sol";  // 아래 라이브러리를 이렇게 대체할 수도 있음.

library Counters {

    struct Counter {
        uint256 _value; 		// 기본값 = 0.
    }

    function current(Counter storage x) internal view returns (uint256) {
        return x._value;
    }

    function increment(Counter storage x) internal {
        unchecked {
            x._value += 1;
        }
    }

    function decrement(Counter storage x) internal {
        uint256 value = x._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            x._value = value - 1;
        }
    }

    function reset(Counter storage x) internal {
        x._value = 0;
    }
}

// 배포 필요.
// Library 함수를 테스트해보는 계약.
contract TestLibrary {
    using Counters for Counters.Counter;     // Counters 라이브러리의 모든 함수를 Counters.Counter 구조체에 attach 해준다.
    Counters.Counter private myID;           // Counters.Counter 구조체 자료형.

    function getCurrent() public view returns (uint256){
        return myID.current();
    }

    function increment() public {
        myID.increment();
    }

    function decrement() public {
        myID.decrement();
    }

    function reset() public {
        myID.reset();
    }
}
