//2024.08.07
//자바스크립트와 타입스크립트 비교

const userId2: string = 'Jeong';
const userName2: string = '정윤민';

function sayHello2(userId2: string, userName2: string): void {
    console.log('안녕하세요 ' + userName2 + '님. 아이디는 ' + userId2 + '입니다.');
    console.log(`안녕하세요 ${userName2}님. 아이디는 ${userId2}입니다.`);
}

sayHello2(userId2, userName2);


//컴파일 명령어
//tsc hello2.ts
//tsc--strictNullChecks hello2.ts (null과 undefined 허용하지 않는 강력한 타입 체크)
//node hello2.js


//타입스크립트 과정
//hello2.ts(타입스크립트 파일) -> complie(tcs 컴파일)
//hello2.js(자바스크립트 파일) -> node hello2.js(실행)