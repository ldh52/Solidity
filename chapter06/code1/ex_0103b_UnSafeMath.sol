// SPDX-License-Identifier: GPL-3.0

// 오버플로우/언더플로우 공격 대상 계약.

pragma solidity 0.7.0;              // 0.8.0 이상에서는 문제 없다!

contract UnSafeMath {
    uint8 public balance;

    function decrease() public {
        balance--;
    }

    function increase() public {
        balance++;
    }
}