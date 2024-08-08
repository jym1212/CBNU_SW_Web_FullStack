//2024.08.08
//배열(array) type 실습
//1. 하나의 타입으로 구성된 배열
var books = [];
books.push("헨리 6세");
books.push("리처드 3세");
books.push("세종대왕");
//books.push(1000);
console.log("책 목록 :", books);
//2. 여러 타입으로 구성된 배열
var userData1 = ["정윤민", 23, true];
//union 타입을 이용하여 여러 요소 선언, 타입 지정
var userData2 = ["정윤민2", 33, false];
//tuple 타입을 이용하여 각 요소별 타입 지정
var userData3 = ["정윤민3", 43, true];
console.log("".concat(userData1[0], "\uB2D8\uC740 ").concat(userData1[1], "\uC0B4\uC774\uACE0 ").concat(userData1[2] == true ? "여자" : "남자", "\uC785\uB2C8\uB2E4."));
console.log("".concat(userData2[0], "\uB2D8\uC740 ").concat(userData2[1], "\uC0B4\uC774\uACE0 ").concat(userData2[2] == true ? "여자" : "남자", "\uC785\uB2C8\uB2E4."));
console.log("".concat(userData3[0], "\uB2D8\uC740 ").concat(userData3[1], "\uC0B4\uC774\uACE0 ").concat(userData3[2] == true ? "여자" : "남자", "\uC785\uB2C8\uB2E4."));
