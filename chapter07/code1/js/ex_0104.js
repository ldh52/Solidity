// 계약과 상호작용.
// async와 await 사용.

const { Web3 } = require('web3');                   // 주의: destructuring.
const url = 'http://127.0.0.1:7545'                 // 로컬 블록체인 네트워크 endpoint.            
const web3 = new Web3( new Web3.providers.HttpProvider(url) ) // 블록체인 네트워크에 접속.

// 다음은 계약의 ABI 객체.
// ex_0304_TestEvent.sol 참고.

let contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "myEvent1",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "myEvent2",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "fireEvent1",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "fireEvent2",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// 계약의 주소.
let contractAddress = '0xDB268f23203cCF599e2372FE26460096b54395a0'      

// 계약을 호출하는 계정.
let senderAddress = '0x9Db950812d37D540Dcb3FeD75Ae9dFF2F7f7d7F8'         
// 계약 객체.
let myContract = new web3.eth.Contract(contractABI, contractAddress);    

// 비동기 처리를 해주는 async 즉시호출 함수.
(async function() {  

let events;
// 모든 이벤트 myEvent1을 출력해 본다.
console.log('모든 이벤트 myEvent1 출력.')
events = await myContract.getPastEvents('myEvent1', {fromBlock:0, toBlock:'latest'})
events.forEach((x)=>
console.log(`Block: ${x.blockNumber}, BlockHash: ${x.blockHash}, ID: ${Number(x.returnValues.id)}, MESSAGE: ${x.returnValues.message} `))		

// 모든 이벤트 myEvent2를 출력해 본다.
console.log('\n모든 이벤트 myEvent2 출력.')
events = await myContract.getPastEvents('myEvent2', {fromBlock:0, toBlock:'latest'})
events.forEach((x)=>
console.log(`Block: ${x.blockNumber}, BlockHash: ${x.blockHash}, ID: ${Number(x.returnValues.id)}, MESSAGE: ${x.returnValues.message} `))		

// 이벤트 myEvent1 중 일부만 출력해 본다.
console.log('\n이벤트 myEvent1 중 일부만 출력.')
events = await myContract.getPastEvents('myEvent1', {filter: {id:[0, 2, 4]}, fromBlock:0, toBlock:'latest'})  // 필터 적용.
events.forEach((x)=>
console.log(`Block: ${x.blockNumber}, BlockHash: ${x.blockHash}, ID: ${Number(x.returnValues.id)}, MESSAGE: ${x.returnValues.message} `))		

})();
