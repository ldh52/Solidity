// SPDX-License-Identifier: GPL-3.0

// ERC-20 표준을 따르는 Token 발행 예시 2.
// OpenZeppelin 라이브러리 활용.

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";  // 기본 버전.
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";                                                     // 최신 버전.

// _amount 단위 만큼의 토큰을 msg.sender에 발행한다.
// 1 단위 = 1*(10**decimals()) 최소 단위.

contract ERC20TokenOZ is ERC20 {
    constructor(string memory _name, string memory _symbol, uint _amount) ERC20(_name, _symbol) {
        _mint(msg.sender, _amount*10**uint(decimals()));
    }
}