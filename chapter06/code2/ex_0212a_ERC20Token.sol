// SPDX-License-Identifier: GPL-3.0

// ERC-20 표준을 따르는 Token 발행 예시 1.
// 직접 코딩하여 모든 함수들을 구현해 본다.

pragma solidity >=0.7.0 <0.9.0;

contract ERC20Token {
    string public name = "Gureum Token";     // 구름의 긴 이름.
    string public symbol = "GRC";	         // 심볼.
    uint8 private _decimals = 18;		     // 일반적인 설정.
    uint private _totalSupply;			     // 발행 갯수. 생성자 함수에서 설정될 예정.

    // 계정이 소유한 토큰수 데이터를 저장해 주는 매핑.    
    mapping (address => uint) balances;	

    // 토큰의 소유주 계정이 허락한 대리 계정과 허락된 최대 소비 금액을 나타내는 매핑.
    mapping(address => mapping(address=>uint256)) allowance;

    event Transfer(address indexed _from, address indexed _to, uint _tokens);             // 송금하면 발생하는 이벤트.
    event Approval(address indexed _tokenOwner, address indexed _spender, uint _tokens);  // 대리계정 허락하면 발생하는 이벤트.

    // 생성자 함수. totalSupply 초기화.
    // 모든 토큰은 생성자 함수를 호출한 사람 (msg.sender)에게 주어진다.
    constructor (uint _amount) {
        _totalSupply = _amount*(10**_decimals);			       // 발행 수량.
        balances[msg.sender] = _amount*(10**_decimals);		   // 모든 토큰은 msg.sender 소유!
    }

    // 소수점 이하 자리수.
    function decimals() public view returns(uint){
        return _decimals;
    }
	
    // 유통되는 토큰 수량.
    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }

    // "tokenOwner"가 소유한 토큰수량.
    // 어느 누구도 실행해 볼 수 있다.
    function balanceOf(address _tokenOwner) public view returns (uint){
        return balances[_tokenOwner];
    }

    // 토큰을 송금해 주는 함수.
    // 호출한 사람의 계정에서 다른 계정으로 토큰의 소유권 이전.
    // "Transfer" 이벤트 발생.
    function transfer(address _to, uint _tokens) public returns (bool){
        balances[msg.sender] -= _tokens;             // 보내는 쪽 잔고 업데이트.      
        balances[_to] += _tokens;                    // 받는 쪽 잔고 업데이트.
        emit Transfer(msg.sender, _to, _tokens);     // 이벤트 발생.
        return true;
    }


    // 대리인이 토큰을 소유주 대신해서 송금해 주는 함수.
    // "Transfer" 이벤트 발생.
    function transferFrom(address _from, address _to, uint _tokens) public returns (bool){
        balances[_from] -= _tokens;                      // 보내는 쪽 잔고 업데이트
        allowance[_from][msg.sender] -= _tokens;         // 허락된 대리 소비량 감소.
        balances[_to] += _tokens;                        // 받는 쪽 잔고 업데이트.
        emit Transfer(_from, _to, _tokens);	             // 이벤트 발생.
        return true;
    }

    // 대리인이 대신해서 송금 할 수 있도록 토큰 소유주의 허락을 기록해 주는 함수. 
    function approve(address _spender, uint _tokens) public returns (bool){
        allowance[msg.sender][_spender] = _tokens;                // 대리해서 소비할 수 있는 최대 금액 설정.   
        emit Approval(msg.sender, _spender, _tokens);             // 이벤트 발생.
        return true;
    }

} 

