//2024.08.07
//변수 타입(Variable Type) 실습
//변수별 타입 지정하고 값 할당
var memberName = "정윤민";
var age = 23;
var price = 5000;
var isMale = false;
var totalPayPrice = 0;
function showTotalPrice(price, count) {
    totalPayPrice = price * count;
    console.log("\uCD1D \uAE08\uC561 : ".concat(totalPayPrice));
}
console.log("이름 :", memberName);
console.log("나이 :", age);
console.log("성별 :", isMale ? "남자" : "여자");
console.log("가격 :", price);
showTotalPrice(price, 2);
