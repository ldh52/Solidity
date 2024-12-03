// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract PetAdoption {

    struct Adopter {
        address addr;
        string name;
        string contact;
    }

    mapping (uint => Adopter) public adopterInfo;
    address payable public owner;				// 본 계약을 배포한 사람 즉 "주인". 송금을 받을 대상이므로 address payable.
    address[100] public adopters;			       // Storage 정적 배열. 최대 100마리 까지.

    modifier isOwner {
        require(msg.sender == owner, "Not the owner!");     // 호출자가 owner가 아니면 오류 발생.
    _;				             // 이후 함수 실행.
    }

    event PetAdopted(address _adopterAddress, uint _id);

    constructor() {
        owner = payable(msg.sender);            // address payable로 변환 후 대입!
    }

    // 입양을 처리해 주는 함수.
    function adoptPet(uint _id, string memory _name, string memory _contact) public payable {
        require( _id >= 0 && _id < 100);
        adopters[_id] = msg.sender;
        adopterInfo[_id] = Adopter(msg.sender, _name, _contact);

        owner.transfer(msg.value);			    // 계약 소유자에게 받은 금액 송금.
        emit PetAdopted(msg.sender, _id);		// 이벤트 기록.
    }

    // 개개 입양자의 세부 정보를 반환해 주는 함수. 읽기 전용 함수.
    function getAdopterInfo(uint _id) public view returns (address, string memory, string memory) {
        Adopter memory adopter = adopterInfo[_id];
        return (adopter.addr, adopter.name, adopter.contact);
    }

    // 모든 입양자의 주소를 반환해 주는 함수. 읽기 전용 함수.
    function getAllAdopters() public view returns (address[100] memory) {
        return adopters;
    }

    // 모든 기록을 리셋해줌. 계약의 주인만 가능!
    // 많은 gas 비용이 소요됨. 테스트 용도로만 사용!
    // Owner만 호출 가능!
    function deleteAll() public isOwner {
        // mapping은 하나씩 클리어 해 주어야 한다.
        for (uint i; i<100; i++){
            delete adopterInfo[i];
        }
        // 배열은 한번에 모든 내용을 클리어 할 수 있다!
        delete adopters;
    }

}
    
    


