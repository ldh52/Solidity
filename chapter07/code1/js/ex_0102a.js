// 송금 Transaction.
// promise와 then 사용.

// 설치 필요: npm install ethereumjs-tx

const Tx = require('ethereumjs-tx').Transaction;    // Transaction 클래스.
const { Web3 } = require('web3');                   // 주의: destructuring.
const url = 'http://127.0.0.1:7545'                 // 로컬 블록체인 네트워크 endpoint.            
const web3 = new Web3( new Web3.providers.HttpProvider(url) ) // 블록체인 네트워크에 접속.

let addr_receiver, addr_sender, privateKeySender;

addr_sender = '0x9Db950812d37D540Dcb3FeD75Ae9dFF2F7f7d7F8';        // 송금자 주소.
privateKeySender = '76b395ae6fb7b20c3dc3d3c4b9ac353a0f22a35223c52f71cb9863bb998ae2a6';  // 송금자 개인키. 주의: "0x" 없이!!!!
addr_receiver = '0x33Da7068861946943EE9988fC37c053a60dd3c17';                           // 수금자 주소.

// txCount가 필요하다.
// 모든것을 promise & then 패턴 안에 둔다.
web3.eth.getTransactionCount(addr_sender).then( (txCount) => {

    let txObj = {
        nonce: web3.utils.toHex(txCount),                   // Hex 변환 필요.			       
        from: addr_sender,
        to: addr_receiver ,
        gasPrice: 10000000000 ,
        gas: 3000000 ,                                      // gasLimit에 해당하는 가스비.     
        value: Number( web3.utils.toWei('1', 'ether')),     // 송금 금액.
        data: '0x'
    };

    let tx = new Tx(txObj);
    tx.sign(Buffer.from(privateKeySender,'hex'));         // {'chain': 체인} 생략. Ganache.
    let serializedTx = tx.serialize();                    // 16 진수로 serialize.
    console.log(serializedTx.toString('hex'))             // 출력해 본다.

    // Transaction을 블록체인 네트워크로 전파해서 보낸다. 
    let sentTX = web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));  
    sentTX.on('receipt', (receipt) => {		// 성공.
            console.log('Success: ', receipt);
        });
    sentTX.on('error', (err) => {			// 실패.
            console.log(err.message)
        });

});
