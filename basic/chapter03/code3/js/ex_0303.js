//
// 이벤트 핸들링.
//

let btn1, btn2, btn3, btn4, ipt1, ipt2, show, slt
let count1 = 0 
let count2 = 0

btn1 = document.getElementById('btn1')
btn2 = document.getElementById('btn2')
btn3 = document.getElementById('btn3')
btn4 = document.getElementById('btn4')

ipt1 = document.getElementById('ipt1')
ipt2 = document.getElementById('ipt2')

show = document.getElementById('show')

slt = document.getElementById('slt')

// 페이지 로딩되면 실행.
window.onload = function(){alert('DOM과 모든 페이지의 요소 로딩 완료!!')}   

// 이벤트 핸들러 부착.

// 클릭.
btn1.addEventListener('click', handleBtn1Click)
btn2.addEventListener('click', handleBtn2Click)
btn3.addEventListener('click', handleBtn3Click)
btn4.addEventListener('click', handleBtn4Click)

// 마우스 오버.
btn1.addEventListener('mouseover', handleBtn1MouseOver)
btn2.addEventListener('mouseover', handleBtn2MouseOver)
btn3.addEventListener('mouseover', handleBtn3MouseOver)
btn4.addEventListener('mouseover', handleBtn4MouseOver)

// 내용 변경.
// ipt1.addEventListener('change',handleIpt1Change)
// ipt2.addEventListener('change',handleIpt2Change)
slt.addEventListener('change',handleSltChange)

// 키 누름.
ipt1.addEventListener('keypress', handleIpt1KeyPress)
ipt2.addEventListener('keypress', handleIpt2KeyPress)

// 이벤트 핸들러 함수.

// 클릭 핸들러.
function handleBtn1Click() {
    show.textContent = '버튼 1 클릭!'
}

function handleBtn2Click() {
    show.textContent = '버튼 2 클릭!'
}

function handleBtn3Click() {
    show.textContent = '버튼 3 클릭!'
}

function handleBtn4Click(){
    show.textContent = `안녕! ${ipt1.value} ${ipt2.value}~~   선택=${slt.value}` 
    ipt1.value=''
    ipt2.value=''
    slt.value='선택_1'
    count1 = 0
    count2 = 0
}

// 마우스오버 핸들러.
function handleBtn1MouseOver() {
    show.textContent = '버튼 1 마우스 오버!'
}

function handleBtn2MouseOver() {
    show.textContent = '버튼 2 마우스 오버!'
}

function handleBtn3MouseOver() {
    show.textContent = '버튼 3 마우스 오버!'
}

function handleBtn4MouseOver() {
    show.textContent = '제출 버튼 마우스 오버!'
}

// 내용변경 핸들러.
// function handleIpt1Change(){
//     show.textContent = '입력 1 변경~'
// }

// function handleIpt2Change(){
//     show.textContent = '입력 2 변경~'
// }

function handleSltChange(){
    show.textContent = '선택 변경~'
}

// 키 누름 핸들러.
function handleIpt1KeyPress(e){
     count1++
     show.textContent = count1
}

function handleIpt2KeyPress(e){
     count2++
     show.textContent = count2 
}