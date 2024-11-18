// SPDX-License-Identifier: GPL-3.0

// 크라우드 펀딩을 위한 계약.

pragma solidity >=0.8.0 <0.9.0;

contract CrowdFunding {
    
    // 투자자 구조체.
    struct Investor {
        address addr;       // 투자자의 주소.
        uint amount;        // 투자 금액.
    }

    // State 변수 선언.
    address payable public owner;   // 계약의 소유자.
    uint public nInvestors; // 투자자의 수.
    uint public deadline;   // 데드라인 (Unix 타임).
    string public status;   // 모금 활통 상태.
    bool public ended;      // 모금 종료 여부.
    uint public goalAmount; // 목표 금액.
    uint public totalAmount;  // 총 투자액.

    mapping (uint => Investor ) public investors;   // 투자자 관리를 위한 매핑.

    // 사용자 정의 modifier.
    // 배포할 때 사용한 주소만 접근할 수 있음.
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    // 이벤트 정의.
    event FundraisingSuccessful(uint _amount);
    event Refund(address _addr, uint _amount);

    // 생성자.
    constructor (uint _duration, uint _goalAmount){
        owner = payable(msg.sender);              // 계약의 주인 주소 설정.
        deadline = block.timestamp + _duration;   // 데드라인 설정.   
        goalAmount = _goalAmount;
        status = "Funding";       
        ended = false;

        nInvestors = 0;                             // 투자자수 초기화.
        totalAmount = 0;                            // 총 모금액 초기화.
    }

    // 투자시 호출되는 함수.
    receive() external payable {
        require(!ended);                            // 모금이 끝나면 중단!
        Investor memory newInvestor = Investor(msg.sender, msg.value);    // 구조체를 사용해서 투자자 1명 생성.
        investors[nInvestors++] = newInvestor;      // 투자자 1명 추가해서 매핑에 기록!
        totalAmount += msg.value;                   // 총 모금액 증가.
    }

    // 목표액 달성여부 확인.
    // 모금 달성/실패 여부에 따라서 환불 진행.
    function checkGoalReached() public payable isOwner {
        require(!ended);                      // 모금이 끝나면 중단!

        require(block.timestamp >= deadline);  // 마감이 지나지 않았으면 중단!

        ended = true;
        if(totalAmount >= goalAmount){              // 모금 성공.
            status = "Fundraising was successful!";  
            // 계약의 주인에게 모든 금액 송금.
            owner.transfer(address(this).balance);
            emit FundraisingSuccessful(totalAmount);
        } else {                                    // 모금 실패.
            status = "Fundraising was failure!";
            for(uint i = 0; i< nInvestors; i++){    // 개개 투자자에게 환불 실시!
                payable(investors[i].addr).transfer(investors[i].amount);
                emit Refund(investors[i].addr, investors[i].amount);
            }
        }
    } // 함수 끝.

    // 잔여시간.
    function timeLeft() public view returns (uint){
        require(!ended);                      // 모금이 끝나면 중단!
        return deadline - block.timestamp; 
    }   

}  // 계약 끝.
