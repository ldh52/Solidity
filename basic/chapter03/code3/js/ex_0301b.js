//
// 문서 객체 모델 - 예시 1.b.
//

// 요소에 접근해서 속성을 바꿔본다.

let myTag, myTags

console.log('\n임의의 태그에 접근해서 속성을 바꿔본다.')
// p 태그.
console.log('\np 태그:')
//myTags = document.getElementsByTagName('p')
myTags = document.querySelectorAll('p')
for (const item of myTags){
    item.style.color='aqua'
    item.style.backgroundColor='steelblue'
    item.style.margin='30px'
}

// h1 태그.
console.log('\nh1 태그:')
//myTags = document.getElementsByTagName('h1')
myTags = document.querySelectorAll('h1')
for (const item of myTags){
    item.style.fontFamily='Times New Roman'
    item.style.fontSize='40px'
    item.style.fontWeight='100'
    item.style.paddingLeft='20px'
    item.style.borderLeft='10px solid red'
}

// li 태그.
console.log('\nli 태그:')
//myTags = document.getElementsByTagName('li')
myTags = document.querySelectorAll('li')
for (const i in myTags){            // For ~ in 반복문!
    myTags[i].innerHTML=`<strong> Item #${Number(i)+1}. </strong>`    // <strong>태그 포함 새로운 내용.
    // myTags[i].textContent =`Item #${Number(i)+1}.`                  // 태그 미포함 새로운 내용. 
}

// class = "cls2" 태그.
console.log('\nclass = "cls2" 태그:')
//myTags = document.getElementsByClassName('cls2')    // '.cls2' 아님!
myTags = document.querySelectorAll('.cls2')
for (const item of myTags){
    item.style.fontSize='30px'
}

// id = "myItem" 태그.
console.log('\nid = "myItem" 태그:')
myTag = document.getElementById('myItem')
myTag.style.fontSize='30px'