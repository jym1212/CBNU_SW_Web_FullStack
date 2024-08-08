//2024.08.08
//제너릭(generic) type 실습
//제너릭 타입을 이용하여 타입에 제한 없이 다양한 타입을 처리
//1. 제너릭 함수 정의
//함수명<GenericTypr>(매개변수명: GenericType): GenericType
//T : Generic Type으로, 함수 호출 시 전달되는 타입에 따라서 반환 타입이 결정됨.
//angle-bracket 문법(<>)을 통해 T(제너릭) 타입으로 형변환
function getRandomElement(list) {
    //전달된 배열 목록에서 랜덤하게 배열 요소 반환
    var randIndx = Math.floor(Math.random() * list.length);
    return list[randIndx];
}
//문자열 배열에서 랜덤한 문자 추출
var randomString = getRandomElement(["A", "B", "C", "D"]);
console.log("randomString :", randomString);
//숫자 배열에서 랜덤한 숫자 추출
var randomNumber = getRandomElement([1, 2, 3, 4]);
console.log("randomNumber :", randomNumber);
var randomUserType = getRandomElement([
    { name: "Kim", age: 10 },
    { name: "Lee", age: 20 },
    { name: "Park", age: 30 },
]);
console.log("randomUserType :", randomUserType);
//제너릭 타입을 사용하면 중복되는 코드 최소화 가능
//function getRandomString(list: string[]): string{ }
//function getRandomNumber(list: number[]): number{ }
//function getRadomUserType(list: UserType[]): UserType{ }
//2. 제너릭 클래스 정의
//클래스명<GenericType>
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    return Stack;
}());
//문자 타입 Stack 객체 생성
var stringStack = new Stack();
stringStack.push("A");
stringStack.push("B");
console.log("stringStack :", stringStack);
var popedString = stringStack.pop();
console.log("popedString :", popedString);
//숫자 타입 Stack 객체 생성
var numberStack = new Stack();
numberStack.push(1);
numberStack.push(2);
console.log("numberStack :", numberStack);
var popedNumber = numberStack.pop();
console.log("popedNumber :", popedNumber);
