//2024.08.07
//여러 타입으로 타입 지정(Union Type) 실습
//1. union 변수
//union : 여러 타입 중 하나일 수 있는 값을 지정할 때 사용
var productCode;
productCode = 20000;
console.log("productCode(number) :", productCode);
productCode = "P-20000";
console.log("productCode(string) :", productCode);
//2. union 함수 매개변수
//매개변수로 전달된 값에 대해 여러 타입을 지정
function getCode(code) {
    //매개변수로 전달된 code가 숫자형이면 문자형으로 변환
    if (typeof code === "number") {
        code = "P-" + code.toString();
    }
    return code;
}
console.log("getCode(string) :", getCode("20000"));
console.log("getCode(number) :", getCode(20000));
function getCode2(code) {
    //매개변수로 전달된 code가 숫자형이면 숫자형으로 출력
    if (typeof code === "number") {
        console.log("getCode2(number) : ".concat(code));
    }
    //매개변수로 전달된 code가 문자형이면 문자형으로 출력
    else if (typeof code === "string") {
        console.log("getCode2(string) : ".concat(code));
    }
}
console.log(getCode2("20000"));
console.log(getCode2(20000));
//3. union 배열
//배열 내 값에 대해 여러 타입을 지정
var userData = ["정윤민", 23, false];
console.log("".concat(userData[0], " \uB2D8\uC740 ").concat(userData[1], "\uC0B4\uC774\uACE0 ").concat(userData[2] == true ? "남자" : "여자", " \uC785\uB2C8\uB2E4."));
var state = "open";
console.log("state :", state);
var oddNumber = 3;
//특정 값만 설정할 수 있는 type 변수에 할당할 수 없는 값 지정하면 에러 발생
//let oddNumber: OddNumbersUnderTen = 4;
console.log("oddNumber :", oddNumber);
