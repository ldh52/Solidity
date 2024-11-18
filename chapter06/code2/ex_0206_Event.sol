// SPDX-License-Identifier: GPL-3.0

// 경매와 Event 예시.

pragma solidity >=0.7.0 <0.9.0;

contract BiddingEvent {
    uint endingTime;                    // 시간을 나타내는 state 변수. 주의: unit 자료형 사용.
    
    // 구조체.
    struct Bidder {
        address _address;
        string _name;
        uint _price;
    }

    Bidder public highestBidder;		// 최고가를 제시한 bidder 정보를 담은 state 변수.
	
    // 경매 관련 Event 정의.
    event NewHighPrice (address indexed who, string name, uint howmuch);       // 최고가 경신.

    // 정해진 시간 동안에만 경매 진행.
    modifier timeOut {
        if (block.timestamp < endingTime) {
            _;
        } else {
            revert();  //오류 발생.
        }
    }

    // 경매 시작할 때 초기값 설정.
    constructor() {
        highestBidder._price = 1 ether;                     // 최저 호가 > 1 ether.
        endingTime = block.timestamp + 1 minutes;   // 경매 끝나는 시간. 지금부터 1분 후.
    }

    // Ether를 받는 함수이므로 payable 함.
    // 정해진 시간 안에만 새로운 경매가를 받음. 
    function bid(string memory _name ) public payable timeOut {
        if (msg.value > highestBidder._price)  {     // 최고가 경신?
            highestBidder._address = msg.sender;	 // 주소 등록.
            highestBidder._name = _name;             // 이름 등록.
            highestBidder._price = msg.value;        // 금액 등록.
            emit NewHighPrice(msg.sender, _name, msg.value);   // 이벤트 출력!
        } else {                                     // 현 최고가 이하를 제시함.
            revert("Bid not accepted!!!");           // 오류! 받은 금액 되돌려줌.
        }
    } 

    function timeRemaining() public view returns (uint) {
        if (endingTime >= block.timestamp) {
            return endingTime - block.timestamp; 
        } else {
            return 0;
        }
    }

}     // BiddingEvent 계약 종료.