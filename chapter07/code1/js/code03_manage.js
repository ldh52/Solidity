//
// MetaMask를 통해서 로그인 된 계정이 소유중인 NFT를 관리한다.
//

// 모든 정보를 보관해 주는 객체.
let App = {
    // Web3 객체 변수.
    web3: null,

    // 배포된 계약의 ABI.
    contractABI : null,

    // 배포된 계약의 주소.
    contractAddress : '', 

    // 계약 객체.
    myContract : null,

    // 계약 호출자 (토큰 요청자)의 주소.
    senderAddress : null,

    // 블록체인에 연결해 주는 함수.
    initWeb3: function() {
        if( typeof web3 !== 'undefined') {
            console.log('Web3 불러왔습니다.')
            window.ethereum.request({ method: 'eth_requestAccounts' })      // 사이트에 계정이 연결되어 있지 않으면 연결 신청!
            if( window.ethereum.isMetaMask ){                              
                this.web3 = new Web3(window.ethereum)                           // MetaMask를 통해서 Web3를 제공 받음.               
                console.log('MetaMask 준비됨.')                                 // 모든 준비 완료.
            } else {
                console.log('MetaMask 사용 불가.') 
            }
        } else {
            console.log('오류! Web3를 불러 올수 없습니다.') 
        }
    },

    // 계약 객체를 생성해 주는 함수.
    initContract: function() {
        this.myContract = new this.web3.eth.Contract(this.contractABI, this.contractAddress)
    },

    // 요청자의 주소 기록 및 출력.
    initSender: async function() { 
        this.senderAddress = (await this.web3.eth.getAccounts())[0] 
    },    
 
    // 내가 가지고 있는 NFT 세부 정보를 가져다 카드들을 refresh 해주는 함수.
    showMyCards : async function() {
        let id, ipfsURI, price
        let json, imgURL
        let name = await this.myContract.methods.name().call()
        try{
            // 지금 계정이 소유하고 있는 NFT가 없다면 require() 오류가 발생한다.
            // Solidity contract 에서 발생하는 require() 오류이므로 이렇게 처리한다.
            ownersNFTInfo = await this.myContract.methods.getOwnersNFTInfo(this.senderAddress).call()  // 모든 NFT 정보.
        } catch {
            ownersNFTInfo = ''
        }
        let onSaleNFTs = await this.myContract.methods.getOnSaleNFTsInfo().call()                      // 판매중인 NFT의 id.
        let cardTemplate = $('#cardTemplate')                   // 카드 템플레이트 가져오기.
        for (const x of ownersNFTInfo ){                        // 주의: 아래 await 때문에 forEach 사용 불가.
            id = x.ID
            ipfsURI = x.URI 
            price = x.price
            json = await fetchJSONIPFS(ipfsURI)
            imgURL = 'https://gateway.pinata.cloud/ipfs/' + json['image'].split('//')[1]
            //imgURL = 'https://ipfs.io/ipfs/' + json['image'].split('//')[1]
            console.log(imgURL)
            // 카드 내용 설정.
            cardTemplate.find('img').attr('src', imgURL)
            cardTemplate.find('#myTitle').find('span').text(name)
            cardTemplate.find('#myID').find('span').text(id)
            cardTemplate.find('#myPrice').find('span').text(price)
            cardTemplate.find('#myImgURL').text(imgURL)
            cardTemplate.find('#myDescription').text(json['description'])
            cardTemplate.find('#myOwnerAddress').text(App.senderAddress)

            // 카드 버튼 설정. 판매 중이 아닌 경우에만 보여준다.
            if (!isOnSale(onSaleNFTs, id)) {
                cardTemplate.find('#buttonSetSale').show()    //css({'display':'inline'})
            } else {
                cardTemplate.find('#buttonSetSale').hide()   //css({'display':'none'})
            }

            $('.row').append(cardTemplate.html())               // 준비된 카드 템플레이트 삽입!     
        
        } // for 끝.
    },

    // 계약에서 가격을 변경해 주는 함수.
    callSetPrice : async function() {
        let sent = submitPrice()
        // 다음 행 실행을 위해서는 충분한 gas비를 책정해야 한다!          
        await this.myContract.methods.setPrice(sent.id,sent.price).send({from:this.senderAddress, gas:300000})         
        // 현 페이지 refresh.
        location.reload();            
    },

    // 계약에서 NFT를 폐기해 주는 함수.
    callBurn : async function() {
        let id = submitBurn()
        // 다음 행 실행을 위해서는 충분한 gas비를 책정해야 한다!          
        await this.myContract.methods.burn(id).send({from:this.senderAddress, gas:300000})         
        // 현 페이지 refresh.
        location.reload();            
    },

    // 계약에서 NFT를 판매등록해 주는 함수.
    callSetSale : async function() {
        let id = submitSetSale()
        // 다음 행 실행을 위해서는 충분한 gas비를 책정해야 한다!          
        await this.myContract.methods.setSale(id).send({from:this.senderAddress, gas:300000})         
        // 현 페이지 refresh.
        location.reload();            
    }

} // App의 끝.

async function fetchJSONIPFS(uri){
    let gateway_url = 'https://gateway.pinata.cloud/ipfs/' + uri.split('//')[1]
   // let gateway_url = 'https://ipfs.io/ipfs/' + uri.split('//')[1]    
    
    let res = await axios.get(gateway_url)
    return res['data']                  // 객체 반환.
}

