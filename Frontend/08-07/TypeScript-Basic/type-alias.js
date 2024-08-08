//2024.08.08
//개발자 정의 타입(Type Alias) 실습
var sample;
sample = "안녕하세요";
console.log("sample(string) :", sample);
sample = 123;
console.log("sample(number) :", sample);
//MemberType 타입 객체 선언하고 값 할당
var personData = {
    name: "정윤민",
    age: 23,
    address: {
        city: "Daejeon",
        country: "Korea"
    }
};
//함수의 매개변수로 MemberType 타입을 사용
function printPersonInfo(person) {
    console.log("name: ".concat(person.name, ", age: ").concat(person.age, ", address: ").concat(person.address.city, ", ").concat(person.address.country));
}
printPersonInfo(personData);
function plus(a, b) {
    return a + b;
}
//function plus(a: number, b: number, c: number): number
function minus(a, b) {
    return a - b;
}
//자바스크립트 함수는 특정 함수의 매개변수로 전달 가능 (함수 = 객체 타입)
//calculate() 함수에 계산 함수를 매개변수로 전달, 로직 처리를 전달된 매개변수 함수를 통해 처리
function calculate(a, b, calFunc) {
    return calFunc(a, b);
}
console.log("plus(10, 5) :", calculate(10, 5, plus));
console.log("minus(10, 5) :", calculate(10, 5, minus));
function addNumbers(input) {
    var a = input.a, b = input.b;
    return { result: a + b };
}
var input = { a: 5, b: 3 };
var output = addNumbers(input);
console.log("addNumbers(5, 3) :", output);
