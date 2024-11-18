//
// JavaScript의 조건문 제어 구조.
// 

// 주의 : Live Server를 실행해서 Chrome에서 볼수 있도록 해야 한다.
//         먼저 ex_0210.html을 통해서 실행된다.

// if ~ else if ~ else 조건문.

// 예시 1.
let x = prompt('1: How old are you?')
x = Number(x)                                 // 수치형 변환.
if (x < 8) {
    alert(`At ${x}, you are too young!`) 
    }
else if ( x >=8 && x<20 ) {
    alert( `At ${x}, you must be a student.`)
    }
else {
    alert('Over 20 is an adult!')
}

// 예시 2.
x = prompt('2: How old are you?')
x = Number(x)                                 // 수치형 변환.
if (x == 14 || x==15 || x == 16) {
    alert('You must be at middle school.') 
    }
else if ( x == 17 || x== 18 || x==19 ) {
    alert( 'You must be at hight school.')
    }
else {
    alert('You are either too young or too old.')
}

// switch~case 조건문.
// 예시 3.
x = prompt('3: How old are you?')
x = Number(x)                                 // 수치형 변환.
switch(x){
    case 14: 
    case 15:
    case 16:
        alert('You must be at middle school.')
        break
    case 17:
    case 18:
    case 19:
        alert( 'You must be at hight school.')
        break
    default:
        alert('You are either too young or too old.')
        break
}

// 예시 4.
x = prompt('4: How old are you?')
x = Number(x)                                 // 수치형 변환.
switch(true){
    case  x == 14 || x==15 || x == 16 :
        alert('You must be at middle school.')
        break
    case  x == 17 || x== 18 || x==19: 
        alert( 'You must be at hight school.')
        break
    default:
        alert('You are either too young or too old.')
        break
}