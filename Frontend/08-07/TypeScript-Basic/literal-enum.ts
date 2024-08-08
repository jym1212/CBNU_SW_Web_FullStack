//2024.08.08
//literal, enum 열거형 타입 실습

//1. 변수 literal 타입
//변수 선언 시, 특정 값으로 변수 할당 값 범위 제한
let genderType: "Male" | "Female";

genderType = "Male";
console.log("genderType :", genderType);

genderType = "Female";
console.log("genderType :", genderType);

//genderType = "None";


//2. 함수 매개변수 literal 타입
//type alias를 이용하여 사용자 객체 타입 정의
//Coding Conventions : 코드 작성 규칙
type User = {
    name: string;
    age: number;
    userType: "admin" | "user";
    address: { city: string; country: string };
};

//JSON 데이터 생성하여 user 객체 변수 할당
const user: User = {
    name: "정윤민",
    age: 23,
    userType: "user",
    address: {
        city: "Daejeon",
        country: "Korea"
    }
};

console.log(`name: ${user.name}, age: ${user.age}, userType: ${user.userType}, address: ${user.address.city}, ${user.address.country}`);

//함수 반환값 특정 타입으로 제한
function getUserType(user: User): 1 | 2{
    if (user.userType === "admin") {
        return 1;
    } else {
        return 2;
    }
}

console.log("getUserType :", getUserType(user));


//3. 열거형(enum) 타입
//변수 선언 시, 특정 값으로 변수 할당 값 범위 제한
//코드성 데이터를 소스 내에 사용하는 것은 좋지 않아, enum을 사용하여 값 설명과 실제값을 표시하여 사용
enum DisplayType {
    NoneDisplay = 0,
    Display = 1
};

const displayCode = 1;
const display = displayCode as DisplayType;

const displayTestCode: DisplayType = 1;
const displayTestCode1: DisplayType = DisplayType.NoneDisplay;
const displayTestCode2 = DisplayType.Display;

// == : 값만 비교, === : 값과 타입 비교
if (display === DisplayType.Display) {
    console.log("해당 게시글은 게시 상태입니다.");
}

enum SNSType {
    None = "",
    Facebook = "F",
    Instagram = "I",
    Twitter = "T"
};

//상수 값을 지정하지 않으면 0부터 숫자 할당
enum EntryState {
    Inactive,   //0
    Active,     //1
    Pendging    //2
};

enum MemberType {
    Admin = 2,
    User = 1,
    Guest = 0
};

type Member = {
    id: number;
    email: string;
    password: string;
    entryState: EntryState;
    memberType: MemberType;
    snsType: SNSType;
    address: { city: string, country: string };
};

const snsTypeCode = "Facebook";

//JSON 데이터 생성하여 member 객체 변수 할당
let member: Member = {
    id: 1,
    email: "test@test.co.kr",
    password: "1234",
    entryState: EntryState.Active,
    memberType: MemberType.User,
    snsType: snsTypeCode as SNSType,
    address: {
        city: "Daejeon",
        country: "Korea"
    }
};

console.log("member :", member);


//4. union 타입 활용
//enum 타입과 유사하게 특정 값만 지정
type ProcessStates = "open" | "closed";
let state: ProcessStates = "open";
console.log("state :", state);

type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
let oddNumber: OddNumbersUnderTen = 3;
console.log("oddNumber :", oddNumber);
