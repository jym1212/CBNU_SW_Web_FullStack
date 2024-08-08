//2024.08.08
//객체(object) type 실습

//1. 객체 타입 지정
const user1: { id: number; name: string; email: string; telephone?: string } = {
    id: 1,
    name: "Jeong",
    email: "test1@test.co.kr",
    telephone: "010-1111-1111"
};


//2. interface를 이용한 객체 타입 지정
//Code Convention에 따라 JSON 데이터와 같은 데이터 객체는 주로 interface 타입으로 정의
interface User {
    id: number;
    name: string;
    email: string;
    telephone?: string; //선택적 속성(?)
};

let user2: User = {
    id: 2,
    name: "Kim",
    email: "test2@test.co.kr"
};


//3.type alias를 이용한 객체 타입 지정
type UserType = {
    id: number;
    name: string;
    email: string;
    telephone?: string;
}

let user3: UserType = {
    id: 3,
    name: "Lee",
    email: "test3@test.co.kr",
    telephone: "010-3333-3333"
}

console.log(`id: ${user1.id}, name: ${user1.name}, email: ${user1.email}, telephone: ${user1.telephone}`);
console.log(`id: ${user2.id}, name: ${user2.name}, email: ${user2.email}`);
console.log(`id: ${user3.id}, name: ${user3.name}, email: ${user3.email}, telephone: ${user3.telephone}`);