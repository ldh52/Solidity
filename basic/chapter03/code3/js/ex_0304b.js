//
// DOM jQuery 버전 - 예시 1.b.
//

// 요소에 접근해서 속성을 바꿔본다.
let myTags, len

console.log('\n임의의 태그에 접근해서 속성을 바꿔본다.')
// p 태그.
// console.log('\np 태그:')
// $('p').css('color','aqua')
// $('p').css('background-color','steelblue')
// $('p').css('margin','30px')
// $('p').css( {"color":"aqua", "background-color":"steelblue", "margin":"30px"})   // JSON.


// h1 태그.
// console.log('\nh1 태그:')
// $('h1').css('font-family','Times New Roman')
// $('h1').css('font-size', '40px')
// $('h1').css('font-weight','100')
// $('h1').css('padding-left','20px')
// $('h1').css('border-left','10px solid red')
// $('h1').css( {"font-family":"Times New Roman",  "font-size": "40px", "font-weight":"100", "padding-left":"20px", "border-left":"10px solid red" })  // JSON.

// li 태그.
// console.log('\nli 태그:')
// myTags = $('li')        
// len = myTags.length             
// for (let i = 0; i < len; i++){
//     $(`li:eq(${i})`).html(`<strong> Item #${Number(i)+1}. </strong>`)   // <strong>태그 포함 새로운 내용.
// }

// class = "cls2" 태그.
// console.log('\nclass = "cls2" 태그:')
// $('.cls2').css('font-size','30px')

// id = "myItem" 태그.
// console.log('\nid = "myItem" 태그:')
// $('#myItem').css('font-size', '30px')