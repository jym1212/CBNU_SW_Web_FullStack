//2024.08.08
//인터페이스(interface) type 실습
//인터페이스의 목적은 데이터 타입를 정의하거나 특정 인터페이스를 상속받아 기능 확장(extends)
//특정 클래스에서 해당 인터페이스를 상속받으면 반드시 인터페이스의 기능과 속성을 클래스에 구현(implements)

//1. interface로 객체 타입 지정
interface User {
    name: string;
    age: number;
}

function greet1(user: User): string {
    return `Hello, ${user.name}!`;
}

let user1 = { name: "Jeong", age: 23 };
console.log("Interface :", greet1(user1));


//2. type alias로 객체 타입 지정
type MemberType = {
    name: string;
    age: number;
};

function greet2(user: MemberType): string {
    return `Hello, ${user.name}!`;
}

let user2 = { name: "Kim", age: 33 };
console.log("Type-Alias :", greet2(user2));


//3. interface 속성 추가, 상속
interface Person{
    name: string;
}

interface Person{
    address: string;
}

interface Group{
    group: string;
}

//extens(확장) 키워드를 이용하여 특정 인터페이스 상속받아 기능 확장
//여러 개의 인터페이스 상속 가능함.
interface Employee extends Person, Group {
    department: string;
};

let employee: Employee = {
    name: "정윤민",
    address: "대전광역시 동구",
    group: "IT",
    department: "Engineering"
};

console.log("interface 상속 :", employee);


//4. interface 상속 클래스
//OOP(Object-Oriented Programming)에서 interface는 클래스의 일부 기능을 정의
//해당 인터페이스를 상속받은 클래스는 반드시 해당 인터페이스에서 정의한 속성/기능 구현
interface Movable {
    speed: number;
    move(): void;
}

//Car 클래스는 Movable 인터페이스를 상속받아 해당 인터페이스의 속성과 기능 구현 (implements)
class Car implements Movable{
    speed: number;

    //생성자 함수 : 클래스를 통해 객체가 생성되는 시점에 자동으로 호출되는 함수
    //클래스를 통해 객체를 만들어내는 과정에서 new Car()를 '인스턴스화 한다' 라고 표현
    constructor(speed: number) {

        //this : 현재 클래스 내부에 접근하기 위한 예약어
        //this.speed는 클래스 내부 속성인 speed 속성
        //speed는 생성자 함수의 매개변수로 전달받은 값 (인스턴스화 시 전달된 값)
        //new Car(50)울 통해 객체를 생성하면 speed에 50이 할당됨
        this.speed = speed;
    }

    move() {
        console.log(`현재 자동차는 ${this.speed.toString()}km/h로 이동 중입니다.`);
    }
}

//Car 클래스를 통해 myCar 객체 생성
//new 연산자를 이용해 클래스 객체 생성하고 생성된 객체는 
//프로그램이 실행되는 컴퓨터의 메모리에 저장되며 이러한 과정은 '인스턴스화'라고 함.
let myCar = new Car(100);
console.log("내 차의 현재 속도 :", myCar.speed);
myCar.move();