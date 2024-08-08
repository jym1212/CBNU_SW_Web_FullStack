//2024.08.07
//여러 타입으로 타입 지정(Union Type) 실습

//1. union 변수
//union : 여러 타입 중 하나일 수 있는 값을 지정할 때 사용
let productCode: string | number;

productCode = 20000;
console.log("productCode(number) :", productCode);

productCode = "P-20000";
console.log("productCode(string) :", productCode);


//2. union 함수 매개변수
//매개변수로 전달된 값에 대해 여러 타입을 지정
function getCode(code: number | string): string {

    //매개변수로 전달된 code가 숫자형이면 문자형으로 변환
    if (typeof code === "number") {
        code = "P-" + code.toString();
    }
    return code;
}

console.log("getCode(string) :", getCode("20000"));
console.log("getCode(number) :", getCode(20000));


function getCode2(code: number | string): void {

    //매개변수로 전달된 code가 숫자형이면 숫자형으로 출력
    if (typeof code === "number") {
        console.log(`getCode2(number) : ${code}`);
    }

    //매개변수로 전달된 code가 문자형이면 문자형으로 출력
    else if (typeof code === "string") {
        console.log(`getCode2(string) : ${code}`);
    }
}

console.log(getCode2("20000"));
console.log(getCode2(20000));


//3. union 배열
//배열 내 값에 대해 여러 타입을 지정
const userData: (string | number | boolean)[] = ["정윤민", 23, false];
console.log(`${userData[0]} 님은 ${userData[1]}살이고 ${userData[2] == true ? "남자" : "여자"} 입니다.`);


//4. union 타입 별칭
//Union 타입을 이용해 타입의 특정값만을 지정하여 제한
type ProcessStates = "open" | "closed";
let state: ProcessStates = "open";
console.log("state :", state);

type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
let oddNumber: OddNumbersUnderTen = 3;

//특정 값만 설정할 수 있는 type 변수에 할당할 수 없는 값 지정하면 에러 발생
//let oddNumber: OddNumbersUnderTen = 4;
console.log("oddNumber :", oddNumber);