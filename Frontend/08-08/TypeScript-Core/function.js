//2024.08.08
//함수(function) type 실습
//1. 함수의 매개변수 타입과 반환 타입 지정
function add1(a, b) {
    return a + b;
}
//함수 반환값이 없을 때 void로 타입 지정
function add2(a, b) {
    console.log("add2 결과값 :", a + b);
}
var data1 = 10;
var data2 = 20;
var result1 = add1(data1, data2);
console.log("add1 결과값 :", result1);
add2(data1, data2);
//2. 일반 함수
function greeting1(name) {
    return "Hello, ".concat(name, "!");
}
//3. 익명 함수
var greeting2 = function (name) {
    return "Hello, ".concat(name, "!");
};
//4. 화살표 함수
var greeting3 = function (name) {
    return "Hello, ".concat(name, "!");
};
console.log("greeting1 :", greeting1("Kim"));
console.log("greeting2 :", greeting2("Lee"));
console.log("greeting3 :", greeting3("Park"));
//5. 함수 매개변수 기본 값 설정
//선택적 매개변수(optional) ?는 해당 매개변수에 필수적으로 값 전달하지 않아도 됨.
//주의 : 선택적 매개변수는 항상 필수 매개변수 먼저 정의한 뒤에 사용해야 함.
function greet(name, greeting) {
    if (name === void 0) { name = "Guest"; }
    if (greeting) {
        return "".concat(greeting, ", ").concat(name, "!");
    }
    else {
        return "Hello, ".concat(name, "!");
    }
}
//매개변수 전달하지 않으면 기본 값 제공
console.log(greet());
//선택적 매개변수는 전달하지 않아도 됨.
console.log(greet("Jeong"));
//모든 매개변수 전달
console.log(greet("정윤민", "안녕하세요"));
//6. 함수 매개변수로 함수 전달
//함수 타입명 = (매개변수 타입): 반환값 타입
function plus(a, b) {
    return a + b;
}
function minus(a, b) {
    return a - b;
}
function calculate(a, b, calFunc) {
    return calFunc(a, b);
}
console.log("plus(10, 5) :", calculate(10, 5, plus));
console.log("minus(10, 5) :", calculate(10, 5, minus));
