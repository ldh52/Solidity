// 계약과 상호작용.
// promise와 then 사용.

const { Web3 } = require('web3');                   // 주의: destructuring.
const url = 'http://127.0.0.1:7545'                 // 로컬 블록체인 네트워크 endpoint.            
const web3 = new Web3( new Web3.providers.HttpProvider(url) ) // 블록체인 네트워크에 접속.

// 다음은 계약의 ABI 객체.
// ex_0102_SimpleStorage.sol 참고.

let contractABI = [
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
]
// 계약의 주소.
let contractAddress = '0x10216131558877e8289aDf56b053112ddb924871'      
// 계약을 호출하는 계정.
let senderAddress = '0x9Db950812d37D540Dcb3FeD75Ae9dFF2F7f7d7F8'        
// 계약 객체.
let myContract = new web3.eth.Contract(contractABI, contractAddress)    

// 계약의 set() 함수 호출.
// 상태 (state)를 바꾸는 경우 send().
// promise 객체 반환됨. 
let newValue = 666			// 새로운 값.
let promise = myContract.methods.set(newValue).send({from:senderAddress, gas:1000000, gasPrice:10000000000})          

// 계약의 get() 함수 호출.
// 상태 (state)를 바꾸지 않는 경우 call().
// 이전의 set() 함수 호출이 종료되면 이어서 실행되도록 then() 메소드 안의 콜백함수로 구현한다.
// 주의: 받아온 값을 Number()로 변환해 준다.
promise.then(()=> { myContract.methods.get().call().then( (x) => console.log(Number(x)))  })
//myContract.methods.get().call().then( (x) => console.log(Number(x)) )                // standalone                       


