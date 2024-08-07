//2024.08.07
//타입 지정(Type Assertion) 실습

//any 타입 : 어떤 타입인지 정확히 모를 때 지정
//any 타입은 데이터 타입을 변경해 값을 할당해도 문제 발생하지 않음.
//타입 안정성을 잃을 수 있으므로 사용을 자제해야 함.
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

console.log("notSure :", notSure);


//1. angle-bracket 문법(<>)으로 형변환
let userName: any = "정윤민";
let userNameLength2 = (<string>userName).length;


//2. as 키워드로 형변환
let userNameLength = (userName as string).length;


const university = "충북대학교" as string;
console.log(university, userName);
console.log("userName 길이 :", userNameLength, userNameLength2);


//3. 객체 타입 변환
//interface : 객체의 구조, 속성 타입 지정
interface User {
    id: number;
    name: string;
    email: string;
    telephone?: string; //? : optional 속성
}

//optional 속성 : 속성값을 선택적으로 지정할 수 있음. (null, undefined)
let user = {} as User;
user.id = 1;
user.name = "Jeong";
user.email = "test@test.co.kr"
//user.telephone = "010-1234-5678";

console.log("user :", user);