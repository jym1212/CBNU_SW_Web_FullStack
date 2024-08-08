//2024.08.08
//literal, enum 열거형 타입 실습
//1. 변수 literal 타입
//변수 선언 시, 특정 값으로 변수 할당 값 범위 제한
var genderType;
genderType = "Male";
console.log("genderType :", genderType);
genderType = "Female";
console.log("genderType :", genderType);
//JSON 데이터 생성하여 user 객체 변수 할당
var user = {
    name: "정윤민",
    age: 23,
    userType: "user",
    address: {
        city: "Daejeon",
        country: "Korea"
    }
};
console.log("name: ".concat(user.name, ", age: ").concat(user.age, ", userType: ").concat(user.userType, ", address: ").concat(user.address.city, ", ").concat(user.address.country));
//함수 반환값 특정 타입으로 제한
function getUserType(user) {
    if (user.userType === "admin") {
        return 1;
    }
    else {
        return 2;
    }
}
console.log("getUserType :", getUserType(user));
//3. 열거형(enum) 타입
//변수 선언 시, 특정 값으로 변수 할당 값 범위 제한
//코드성 데이터를 소스 내에 사용하는 것은 좋지 않아, enum을 사용하여 값 설명과 실제값을 표시하여 사용
var DisplayType;
(function (DisplayType) {
    DisplayType[DisplayType["NoneDisplay"] = 0] = "NoneDisplay";
    DisplayType[DisplayType["Display"] = 1] = "Display";
})(DisplayType || (DisplayType = {}));
;
var displayCode = 1;
var display = displayCode;
var displayTestCode = 1;
var displayTestCode1 = DisplayType.NoneDisplay;
var displayTestCode2 = DisplayType.Display;
// == : 값만 비교, === : 값과 타입 비교
if (display === DisplayType.Display) {
    console.log("해당 게시글은 게시 상태입니다.");
}
var SNSType;
(function (SNSType) {
    SNSType["None"] = "";
    SNSType["Facebook"] = "F";
    SNSType["Instagram"] = "I";
    SNSType["Twitter"] = "T";
})(SNSType || (SNSType = {}));
;
//상수 값을 지정하지 않으면 0부터 숫자 할당
var EntryState;
(function (EntryState) {
    EntryState[EntryState["Inactive"] = 0] = "Inactive";
    EntryState[EntryState["Active"] = 1] = "Active";
    EntryState[EntryState["Pendging"] = 2] = "Pendging"; //2
})(EntryState || (EntryState = {}));
;
var MemberType;
(function (MemberType) {
    MemberType[MemberType["Admin"] = 2] = "Admin";
    MemberType[MemberType["User"] = 1] = "User";
    MemberType[MemberType["Guest"] = 0] = "Guest";
})(MemberType || (MemberType = {}));
;
var snsTypeCode = "Facebook";
//JSON 데이터 생성하여 member 객체 변수 할당
var member = {
    id: 1,
    email: "test@test.co.kr",
    password: "1234",
    entryState: EntryState.Active,
    memberType: MemberType.User,
    snsType: snsTypeCode,
    address: {
        city: "Daejeon",
        country: "Korea"
    }
};
console.log("member :", member);
var state = "open";
console.log("state :", state);
var oddNumber = 3;
console.log("oddNumber :", oddNumber);
