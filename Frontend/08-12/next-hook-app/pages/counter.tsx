//리액트 로컬 데이터 상태 관리 훅인 useState 참조
//Hook : use라는 접두사를 사용하고, 함수 컴포넌트에서만 사용 가능
import { useState } from 'react';

const Counter = () => {
  //카운트 상태값을 관리하는 count 변수, setCount 함수 선언
  //useState('초기값') : count, setCount를 반환하여 변수에 할당
  //useState(0) : 배열의 비구조화 할당 문법을 통해 반환되는 배열 내 값을 변수로 할당
  //useState(0) = ([0, function(){}];)
  //const [count, setCount] = useState(0);
  const [count, setCount] = useState<number>(0);

  //count 상태값 증가시키는(plus) 이벤트 핸들러 함수 정의
  const handlePlus = (): void => {
    console.log('Pre SetCounter :', count);

    //count 상태값을 변경하려면 setCount() 함수를 통해 변경
    //setCount(count+1)을 연속 호출하면 count 상태값이 2씩 증가할 거 같지만,
    //해당 handlePlus() 함수 호출이 종료되어야 count 값이 갱신되기에 한 번만 적용됨.
    setCount(count + 1);
    setCount(count + 1);

    //setCount() 함수를 통해 count 상태값을 변경하면, handlePlus()함수가 완전히 실행 완료 후에 count 상태값이 갱신
    console.log('After SetCounter :', count);
  };

  //count 상태값 증가시키는(plus) 이벤트 핸들러 함수 정의
  const handlePlus2 = (): void => {
    console.log('Pre SetCounter :', count);

    //변경되기 이전 값을 prevCouynt 라는 매개변수를 통해 추출
    //setCount((prevCount) => prevCount + 1)을 연속 호출하면 count 상태값이 2씩 증가
    //prevCount는 실제 변경된 이전 값을 바로 보관하기에 handlPlus() 함수 호출이 종료되지 않아도 적용됨.
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);

    console.log('After SetCounter :', count);
  };

  //count 상태값 감소시키는(minus) 이벤트 핸들러 함수 정의
  const handleMinus = (): void => {
    setCount(count - 1);
  };

  //count 상태값 초기화하는(init) 이벤트 핸들러 함수 정의
  const handleInit = (): void => {
    setCount(0);
  };

  return (
    <main className="grid min-h-full place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-[60px] font-semibold text-indigo-600">{count}</p>
        <p className="mt-6 text-base leading-7 text-white">
          버튼을 클릭해 숫자를 증가 또는 감소 시켜보세요.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* handlePlus() 함수 호출 : count 1번 증가 */}
          <button
            onClick={handlePlus}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Plus1
          </button>

          {/* handlePlus2() 함수 호출 : count 2번 증가 */}
          <button
            onClick={handlePlus2}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Plus2
          </button>

          {/* handleMinus() 함수 호출 : count 1번 감소 */}
          <button
            onClick={handleMinus}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Minus
          </button>

          {/* handleInit() 함수 호출 : count 초기화 */}
          <button
            onClick={handleInit}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Init
          </button>
        </div>
      </div>
    </main>
  );
};

export default Counter;
