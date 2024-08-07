//2024.08.07
//자바스크립트와 타입스크립트 비교
var userId2 = 'Jeong';
var userName2 = '정윤민';
function sayHello2(userId2, userName2) {
    console.log('안녕하세요 ' + userName2 + '님. 아이디는 ' + userId2 + '입니다.');
    console.log("\uC548\uB155\uD558\uC138\uC694 ".concat(userName2, "\uB2D8. \uC544\uC774\uB514\uB294 ").concat(userId2, "\uC785\uB2C8\uB2E4."));
}
sayHello2(userId2, userName2);
//컴파일 명령어
//tsc hello2.ts or tsc --strictNullChecks hello2.ts
//node hello2.js
