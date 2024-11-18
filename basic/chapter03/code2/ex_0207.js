//
// JSON에 대해서.
// 

let x, y, z, d1, d2, d3, d4                           // 일단 선언해 둠.

// JSON 예시.
console.log('\nJSON examples:')
const customerData = [ { name: '홍길동', gender: '남', age: 22}]   // 배열과 객체의 조합.
x = JSON.stringify(customerData)     		                 	    // 들여쓰기 없게 문자열로 변환.	
y = JSON.stringify(customerData, null, 4)                    		// 4칸 들여쓰기 적용.
console.log(x)
console.log(y)	

const customerDataJSON = '[ { "name": "홍길동", "gender": "남", "age": 22}, { "name": "이순신", "gender": "남", "age": 35} ]'
z = JSON.parse(customerDataJSON)                                 // 문자열을 다시 JavaScript 배열과 객체의 조합으로.
console.log(z[0])
console.log(z[1])
