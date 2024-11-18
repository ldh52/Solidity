// SPDX-License-Identifier: GPL-3.0

// ERC-20 Token을 발행하고 faucet 역할을 한다. 
// OpenZeppelin 라이브러리 활용.

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";    // 기본 버전.
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // 최신 버전.

// _amount 단위 만큼의 토큰을 msg.sender에 발행한다.
// 1 단위 = 1*(10**decimals()) 최소 단위.

contract TokenFaucet is ERC20 {

    address public owner;

    constructor() ERC20("New Gureum Token", "NGTK") {    // 명칭과 심볼.
        uint _amount = 1000;                            // 초기 공급량 발행.
        _mint(msg.sender, _amount*10**uint(decimals()));
        owner = msg.sender;                             // Faucet의 주인주소.
    }

    function withdraw() public {
        uint _amount = 1;                                            // 공급량.
        require(msg.sender != owner, "The owner cannot withdraw!");  // Faucet 자신은 받아갈 수 없다.
        _transfer(owner, msg.sender, _amount*10**uint(decimals()) ); // 공급량 만큼 보냄. 
    }

    function refund() public {
        require(msg.sender != owner, "The owner cannot refund!");  // Faucet 자신은 refund 할 수 없다.
        uint _balance = balanceOf(msg.sender);                       // 호출자의 잔고.
        _transfer(msg.sender, owner, _balance );                     // 호출자의 잔고를 faucet에 돌려줌. 
    }
    
    function myBalance() public view returns (uint){
        return balanceOf(msg.sender);
    }
}
