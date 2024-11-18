// SPDX-License-Identifier: GPL-3.0

// CA (계약 계정)에 송금하는 방법 예시.
// CA를 통해서 송금.
// EOA가 Transaction 시작 -> CA -> CA -> EOA.

pragma solidity >=0.7.0 <0.9.0;

// 배포되는 계약.
contract ReceiverContract {

    address payable public owner;
    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier ownerOnly {
        require(msg.sender == owner, "You are not the owner of the contract." ); 
            _;             // 이후 함수 실행.
    }

    event BalanceBefore(address _sender, uint _currentBalance);      // 송금 전의 계정, 잔고 이벤트.
    event BalanceAfter(address _sender, uint _currentBalance);       // 송금 후의 계정, 잔고 이벤트.

    // 계약 계정의 소유자가 잔고를 인출할 때 사용하는 함수.
    function payToOwner(uint _amount) public payable ownerOnly {
        address _address = address(this);                  // 계약 계정의 주소.
        require(_address.balance >= _amount, "Not enough balance!");        // 잔고는 충분한가?
        emit BalanceBefore(_address, _address.balance);                     // 인출 전의 계약 계정의 잔고.
        owner.transfer(_amount);		                                    // 송금.
        emit BalanceAfter(_address, _address.balance);			// 인출 후의 계약 계정의 잔고.
    }

    // 계정의 잔고를 보고자 할 때 사용하는 함수.
    function showContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function showContractAddress() public view returns (address) {
        return address(this);
    }
 
    event GotPaid(address _from, uint _value, string _message);

    receive() external payable {                                            // 수금 함수.
        emit GotPaid(msg.sender, msg.value, "Just received Ether...");
    }
    
    /*
    fallback() external payable {                                          // 수금 함수 대체하는 fallback.
        emit GotPaid(msg.sender, msg.value, "Just received Ether...");
    }
    */

    /*
    function customReceive() external payable {                            // 커스텀 수금 함수.
        emit GotPaid(msg.sender, msg.value, "Just received Ether...");
    }
    */
}


// 배포되는 계약.
contract PayToCA {

    event PaymentSuccessful(uint _amount);
    
    // 계약에 송금하기 위한 gas 비가 2300을 초과해서 제대로 실행되지 않는다!
    function sendTo(address payable _to) public payable{
        bool result = _to.send(msg.value); 
        require(result,"Send function failed.");
        emit PaymentSuccessful(msg.value);
    }
    
    // 계약에 송금하기 위한 gas 비가 2300을 초과해서 제대로 실행되지 않는다!
    function transferTo(address payable _to) public payable{
        _to.transfer(msg.value);
        emit PaymentSuccessful(msg.value);
    }

    // 버전 0.7 이후를 전제한다.    
    function callTo(address payable _to) public payable{
        (bool result, ) = _to.call{value: msg.value }("");    // 가스비는 명시하지 않아서 필요한 만큼 사용되도록 한다!
    //    (bool result, ) = _to.call{value: msg.value }(abi.encodeWithSignature("customReceive()"));    // 가스비는 명시하지 않아서 필요한 만큼 사용되도록 한다!
        require(result, "Call function failed.");
        emit PaymentSuccessful(msg.value);
    }
}