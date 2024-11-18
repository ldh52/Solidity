//
// JavaScript의 조건문을 만들기 위한 연산.
// 

// in 연산자.
console.log("\n'in' operator examples:")
const x = new Array(111,222,333)
console.log('x = ',x)
console.log('0 in x? ', 0 in x)                 // 인덱스 0 포함 여부.
console.log('3 in x? ', 3 in x)                 // 인덱스 3 포함 여부.

const y = new String('I like JavaScript')		// Object 생성.
console.log('y = ', y)
console.log("'length' in y? ", 'length' in y)    // 'length' 속성의 포함 여부.

const z = 'I like JavaScript'		             // 문자열 기본 자료형 상수.
console.log('z = ', z)
//console.log("'length' in z? ", 'length' in z)  // 'length' 속성의 포함 여부. 오류 발생.

// 삼항 조건 연산자.
console.log('\nTernary operator examples:')
let myAge = 22					
let myDrink = (myAge >= 20) ? 'beer' : 'coke'			
console.log(`My first drink is ${myDrink}.`)
myAge = 16
myDrink = (myAge >= 20) ? 'beer' : 'coke'			
console.log(`My next drink is ${myDrink}.`)

// 단축 평가 (Short circuit).
console.log('\nShort circuit evaluation examples:')
myAge = 22					
myAge >= 20 && console.log('You are grown up!')        // 왼쪽 조건이 true이면 오른쪽 실행.				
myAge >= 20 || console.log('You are still underage.')  // 왼쪽 조건이 false이면 오른쪽 실행.
myAge = 16					
myAge >= 20 && console.log('You are grown up!')        // 왼쪽 조건이 true이면 오른쪽 실행.				
myAge >= 20 || console.log('You are still underage.')  // 왼쪽 조건이 false이면 오른쪽 실행.



