//2024.07.22
//index.js 모듈 생성

//base1 모듈을 참조해서 odd, even 상수 참조
const {odd, even} = require('./base1.js'); 

//base2 모듈을 참조해서 checkOddOrEven 함수 참조
const checkOddOrEven = require('./base2.js');

//문자열을 전달하면 문자열이 길이가 짝수면 짝수입니다란 문자열 반환
//홀수이면 홀수입니다란 문자열 상수를 반환
function checkStringOddOrEven(str){
    if(str.length % 2){
        //문자열 길이를 2로 나눈 나머지 값이 1(true)이면 odd 반환
        return odd;     //홀수입니다 문자열 상수 반환
    } else {
        //문자열 길이를 2로 나눈 나머지 값이 0(false)이면 event 반환
        return even;    //짝수입니다 문자열 상수 반환
    }
}

//base2.js 모듈 내 export한 checkOddOrEven 함수를 재사용함.
console.log("숫자에 대한 홀짝 체크하기 1 :", checkOddOrEven(10));
console.log("숫자에 대한 홀짝 체크하기 2 :", checkOddOrEven(5));

//홀짝 문자열 상수를 출력할 때 base1.js 모듈 내 상수를 참조하여 재사용함.
console.log("문자열 길이에 대한 홀짝 체크하기 3 :", checkStringOddOrEven('안녕'));
console.log("문자열 길이에 대한 홀짝 체크하기 4 :", checkStringOddOrEven('안녕하세요'));

//base1 모듈을 base2가 참조하고, base1, base2 모듈을 index가 참조하여 재사용