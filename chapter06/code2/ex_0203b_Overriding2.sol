// SPDX-License-Identifier: GPL-3.0

// Overriding 예시 2.

pragma solidity >=0.7.0 <0.9.0;

// 전개할 필요 없는 계약.
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

    function talk() public view virtual returns (string memory){              // 최상위 버추얼 함수.
        return string(abi.encodePacked(name," is a pet."));
    }

}

// 전개할 필요 없는 계약.
contract Dog is Pet {

    constructor (string memory _name, uint _age) Pet(_name, _age) {
    }

    function talk() public view virtual override returns (string memory){     // 중간의 버추얼, 오버라이드 함수.
        return string(abi.encodePacked(name," is a dog."));
    }
}

// 전개할 필요 없는 계약.
contract ShiTzu is Dog {

    constructor (string memory _name, uint _age) Dog(_name, _age) {
    }

    function talk() public view override returns (string memory){         // 최하위 오버라이딩.
        return string(abi.encodePacked(name," is a shitzu."));
    }
}

// 실제로 전개될 계약.
contract TestInstance {
    Pet aPet = new Pet("NingNing", 3);
    Dog aDog = new Dog("Baduk", 5);
    ShiTzu aShiTzu = new ShiTzu("Ruby", 11);

    function talkPet() public view returns (string memory){
        return (aPet.talk());         // talk 함수 호출!
    }

    function talkDog() public view returns (string memory){
        return (aDog.talk());         // talk 함수 호출!
    }

    function talkShiTzu() public view returns (string memory){
        return (aShiTzu.talk());      // talk 함수 호출!
    }

}