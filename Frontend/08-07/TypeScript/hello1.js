//2024.08.07
//자바스크립트와 타입스크립트 비교

const userId1 = 'Jeong';
const userName1 = '정윤민';

function sayHello1(userId1, userName1) {
    console.log('안녕하세요 ' + userName1 + '님. 아이디는 ' + userId1 + '입니다.');
    console.log(`안녕하세요 ${userName1}님. 아이디는 ${userId1}입니다.`);
}

sayHello(userId1, userName1);