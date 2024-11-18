// SPDX-License-Identifier: GPL-3.0

// Inheritance 예시.

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

}

contract Dog is Pet {

    // 부모 계약의 생성자 함수를 오버라이딩 하는 것은 불가능.
    // 하지만 부모 계약의 생성자 함수를 호출해서 사용하고 기능을 추가하는 것은 가능! 
    constructor (string memory _name, uint _age) Pet(_name, _age) {
    }

    function bark() public view returns (string memory){
        return string(abi.encodePacked(name," is a dog... barking..."));
    }
}

contract Cat is Pet {

    // 부모 계약의 생성자 함수를 오버라이딩 하는 것은 불가능.
    // 하지만 부모 계약의 생성자 함수를 호출해서 사용하고 기능을 추가하는 것은 가능! 
    constructor (string memory _name, uint _age) Pet(_name, _age) {
    }
    
    function meow() public view returns (string memory){
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
        return (dogs[_i].bark());
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
        return (cats[_i].meow());
    }
}

