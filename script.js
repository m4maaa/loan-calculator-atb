function formatMoney(num){

return Number(num).toLocaleString('en-US',{
minimumFractionDigits:1,
maximumFractionDigits:1
});

}

function formatInput(input){

let value=input.value.replace(/,/g,'');

if(value==="") return;

let num=parseFloat(value);

if(isNaN(num)) return;

input.value=formatMoney(num);

}

function getNumber(id){

let val=document.getElementById(id).value.replace(/,/g,'');

return parseFloat(val)||0;

}

function calculate(){

let month=document.getElementById("month").value;

let salary=getNumber("salary");
let receive=getNumber("receive");
let deduct=getNumber("deduct");

let oldDebt=getNumber("oldDebt");
let newPay=getNumber("newPay");

let installment=parseInt(document.getElementById("installment").value);

let allowed=[48,60,72,84,96,108,120];

if(!allowed.includes(installment)){

document.getElementById("installmentError").innerText=
"✘ จำนวนงวดต้องเป็น 48 60 72 84 96 108 120";

return;

}else{

document.getElementById("installmentError").innerText="";

}

let remainNow=receive-deduct;

document.getElementById("remainNow").innerText=
"ประจำเดือน "+month+" เหลือรับ "+formatMoney(remainNow);

let remainAfter=remainNow+oldDebt-newPay;

document.getElementById("remainAfter").innerText=formatMoney(remainAfter);

let oneThird=Math.ceil((receive/3)*10)/10;

document.getElementById("oneThird").innerText=formatMoney(oneThird);

let passThird=remainAfter>=oneThird;
let passFive=remainAfter>=5000;

let ruleThird=document.getElementById("ruleThird");
let ruleFive=document.getElementById("ruleFive");

ruleThird.innerText=
passThird?"✔ ผ่านเกณฑ์ 1 ใน 3":"✘ ไม่ผ่านเกณฑ์ 1 ใน 3";

ruleThird.className=passThird?"pass":"fail";

ruleFive.innerText=
passFive?"✔ ผ่านเกณฑ์ขั้นต่ำ 5,000":"✘ ไม่ผ่านเกณฑ์ขั้นต่ำ 5,000";

ruleFive.className=passFive?"pass":"fail";

let final=document.getElementById("finalResult");

if(passThird && passFive){

final.innerText="✔ ผ่านเกณฑ์";
final.className="pass";

}else{

final.innerText="✘ ไม่ผ่านเกณฑ์";
final.className="fail";

}

}

document.getElementById("reason").addEventListener("change",function(){

if(this.value.includes("ในระบบ")){

document.getElementById("oldDebtBox").style.display="block";

}else{

document.getElementById("oldDebtBox").style.display="none";

}

});
