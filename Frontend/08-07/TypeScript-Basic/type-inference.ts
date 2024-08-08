//2024.08.07
//타입 추론(Type by inference) 실습

//1. 변수 타입 추론
//변수 타입을 지정하지 않고 값을 명시적으로 할당하면 타입 추론에 의해 타입 결정
var memberName = "정윤민";
var price = 5000;
var isMale = false;

//타입 추론에 의해 컴파일 시, 타입이 자동으로 인식
console.log("이름(string) :", memberName.length);
//console.log("가격(number) :", price.length);
//console.log("성별(boolean) :", isMale.length);


//2. 객체 타입 추론
//객체 속성 타입을 지정하지 않고 값을 명시적으로 할당하면 타입 추론에 의해 타입 결정
var user = {
    id: 1,
    name: "정윤민",
    email: "test@test.co.kr"
};

//타입 추론에 의해 컴파일 시, 타입이 자동으로 인식
//console.log("user 아이디(number) :", user.id.length);
console.log("user 이름(string) :", user.name.length);
console.log("user 이메일(string) :", user.email.length);


//3. 함수 반환값 타입 추론
//함수 반환값 타입을 지정하지 않고 값을 명시적으로 반환하면 타입 추론에 의해 타입 결정
function plus(a: number, b: number) {
    return a + b;
}

console.log("plus 함수 반환값(number) :", plus(1, 2));
//console.log("plus 함수 반환값(number) :", plus(1, 2).length);