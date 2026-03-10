function calculate(){

let salary = Number(document.getElementById("salary").value);
let psr1 = Number(document.getElementById("psr1").value);
let psr2 = Number(document.getElementById("psr2").value);
let psr3 = Number(document.getElementById("psr3").value);
let psr4 = Number(document.getElementById("psr4").value);
let other = Number(document.getElementById("other").value);

let deduct = Number(document.getElementById("deduct").value);
let debtAmount = Number(document.getElementById("debtAmount").value);

let totalIncome = salary + psr1 + psr2 + psr3 + psr4 + other;

let remainNow = totalIncome - deduct;

let oneThird = totalIncome / 3;

let remainAfter = totalIncome - (deduct - debtAmount);

document.getElementById("totalIncome").innerText = totalIncome.toFixed(2);
document.getElementById("remainNow").innerText = remainNow.toFixed(2);

document.getElementById("oneThird").innerText = oneThird.toFixed(2);
document.getElementById("remainAfter").innerText = remainAfter.toFixed(2);

let resultBox = document.getElementById("resultBox");
let status = document.getElementById("status");

if(remainAfter >= oneThird && remainAfter >= 5000){

resultBox.className = "result-box result-pass";

status.innerHTML = "✔ ผ่านเกณฑ์ระเบียบหน่วย";

}else{

resultBox.className = "result-box result-fail";

status.innerHTML = "✖ ไม่ผ่านเกณฑ์";

}

}
