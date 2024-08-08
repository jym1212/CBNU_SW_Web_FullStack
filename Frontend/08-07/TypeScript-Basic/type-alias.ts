//2024.08.08
//개발자 정의 타입(Type Alias) 실습

//1. 개발자 정의 타입
//string, number 타입을 동시에 지원하는 StringOrNumber 타입
type StringOrNumber = string | number;
let sample: StringOrNumber;

sample = "안녕하세요";
console.log("sample(string) :", sample);

sample = 123;
console.log("sample(number) :", sample);


//2. 개발자 정의 객체 타입
//해당 속성을 가지는 MemberType 객체 타입
//회원 데이터 객체의 타입을 미리 정의하고, 데이터 할당
type MemberType = {
    name: string;
    age: number;
    address: { city: string; country: string };
};

//MemberType 타입 객체 선언하고 값 할당
let personData: MemberType = {
    name: "정윤민",
    age: 23,
    address: {
        city: "Daejeon",
        country: "Korea"
    }
};

//함수의 매개변수로 MemberType 타입을 사용
function printPersonInfo(person: MemberType) {
    console.log(`name: ${person.name}, age: ${person.age}, address: ${person.address.city}, ${person.address.country}`);
}
printPersonInfo(personData);


//3. 개발자 정의 함수 타입
//함수 구조를 타입으로 정의 (매개변수, 반환 타입)
//함수 타입명 = (매개변수 타입) => 반환값 타입
type calFuncType = (a: number, b: number) => number;

function plus(a: number, b: number): number{
    return a + b;
}
//function plus(a: number, b: number, c: number): number

function minus(a: number, b: number): number{
    return a - b;
}

//자바스크립트 함수는 특정 함수의 매개변수로 전달 가능 (함수 = 객체 타입)
//calculate() 함수에 계산 함수를 매개변수로 전달, 로직 처리를 전달된 매개변수 함수를 통해 처리
function calculate(a: number, b: number, calFunc: calFuncType): number{
    return calFunc(a, b);
}

console.log("plus(10, 5) :", calculate(10, 5, plus));
console.log("minus(10, 5) :", calculate(10, 5, minus));


//4. 개발자 정의 객체, 함수 매개변수, 반환 타입 지정
//객체로 함수 매개변수 타입 지정
type OperationInput = {
    a: number;
    b: number;
};

//객체로 함수 반환 타입 지정
type OperationOutput = {
    result: number;
};

function addNumbers(input: OperationInput): OperationOutput{
    const { a, b } = input;
    return { result: a + b };
}

const input: OperationInput = { a: 5, b: 3 };
const output: OperationOutput = addNumbers(input);
console.log("addNumbers(5, 3) :", output);