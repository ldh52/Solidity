//
// JavaScript의 문자열 자료형 심화.
// 

// 문자열의 연산과 반복.
console.log('\nString operation examples:')
let str1 = 'First string. '
let str2 = 'Second string.'
console.log(str1 + str2)                               // 이어 붙이기.
console.log(str1.repeat(2) + str2.repeat(2))           // 반복하고 이어붙이기.

// 문자열의 주요 메서드.
console.log('\nString method examples:')
let myString
let y
myString = 'JavaScript is easy to learn.'
console.log(myString.toUpperCase())         // 대문자화. 
console.log(myString.toLowerCase())         // 소문자화.
y =  myString.split(' ')                     // ' ' 기준으로 토막냄.
console.log(y, ' <= ', typeof y)
console.log(y.join('-'))                     // '-'를 이음새로 사용해서 연결.
console.log('First "easy" at ', myString.indexOf('easy'))			// 'easy'가 처음으로 발견된 위치.
console.log('First "EASY" at ', myString.indexOf('EASY'))          // 검색 실패. -1 반환.
console.log('First "a" at ', myString.indexOf('a'))     			// 'a'가 처음으로 발견된 위치.
console.log('Last "a" at ',  myString.lastIndexOf('a'))            // 'a'가 마지막으로 발견된 위치.

myString = 'JavaScript is easy to learn.'
console.log(myString.replace('JavaScript', 'JS'))
console.log(myString)                                                // 항구적인 변화는 아니다.

// 템플릿 리터럴.
let myResult = 1 + 2
console.log(`연산 결과는 ${myResult}입니다.`) 
let myChoice = 'JavaScript'
console.log(`선호하는 언어는 ${myChoice}입니다.`) 

