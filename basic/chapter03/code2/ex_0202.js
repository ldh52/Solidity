//
// JavaScript의 기본 자료형.
//

// 수치형 자료와 연산.
let x = 2
let y = 3
console.log('\nOperation examples:')
console.log('x + y = ', x + y)
console.log('x - y = ', x - y)
console.log('x * y = ', x * y)
console.log('x / y = ', x / y)
console.log('x ** y = ', x ** y)

// 수치형 관련 주요 메소드와 함수.
console.log('\nFunction examples:')
x = 0.123456789                       // x의 값을 바꾸어 본다.
y = x.toFixed(3)                      // 임의의 소수점 이하 자리수.
console.log(y, typeof y)              // y는 string 이다!
console.log(Number.isNaN(x))          // NaN 여부. NaN는 유효한 수치가 아님을 의미한다.
console.log(Number.isFinite(x))       // 유한수 여부.
console.log(Number.isInteger(x))      // 정수 여부.

// 문자열 자료.
console.log('\nString examples:')
x = "Hello World"				// OK.
y = 'Hello World'               // OK.

x = "He said, 'JavaScript is very easy' "		// OK.
y = 'He said, "JavaScript is very easy" '		// OK.
console.log('x = ', x)
console.log('y = ', y)

//x = "He said, "JavaScript is very easy" "		// 오류 발생!
//y = 'He said, 'JavaScript is very easy' '		// 오류 발생!

let myString = `Hello !!!
my
name
is
JavaScript.`
console.log(myString)			// 멀티라인 문자열 출력.

x = "He said, \"JavaScript is very easy\" "		// 이스케이프 코드 사용. OK.
y = 'He said, \'JavaScript is very easy\' '     // 이스케이프 코드 사용. OK.
console.log('x = ', x)
console.log('y = ', y)

// 문자열의 인덱싱.
console.log('\nString indexing examples:')
myString = 'JavaScript is easy to learn.'
console.log('String length = ', myString.length) // 문자열의 길이 출력.
console.log('myString[0] = ', myString[0] )
console.log('myString[3] = ', myString[3] )
console.log('myString[27] = ', myString[27] )

// 문자열의 슬라이싱.
console.log('\nString slicing examples:')
console.log(myString.slice(22))	  // 인덱스 22 이후.
console.log(myString.slice(-6)) 	  // 끝에서 6번 째 이후.
console.log(myString.slice(0,10))	  // 시작과 끝(+1)의 위치를 명시할 수 있다.
console.log(myString.slice(-14,-10)) // 시작과 끝(+1)의 위치를 명시할 수 있다.
console.log(myString.slice())        // 문자열 전체.

// 부울 자료형.
let z = true
let w = false
console.log('\nBoolean examples:')
console.log(typeof(z))
console.log("2 == '2'", 2 == '2')
console.log("2 === '2'", 2 === '2')
console.log('z or w = ', z || w)
console.log('z and w = ', z && w)
console.log('not z = ', !z)
console.log('Boolean value of "myString" = ', !!myString)

// 자료형의 변환.
console.log('\nType conversion:')
x = '123'	
y = 'abc'
let x2 = Number(x)                            // 변환 성공.
let y2 = Number(y)                            // 변환 실패. NaN값.
console.log('x2 = ', x2, typeof(x2))
console.log('y2 = ', y2, typeof(y2))         // NaN의 경우에도 자료형은 'number'!!!
let x3 = 123			
let y3 = String(x3)
console.log('x3 + 1 = ', x3 + 1)
console.log('y3 + 1 = ', y3 + 1)
let x4 = 'abc'
let y4 = ''
console.log(Boolean(x4))
console.log(Boolean(y4))

