//2024.08.08
//class 실습

//1. 다른 클래스를 상속받아 속성, 기능 확장(extends)
class Animal{

    //일반화된 특성(속성) 정의
    name: string;

    //일반화된 기능 정의 및 구현
    move() {
        console.log(`${this.name}가 움직이고 있습니다.`);
    }

    //생성자 함수 정의
    constructor(externalName: string = '') {
        this.name = externalName;
    }
}

//Animal 클래스를 상속받아 확장된 클래스 정의
class Dog extends Animal{
    bark() {
        console.log(`${this.name}가 짖고 있습니다.`);
    }
}

let myDog = new Dog("멍멍이");
console.log("내 강아지 이름 :", myDog.name);
myDog.move();
myDog.bark();


//2. 인터페이스 상속받아 클래스 구현(implements)
interface Movable{
    speed: number;
    move(): void;
}

//클래스는 인터페이스 상속을 받으면 반드시 인터페이스 기능과 속성 구현
class Car implements Movable{
    speed: number;

    move() {
        console.log(`현재 자동차는 ${this.speed.toString()}km/h로 이동 중입니다.`);
    }

    constructor(speed: number) {
        this.speed = speed;
    }
}

let myCar = new Car(100);
console.log("내 차의 현재 속도 :", myCar.speed);
myCar.move();


//3. 접근 제어자(access modifier)를 이용한 클래스 속성 보호
enum UserType {
    Admin = "admin",
    User = "user",
}

enum AdminRole {
    SystemAdmin = "SA",
    GeneralAdmin = "GA",
}

class User {

    //클래스 공통 속성 정의
    public name: string;            //public: 클래스 외부에 노출되는 속성
    private password: string;       //private: 클래스 내부에서만 접근 가능한 속성
    protected email: string;        //protected: 해당 클래스를 상속받은 자식 클래스에서만 접근 가능한 속성
    protected userType: UserType;

    //생성자 함수 정의
    constructor(name: string, password: string, email: string) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.userType = UserType.User;
    }

    //클래스 주요 기능 구현
    public greet() {    //클래스 외부에서 호출 가능
        console.log(`안녕하세요 저는 ${this.name}입니다.`);
    }

    private config() {  //클래스 내부에서만 호출 가능
        this.sendEmail('개인화 정보를 설정했습니다.');
        console.log(`개인화 정보가 설정되었습니다. ${this.email}로 관련 내용을 전송했습니다.`);
    }

    protected sendEmail(message: string) {  //해당 클래스를 상속받은 자식 클래스에서만 호출 가능
        console.log(`관리자가 ${this.email}로 '${message}' 내용을 전송했습니다.`);
    }

    //접근 제어자를 지정하지 않으면 기본으로 public으로 설정
    changePassword(newPassword: string) {   //클래스 외부에서 호출 가능
        this.password = newPassword;
        console.log(`비밀번호가 ${this.password}로 변경되었습니다.`);
    }
}

let user = new User("Jeong", "1234", "test@test.co.kr");
console.log("현재 사용자 이름 :", user.name);

user.name = "Kim";
console.log("변경된 사용자 이름 :", user.name);

//user.password = "123456";
//user.email = "jeong@test.co.kr";

user.greet();
user.changePassword("12345678");
//user.sendEmail("test");
//user.config();

//User 클래스를 상속받아 확장된 AdminUser 클래스 정의
class AdminUser extends User { 
    private adminRole: AdminRole;

    //생성자 함수 정의
    constructor(name: string, password: string, email: string, adminRole?: AdminRole) {
        
        //super() 함수는 부모 클래스 생성자 함수 호출함.
        super(name, password, email);

        this.userType = UserType.Admin;
        this.adminRole = adminRole == undefined ? AdminRole.GeneralAdmin : adminRole;

        console.log(this.name);
        //console.log(this.password);
    }

    //클래스 주요 기능 구현
    changeUserType(userType: UserType) {
        console.log(`사용자 타입이 ${this.userType}에서 ${userType}으로 변경될 예정입니다.`);
        this.userType = userType;
        console.log(`사용자 타입이 ${this.userType}로 변경되었습니다.`);
    }

    changeRoleType(roleType: AdminRole) {
        console.log(`역할 타입이 ${this.adminRole}에서 ${roleType}으로 변경될 예정입니다.`);
        this.adminRole = roleType;

        //부모 클래스 User에서 protected로 정의된 sendEmail() 메서드 호출
        this.sendEmail(`역할 타입이 ${this.adminRole}로 변경되었습니다.`);
    }
}

let admin1 = new AdminUser("Admin1", "123456", "admin1@example.com");
//admin1.userType = UserType.Admin;
admin1.changeUserType(UserType.Admin);
admin1.changeRoleType(AdminRole.SystemAdmin);
//admin1.sendEmail("test");

let admin2 = new AdminUser("Admin2", "123456", "admin2@example.com", AdminRole.SystemAdmin);

console.log("admin1 정보 :", admin1);
console.log("admin2 정보 :", admin2);