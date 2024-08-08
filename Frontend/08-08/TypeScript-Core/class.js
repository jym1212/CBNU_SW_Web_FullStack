//2024.08.08
//class 실습
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//1. 다른 클래스를 상속받아 속성, 기능 확장(extends)
var Animal = /** @class */ (function () {
    //생성자 함수 정의
    function Animal(externalName) {
        if (externalName === void 0) { externalName = ''; }
        this.name = externalName;
    }
    //일반화된 기능 정의 및 구현
    Animal.prototype.move = function () {
        console.log("".concat(this.name, "\uAC00 \uC6C0\uC9C1\uC774\uACE0 \uC788\uC2B5\uB2C8\uB2E4."));
    };
    return Animal;
}());
//Animal 클래스를 상속받아 확장된 클래스 정의
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log("".concat(this.name, "\uAC00 \uC9D6\uACE0 \uC788\uC2B5\uB2C8\uB2E4."));
    };
    return Dog;
}(Animal));
var myDog = new Dog("멍멍이");
console.log("내 강아지 이름 :", myDog.name);
myDog.move();
myDog.bark();
//클래스는 인터페이스 상속을 받으면 반드시 인터페이스 기능과 속성 구현
var Car = /** @class */ (function () {
    function Car(speed) {
        this.speed = speed;
    }
    Car.prototype.move = function () {
        console.log("\uD604\uC7AC \uC790\uB3D9\uCC28\uB294 ".concat(this.speed.toString(), "km/h\uB85C \uC774\uB3D9 \uC911\uC785\uB2C8\uB2E4."));
    };
    return Car;
}());
var myCar = new Car(100);
console.log("내 차의 현재 속도 :", myCar.speed);
myCar.move();
//3. 접근 제어자(access modifier)를 이용한 클래스 속성 보호
var UserType;
(function (UserType) {
    UserType["Admin"] = "admin";
    UserType["User"] = "user";
})(UserType || (UserType = {}));
var AdminRole;
(function (AdminRole) {
    AdminRole["SystemAdmin"] = "SA";
    AdminRole["GeneralAdmin"] = "GA";
})(AdminRole || (AdminRole = {}));
var User = /** @class */ (function () {
    //생성자 함수 정의
    function User(name, password, email) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.userType = UserType.User;
    }
    //클래스 주요 기능 구현
    User.prototype.greet = function () {
        console.log("\uC548\uB155\uD558\uC138\uC694 \uC800\uB294 ".concat(this.name, "\uC785\uB2C8\uB2E4."));
    };
    User.prototype.config = function () {
        this.sendEmail('개인화 정보를 설정했습니다.');
        console.log("\uAC1C\uC778\uD654 \uC815\uBCF4\uAC00 \uC124\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4. ".concat(this.email, "\uB85C \uAD00\uB828 \uB0B4\uC6A9\uC744 \uC804\uC1A1\uD588\uC2B5\uB2C8\uB2E4."));
    };
    User.prototype.sendEmail = function (message) {
        console.log("\uAD00\uB9AC\uC790\uAC00 ".concat(this.email, "\uB85C '").concat(message, "' \uB0B4\uC6A9\uC744 \uC804\uC1A1\uD588\uC2B5\uB2C8\uB2E4."));
    };
    //접근 제어자를 지정하지 않으면 기본으로 public으로 설정
    User.prototype.changePassword = function (newPassword) {
        this.password = newPassword;
        console.log("\uBE44\uBC00\uBC88\uD638\uAC00 ".concat(this.password, "\uB85C \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
    };
    return User;
}());
var user = new User("Jeong", "1234", "test@test.co.kr");
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
var AdminUser = /** @class */ (function (_super) {
    __extends(AdminUser, _super);
    //생성자 함수 정의
    function AdminUser(name, password, email, adminRole) {
        //super() 함수는 부모 클래스 생성자 함수 호출함.
        var _this = _super.call(this, name, password, email) || this;
        _this.userType = UserType.Admin;
        _this.adminRole = adminRole == undefined ? AdminRole.GeneralAdmin : adminRole;
        console.log(_this.name);
        return _this;
        //console.log(this.password);
    }
    //클래스 주요 기능 구현
    AdminUser.prototype.changeUserType = function (userType) {
        console.log("\uC0AC\uC6A9\uC790 \uD0C0\uC785\uC774 ".concat(this.userType, "\uC5D0\uC11C ").concat(userType, "\uC73C\uB85C \uBCC0\uACBD\uB420 \uC608\uC815\uC785\uB2C8\uB2E4."));
        this.userType = userType;
        console.log("\uC0AC\uC6A9\uC790 \uD0C0\uC785\uC774 ".concat(this.userType, "\uB85C \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
    };
    AdminUser.prototype.changeRoleType = function (roleType) {
        console.log("\uC5ED\uD560 \uD0C0\uC785\uC774 ".concat(this.adminRole, "\uC5D0\uC11C ").concat(roleType, "\uC73C\uB85C \uBCC0\uACBD\uB420 \uC608\uC815\uC785\uB2C8\uB2E4."));
        this.adminRole = roleType;
        //부모 클래스 User에서 protected로 정의된 sendEmail() 메서드 호출
        this.sendEmail("\uC5ED\uD560 \uD0C0\uC785\uC774 ".concat(this.adminRole, "\uB85C \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
    };
    return AdminUser;
}(User));
var admin1 = new AdminUser("Admin1", "123456", "admin1@example.com");
//admin1.userType = UserType.Admin;
admin1.changeUserType(UserType.Admin);
admin1.changeRoleType(AdminRole.SystemAdmin);
//admin1.sendEmail("test");
var admin2 = new AdminUser("Admin2", "123456", "admin2@example.com", AdminRole.SystemAdmin);
console.log("admin1 정보 :", admin1);
console.log("admin2 정보 :", admin2);
