//
// JavaScript의 배열.
// 

let a, b, c, d, e

// 배열 정의.
console.log('\nArray creation examples:')
a = [ ]				                // 빈 배열.
b = [1, 2, 3]				        // 수치형 원소.
c = ['Life', 'is', 'too', 'short']	// 문자열 원소.
d = [1, 2, 'Life', 'is', true]		// 수치형, 문자열, 부울형 원소 혼재.
e = [1, 2, ['Life', 'is']]			// 배열 안의 또다른 배열.

console.log('Type of "a" :', typeof a)               // 'object'라 출력된다. 배열과 객체를 구별하지 못한다!
console.log('Is "a" an array? ', Array.isArray(a))   // Array.isArray() 함수를 사용해서 array 여부를 알 수 있다!
console.log('a = ', a)
console.log('b = ', b)
console.log('c = ', c)
console.log('d = ', d)
console.log('e = ', e)
console.log(`Length of "a" : ${a.length}`)
console.log(`Length of "e" : ${e.length}`)

// Array() 생성자 함수를 사용해서 생성.
a = new Array()				                    // 빈 배열.
b = new Array(1, 2, 3)			                // 수치형 원소.
c = new Array('Life', 'is', 'too', 'short')		// 문자열 원소.
d = new Array(1, 2, 'Life', 'is', true)		    // 수치형, 문자열, 부울형 원소 혼재.
e = new Array(1, 2, ['Life', 'is'])		        // 배열 안의 또다른 배열.
a2 = new Array(1)                               // 길이가 1인 빈 배열.
a3 = new Array(3)                               // 길이가 3인 빈 배열.

console.log('\n')
console.log('a = ', a)
console.log('b = ', b)
console.log('c = ', c)
console.log('d = ', d)
console.log('e = ', e)
console.log('a2 = ', a2)
console.log('a3 = ', a3)
console.log(`Length of "a2" : ${a2.length}`)
console.log(`Length of "a3" : ${a3.length}`)

// 배열의 인덱싱과 슬라이싱.
console.log('\nArray indexing and slicing examples:')
console.log('e[1] = ', e[1])
console.log('e[2] = ', e[2])
console.log('e[2][1] = ', e[2][1])

a = [1, 2, 3, 4, 5]
console.log('\n')
console.log('a = ', a.slice())                // 배열 전체.
console.log(a.slice(0,2))                     // 0 ~ 2 (미포함).
console.log(a.slice(2))                       // 2 ~ 끝.
console.log(a.slice(-2))				      // 끝에서 두 개.

b = [1, 2, 3, ['a', 'b', 'c'], 4, 5]
console.log('\n')
console.log('b = ', b.slice())                // 배열 전체.
console.log(b.slice(0,2))                     // 0 ~ 2 (미포함).
console.log(b.slice(2,5))                     // 2 ~ 5 (미포함).
console.log(b[3].slice(0,2))				  // 인덱싱 후 슬라이싱.		

	