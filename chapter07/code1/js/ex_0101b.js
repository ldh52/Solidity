// 계정 주소, 잔고, 거래 횟수를 출력해 본다.
// async와 await 사용.

const { Web3 } = require('web3');                   // 주의: destructuring.
const url = 'http://127.0.0.1:7545'                 // 로컬 블록체인 네트워크 endpoint.            
const web3 = new Web3( new Web3.providers.HttpProvider(url) ) // 블록체인 네트워크에 접속.
let accounts, balances, txcounts;

// 비동기 처리를 해주는 async 즉시호출 함수.
(async function() {                     
    accounts = await web3.eth.getAccounts();              // Promise 객체를 반환하는 호출은 await 처리.
    balances = []
    txcounts = []

    for (const acc of accounts){
        let balance = await web3.eth.getBalance(acc)      // Promise 객체를 반환하는 호출은 await 처리.
        let txcount = await web3.eth.getTransactionCount(acc)
        balances.push(balance)
        txcounts.push(txcount)
    }

    for (const i in accounts){
        console.log(`account = ${accounts[i]}, balance = ${web3.utils.fromWei(balances[i],'ether')} ether, tx count = ${txcounts[i]}`) 
    }
})();  


