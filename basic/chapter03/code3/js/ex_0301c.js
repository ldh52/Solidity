//
// 문서 객체 모델 - 예시 1.c.
//

// 새로운 요소를 동적으로 추가 또는 삭제해 본다.

let tagParent, tagChild

console.log('\nappendChild()로 요소 한개를 동적으로 추가해 본다.')
tagParent = document.querySelector('ol')
tagChild = document.createElement('li')                // 자식 요소 생성.
tagChild.textContent = '아이템 여섯'
tagChild.style.color = 'red'
tagChild.style.backgroundColor = 'yellow'
tagParent.appendChild(tagChild)                        // 자식 요소 추가.

console.log('\nappendChild()를 반복적으로 실행해서 요소 여러개를 추가해 본다.')
for (let i=7; i< 12; i++){
    tagChild = document.createElement('li')            // 자식 요소 생성.
    tagChild.textContent = '아이템 #' + i
    tagChild.style.color = 'green'
    tagChild.style.backgroundColor = 'orange'
    tagParent.appendChild(tagChild)                    // 자식 요소 추가.
}

console.log('\ninnerHTML 속성을 사용해서 요소 여러개를 동적으로 추가해 본다.')
let contentOld = tagParent.innerHTML
let styleNew = 'style="color:blue; background-color: grey; font-weight:bold;"'
let contentNew = `<li ${styleNew}>요소 a</li>
                  <li ${styleNew}>요소 b</li>
                  <li ${styleNew}>요소 c</li>`
tagParent.innerHTML = contentOld + contentNew;

console.log('\ninsertAdjacentHTML()을 실행해서 요소 여러개를 동적으로 추가해 본다.')
let styleAppend = 'style="color:yellow; background-color:purple; font-weight:bold;"'
let contentAppend = `<li ${styleAppend}>요소 d</li>
                  <li ${styleAppend}>요소 e</li>
                  <li ${styleAppend}>요소 f</li>`
tagParent.insertAdjacentHTML('beforeend', contentAppend)

console.log('\n요소 한개를 동적으로 삭제해 본다.')
tagParent = document.querySelector('ol')
tagChild = document.querySelector('#myItem')
tagParent.removeChild(tagChild)                        // 자식 요소 한개만 삭제.
// tagParent.remove()                                   // 부모 이하 모든 요소 삭제.
// tagChild.remove()
