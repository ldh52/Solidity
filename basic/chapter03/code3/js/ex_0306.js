//
// 이벤트 핸들링 - jQuery 버전.
//

let count1 = 0 
let count2 = 0

// 페이지 로딩되면 실행.
// $(document).ready( function(){alert('DOM 로딩 완료!')})                           // DOM 로딩 완료.
$(function(){alert('DOM 로딩 완료!')})                                         // 위와 같은 의미.
$(window).on('load', function(){alert('DOM과 모든 페이지의 요소 로딩 완료!!')}  )  

// 이벤트 핸들러 부착.

// 클릭.
$('#btn1').on('click', handleBtn1Click)
$('#btn2').on('click', handleBtn2Click)
$('#btn3').on('click', handleBtn3Click)
$('#btn4').on('click', handleBtn4Click)


// 마우스오버.
$('#btn1').on('mouseover', handleBtn1MouseOver)
$('#btn2').on('mouseover', handleBtn2MouseOver)
$('#btn3').on('mouseover', handleBtn3MouseOver)
$('#btn4').on('mouseover', handleBtn4MouseOver)


// 내용 변경.
$('#ipt1').on('change',handleIpt1Change)
$('#ipt2').on('change',handleIpt2Change)
$('#slt').on('change',handleSltChange)

// 키 누름.
$('#ipt1').on('keypress', handleIpt1KeyPress)
$('#ipt2').on('keypress', handleIpt2KeyPress)

// 이벤트 핸들러 함수.

// 클릭 핸들러.
function handleBtn1Click() {
    $('#show').text('버튼 1 클릭!')
}

function handleBtn2Click() {
    $('#show').text('버튼 2 클릭!')
}

function handleBtn3Click() {
    $('#show').text('버튼 3 클릭!')
}

function handleBtn4Click(){
    let firstName = $('#ipt2').val()     // .attr('value')가 아니다!
    let lastName = $('#ipt1').val()      // .attr('value')가 아니다!
    let choice = $('#slt').val() 
    $('#show').text( `안녕! ${lastName} ${firstName}~~   선택=${choice}` )
    $('#ipt1').val('')               // .attr('value','')가 아니다!
    $('#ipt2').val('')               // .attr('value','')가 아니다!
    $('#slt').val('선택_1')   
    count1 = 0
    count2 = 0
}

// 마우스오버 핸들러.
function handleBtn1MouseOver() {
    $('#show').text('버튼 1 마우스 오버!')
}

function handleBtn2MouseOver() {
    $('#show').text('버튼 2 마우스 오버!')
}

function handleBtn3MouseOver() {
    $('#show').text('버튼 3 마우스 오버!')
}

function handleBtn4MouseOver() {
    $('#show').text('버튼 4 마우스 오버!')
}

// 내용변경 핸들러.
function handleIpt1Change(){
    $('#show').text('입력 1 변경~') 
}

function handleIpt2Change(){
    $('#show').text('입력 2 변경~') 
}

function handleSltChange(){
    $('#show').text('선택 변경~')
}

// 키 누름 핸들러.
function handleIpt1KeyPress(e){
    count1++
    $('#show').text(count1) 
}

function handleIpt2KeyPress(e){
    count2++
    $('#show').text(count2) 
}