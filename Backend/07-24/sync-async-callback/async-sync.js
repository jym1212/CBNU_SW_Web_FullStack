//2024.07.24
/*
자바스크립트, 노드 언어의 기본 특성

** 자바스크립트, 노드는 기본적으로 비동기 프로그래밍 방식으로 작동 **
- 라우터를 만들 때, 비동기 방식으로 작동
- 비동기 처리 시, 콜백함수, async/await 방식을 이용하여 순차적 프로그래밍 구현
- 콜백함수는 콜백 지옥 문제 발생 가능성이 있어 async/await 방식을 권장
  ex) router.get('/', function(req, res, next){...});
  ex) router.get('/', async function(req, res, next)=>{...});
*/

//Task1
function fn1(){
    console.log("fn1() 함수 실행");
}

//Task2
function fn2(){

    //3초 후에 실행되는 fn2() 함수 로직
    setTimeout(function(){
        console.log("fn2() 함수 실행");
    }, 3000);
}

//Task3
function fn3(){
    console.log("fn3() 함수 실행");
}


//비동기 방식 처리 - 실행 순서와 상관없이 병렬로 실행
//처리 순서와 상관없이 먼저 실행되는 함수부터 실행
//전체 처리 로직 : fn1() -> fn2() -> fn3()
//실제 실행 결과 : fn1() -> fn3() -> fn2()
fn1();
fn2();
fn3();


//콜백함수를 이용한 동기 방식 프로그래밍 적용
//동기 방식 : fn1() -> fn2() -> fn3()
//반드시 fn1 로직이 실행된 후, fn2가 실행되고, fn3가 실행되어야 함.
//콜백함수(함수 내에서 함수를 호출하는 방식)을 이용

//Task2
function fnSync2(cbFunction){
    //3초 후에 실행되는 fn2() 함수 로직
    setTimeout(function(){
        console.log("fn2() 함수 실행");
        cbFunction();
    }, 3000);
}
fn1();
fnSync2(fn3);