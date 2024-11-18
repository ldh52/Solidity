//
// JavaScript의 객체.
// 

let a, b, c, d, e

// 객체 정의.
console.log('\nObject examples:')
a = { }					                              // 빈 객체.
b = {'이름': '홍길동', '성별': '남', '나이': 35}		// Value로 문자열, 수치형 혼재. 	
c = {1: 'Life', 2: 'is', 3: 'hard' }		
d = {x:[1,2,3], y:[4,5,6]}			                  // 배열을 value로.		
e = {1:b, 2:c}				                          // 객체 안에 또다른 객체가 value로.

console.log("b['이름'] = ", b['이름'])                 // 속성 접근.
console.log("b.이름 = ", b.이름)                       // 속성 접근.
console.log("e[2] = ", e[2])
//console.log("e.2 = ", e.2)                          // 오류!. 2는 식별자로 사용될 수 없다.
console.log("e[2][3] = ", e[2][3])

const x = {'이름~~~!!': '홍길동', '성별>': '남', '나이?': 35, '전화 번호#': '010-123-4567'}
console.log("x['이름~~~!!'] = ", x['이름~~~!!'])
console.log("x['전화 번호#'] = ", x['전화 번호#'] )

const z = {aNumber:123, aString: 'abc', aBool: true, anArray: [1,2,3] , anObject: {'a':0, 'b':1}, 
                   aMethod: function() { console.log(this.aNumber)} }
console.log("z.aMethod() 실행 : ")
z.aMethod()  

// 객체의 속성 추가, 삭제, 변경.
console.log('\nObject property examples:')
const  w = {}				// 빈 객체.		
w['이름'] = '홍길동'		         // 속성 추가.
w['성별'] = '남'			 // 속성 추가.
w['나이'] = 35			 // 속성 추가.
console.log('w = ', JSON.stringify(w))
delete w.나이 				                     // 속성 삭제.
console.log('w = ', JSON.stringify(w))
w.이름 = '임꺽정' 				                 // 속성의 value 수정. 
console.log('w = ', JSON.stringify(w))
console.log('w = ', JSON.stringify(w,null, 2))  // 스페이스 2 들여쓰기 적용.

// 객체의 key, value 출력.
console.log('\nObject keys and values:')
console.log(Object.keys(w))
console.log(Object.values(w))
console.log(Object.entries(w))