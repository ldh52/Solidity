//
// JavaScript의 반복문 제어 구조.
// 

// while 반복문.
console.log('\nWhile loop examples:')
let counter, sum

counter = 0
sum = 0
while (counter < 11){
    sum += counter
    counter++
}
console.log('1에서 10 까지의 합은 = ',sum)

counter = 0
sum = 0
while (counter < 1001){
    if (counter % 5 == 0){
        sum += counter
    }
    counter++
}
console.log('1000 이하 5배수의 합은 =',sum)

// for 반복문.
console.log('\nFor loop examples:')

sum = 0
for (let i = 1; i< 11; i++){
    sum += i
}
console.log('1에서 10 까지의 합은 = ',sum)

sum = 0
for (let i = 2; i< 101; i += 2){
    sum += i
}
console.log('2에서 100 까지 짝수의 합은 = ',sum)

for (let i = 2; i < 10; i++){
    for (let j = 2; j < 10; j++){
        console.log(` ${i} x ${j} = ${i*j}`)         // 구구단 출력.
    }
}

// for in 반복문.
console.log('\nFor in loop examples:')

let A = ['You', 'need', 'JavaScript']
for (const i in A) {    
     console.log(A[i])		
} 

// for of 반복문.
console.log('\nFor of loop examples:')

A = ['I', 'like', 'JavaScript']
for (const a of A) {    
    console.log(a)		
} 

let range = [...new Array(101).keys()]      // 0~100 구간을 나타내는 배열.
range.shift()                               // 1~100 구간을 나타내는 배열.
sum = 0
for (const i of range){
    sum += i
}
console.log('1에서 100 까지의 합은 = ',sum)
