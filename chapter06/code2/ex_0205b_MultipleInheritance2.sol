// SPDX-License-Identifier: GPL-3.0

// 다중 상속 예시 2.

pragma solidity >=0.7.0 <0.9.0;

// 전개 필요 없는 계약.
contract AccountA {
    uint private balance = 100;
    function getBalance() public view virtual returns (uint) {	             
        return balance;
    }
}

// 전개 필요 없는 계약.
contract AccountB {
    string private name = "John";
    function getName() public view virtual returns (string memory) {	
        return name;
    }
}

// 전개될 계약.
contract DerivedAccount is AccountA, AccountB {		    // 다중 상속.
    // 오버라이딩은 옵션.

    // getBalance는 오버라이드 해본다.
    function getBalance() public view override returns (uint) {	             
        uint balance = AccountA.getBalance();
        balance /= 100;
        return balance;
    }

    // getName은 오버라이드 하지 않는다.
}