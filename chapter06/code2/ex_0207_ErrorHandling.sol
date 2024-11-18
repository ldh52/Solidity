// SPDX-License-Identifier: GPL-3.0

// 오류 처리 예시.

pragma solidity >=0.7.0 <0.9.0;

contract ErrorHandling {

    uint public age = 0;

    function testRequire(uint _age) public {
        age = _age; 
        require(_age >= 20, "Age must be larger or equal than 20.");
    }

    function testRevert(uint _age, bool _registered ) public {
        age  = _age;
        if (_age < 20 || ! _registered) {
            revert("You have be at least 20 years old and registered.");
        }
    }

    function testAssert(uint _age) public {
        age = _age;
        assert(_age >=20);
    }

} 