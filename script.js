/* ===============================
CONFIG
=============================== */

const MIN_REMAIN = 5000

/* ===============================
DOM
=============================== */

const salary = document.getElementById("salary")
const income = document.getElementById("income")
const deduct = document.getElementById("deduct")
const remain = document.getElementById("remain")
const remainAfter = document.getElementById("remainAfter")
const installment = document.getElementById("installment")

const rule1 = document.getElementById("rule1")
const rule2 = document.getElementById("rule2")
const result = document.getElementById("result")

const reason = document.getElementById("reason")
const debtRow = document.getElementById("debtRow")
const oldDebt = document.getElementById("oldDebt")

const month = document.getElementById("month")
const oneThirdText = document.getElementById("oneThird")

const resultBox = document.getElementById("result")

/* ===============================
MONTH LIST
=============================== */

const months = [
"มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
"พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม",
"กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
]

months.forEach((m,i)=>{
const op=document.createElement("option")
op.value=i
op.textContent=m
month.appendChild(op)
})

month.value=new Date().getMonth()

/* ===============================
UTILS
=============================== */

function format1(n){
return Number(n).toLocaleString("en-US",{minimumFractionDigits:1,maximumFractionDigits:1})
}

function format0(n){
return Number(n).toLocaleString("en-US")
}

function parse(v){
return Number((v||"").replace(/,/g,""))||0
}

/* ===============================
INPUT GUARD + FORMAT
=============================== */

document.querySelectorAll(".numInput").forEach(el=>{

// กันตัวอักษร
el.addEventListener("keypress",e=>{
if(!/[0-9.,]/.test(e.key)) e.preventDefault()
})

// คำนวณทันที
el.addEventListener("input",calculate)

// format ตอนออก
el.addEventListener("blur",()=>{
let val=parse(el.value)
if(val!==0) el.value=format1(val)
})

})

/* ===============================
LOAN FORMAT
=============================== */

document.getElementById("loan").addEventListener("input",(e)=>{
let val=parse(e.target.value)
e.target.value=format0(val)
})

/* ===============================
REASON SWITCH
=============================== */

reason.addEventListener("change",()=>{
debtRow.classList.toggle("hidden",reason.value!=="system")
})

/* ===============================
CALCULATE
=============================== */

function calculate(){

let inc=parse(income.value)
let ded=parse(deduct.value)

let remainMoney=inc-ded

remain.textContent=format1(remainMoney)

let old=parse(oldDebt.value)
let newDebt=parse(installment.value)

let afterLoan =
reason.value==="system"
? remainMoney + old - newDebt
: remainMoney - newDebt

remainAfter.textContent=format1(afterLoan)

/* 1/3 rule */

let oneThird=inc/3

if(oneThirdText){
oneThirdText.textContent=format1(oneThird)
}

/* RULE CHECK */

let pass1 = afterLoan > oneThird
let pass2 = afterLoan > MIN_REMAIN

rule1.className = pass1 ? "green" : "red"
rule2.className = pass2 ? "green" : "red"

/* RESULT */

let pass = pass1 && pass2

result.textContent = pass ? "ผ่านหลักเกณฑ์" : "ไม่ผ่านหลักเกณฑ์"
result.className = pass ? "result green" : "result red"

}

/* ===============================
AUTO SELECT INPUT
=============================== */

document.querySelectorAll("input").forEach(i=>{
i.addEventListener("focus",()=>i.select())
})

/* ===============================
CLOCK
=============================== */

function updateTime(){

const now=new Date()

const date=now.toLocaleDateString("th-TH")
const time=now.toLocaleTimeString("th-TH")

document.getElementById("datetime").innerHTML=date+"<br>"+time

}

setInterval(updateTime,1000)
updateTime()

/* ===============================
RESET
=============================== */

function resetForm(){

document.querySelectorAll("input").forEach(i=>i.value="")

remain.textContent="0.0"
remainAfter.textContent="0.0"
document.getElementById("oneThird").textContent="0.0"

result.textContent=""

rule1.className=""
rule2.className=""

}

/* ===============================
SAVE IMAGE
=============================== */

function saveImage(){

const resetBtn=document.getElementById("resetBtn")
const saveBtn=document.getElementById("saveBtn")
const element=document.querySelector(".container")

resetBtn.style.display="none"
saveBtn.style.display="none"

html2canvas(element,{
scale:2,
useCORS:true,
allowTaint:false
}).then(canvas=>{

const link=document.createElement("a")

let now=new Date()

let filename=
"pran43rd-loan-calculator-" +
now.getFullYear()+"-" +
String(now.getMonth()+1).padStart(2,'0')+"-" +
String(now.getDate()).padStart(2,'0')+"-" +
String(now.getHours()).padStart(2,'0') +
String(now.getMinutes()).padStart(2,'0') +
String(now.getSeconds()).padStart(2,'0')

link.download=filename+".png"
link.href=canvas.toDataURL("image/png")

link.click()

})
.catch(err=>{
console.error(err)
alert("ไม่สามารถบันทึกภาพได้")
})
.finally(()=>{
resetBtn.style.display="inline-block"
saveBtn.style.display="inline-block"
})

}
function calculate(){

resultBox.textContent = "กำลังคำนวณ..."
resultBox.className = "result loading"

setTimeout(()=>{

let inc=parse(income.value)
let ded=parse(deduct.value)

let remainMoney=inc-ded
remain.textContent=format1(remainMoney)

let old=parse(oldDebt.value)
let newDebt=parse(installment.value)

let afterLoan

if(reason.value==="system"){
afterLoan = remainMoney + old - newDebt
}else{
afterLoan = remainMoney - newDebt
}

remainAfter.textContent=format1(afterLoan)

let oneThird=inc/3
document.getElementById("oneThird").textContent = format1(oneThird)

let pass1=afterLoan>oneThird
let pass2=afterLoan>5000

rule1.className=pass1?"green":"red"
rule2.className=pass2?"green":"red"

if(pass1 && pass2){
resultBox.textContent="ผ่านหลักเกณฑ์"
resultBox.className="result green"
}else{
resultBox.textContent="ไม่ผ่านหลักเกณฑ์"
resultBox.className="result red"
}

},300) // ดีเลย์ 0.3 วิ (กำลังสวย)
}
