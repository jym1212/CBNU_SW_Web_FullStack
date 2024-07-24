//2024.07.22
//base1.js 모듈 생성

const odd = "홀수입니다.";
const even = "짝수입니다.";

function test(){
    console.log("base1.js 모듈에서 실행되는 test 함수입니다.");
    return "testing..."
}

//객체 속성명: 객체 속성값
//자바스크립트 객체의 속성명과 속성에 할당되는 변수(상수)명이 같으면 변수/상수명 생략 가능
//module.exports를 통해 객체 형태로 odd, even, test를 모듈로 만들어(외부로 노출) 다른 모듈에서 사용 가능
module.exports = {
    odd,
    even: even,
    test: test
}