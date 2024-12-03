//
// 판매중인 NFT를 리스팅 해주고 거래 장터 역할을 한다. 
//

// 모든 정보를 보관해 주는 객체.
let App = {
    // IPFS 관련 정보.
    // img : {
    //     url1 : 'https://api.pinata.cloud/pinning/pinFileToIPFS',       // 이미지 업로드 주소에 주의한다.
    //     url2 : 'https://api.pinata.cloud/pinning/pinJSONToIPFS',       // JSON 업로드 주소에 주의한다.
    //     myAPIKey : '',
    //     mySecretAPIKey : '',
    //     imgFile : null,
    //     imgFileName: '',
    //     imgCID : '',
    //     metaCID : '',
    //     metadata : {}
    // },

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
 
    // NFT 세부 정보를 가져다 카드들을 refresh 해주는 함수.
    refreshCards : async function() {
  
        let id, ipfsURI, price
        let json, imgURL
        let name = await this.myContract.methods.name().call()
        let ownersNFTInfo
        try{
            // 지금 계정이 소유하고 있는 NFT가 없다면 require() 오류가 발생한다.
            // Solidity contract 에서 발생하는 require() 오류이므로 이렇게 처리한다.
            ownersNFTInfo = await this.myContract.methods.getOwnersNFTInfo(this.senderAddress).call()  // 모든 NFT 정보.
        } catch {
            ownersNFTInfo = ''
        }
        let onSaleNFTs = await this.myContract.methods.getOnSaleNFTsInfo().call()                      // 판매중인 NFT의 id.
        let cardTemplate = $('#cardTemplate')                                                           // 카드 템플레이트 가져오기.
        let ownerAddresses = await getOnSaleOwnerAddresses(onSaleNFTs)  // Sale 중인 카드들의 주인.

        for (const x of onSaleNFTs ){                           // 주의: 아래 await 때문에 forEach 사용 불가.
            id = x[0]
            ipfsURI = x[1] 
            price = x[2]
            json = await fetchJSONIPFS(ipfsURI)
            imgURL = 'https://gateway.pinata.cloud/ipfs/' + json['image'].split('//')[1]
            //imgURL = 'https://ipfs.io/ipfs/' + json['image'].split('//')[1]

            // 카드 내용 설정.
            cardTemplate.find('img').attr('src', imgURL)
            cardTemplate.find('#myTitle').find('span').text(name)
            cardTemplate.find('#myID').find('span').text(id)
            cardTemplate.find('#myPrice').find('span').text(price)
            cardTemplate.find('#myImgURL').text(imgURL)
            cardTemplate.find('#myDescription').text(json['description'])
            cardTemplate.find('#myOwnerAddress').text(ownerAddresses[id])

            // 카드 버튼 설정. 판매 중이 아닌 경우에만 보여준다.
            if (!isOwner(ownersNFTInfo,id)) {
                cardTemplate.find('#buttonPurchase').show()   //css({'display':'inline'})
                cardTemplate.find('#buttonInfo').show()       //css({'display':'inline'})
            } else {
                cardTemplate.find('#buttonPurchase').hide()     //css({'display':'none'})
                cardTemplate.find('#buttonInfo').show()         //css({'display':'inline'})
            }

            $('.row').append(cardTemplate.html())               // 준비된 카드 템플레이트 삽입!     
        
        } // for 끝.                       
    },

    // 계약에서 NFT를 구매해 주는 함수.
    callBuyNFT : async function() {
        let { id, price } = submitPurchase()
        // 다음 행 실행을 위해서는 충분한 gas비를 책정해야 한다!          
        await this.myContract.methods.buyNFT(id).send({from:this.senderAddress, gas:300000, value: price})         
        // 현 페이지 refresh.
        location.reload();            
    }
    
} // App의 끝.

// 보조함수.
function isOwner(ownersNFTInfo, id) {
    let res = false
    for (const item of ownersNFTInfo){
        if (item.ID == id){
            res = true
        }
    }
    return res
}

function submitPurchase(){
    let id = $('#myModalPurchase').find('#id').val()                       // 모달창이 품고 있던 ID.
    let price = parseInt( $('#myModalPurchase').find('#priceInfo').val() ) // 모달창이 품고 있던 price.
    console.log(`ID = ${id}를 가격 ${price} Wei에 구매합니다!`)
    return { 'id' : id, 'price': price}
}

async function getOnSaleOwnerAddresses(onSaleNFTs){
    res = {}
    for (const x of onSaleNFTs ){                        // 주의: 아래 await 때문에 forEach 사용 불가.
        id = x[0]
        res[id] = await App.myContract.methods.ownerOf(id).call()  
    } // for 의 끝
    return res
}

async function fetchJSONIPFS(uri){
    let gateway_url = 'https://gateway.pinata.cloud/ipfs/' + uri.split('//')[1]
    //let gateway_url = 'https://ipfs.io/ipfs/' + uri.split('//')[1] 
    let res = await axios.get(gateway_url)
    return res['data']                  // 객체 반환.
}

// 개개 NFT의 세부 정보를 모달을 통해서 출력해 주는 함수.
function nftInfo(e) {
    let name = $(e.relatedTarget).parent().find('#myTitle').find('span').text()   
    let id = $(e.relatedTarget).parent().find('#myID').find('span').text()                  
    let price = $(e.relatedTarget).parent().find('#myPrice').find('span').text()   // 모달을 호출한 카드의 price 값!
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

//
// 문서가 ready 하면 실행.
//
$(function(){
    // 이벤트 처리 함수 설정 및 초기화.
    App.contractAddress = contractAddress   // 계약의 주소 등록.
    App.contractABI = contractABI           // 계약의 ABI 등록.

//    $.getJSON('./js/myKeys.json', (data)=> { App.img.myAPIKey = data['myAPIKey']; App.img.mySecretAPIKey = data['mySecretAPIKey'];})

    App.initWeb3()                      // Web3 초기화.
    if(App.web3){                       // Web3 객체화 성공인 경우에만 다음 실행.
        App.initContract()              // 계약 객체 생성.
        App.initSender()                // 요청자의 주소 기록.
        App.refreshCards()

        // confirmPrice 버튼 클릭 이벤트.
        $('#confirmPurchase').on('click', function(){
            App.callBuyNFT()   
        }) 

        // myModalInfo 모달이 보여지는 이벤트.
        $('#myModalInfo').on('shown.bs.modal', async function(e){
            nftInfo(e)
        })

        // myModalInfo 모달이 보여지는 이벤트.
        $('#myModalPurchase').on('shown.bs.modal', async function(e){
            nftInfo(e)                  // 같은 함수 활용!
        })

        // MetaMask에서 새로운 주소 선택 이벤트.             
        window.ethereum.on('accountsChanged', function() {          
          location.reload()             // 현 페이지 refresh.    
        })
    }
});

