//
// 문서 객체 모델 - 예시 1.a.
//

// 요소에 접근해서 내용을 가져와 본다.

let myTag, myTags

console.log('\n요소에 접근해 본다.')
console.log(document.title)  // 문자열 출력. 
// console.log(document.head.innerHTML)   // 안에 있는 HTML 출력.
// console.log(document.body.innerHTML)   // 안에 있는 HTML 출력.

console.log('\n태그의 유형별 접근해서 내용을 가져와 본다.')
// p 태그.
console.log('\np 태그:')
//myTags = document.getElementsByTagName('p')
myTags = document.querySelectorAll('p')
for (const item of myTags){                            // for ~ of (for ~ in 이 아님!!)
    console.log(item.innerHTML)
    // console.log(item.textContent)
}
// span 태그.
console.log('\nspan 태그:')
myTags = document.getElementsByTagName('span')
//myTags = document.querySelectorAll('span')
for (const item of myTags){                             // for ~ of (for ~ in 이 아님!!)
   console.log(item.innerHTML)
//    console.log(item.textContent)
}

// li 태그.
console.log('\nli 태그:')
// myTags = document.getElementsByTagName('li')
myTags = document.querySelectorAll('li')
for (const item of myTags){                              // for ~ of (for ~ in 이 아님!!)
    // console.log(item.innerHTML)
    // console.log(item.outerHTML)
    console.log(item.textContent)
}

console.log('\n태그의 Class별 접근해서 내용을 가져와 본다.')
console.log('\ncls1 태그:')
myTags = document.getElementsByClassName('cls1')    // '.cls1' 아님!
//myTags = document.querySelectorAll('.cls1')
for (const item of myTags){                              // for ~ of (for ~ in 이 아님!!)
    // console.log(item.innerHTML)
    // console.log(item.className)           // 태그의 class 출력.
    // console.log(item.classList[0])        // 태그의 class 출력.
    console.log(item.textContent)
}

console.log('\ncls2 태그:')
//myTags = document.getElementsByClassName('cls2')    // '.cls2' 아님!
myTags = document.querySelectorAll('.cls2')
for (const item of myTags){                   // for ~ of (for ~ in 이 아님!!)
    // console.log(item.innerHTML)
    // console.log(item.className)           // 태그의 class 출력.
    // console.log(item.classList[0])        // 태그의 class 출력.
    console.log(item.textContent)
}

console.log('\n태그의 ID로 접근해서 내용을 가져와 본다.')
console.log('\nmyItem 태그:')
//myTag = document.getElementById('myItem')    // '#myItem' 아님!
myTag = document.querySelector('#myItem')
console.log(myTag.innerHTML)
console.log(myTag.id)
console.log(myTag.style.color)              // inline 스타일을 가져올 수 있다.
console.log(myTag.style.backgroudColor)     // inline 스타일이 아닌 것은 이 방식으로 가져올 수 없다.
