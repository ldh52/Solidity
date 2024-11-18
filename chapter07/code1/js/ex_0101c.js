// MetaMask와 연동을 위한 코드. HTML에서 불러들여진다.
// 주의: MetaMask에서 계정을 Site 에 연결을 해줘야 제대로 작동한다.
// 

App = {

    // Web3 객체 변수.
    web3: null,

    // 블록체인에 연결해 주는 함수.
    initWeb3: function() {
        if( typeof web3 !== 'undefined') {
            console.log('Web3 불러왔습니다.')
            window.ethereum.request({ method: 'eth_requestAccounts' })        // 사이트에 계정이 연결되어 있지 않으면 연결 신청!
            if( window.ethereum.isMetaMask ){                              
                this.web3 = new Web3(window.ethereum)                         // MetaMask를 통해서 Web3를 제공 받음.               
                console.log('MetaMask 준비됨.')                                // 모든 준비 완료.
            } else {
                console.log('MetaMask 사용 불가.') 
            }
        } else {
            console.log('오류! Web3를 불러 올수 없습니다.') 
        }
    },

    // 계정정보를 보여주는 함수.
    showAccountInfo: async function() {
        let accounts = await this.web3.eth.getAccounts();                // Promise 객체를 반환하는 호출은 await 처리.
        let account = accounts[0];                
        let balance =  await this.web3.eth.getBalance(account);           // Promise 객체를 반환하는 호출은 await 처리.
        let txcount =  await this.web3.eth.getTransactionCount(account);  // Promise 객체를 반환하는 호출은 await 처리.
        console.log(account);
        console.log(balance);
        $('#show1').text(account); 
        $('#show2').text(balance); 
        $('#show3').text(txcount); 
    }

} // App의 끝.

//
// 문서가 ready 하면 실행.
//
$(function(){
    App.initWeb3()                      // Web3 초기화.
    if(App.web3){                       // Web3 객체화 성공인 경우에만 다음 실행.
        App.showAccountInfo()           // 계정 정보 보여주기.
        
        // MetaMask에서 새로운 주소 선택 이벤트.             
        window.ethereum.on('accountsChanged', function() {          
            location.reload()             // 현 페이지 refresh.    
        })
    }
});
