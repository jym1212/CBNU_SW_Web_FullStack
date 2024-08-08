//2024.08.08
//인터페이스(interface) type 실습
//인터페이스의 목적은 데이터 타입를 정의하거나 특정 인터페이스를 상속받아 기능 확장(extends)
//특정 클래스에서 해당 인터페이스를 상속받으면 반드시 인터페이스의 기능과 속성을 클래스에 구현(implements)
function greet1(user) {
    return "Hello, ".concat(user.name, "!");
}
var user1 = { name: "Jeong", age: 23 };
console.log("Interface :", greet1(user1));
function greet2(user) {
    return "Hello, ".concat(user.name, "!");
}
var user2 = { name: "Kim", age: 33 };
console.log("Type-Alias :", greet2(user2));
;
var employee = {
    name: "정윤민",
    address: "대전광역시 동구",
    group: "IT",
    department: "Engineering"
};
console.log("interface 상속 :", employee);
//Car 클래스는 Movable 인터페이스를 상속받아 해당 인터페이스의 속성과 기능 구현 (implements)
var Car = /** @class */ (function () {
    //생성자 함수 : 클래스를 통해 객체가 생성되는 시점에 자동으로 호출되는 함수
    //클래스를 통해 객체를 만들어내는 과정에서 new Car()를 '인스턴스화 한다' 라고 표현
    function Car(speed) {
        //this : 현재 클래스 내부에 접근하기 위한 예약어
        //this.speed는 클래스 내부 속성인 speed 속성
        //speed는 생성자 함수의 매개변수로 전달받은 값 (인스턴스화 시 전달된 값)
        //new Car(50)울 통해 객체를 생성하면 speed에 50이 할당됨
        this.speed = speed;
    }
    Car.prototype.move = function () {
        console.log("\uD604\uC7AC \uC790\uB3D9\uCC28\uB294 ".concat(this.speed.toString(), "km/h\uB85C \uC774\uB3D9 \uC911\uC785\uB2C8\uB2E4."));
    };
    return Car;
}());
//Car 클래스를 통해 myCar 객체 생성
//new 연산자를 이용해 클래스 객체 생성하고 생성된 객체는 
//프로그램이 실행되는 컴퓨터의 메모리에 저장되며 이러한 과정은 '인스턴스화'라고 함.
var myCar = new Car(100);
console.log("내 차의 현재 속도 :", myCar.speed);
myCar.move();
