//
// JavaScript의 Object 자료형.
// 

// Object 자료형.
console.log('\nObject type examples:')
const a = [1, 2, 3]                                          // 배열.                                   
const b = {1: [1,2,3], 2: ['a','b','c']}                     // 객체.
const myFunc = function() { console.log('Hello') }          // 함수.
console.log('Type of a = ', typeof a)
console.log('Type of b = ', typeof b)
console.log("Type of 'myFunc' = ", typeof myFunc)          // 함수는 object 자료형이지만 'function'이라 출력된다.

console.log("Is 'a' an array? ", Array.isArray(a))           // a는 배열?
console.log("Is 'b' an array? ", Array.isArray(b))           // b는 배열?

a.newProperty = 123		           // 배열은 object이므로 속성을 추가할 수 있다. 일반적인 원소와는 다르게 취급된다.
b.newProperty = 123                // 객체는 object이므로 속성을 추가할 수 있다.
myFunc.newProperty = 123		   // 함수는 object이므로 속성을 추가할 수 있다. 

console.log('a.newProperty = ', a.newProperty)
console.log('b.newProperty = ', b.newProperty)
console.log('myFunc.newProperty = ', myFunc.newProperty)

// 기본 자료형을 바탕으로 Object 자료형 생성.
// 기본 자료형이 더이상 아님. new 키워드 주목!
console.log('\nBasic types as objects examples:')
const x = new Number(123)                 
const y = new String('abc')                
const z = new Boolean(true)		           
console.log('x = ', x)
console.log('y = ', y)
console.log('z = ', z)
console.log('x.valueOf() = ', x.valueOf())
console.log('y.valueOf() = ', y.valueOf())
console.log('z.valueOf() = ', z.valueOf())
console.log('Type of x : ', typeof x)     // object 자료형 확인. 
console.log('Type of y : ', typeof y)     // object 자료형 확인. 
console.log('Type of z : ', typeof z)     // object 자료형 확인. 
console.log('x * 2 = ', x * 2)            // 기본 자료형과 같이 연산 가능.
console.log('y + "def" = ', y + "def")    // 기본 자료형과 같이 연산 가능.
console.log('z && true = ', z && true)    // 기본 자료형과 같이 연산 가능.

console.log('\nAfter adding "newProperty".')
x.newProperty = 123		       // object이므로 속성을 추가할 수 있다.
y.newProperty = 123               // object이므로 속성을 추가할 수 있다.
z.newProperty = 123		       // object이므로 속성을 추가할 수 있다.
console.log('x = ', x)
console.log('y = ', y)
console.log('z = ', z)
console.log('x.valueOf() = ', x.valueOf())
console.log('y.valueOf() = ', y.valueOf())
console.log('z.valueOf() = ', z.valueOf())
console.log('x.newProperty = ', x.newProperty)
console.log('y.newProperty = ', y.newProperty)
console.log('z.newProperty = ', z.newProperty)
console.log('x * 2 = ', x * 2)            // 연산 결과는 이전과 같다.
console.log('y + "def" = ', y + "def")    // 연산 결과는 이전과 같다.
console.log('z && true = ', z && true)    // 연산 결과는 이전과 같다.