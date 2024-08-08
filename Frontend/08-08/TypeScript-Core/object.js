//2024.08.08
//객체(object) type 실습
//1. 객체 타입 지정
var user1 = {
    id: 1,
    name: "Jeong",
    email: "test1@test.co.kr",
    telephone: "010-1111-1111"
};
;
var user2 = {
    id: 2,
    name: "Kim",
    email: "test2@test.co.kr"
};
var user3 = {
    id: 3,
    name: "Lee",
    email: "test3@test.co.kr",
    telephone: "010-3333-3333"
};
console.log("id: ".concat(user1.id, ", name: ").concat(user1.name, ", email: ").concat(user1.email, ", telephone: ").concat(user1.telephone));
console.log("id: ".concat(user2.id, ", name: ").concat(user2.name, ", email: ").concat(user2.email));
console.log("id: ".concat(user3.id, ", name: ").concat(user3.name, ", email: ").concat(user3.email, ", telephone: ").concat(user3.telephone));
