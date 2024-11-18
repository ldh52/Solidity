// SPDX-License-Identifier: GPL-3.0

// Overriding 예시 1.

pragma solidity >=0.7.0 <0.9.0;

contract Pet {
    string internal name;    // 자식 계약에서 접근 가능!
    uint internal age;         // 자식 계약에서 접근 가능!
    constructor(string memory _name, uint _age){
        name = _name;
        age = _age;
    }

    function getProperties() public view returns (string memory, uint){
        return (name, age);
    }

    function sound() public view virtual returns (string memory){              // 버추얼 함수.
        return "...";
    }

}

contract Dog is Pet {

    constructor (string memory _name, uint _age) Pet(_name, _age) {
    }

    function sound() public view override returns (string memory){         // 오버라이딩.
        return string(abi.encodePacked(name," is a dog... barking..."));
    }
}

// 실제로 전개될 계약.
contract TestInstance {
    Dog[] dogs;
    uint counter = 0;

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
        return (dogs[_i].sound());         // sound 함수 호출!
    }

}