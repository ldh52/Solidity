//
// DOM jQuery 버전 - 예시 2.
//

// 요소에 접근해서 속성을 바꾸어 본다.

console.log('\n임의의 태그에 접근해서 속성을 직접 바꿔본다.')
console.log('\nmyClass2 태그:')
let len = $('.myClass2').length
for (let i = 0; i < len; i++){                  
    console.log($('.myClass2').eq(i).text())            // 문자열 내용.
    console.log($('.myClass2').eq(i).attr('class'))     // class 속성 확인.
    console.log($('.myClass2').eq(i).attr('id')??'')    // id 속성 출력. 주의: nullish 연산자 사용.
}
$('.myClass2').css({"color":"red", "margin":"20px", 'border':"3px solid blue"})
//$('.myClass2').removeAttr('style')           // inline style 속성 제거.

console.log('\n임의의 태그에 접근해서 class를 바꿔본다.')
console.log('\nmyClass1 태그:')
myTags = $('.myClass1')
myTags.removeClass('myClass1')        // 기존의 class 제거.
myTags.addClass('myClass2')           // 새로운 class 추가.
myTags.toggleClass('myClass2')        // Class off.
myTags.toggleClass('myClass2')        // Class on.
//myTags.removeClass('myClass2').addClass('myClass1')    // replaceClass는 없다!!! myClass2를 myClass1로.
