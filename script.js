function formatLive(input){

let value=input.value.replace(/,/g,'');

if(value==="" || isNaN(value)) return;

let num=parseFloat(value);

input.value=num.toLocaleString('en-US',{

minimumFractionDigits:1,
maximumFractionDigits:1

});

}

function getNumber(id){

let val=document.getElementById(id).value.replace(/,/g,'');

return parseFloat(val)||0;

}

function calculate(){

let month=document.getElementById("month").value;

let receive=getNumber("receive");
let deduct=getNumber("deduct");

let oldDebt=getNumber("oldDebt");
let newPay=getNumber("newPay");

let installment=parseInt(document.getElementById("installment").value);

let allowed=[48,60,72,84,96,108,120];

if(!allowed.includes(installment)){

document.getElementById("installmentError").innerText=
"จำนวนงวดต้องเป็น 48 60 72 84 96 108 120";

return;

}else{

document.getElementById("installmentError").innerText="";

}

let remainNow=receive-deduct;

document.getElementById("remainNow").innerText=
"ประจำเดือน "+month+" เหลือรับ "+remainNow.toLocaleString();

let remainAfter=remainNow+oldDebt-newPay;

document.getElementById("remainAfter").innerText=

remainAfter.toLocaleString('en-US',{minimumFractionDigits:1});

let oneThird=Math.ceil((receive/3)*10)/10;

document.getElementById("oneThird").innerText=
oneThird.toLocaleString('en-US',{minimumFractionDigits:1});

let passThird=remainAfter>=oneThird;
let passFive=remainAfter>=5000;

let r3=document.getElementById("ruleThird");
let r5=document.getElementById("ruleFive");

r3.innerText=passThird?"✔ ผ่านเกณฑ์ 1 ใน 3":"✘ ไม่ผ่านเกณฑ์ 1 ใน 3";
r3.className=passThird?"pass":"fail";

r5.innerText=passFive?"✔ ผ่านเกณฑ์ขั้นต่ำ 5,000":"✘ ไม่ผ่านเกณฑ์ขั้นต่ำ 5,000";
r5.className=passFive?"pass":"fail";

let final=document.getElementById("finalResult");

if(passThird && passFive){

final.innerText="✔ ผ่านเกณฑ์";
final.className="pass";

}else{

final.innerText="✘ ไม่ผ่านเกณฑ์";
final.className="fail";

}

}

function resetForm(){

document.querySelectorAll("input").forEach(i=>i.value="");

document.getElementById("remainNow").innerText="";
document.getElementById("remainAfter").innerText="";
document.getElementById("oneThird").innerText="";
document.getElementById("ruleThird").innerText="";
document.getElementById("ruleFive").innerText="";
document.getElementById("finalResult").innerText="";

}

function printPage(){

window.print();

}

function updateTime(){

let now=new Date();

document.getElementById("datetime").innerText=

"คำนวณเมื่อ : "+now.toLocaleString("th-TH");

}

setInterval(updateTime,1000);
