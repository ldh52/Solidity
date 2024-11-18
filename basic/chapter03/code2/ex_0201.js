//
// JavaScript의 상수와 변수. 
//

// 상수.
const x1 = 123                     // 상수 선언.
const y1 = 'Hello World!'          // 상수 선언.
// const z1                         // 오류 발생!
// x1 = 456                        // 상수의 값 변경 시도. 오류 발생!
console.log('Constants : ', x1, y1)

// 변수.
let x2 = 123                       // 변수 선언.
let y2 = 'Hello World!'            // 변수 선언.
let z2 = true                      // 변수 선언.
let w2                             // OK!
// let x2 = 456                    // 오류 발생. 이미 사용된 식별자 재사용.
z2 = false                         // 변수의 값 변경. OK!
console.log('Variables : ', x2, y2, z2, w2)

// 상수와 변수의 자료형.
console.log('Type of x1 : ', typeof x1)
console.log('Type of y1 : ', typeof y1)
console.log('Type of x2 : ', typeof(x2))
console.log('Type of y2 : ', typeof(y2))
console.log('Type of z2 : ', typeof z2)
console.log('Type of w2 : ', typeof w2)

// const, let, var 사용하지 않고 정의.
// window 객체의 property (속성)과 같이 취급됨.
x3 = 123
y3 = 'Hello World!'
z3 = true
z3 = false                             // OK.
console.log('\n')
console.log('Values : ', x3, y3, z3)
console.log('Type of x3 : ', typeof x3)
console.log('Type of y3 : ', typeof y3)
console.log('Type of z3 : ', typeof z3)

// 상수나 변수는 delete 불가능. property는 delete 가능.
delete x1                       // 오류는 아니지만 무효.
delete x2                       // 오류는 아니지만 무효.
delete x3                       // OK.
console.log('\n')
console.log('Value of x1 after delete : ', x1)
console.log('Value of x2 after delete : ', x2)
// console.log('Value of x3 after delete : ', x3)   // x3 삭제 되었기 때문에 오류 발생.

// 복합 대입 연산자.
console.log('\n')
let x4 = 10                     		// 변수 선언과 초기화.
x4 += 2	
console.log('Value of x4 : ', x4)
x4 *= 3
console.log('Value of x4 : ', x4)

// 전위, 후위 증감 연산자.
let x5 = 10                     		// 변수 선언과 초기화.
console.log('\n')
console.log('Value of x5 : ', x5++)
console.log('Value of x5 : ', x5)
console.log('Value of x5 : ', --x5)
console.log('Value of x5 : ', x5)