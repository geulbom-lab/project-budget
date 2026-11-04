const {test}=require('node:test'),assert=require('node:assert/strict'),C=require('./core.js');
const expense={id:'demo',date:'2026-11-04',vendor:'가상 사용처',category:'자료·제작',amount:25000,purpose:'가상 기록',evidence:'',confirmed:false};
const d={version:1,name:'예제',budget:100000,expenses:[expense],journals:[]};
test('예산과 미확인 증빙 합계',()=>assert.deepEqual(C.totals(d),{spent:25000,remaining:75000,missing:1}));
test('백업은 유효한 양식만 허용',()=>{assert(C.valid(d));assert(!C.valid({...d,expenses:[{...expense,amount:-1}]}));assert(!C.valid({...d,journals:[{}]}));assert(!C.valid({...d,budget:'100'}));});
test('CSV 셀 수식과 따옴표 처리',()=>{const csv=C.csv({...d,expenses:[{...expense,vendor:'=1+1',purpose:'"테스트"\n다음 줄'}]});assert(csv.includes('"\'=1+1"'));assert(csv.includes('""테스트""'));});
