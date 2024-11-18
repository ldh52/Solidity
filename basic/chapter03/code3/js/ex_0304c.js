//
// DOM jQuery 버전 - 예시 1.c.
//

// 새로운 요소를 동적으로 추가 또는 삭제해 본다.

let tagParent, tagChild

console.log('\n요소 한개를 동적으로 추가해 본다.')
$('ol').append('<li></li>')         // 끝에 li 태그 추가.
$('ol>li:last').text('아이템 여섯')  // 마지막 li 태그의 내용.
$('ol>li:last').css('color','red')
$('ol>li:last').css('background-color','yellow')


console.log('\n요소 여러개를 동적으로 추가해 본다.')
for (let i=7; i< 12; i++){
    $('ol').append('<li></li>')         // 끝에 li 태그 추가.
    $('ol>li:last').text('아이템 #'+i)  // 마지막 li 태그의 내용.
    $('ol>li:last').css('color','green')
    $('ol>li:last').css('background-color','orange')
}

console.log('\nhtml() 메소드를 실행해서 요소 여러개를 동적으로 추가해 본다.')
let contentOld = $('ol').html()        // 현재의 html.
let styleNew = 'style="color:blue; background-color: grey; font-weight:bold;"'
let contentNew = `<li ${styleNew}>요소 a</li>
                  <li ${styleNew}>요소 b</li>
                  <li ${styleNew}>요소 c</li>`
$('ol').html(contentOld + contentNew)  // html 업데이트.

console.log('\nappend() 메소드를 한번 실행해서 요소 여러개를 동적으로 추가해 본다.')
let styleAppend = 'style="color:yellow; background-color:purple; font-weight:bold;"'
let contentAppend = `<li ${styleAppend}>요소 d</li>
                  <li ${styleAppend}>요소 e</li>
                  <li ${styleAppend}>요소 f</li>`
$('ol').append(contentAppend)

console.log('\n요소 한개를 동적으로 삭제해 본다.')
$('#myItem').remove()              // 삭제.
// $('#myItem').empty()            // 자식 (내용) 지움.
