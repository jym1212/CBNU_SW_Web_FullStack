//2024.08.08
//배열(array) type 실습

//1. 하나의 타입으로 구성된 배열
const books: string[] = [];
books.push("헨리 6세");
books.push("리처드 3세");
books.push("세종대왕");
//books.push(1000);

console.log("책 목록 :", books);


//2. 여러 타입으로 구성된 배열
const userData1 = ["정윤민", 23, true];

//union 타입을 이용하여 여러 요소 선언, 타입 지정
const userData2: (string | number | boolean)[] = ["정윤민2", 33, false];

//tuple 타입을 이용하여 각 요소별 타입 지정
const userData3: [string, number, boolean] = ["정윤민3", 43, true];

console.log(
    `${userData1[0]}님은 ${userData1[1]}살이고 ${userData1[2] == true ? "여자" : "남자"}입니다.`
);
console.log(
    `${userData2[0]}님은 ${userData2[1]}살이고 ${userData2[2] == true ? "여자" : "남자"}입니다.`
);
console.log(
    `${userData3[0]}님은 ${userData3[1]}살이고 ${userData3[2] == true ? "여자" : "남자"}입니다.`
);