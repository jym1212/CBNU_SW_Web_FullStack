//2024.07.22
//base2.js 모듈 생성

//base1 모듈을 참조해서 odd, even, test 함수 참조
//base1.js export module의 노출 객체를 객체 비구조화 할당 방식으로 변수 odd, even, 함수 test 참조
const {odd, even, test} = require('./base1.js'); //객체 비구조화 할당

/* 
== const {odd, even, test} = {
        odd: odd,
        even: even,
        test: test
   } 
*/

//전달되는 숫자가 홀수인지 짝수인지 체크해서 홀짝 문자열 상수 반환
//숫자를 전달하면 문자열로 홀수이면 홀수입니다란 문자열 반환, 짝수면 짝수입니다란 문자열 반환
function checkOddOrEven(num){
    //나누기 연산자 /, 나머지 연산자 % 
    //ex) num=10 이면 10/2의 나머지값 : 0 
    //만약에 num/2로 나눈 값이 0=false 아니면 1=true

    if(num % 2){
        //나머지값이 1(true)인 경우만 (홀수면) odd 문자열 반환
        return odd;
    }
    //나머지값이 0(false)인 경우만 (짝수면) even
    return even;
}

console.log("base2.js 에서 사용하는 base1.js의 test 함수 호출 :", test);

//module.exports를 통해 checkOddOrEven 함수를 모듈로 만들어(외부로 노출) 다른 모듈에서 사용 가능
module.exports = checkOddOrEven;