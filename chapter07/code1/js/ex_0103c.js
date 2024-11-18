// MetaMask와 연동을 위한 코드. HTML에서 불러들여진다.
// 주의: MetaMask에서 계정을 Site 에 연결을 해줘야 제대로 작동한다.
//

App = {

    // Web3 객체 변수.
    web3: null,

    // 배포된 계약의 ABI.
    contractABI : [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    
    // 배포된 계약의 주소.
    contractAddress : '0x10216131558877e8289aDf56b053112ddb924871',   
           
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

    // 계약의 set() 함수 호출해 주는 함수.
    callSet: async function(){
        let senderAddress = (await this.web3.eth.getAccounts())[0]   // 호출하는 사람의 주소.
        let newValue = Number($('#userInput').val())            // 새로운 값 입력.
        $('#userInput').val('')                                 // 리셋.
        // 계약의 set() 함수 호출. 주의: 상태 (state)를 바꾸는 경우 send().
        await this.myContract.methods.set(newValue).send({from:senderAddress})      
    },

    // 계약의 get() 함수 호출해 주는 함수.    
    callGet: async function(){
        let res = await this.myContract.methods.get().call()  
        $('#result').text(res)      
    }

} // App의 끝.

//
// 문서가 ready 하면 실행.
//

$(function(){
    App.initWeb3()                      // Web3 초기화.
    if(App.web3){                       // Web3 객체화 성공인 경우에만 다음 실행.
        App.initContract()              // 계약 객체 생성.
        
        // Set 버튼 클릭 이벤트.
        $('#setButton').on('click', function() {
            App.callSet()               // Set 실행.
        })  
        

        // Get 버튼 클릭 이벤트.
        $('#getButton').on('click', function() {
           App.callGet()               // Get 실행.
        })           
        
        // MetaMask에서 새로운 주소 선택 이벤트.             
        window.ethereum.on('accountsChanged', function() {          
          location.reload()             // 현 페이지 refresh.    
        })
    }
});

