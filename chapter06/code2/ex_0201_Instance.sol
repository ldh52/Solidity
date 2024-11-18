// SPDX-License-Identifier: GPL-3.0

// Instance 예시.

pragma solidity >=0.7.0 <0.9.0;

// 전개 불필요.
contract Dog {
    string private name;                   // "멤버 속성"의 역할. 
    uint private age;                       // "멤버 속성"의 역할.
    constructor(string memory _name, uint _age){
        name = _name;
        age = _age;
    }

    function getProperties() public view returns (string memory, uint){
        return (name, age);
    }

    function bark() public view returns (string memory){
        return string(abi.encodePacked(name," is barking... mung.. mung.."));
    }

}

// 실제로 전개될 계약.
contract TestInstance {
    Dog[] dogs;
    uint private counter = 0;

    function addDog(string memory _name, uint _age) public {
        Dog dog = new Dog(_name, _age);
        dogs.push(dog);
        counter++;
    }

    function getDog(uint _i) public view returns (string memory, uint){
        require(_i < counter, "Index out of bounds!");
        return (dogs[_i].getProperties());
    }

    function bark(uint _i) public view returns (string memory){
        require(_i < counter, "Index out of bounds!");
        return (dogs[_i].bark());
    }

    function getCounter() public view returns(uint){
	return counter;
    }
}
