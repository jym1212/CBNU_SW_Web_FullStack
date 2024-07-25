//2024.07.24
//자바스크립트, 노드 프로그래밍은 기본적으로 비동기 방식으로 작동

//노드 프로그램이 비동기 방식으로 작동되는 것을 확인
//setTimeout() 함수는 특정 시간(초)이 지난 후에 특정 로직이 실행되는 내장 함수
var fnSample = function(){
    console.log("fnSample() 함수 실행");

    //setTimeout() 함수가 실행되면 4초 후에 내부 로직이 실행
    setTimeout(function(){
        console.log('로직 1 실행완료 - 4초 소요');
    }, 4000);

    //setTimeout() 함수가 실행되면 3초 후에 내부 로직이 실행
    setTimeout(function(){
        console.log('로직 2 실행완료 - 3초 소요');
    }, 3000);

    //setTimeout() 함수가 실행되면 2초 후에 내부 로직이 실행
    setTimeout(function(){
        console.log('로직 3 실행완료 - 2초 소요');
    }, 2000);

    //setTimeout() 함수가 실행되면 1초 후에 내부 로직이 실행
    setTimeout(function(){
        console.log('로직 4 실행완료 - 1초 소요');
    }, 1000);
}


/*
- 위에 비동기 방식으로 작동되는 fnSample() 함수 로직을 동기방식(순차적 프로그램)으로 구현
- 순서 기반 로직1 -> 로직2 -> 로직3 -> 로직4 순서대로 함수(타이머 내 내용)이 실행
- 일반적으로 동기 방식을 구현하기 위해 콜백함수를 사용하면 콜백 지옥 문제가 발생
- 콜백함수 이슈를 해결하기 위해 자바스크립트에서는 promise, async/await 키워드 제공
- 가장 최신 비동기 방식으로 순차적 프로그래밍 구현할 수 있는 권장 방식은 async/await 방식 추천
  (promise는 async/await 방식 이전에 사용하던 방식)
*/
var fnSyncSample = function(){
    console.log("fnSyncSample() 함수 실행");

    //setTimeout() 함수가 실행되면 4초 후에 내부 로직이 실행
    setTimeout(function(){
        console.log('로직 1 실행완료 - 4초 소요');

        //setTimeout() 함수가 실행되면 3초 후에 내부 로직이 실행
        setTimeout(function(){
            console.log('로직 2 실행완료 - 3초 소요');

            //setTimeout() 함수가 실행되면 2초 후에 내부 로직이 실행
            setTimeout(function(){
                console.log('로직 3 실행완료 - 2초 소요');

                //setTimeout() 함수가 실행되면 1초 후에 내부 로직이 실행
                setTimeout(function(){
                    console.log('로직 4 실행완료 - 1초 소요');
                }, 1000);

            }, 2000);

        }, 3000);

    }, 4000);
}


//비동기 방식(순서 없이)으로 작동되는 fnSample() 함수 실행
fnSample();

//동기 방식(순서대로)으로 순차적 프로그래밍을 하려면 함수 로직 내에서 다른 함수를 정의/실행하는 방식을
//사용(콜백함수)하는데 콜백함수를 계속 사용하면 콜백지옥이 발생함. (가독성 저해, 로직 파악 어려움)
fnSyncSample();