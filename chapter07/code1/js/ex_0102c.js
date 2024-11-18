// MetaMask와 연동을 위한 코드. HTML에서 불러들여진다.
// 주의: MetaMask에서 계정을 Site 에 연결을 해줘야 제대로 작동한다.
//

App = {

    // Web3 객체 변수.
    web3: null,

    // 송금자 개인키.
    privateKeySender : '79d09db86da8ef107a012929cf045f409661ba6088362191dfc446cba2cc79d9' ,    
    
    // 수금자 주소.
    addr_receiver : '0x9Db950812d37D540Dcb3FeD75Ae9dFF2F7f7d7F8',            

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

    // Ether 보내주는 함수.
    sendEther: async function() {
         
        let sendValue = Number($('#userInput').val())                     // 송금액.
        $('#userInput').val('')                                          // 송금액 리셋
        let txObject = {
        //   nonce: 1,			       // 매회 1씩 증가하는데 생략해도 됨.
            to: this.addr_receiver ,
            gasPrice: 10000000000 ,
            gas: 3000000 ,              // gasLimit에 해당하는 가스비.     
            value: sendValue,
            data: ""
        }
        try {
            let signedTX = await this.web3.eth.accounts.signTransaction(txObject, this.privateKeySender);   // 전자 서명.
            let sentTX = await this.web3.eth.sendSignedTransaction(signedTX.rawTransaction);           // TX 보내기.
            $('#show').text('성공!');         
        } catch (err) {                         // 실패.
            $('#show').text(err.message);
        }
    }

} // App의 끝.

//
// 문서가 ready 하면 실행.
//
$(function(){
    App.initWeb3()                      // Web3 초기화.
    if(App.web3){                       // Web3 객체화 성공인 경우에만 다음 실행.
        
        // 송금 버튼 클릭 이벤트.
        $('#sendButton').on('click', function() {
          App.sendEther()               // 송금 실행.
        })   

        // MetaMask에서 새로운 주소 선택 이벤트.             
        window.ethereum.on('accountsChanged', function() {          
          location.reload()             // 현 페이지 refresh.    
        })
    }
});
