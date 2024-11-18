//
// 문서 객체 모델 - 예시 2.
//

// 요소에 접근해서 속성을 바꾸어 본다.

let myTag, myTags

console.log('\n임의의 태그에 접근해서 속성을 직접 바꿔본다.')
console.log('\nmyClass2 태그:')
myTags = document.querySelectorAll('.myClass2')
myTags.forEach((x)=>console.log(x.textContent))                    // 문자열 내용.
myTags.forEach((x)=>console.log(x.getAttribute('class')))          // class 속성 확인.
myTags.forEach((x)=>console.log(x.hasAttribute('id')))             // id 속성 정의 여부 확인.
myTags.forEach((x)=>{x.setAttribute('style','color:red; margin:20px; border:3px solid blue;')})
myTags.forEach((x)=>{x.removeAttribute('style')})                    // inline style 속성 제거.

console.log('\n임의의 태그에 접근해서 class를 바꿔본다.')
console.log('\nmyClass1 태그:')
myTags = document.querySelectorAll('.myClass1')
myTags.forEach((x)=>x.classList.remove('myClass1'))                // 기존의 class 제거.
myTags.forEach((x)=>x.classList.add('myClass2'))                   // 새로운 class 추가.
myTags.forEach((x)=>x.classList.toggle('myClass2'))                // Class off.
myTags.forEach((x)=>x.classList.toggle('myClass2'))                // Class on.
myTags.forEach((x)=>x.classList.replace('myClass2','myClass1'))   // myClass2를 myClass1로.