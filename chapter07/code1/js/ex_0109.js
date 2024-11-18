//
// 웹사이트를 통해서 입력받은 이미지를 Pinata API를 통해서 IPFS에 업로드 해준다.
// 또한 이미지의 CID를 사용해서 메타데이터를 만들고 이것 또한 IPFS에 올린다.
// 최종적으로는 NFT를 민팅해 준다.
// 주의: NFT 계약은 이미 배포되어 있음을 전제한다.
//

// 모든 정보를 보관해 주는 객체.
let App = {
    img : {
        url1 : 'https://api.pinata.cloud/pinning/pinFileToIPFS',       // 이미지 업로드 주소에 주의한다.
        url2 : 'https://api.pinata.cloud/pinning/pinJSONToIPFS',       // JSON 업로드 주소에 주의한다.
        myAPIKey : '',
        mySecretAPIKey : '',
        imgFile : null,
        imgFileName: '',
        imgCID : '',
        metaCID : '',
        metadata : {}
    },

    // Web3 객체 변수.
    web3: null,

    // 배포된 계약의 ABI.
    contractABI : [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_fromTokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_toTokenId",
                    "type": "uint256"
                }
            ],
            "name": "BatchMetadataUpdate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "MetadataUpdate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokenID",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_awardee",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_tokenURI",
                    "type": "string"
                }
            ],
            "name": "mintNFT",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],

    // 배포된 계약의 주소.
    contractAddress : '0xd59e668E69259f7b6583476aB3aF7f927b5a5163', 

    // 계약 객체.
    myContract : null,

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

    // 계약의 mintNFT() 함수 호출해 주는 함수.
    callMintNFT: async function(){
        let senderAddress = (await this.web3.eth.getAccounts())[0]   // 호출하는 사람의 주소.
        // 계약의 mintNFT() 함수 호출. 주의: 상태 (state)를 바꾸는 경우 send().
        await this.myContract.methods.mintNFT(senderAddress, this.img.metaCID).send({from:senderAddress})      
        console.log('민팅 성공!')
        location.reload()           // 현 페이지 refresh.
    },
} // App의 끝.


// 비동기 처리를 해주는 async 함수.
async function uploadIPFS() {    
    try {
        $('#result').text('처리중...')
        let data = new FormData()
        data.append('file', App.img.imgFile)
        let res = await axios.post(App.img.url1,         // POST로 보낸다.
        data,                                        // 이미지 데이터.
        { headers: {
            'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
            'pinata_api_key': App.img.myAPIKey ,
            'pinata_secret_api_key': App.img.mySecretAPIKey 
            }
        })
        App.img.imgCID = `ipfs://${res['data']['IpfsHash']}`       // 성공한 경우 CID 기록.
//        console.log(App.img.imgCID)
//        console.log(App.img.imgFileName)
        
        // 메타데이터를 만든다.
        App.img.metadata['pinataContent'] = {}
        App.img.metadata['pinataContent']['description'] = $('#description').val()
        App.img.metadata['pinataContent']['image'] = App.img.imgCID
        App.img.metadata['pinataContent']['name'] = App.img.imgFileName
        App.img.metadata['pinataMetadata'] = {}
        App.img.metadata['pinataMetadata']['name'] = (App.img.imgFileName).split('.')[0] +'.json'
//        console.log(JSON.stringify(App.img.metadata))

        // 이어서 메타데이터를 IPFS에 올린다.
        try {
            res = await axios.post(App.img.url2,                                // POST로 보낸다.
            App.img.metadata,                                                   // 객체 자체. (stringify 되지 않음)
            { headers: {
                'Content-Type': 'application/json',                             // 주의!
                'pinata_api_key': App.img.myAPIKey ,
                'pinata_secret_api_key': App.img.mySecretAPIKey 
                }
            })
            App.img.metaCID = `ipfs://${res['data']['IpfsHash']}`               // 성공한 경우 cid를 만든다.
            $('#result').text('Metadata CID : ' + App.img.metaCID)              // 메타데이터의 cid 출력.
            $('#mintButton').show()                                            // 민팅 버튼을 보여준다.

        } catch (err) {
            console.log('메타데이터 올리는 도중 오류발생!');                       // 메타데이터 업로드실패한 경우.
            $('#result').text('')
        }

    } catch (err) {
        alert('이미지 올리는 도중 오류발생!');                                     // 실패한 경우.
        $('#result').text('')
    }

}

//
// 문서가 ready 하면 실행.
//
$(function(){
    // 이미지 업로드 관련 이벤트 처리 함수 설정 및 초기화.
    $('#result').text('')
    $('#mintButton').hide()                                            // 민팅 버튼을 감추어 초기화 한다.
    $('#upload').change( (e) => { App.img.imgFile =  e.target.files[0]; App.img.imgFileName = e.target.files[0].name; } )
    $('#uploadButton').click(() => { uploadIPFS() } ) 
    $.getJSON('./js/myKeys.json', (data)=> { App.img.myAPIKey = data['myAPIKey']; App.img.mySecretAPIKey = data['mySecretAPIKey'];})

    App.initWeb3()                      // Web3 초기화.
    if(App.web3){                       // Web3 객체화 성공인 경우에만 다음 실행.
        App.initContract()              // 계약 객체 생성.
        
        // 민팅 버튼 클릭 이벤트.
        $('#mintButton').on('click', function() {
            App.callMintNFT()           // mintNFT 실행.
        })  
          
        
        // MetaMask에서 새로운 주소 선택 이벤트.             
        window.ethereum.on('accountsChanged', function() {          
          location.reload()             // 현 페이지 refresh.    
        })
    }
});

