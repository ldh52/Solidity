// SPDX-License-Identifier: GPL-3.0

// 다중 상속 예시 1.

pragma solidity >=0.7.0 <0.9.0;

// 전개 필요 없는 계약.
contract AccountA {
    uint private balance = 100;
    function getBalance() public view virtual returns (uint) {	// 오버라이딩 될 함수.
        return balance;
    }
}

// 전개 필요 없는 계약.
contract AccountB {
    uint private balance = 200;
    function getBalance() public view virtual returns (uint) {	// 오버라이딩 될 함수.
        return balance;
    }
}

// 전개될 계약.
contract DerivedAccount is AccountA, AccountB {		                                   // 다중 상속.
    function getBalance() public view override(AccountA, AccountB) returns (uint) {    // 오버라이딩.
        uint sum = AccountA.getBalance() + AccountB.getBalance();	       
        return sum;			
    }
}