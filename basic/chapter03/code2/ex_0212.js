//
// JavaScript의 콜백 함수.
// 

// 콜백 함수 예시.
console.log('\nCallback function example:')

function callAnother(aFunc, a){                        // 콜백함수를 인자로 받는 함수. 
    let x = aFunc(a)
    return x*10
}

function myFunction(y){
    return y*3
}

console.log('함수를 인자로 받는 함수의 호출 결과 = ', callAnother(myFunction, 2))               // 콜백함수는 이미 정의된 함수.       
console.log('함수를 인자로 받는 함수의 호출 결과 = ', callAnother(function(x){return x*3}, 2))   // 콜백함수는 무명함수.
console.log('함수를 인자로 받는 함수의 호출 결과 = ', callAnother((x) => {return x*3}, 2))       // 콜백함수는 화살표함수.

// 콜백함수를 필요로 하는 배열의 메소드.
console.log('\n콜백함수를 필요로하는 배열의 메소드:')
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('map의 예시 => ', a.map(function (x) {return x*10}))
console.log('filter의 예시 => ', a.filter(function (x) {return x % 2 != 0 }))
console.log('forEach의 예시 =>')
a.forEach( (x) => {console.log(`${x} + 1 = ${x+1}`)})    

// 타이머 함수와 콜백함수.
console.log('\n타이머 함수와 콜백함수:')
let id1= setTimeout( () => { console.log('3 초 경과! Party Time!!!')}, 3000)     
console.log('3초후 Party Time!!!')     
let t = 1
let id2 = setInterval( () => { console.log(`${t++} 초 경과~`); }, 1000)     // 1 초 간격으로 실행.
let id3 = setTimeout( () => {clearInterval(id2)}, 3100)                     // 3여초 후 모두 클리어.
