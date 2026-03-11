
const salary = document.getElementById("salary")
const income = document.getElementById("income")
const deduct = document.getElementById("deduct")
const remain = document.getElementById("remain")

const installment = document.getElementById("installment")
const rule1 = document.getElementById("rule1")
const rule2 = document.getElementById("rule2")
const result = document.getElementById("result")

const reason = document.getElementById("reason")
const debtRow = document.getElementById("debtRow")
const oldDebt = document.getElementById("oldDebt")

const month = document.getElementById("month")

const months = [
"มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
"พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม",
"กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
]

months.forEach((m,i)=>{
let op=document.createElement("option")
op.value=i
op.textContent=m
month.appendChild(op)
})

month.value=new Date().getMonth()

function format1(n){
return Number(n).toLocaleString("en-US",{minimumFractionDigits:1,maximumFractionDigits:1})
}

function format0(n){
return Number(n).toLocaleString("en-US")
}

function parse(v){
return Number(v.replace(/,/g,""))||0
}

document.querySelectorAll(".numInput").forEach(el=>{

// คำนวณทันทีตอนพิมพ์ แต่ยังไม่ format
el.addEventListener("input",()=>{
calculate()
})

// format ตอนออกจากช่อง
el.addEventListener("blur",()=>{

let val=parse(el.value)

if(val!==0){
el.value=format1(val)
}

})

})

document.getElementById("loan").addEventListener("input",(e)=>{
let val=parse(e.target.value)
e.target.value=format0(val)
})

reason.addEventListener("change",()=>{

if(reason.value==="system"){

debtRow.classList.remove("hidden")

}else{

debtRow.classList.add("hidden")

}

})

function calculate(){

let inc=parse(income.value)
let ded=parse(deduct.value)

let remainMoney=inc-ded

remain.textContent=format1(remainMoney)

let oneThird=inc/3

let afterLoan=remainMoney-parse(installment.value)

let pass1=afterLoan>oneThird
let pass2=afterLoan>5000

rule1.className=pass1?"green":"red"
rule2.className=pass2?"green":"red"

if(pass1 && pass2){

result.textContent="ผ่านหลักเกณฑ์"
result.className="result green"

}else{

result.textContent="ไม่ผ่านหลักเกณฑ์"
result.className="result red"

}

}
document.querySelectorAll("input").forEach(input=>{
input.addEventListener("focus",function(){
this.select()
})
})
function resetForm(){

document.querySelectorAll("input").forEach(i=>i.value="")
remain.textContent="0.0"
result.textContent=""

rule1.className=""
rule2.className=""

}