// 개개 NFT의 세부 정보를 모달을 통해서 출력해 주는 함수.
function nftInfo(e) {
    let name = $(e.relatedTarget).parent().find('#myTitle').find('span').text()   
    let id = $(e.relatedTarget).parent().find('#myID').find('span').text()                  
    let price = $(e.relatedTarget).parent().find('#myPrice').find('span').text()    // 모달을 호출한 카드의 price 값!
    let url = $(e.relatedTarget).parent().find('#myImgURL').text()
    let description = $(e.relatedTarget).parent().find('#myDescription').text()
    let ownerAddress = $(e.relatedTarget).parent().find('#myOwnerAddress').text()
    $(e.currentTarget).find('#title').val(name)   
    $(e.currentTarget).find('#img').attr('src', url)   
    $(e.currentTarget).find('#id').val(id)                           // ID.
    $(e.currentTarget).find('#priceInfo').val(price)                 // price.
    $(e.currentTarget).find('#description').val(description)         // description.
    $(e.currentTarget).find('#ownerAddress').val(ownerAddress)       // 소유자 주소.
}

// 개개 NFT의 가격 정보를 모달을 통해서 출력해 주는 함수.
function priceInfo(e) {
    let id = $(e.relatedTarget).parent().find('#myID').find('span').text()                  
    let price = $(e.relatedTarget).parent().find('#myPrice').find('span').text()   // 모달을 호출한 카드의 price 값! 
    $(e.currentTarget).find('#myID').val(id)                           // ID.
    $(e.currentTarget).find('#oldPrice').val(price)                    // 기존의 price.
    $(e.currentTarget).find('#newPrice').val(price)                    // 새로운 price의 초기값.    
}

// 폐기될 NFT의 정보를 모달을 통해서 출력해 주는 함수.
function burnInfo(e) {
    let id = $(e.relatedTarget).parent().find('#myID').find('span').text()                  
    $(e.currentTarget).find('#myID').val(id)                           // ID.  
}

// 판매등록될 NFT의 정보를 모달을 통해서 출력해 주는 함수.
function setSaleInfo(e) {
    let id = $(e.relatedTarget).parent().find('#myID').find('span').text()                  
    $(e.currentTarget).find('#myID').val(id)                           // ID.  
}

// 보조함수.
function isOnSale(onSaleNFTs, id) {
    let res = false
    for (const item of onSaleNFTs){
        if (item[0] == id){
            res = true
        }
    }
    return res
}

function submitPrice(){
    let id = $('#myModalChangePrice').find('#myID').val()                       // 모달창이 품고 있던 ID.
    let price = parseInt($('#myModalChangePrice').find('#newPrice').val())       // 모달창이 품고 있더 가격.
    $('#myModalChangePrice').find('#myID').val(0)                // 리셋!
    $('#myModalChangePrice').find('#oldPrice').val(0)            // 리셋!
    $('#myModalChangePrice').find('#newPrice').val(0)            // 리셋!
    $('#myModalChangePrice').modal('hide')                       // 모달창을 숨기다.
    console.log(`ID = ${id}는 ${price} Wei로 가격이 변경됩니다!`)
    return { 'id':id, 'price':price}
}

function submitBurn(){
    let id = $('#myModalBurn').find('#myID').val()                       // 모달창이 품고 있던 ID.
    console.log(`ID = ${id}가 폐기 됩니다!`)
    return id
}

function submitSetSale(){
    let id = $('#myModalSetSale').find('#myID').val()                       // 모달창이 품고 있던 ID.
    console.log(`ID = ${id}가 판매등록 됩니다!`)
    return id
}

//
// 문서가 ready 하면 실행.
//
$(function(){
    App.contractAddress = contractAddress   // 계약의 주소 등록.
    App.contractABI = contractABI           // 계약의 ABI 등록.

    App.initWeb3()                      // Web3 초기화.
    if(App.web3){                       // Web3 객체화 성공인 경우에만 다음 실행.
        App.initContract()              // 계약 객체 생성.
        App.initSender()                // 요청자의 주소 기록.
        App.showMyCards()

        // confirmPrice 버튼 클릭 이벤트.
        $('#confirmPrice').on('click', function(){
            App.callSetPrice()   
        }) 

        // confirmBurn 버튼 클릭 이벤트.
        $('#confirmBurn').on('click', function(){
            App.callBurn()   
        }) 

        // confirmSetSale 버튼 클릭 이벤트.
        $('#confirmSetSale').on('click', function(){
            App.callSetSale()   
        }) 

        // myModalInfo 모달이 보여지는 이벤트.
        $('#myModalInfo').on('shown.bs.modal', async function(e){
            nftInfo(e)
        })

        // myModalChangePrice 모달이 보여지는 이벤트.
        $('#myModalChangePrice').on('shown.bs.modal', async function(e){
            priceInfo(e)
        })

        // myModalBurn 모달이 보여지는 이벤트.
        $('#myModalBurn').on('shown.bs.modal', async function(e){
            burnInfo(e)
        })

        // myModalSetSale 모달이 보여지는 이벤트.
        $('#myModalSetSale').on('shown.bs.modal', async function(e){
            setSaleInfo(e)
        })

        // MetaMask에서 새로운 주소 선택 이벤트.             
        window.ethereum.on('accountsChanged', function() {          
          location.reload()             // 현 페이지 refresh.    
        })
    }
});

