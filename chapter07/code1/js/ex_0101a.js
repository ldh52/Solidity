// 계정 주소, 잔고, 거래 횟수를 출력해 본다.
// promise와 then 사용.

const { Web3 } = require('web3');                   // 주의: destructuring.
const url = 'http://127.0.0.1:7545'                 // 로컬 블록체인 네트워크 endpoint.            
const web3 = new Web3( new Web3.providers.HttpProvider(url) ) // 블록체인 네트워크에 접속.

let address

// 계정 주소 출력.
const promise = web3.eth.getAccounts()      // 계정 주소를 반환해 주는 promise.
promise.then( console.log );                // 비동기 실행이 완료되면 결과 출력. console.log가 콜백함수.

// 계정 잔고 출력. Wei를 단위로 함.
address = '0x9Db950812d37D540Dcb3FeD75Ae9dFF2F7f7d7F8'   // 계정 주소.
web3.eth.getBalance(address).then((x) => console.log(`Account balance is ${x} wei.`) )

// 계정의 transaction 횟수 출력.
web3.eth.getTransactionCount(address).then((x)=>console.log('TX count: ' +x));

// 비동기 실행 체인을 만들어 본다.
// 먼저 계정 주소를 가져오고, 완료되면 계정 주소별 잔고를 가져와서 출력한다.
web3.eth.getAccounts().then( (accounts) => { for(const acc of accounts){ web3.eth.getBalance(acc).then(console.log) } } )
