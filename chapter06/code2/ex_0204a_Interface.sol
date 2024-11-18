// SPDX-License-Identifier: GPL-3.0

// Interface 예시.

pragma solidity >=0.7.0 <0.9.0;

interface Pet {
    function getProperties() external view returns (string memory, uint);   // 추상 함수.
    function sound() external view returns (string memory);                  // 추상함수.
}

contract Dog is Pet {
    string private name;
    uint private age;
 
    constructor (string memory _name, uint _age) {
        name = _name;
        age = _age;
    }

    // 함수 구현.
    function getProperties() public view override returns (string memory, uint){
        return (name, age);
    }

    // 함수 구현.
    function sound() public view override returns (string memory){
        return string(abi.encodePacked(name," is a dog... barking..."));
    }
}

contract Cat is Pet {
    string private name;
    uint private age;
 
    constructor (string memory _name, uint _age) {
        name = _name;
        age = _age;
    }

    // 함수 구현.
    function getProperties() public view override returns (string memory, uint){
        return (name, age);
    }

    // 함수 구현.
    function sound() public view override returns (string memory){
        return string(abi.encodePacked(name," is a cat... meowing..."));
    }
}

// 실제로 전개될 계약.
contract TestInstance {
    Dog[] dogs;
    Cat[] cats;
    uint counterDog = 0;
    uint counterCat = 0;

    function addDog(string memory _name, uint _age) public {
        Dog dog = new Dog(_name, _age);
        dogs.push(dog);
        counterDog++;
    }

    function getDog(uint _i) public view returns (string memory, uint){
        require(_i < counterDog, "Index out of bounds!");
        return (dogs[_i].getProperties());
    }

    function bark(uint _i) public view returns (string memory){
        require(_i < counterDog, "Index out of bounds!");
        return (dogs[_i].sound());
    }

    function addCat(string memory _name, uint _age) public {
        Cat cat = new Cat(_name, _age);
        cats.push(cat);
        counterCat++;
    }

    function getCat(uint _i) public view returns (string memory, uint){
        require(_i < counterCat, "Index out of bounds!");
        return (cats[_i].getProperties());
    }

    function meow(uint _i) public view returns (string memory){
        require(_i < counterCat, "Index out of bounds!");
        return (cats[_i].sound());
    }
}



