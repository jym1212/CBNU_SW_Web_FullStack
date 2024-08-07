//2024.08.07
//변수 타입(Variable Type) 실습

//변수별 타입 지정하고 값 할당
var memberName: string = "정윤민";
let age: number = 23;
let price: number = 5000;
const isMale: boolean = false;

let totalPayPrice: number = 0;

function showTotalPrice(price: number, count: number): void{
    totalPayPrice = price * count;
    console.log(`총 금액 : ${totalPayPrice}`);
}

console.log("이름 :", memberName);
console.log("나이 :", age);
console.log("성별 :", isMale ? "남자" : "여자");
console.log("가격 :", price);

showTotalPrice(price, 2);

