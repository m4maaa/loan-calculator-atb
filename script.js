function calculate(){

let salary = Number(document.getElementById("salary").value);
let psr = Number(document.getElementById("psr").value);
let pch = Number(document.getElementById("pch").value);
let other = Number(document.getElementById("other").value);

let deduct = Number(document.getElementById("deduct").value);
let coop = Number(document.getElementById("coop").value);

let totalIncome = salary + psr + pch + other;

let oneThird = totalIncome / 3;

let newDeduct = deduct - coop;

let remain = totalIncome - newDeduct;

document.getElementById("totalIncome").innerText = totalIncome.toFixed(2);
document.getElementById("oneThird").innerText = oneThird.toFixed(2);
document.getElementById("remain").innerText = remain.toFixed(2);

if(remain >= oneThird && remain >= 5000){

document.getElementById("result").innerHTML = "✅ ผ่านเกณฑ์";

}else{

document.getElementById("result").innerHTML = "❌ ไม่ผ่านเกณฑ์";

}

}
