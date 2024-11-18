// SPDX-License-Identifier: GPL-3.0

// EOA (개인계정)에 송금하는 방법 예시.
// CA를 통해서 송금.
// EOA가 Transaction 시작 -> CA -> EOA.

pragma solidity >=0.7.0 <0.9.0;

contract PayToEOA {

    event PaymentSuccessful(uint _amount);
    
    function sendTo(address payable _to) public payable{
        bool result = _to.send(msg.value);                           // 결과를 반환값으로 돌려줌!
        require(result,"Send function failed.");
        emit PaymentSuccessful(msg.value);
    }
    
    function transferTo(address payable _to) public payable{
        _to.transfer(msg.value);
        emit PaymentSuccessful(msg.value);
    }

    // 버전 0.7 이후를 전제한다.    
    function callTo(address payable _to) public payable{
        (bool result, ) = _to.call{value: msg.value , gas:2000}("");
        require(result, "Call function failed.");
        emit PaymentSuccessful(msg.value);
    }
}