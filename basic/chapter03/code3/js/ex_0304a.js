//
// DOM jQuery 버전 - 예시 1.a.
//

// 요소에 접근해서 내용을 가져와 본다.

let myTags, len

console.log('\n요소에 접근해 본다.')

console.log('\n태그의 유형별 접근해서 내용을 가져와 본다.')
// p 태그.
console.log('\np 태그:')
myTags = $('p')
len = myTags.length                        
for (let i=0; i <len; i++){            
     console.log( $(`p:eq(${i})`).text())
}

// span 태그.
// console.log('\nspan 태그:')
// myTags = $('span')
// len = myTags.length
// for (let i=0; i <len; i++){            
//     console.log( $(`span:eq(${i})`).text())
// }

// li 태그.
// console.log('\nli 태그:')
// myTags = $('li')
// len = myTags.length
// for (let i=0; i <len; i++){            
//     console.log( $(`li:eq(${i})`).text())
// }

// 한번에 모두 출력.
// console.log($('li').text())

// console.log('\n태그의 Class별 접근해서 내용을 가져와 본다.')
// console.log('\ncls1 태그:')
// myTags = $('.cls1')                    
// console.log(myTags.text())

// console.log('\ncls2 태그:')
// myTags = $('.cls2')                    
// console.log(myTags.text())

// console.log('\n태그의 ID로 접근해서 내용을 가져와 본다.')
// console.log('\nmyItem 태그:')  

// myTag = document.querySelector('#myItem')

// console.log($('#myItem').html())
// console.log($('#myItem').text())
// console.log($('#myItem').attr('id'))                       // id 속성.
// console.log($('#myItem').css('color'))                    // inline style의 color.
// console.log($('#myItem').css('background-color'))         // inline 속성으로 정의되어 있지는 않아서 제대로 출력되지 않는다.

// console.log('\n셀렉터로 접근 후 부모, 자식, 형제 등을 가져와 본다.')
// console.log($('ol').parent().text())
// console.log($('#myItem').siblings().text())
// console.log($('ol').children().text())
// console.log($('#second').find('.cls3').text())