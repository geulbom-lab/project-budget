'use strict';
(function(root){
function valid(d){const text=(v,n=10000)=>typeof v==='string'&&v.length<=n;const date=v=>text(v,10)&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v));return !!d&&d.version===1&&text(d.name,150)&&Number.isSafeInteger(d.budget)&&d.budget>=0&&Array.isArray(d.expenses)&&d.expenses.length<=10000&&Array.isArray(d.journals)&&d.journals.length<=10000&&d.expenses.every(e=>e&&text(e.id,100)&&date(e.date)&&text(e.vendor,200)&&text(e.category,100)&&Number.isSafeInteger(e.amount)&&e.amount>=0&&text(e.purpose,3000)&&text(e.evidence,1000)&&typeof e.confirmed==='boolean')&&d.journals.every(j=>j&&text(j.id,100)&&date(j.date)&&text(j.time,100)&&text(j.goal,300)&&text(j.work)&&text(j.result)&&text(j.evidence,1000));}
function totals(d){let spent=d.expenses.reduce((s,e)=>s+e.amount,0);return {spent,remaining:d.budget-spent,missing:d.expenses.filter(e=>!e.confirmed).length};}
function csvCell(value){let s=String(value??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
function csv(d){return '\ufeff'+[['날짜','분류','사용처','금액','목적','증빙 위치','증빙 확인'],...d.expenses.map(e=>[e.date,e.category,e.vendor,e.amount,e.purpose,e.evidence,e.confirmed?'완료':'미확인'])].map(row=>row.map(csvCell).join(',')).join('\r\n');}
const api={valid,totals,csv};if(typeof module==='object')module.exports=api;else root.BudgetCore=api;
})(typeof window!=='undefined'?window:globalThis);
