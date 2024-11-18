//
// JavaScript의 함수.
// 

// 함수 정의 방법.
console.log('\nFunction definition examples:')
function myFunc1(x) {                     // 선언적 함수 정의.
    return x*2
}

let myFunc2 = function(x) { return x*3 }  // 익명함수 활용 정의.

let myFunc3 = (x) => {return x*5 }        // 화살표 함수 정의.

const myObj ={
    a : [1, 2, 3],
    b : true,
    myFunc : function() {
        console.log('Hello!!!')
        console.log(`a = ${this.a} , b = ${this.b}`)	// 객체 자신의 a 속성과 b 속성 출력.
    }
}

console.log('myFunc1 = ', myFunc1(2))
console.log('myFunc2 = ', myFunc2(2))
console.log('myFunc3 = ', myFunc3(2))
myObj.myFunc()

// 가변적인 인자의 갯수.
function sum(...A) {
    let total = 0
    for(const a of A){
        total += a
     } 
    return total
}

// 초기값이 있는 인자.
function add(a = 0, b=0){
    return a + b
}

console.log('sum(1,2,3,4,5) = ', sum(1,2,3,4,5))
console.log('sum(1,2,3,4,5,6,7,8,9,10) = ', sum(1,2,3,4,5,6,7,8,9,10))
console.log('add() = ',add())
console.log('add(2) = ',add(2))
console.log('add(2,3) = ',add(2,3))

// 지역변수와 전역변수:
console.log('\nLocal vs global variables:')

// 지역변수의 예시.
let total = -1					// 지역변수가 아님.			
function average1(...A) {
    let total = 0				// 지역변수. 함수 바깥의 total이 아니다.
    for(const a of A){
        total += a
     } 
    return total/A.length
}
console.log('average1(1,2,3,4,5) = ', average1(1,2,3,4,5))
console.log('total = ', total)

// 전역변수의 예시.
function average2(... A) {
    result2 = 0				// let 키워드 사용하지 않음. 전역 변수.
    for(const a of A){
        result2 += a				
    } 
    result2 /= A.length
}
average2(1,2,3,4,5)         // 전역변수 포함 함수 먼저 실행.
console.log('average2(1,2,3,4,5) = result2 = ', result2)

// 즉시호출 함수.
console.log('\nImmediately Invoked function:')

// 즉시호출 함수.
let a = 'Outside';					// 세미콜론을 사용해서 확실히 행을 종료 한다.
(function() {
let a = 'Inside';					// 중복 선언 아님. OK. 효력 범위는 함수 안.
console.log('a = ',a) } )();
console.log('a = ',a);              // 바깥의 a 확인.

