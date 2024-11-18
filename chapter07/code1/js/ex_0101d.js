// Big Number 처리 방법에 대해서 알아본다.
// 먼저 npm install bn.js 와 같이 패키지를 설치해야 한다.

const BN = require('bn.js')                  

const bn_x1 = new BN('10000000000000000000000000')   // 10**25
const bn_x2 = new BN('1000000000000000000')          // 10**18
const bn_x3 = new BN('500000000000000000')           // 5*10**17
const bn_x4 = new BN('10000000000')                  // 10**10

console.log('Big Number를 Number 형태로 출력해 본다.')
console.log(Number(bn_x1))                          // .toNumber() 오작동.
console.log(Number(bn_x2))
console.log(Number(bn_x3))
console.log(Number(bn_x4))

console.log('\nBig Number를 BN형 형태로 출력해 본다.')
console.log(bn_x1)
console.log(bn_x2)
console.log(bn_x3)
console.log(bn_x4)

console.log('\nBN을 String으로 변환해 출력해 본다.')
console.log(bn_x1.toString())
console.log(bn_x2.toString())
console.log(bn_x3.toString())
console.log(bn_x4.toString())

console.log('\nBN 관련 유용한 메서드를 사용해 본다.')
console.log('clone()  : ', bn_x1.clone().toString())
console.log('isNeg()  : ', bn_x1.isNeg())
console.log('isEven() : ', bn_x1.isEven())
console.log('isOdd()  : ', bn_x1.isOdd())
console.log('isZero() : ', bn_x1.isZero())
console.log('isBN()   : ', BN.isBN(bn_x1))

console.log('\nBN을 가지고 비교 연산을 해 본다.')
console.log('x1 > x2  ?  ', bn_x1.gt(bn_x2))
console.log('x1 >= x2 ?  ', bn_x1.gte(bn_x2))
console.log('x1 < x2  ?  ', bn_x1.lt(bn_x2))
console.log('x1 <= x2 ?  ', bn_x1.lte(bn_x2))
console.log('x1 == x2 ?  ', bn_x1.eq(bn_x2))

console.log('\nBN을 가지고 수학 연산을 해 본다.')
console.log('neg()   : ', bn_x1.neg().toString())     // 항상 문자열로 변환해 출력한다. 
console.log('abs()   : ', bn_x1.abs().toString())
console.log('x1 + x2 : ', bn_x1.add(bn_x2).toString())
console.log('x1 - x3 : ', bn_x1.sub(bn_x3).toString())
console.log('x1 * x4 : ', bn_x1.mul(bn_x4).toString())