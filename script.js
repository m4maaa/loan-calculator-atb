function formatMoney(num){
return Number(num).toLocaleString('en-US',{
minimumFractionDigits:1,
maximumFractionDigits:1
});
}

function calculate(){

let month=document.getElementById("month").value;

let salary=parseFloat(document.getElementById("salary").value.replace(/,/g,''))||0;
let receive=parseFloat(document.getElementById("totalReceive").value.replace(/,/g,''))||0;
let deduct=parseFloat(document.getElementById("deduct").value.replace(/,/g,''))||0;

let newPay=parseFloat(document.getElementById("newPay").value.replace(/,/g,''))||0;
let oldDebt=parseFloat(document.getElementById("oldDebt").value.replace(/,/g,''))||0;

let installment=document.getElementById("installment").value;

let allowed=[48,60,72,84,96,108,120];

if(!allowed.includes(Number(installment))){
document.getElementById("installmentError").innerHTML="✘ งวดต้องเป็น 48 60 72 84 96 108 120";
document.getElementById("installmentError").style.color="red";
return;
}else{
document.getElementById("installmentError").innerHTML="";
}

let remainNow=receive-deduct;

document.getElementById("remainText").innerHTML=
"ประจำเดือน "+month+" เหลือรับ : "+formatMoney(remainNow);

let remainAfter=remainNow+oldDebt-newPay;

document.getElementById("remainAfter").innerHTML=formatMoney(remainAfter);

let oneThird=Math.ceil((receive/3)*10)/10;

document.getElementById("oneThird").innerHTML=formatMoney(oneThird);

let passThird=remainAfter>=oneThird;
let passFive=remainAfter>=5000;

document.getElementById("ruleThird").innerHTML=
passThird?"✔ ผ่านเกณฑ์ 1 ใน 3":"✘ ไม่ผ่านเกณฑ์ 1 ใน 3";

document.getElementById("ruleThird").className=passThird?"pass":"fail";

document.getElementById("ruleFive").innerHTML=
passFive?"✔ ผ่านเกณฑ์ขั้นต่ำ 5,000":"✘ ไม่ผ่านเกณฑ์ขั้นต่ำ 5,000";

document.getElementById("ruleFive").className=passFive?"pass":"fail";

if(passThird && passFive){

document.getElementById("finalResult").innerHTML="✔ ผ่านเกณฑ์";
document.getElementById("finalResult").className="pass";

}else{

document.getElementById("finalResult").innerHTML="✘ ไม่ผ่านเกณฑ์";
document.getElementById("finalResult").className="fail";

}

}

document.getElementById("reason").addEventListener("change",function(){

let text=this.value;

if(text.includes("ในระบบ")){

document.getElementById("oldDebtBox").style.display="block";

}else{

document.getElementById("oldDebtBox").style.display="none";

}

});
