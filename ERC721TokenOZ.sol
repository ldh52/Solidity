// SPDX-License-Identifier: GPL-3.0

// ERC-721 표준을 따르는 Token 발행 예시.
// OpenZeppelin 라이브러리 활용.

pragma solidity ^0.8.0;      //    버전 주의!!

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/ERC721.sol";   // 기본 버전.
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";   // 기본 버전.
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";                                 // 최신 버전.
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";            // 최신 버전. 
//import "@openzeppelin/contracts/utils/Counters.sol";                                      // 최신 버전. 
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.5/contracts/utils/Counters.sol";

contract ERC721TokenOZ is ERC721URIStorage {
    using Counters for Counters.Counter;         // Counters 라이브러리의 모든 함수를 Counters.Counter (struct)에 attach 해준다.
    Counters.Counter private _tokenIds;          // Counters.Counter 변수 생성. 매회 ID를 새롭게 만들어주는 "객체" 역할을 한다.
    
    // 생성자 함수.
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    // 누구나 새로운 토큰을 _awardee에게 발행할 수 있다.
    // _tokenURI는 "ipfs://메타데이터의 CID"와 같다.
    // 새롭게 발행된 토큰의 ID가 반환된다.
    function mintNFT(address _awardee, string memory _tokenURI) public returns (uint)
    {
        uint _newItemId = _tokenIds.current();          // 새롭게 생성된 현재의 토큰 ID.
        _mint(_awardee, _newItemId);                    // 토큰 발행.
        _setTokenURI(_newItemId, _tokenURI);            // 새로운 토큰 ID를 key로, 토큰 URI를 value로 하는 짝을 매핑에 등록.          
        _tokenIds.increment();                          // 토큰 ID를 1 증가시킨다.
        return _newItemId;
    }

    // 특정 ID에 해당하는 NFT를 폐기해 주는 함수. 
    // 현 소유자만 호출할 수 있다.
    function burn(uint _tokenID) public{
        address owner = ownerOf(_tokenID);                              // 소유자의 주소. 
        require(owner == msg.sender, "Caller is not the NFT owner.");   // 소유자 확인.
        _burn(_tokenID);                                                // 내장 함수.
    }

}
