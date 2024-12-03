// SPDX-License-Identifier: GPL-3.0

// ERC-721 표준을 따르는 Token의 거래 장터 구현을 위한 계약.
// OpenZeppelin 라이브러리 활용.

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; 
//import "@openzeppelin/contracts/utils/Counters.sol";                                      // 최신 버전. 
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.5/contracts/utils/Counters.sol";

contract NFTMarketPlace is ERC721Enumerable {
    using Counters for Counters.Counter;         // Counters 라이브러리의 모든 함수를 Counters.Counter (struct)에 attach 해준다.
    Counters.Counter private _tokenIds;          // Counters.Counter 변수 생성. 매회 ID를 새롭게 만들어주는 "객체" 역할을 한다.
    
    mapping(uint => string) private _tokenURIs;          // IPFS URI를 기록해 주는 매핑.
    mapping(uint => uint) private _nftPrices;            // NFT ID => 판매가격을 대입해 주는 매핑.
    uint[] private onSaleArray;                          // 판매용으로 등록된 NFT의 ID 목록을 저장해 주는 배열.

    struct NFTinfo {                                     // 판매용으로 등독된 NFT의 모든 정보 (ID, URI, price)를 한개의 객체로 만들어 줄 구조체.
        uint ID;
        string URI ;
        uint price ;        
    }

    // 생성자 함수.
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    // 특정 ID와 연계된 JSON의 IPFS URI를 반환해 준다. 
    // 오버라이딩 필요.
    function tokenURI(uint _tokenID) override public view returns (string memory) {
        return _tokenURIs[_tokenID] ;
    }

    // 누구나 새로운 토큰을 _awardee에게 발행할 수 있다.
    // _tokenURI는 "ipfs://메타데이터의 CID"와 같다.
    // 새롭게 발행된 토큰의 ID가 반환된다.
    function mintNFT(address _awardee, string memory _tokenURI) public returns (uint)
    {
        uint _newTokenId = _tokenIds.current();          // 새롭게 생성된 현재의 토큰 ID.
        _tokenURIs[_newTokenId] = _tokenURI;             // 새로운 토큰 ID를 key로, 토큰 URI를 value로 하는 짝을 매핑에 등록.          
        _mint(_awardee, _newTokenId);                    // 토큰 발행.
        _tokenIds.increment();                           // 토큰 ID를 1 증가시킨다.
        return _newTokenId;
    }
 
    // 특정 ID에 해당하는 NFT를 폐기해 주는 함수. 
    // 현 소유자만 호출할 수 있다.
    function burn(uint _tokenID) public{
        address owner = ownerOf(_tokenID);                              // 소유자의 주소. 
        require(owner == msg.sender, "Caller is not the NFT owner.");   // 소유자 확인.
        _burn(_tokenID);                                                // 토큰 폐기.
        removeFromSale(_tokenID);                                       // NFT를 판매 목록에서 제거해 준다. 
        _nftPrices[_tokenID] = 0;                                       // 가격도 0으로 리셋.
    }

    // 특정 소유자가 가지고 있는 모든 NFT들의 정보를 구조체 배열의 형태로 반환해 주는 함수.
    function getOwnersNFTInfo(address _owner) view public returns (NFTinfo[] memory) {
        uint _count = balanceOf(_owner);                         // 특정 NFT 소유자의 잔고.
        require(_count > 0, "Owner has no NFT.");                // 한개 이상 소유해야 한다. 

        NFTinfo[] memory _arr = new NFTinfo[](_count);           // NFTData 구조체를 원소로 하는 동적 배열. 반환될 배열. 필요한 만큼의 길이를 확보해 놓는다.

        for(uint i = 0; i < _count; i++) {                  
            uint _id = tokenOfOwnerByIndex(_owner, i);            // 소유자의 i 번째 NFT의 ID를 가져온다. ERC721Enumerable의 tokenOfOwnerByIndex() 함수 사용!
            string memory _uri = tokenURI(_id);                   // ID를 사용해서 URI를 가져온다. 
            uint _price = _nftPrices[_id];                        // ID를 사용해서 판매중인 특정 토큰의 등록된 가격을 가져온다.
            _arr[i] = NFTinfo(_id , _uri, _price );               // NFT의 ID, URI, Price를 하나의 구조체로 만들어서 반환될 배열에 원소로 입력한다.
        }
        return _arr;                                                // 배열 반환.
    }

    // 특정 ID의 NFT의 가격을 설정한다.
    // 소유자 만이 이 함수를 호출할 수 있다.
    function setPrice(uint _tokenID, uint _price) public {
        require(ownerOf(_tokenID) == msg.sender, "Caller is not the NFT owner.");       // 소유자 확인!
        require(_price > 0, "Invalid price.");                                          // 새로운 가격은 0 보다 커야 한다.
        _nftPrices[_tokenID] = _price;                                                  // 새로운 가격 등록.
    }

    // 특정 ID의 NFT를 판매용으로 등록해 준다. 
    // 소유자 만이 이 함수를 호출할 수 있다. 
    // 주의: 폐기 또는 판매 이외의 경우 철회할 수 없다.
    function setSale(uint _tokenID) public {
        require(ownerOf(_tokenID) == msg.sender, "Caller is not the NFT owner.");       // 소유자 확인!
        require(_nftPrices[_tokenID] > 0, "Price is 0.");                               // 현재 가격이 0 보다 커야 한다.
        if ( !isApprovedForAll(msg.sender, address(this)) ){
            setApprovalForAll(address(this), true);                                     // 계약 계정을 reseller로 등록한다. 주의: msg.sender는 owner인 상태.
        }
        onSaleArray.push(_tokenID);                                                     // 판매중 NFT 목록 배열에 ID 삽입.
    }

    // 판매용으로 등록된 모든 NFT들의 정보를 구조체 배열의 형태로 반환해 주는 함수.
    function getOnSaleNFTsInfo() public view returns (NFTinfo[] memory ){
        uint _length = onSaleArray.length;                                      // Storage 배열인 onSaleArray를 참고할 예정.
        NFTinfo[] memory _arr = new NFTinfo[](_length);

        for(uint i = 0; i < _length; i ++){
            uint _id = onSaleArray[i];                                           // onSaleArray에서 ID를 가져온다.
            uint _price = _nftPrices[_id];                                       // 판매중인 특정 토큰의 등록된 가격을 가져온다.
            _arr[i] = NFTinfo(_id, tokenURI(_id), _price);                       // NFT의 ID, URI, price를 하나의 구조체로 만들어서 반환될 배열에 원소로 입력한다
        }
        return _arr;                                                             // 정보 배열 반환.
    }

    // NFT 구매 함수.
    // 소유자가 아닌사람이 정확한 금액을 보내야만 제대로 작동한다.
    function buyNFT(uint _tokenID) public payable {
        uint price = _nftPrices[_tokenID];                                      // 토큰의 등록된 가격을 가져온다. 주의: 판매중이 아니면 price = 0 이다!
        address owner = ownerOf(_tokenID);                                      // NFT의 소유자 주소.

        require(price > 0, "NFT token not for sale.");                          // 판매중이 아니면 price = 0 이므로 확인한다.
        require(price == msg.value, "Price missmatch!");                        // 보낸 금액이 가격과 맞는지 확인한다. 
        require(owner != msg.sender, "Buyer cannot be the NFT owner.");         // NFT의 소유자가 구매자가 될 수는 없다.
        require(isApprovedForAll(owner, address(this)), "The NFT owner did not approve this reseller.");    // 소유자가 본 계약을 reseller (operator)로 허락한 상태여야 한다. 참고: setApprovalForAll().

        payable(owner).transfer(msg.value);                                     // NFT의 소유자에게 대금을 토스해 준다.
        IERC721(address(this)).safeTransferFrom(owner, msg.sender, _tokenID);   // NFT 소유자 변경 기록. IERC721() 필요 주의! 
        removeFromSale(_tokenID);                                               // 판매된 NFT를 판매 목록에서 삭제한다. 새 주인은 새롭게 판매 등록을 해야한다.
    }

    // 판매 또는 폐기된 NFT를 판매 목록 배열에서 제거해 주는 함수.
    // 주의: 계약 안에서는 아무나 호출할 수 있다.
    function removeFromSale(uint _tokenID) private {
        uint _length = onSaleArray.length;                              // 판매 목록 길이.
        for(uint i = 0; i<_length; i ++){                               // 판매중인 NFT의 ID를 저장한 배열을 순회하는 반환문. 
            if(onSaleArray[i] == _tokenID ){                            // 제거할 NFT 검출. 
                onSaleArray[i] = onSaleArray[_length - 1];              // 판매 목록 배열의 마지막 원소를 현 위치로 땡겨온다.
                onSaleArray.pop();                                      // 이후 판매 목록 배열의 마지막 원소는 폐기한다.
            }
        }
    }

}