//2024.08.14
//useReducer 훅을 이용하여 데이터 관리

//useReducer 훅을 사용하여 통합적으로 상태를 관리하고, 상태 업데이트 로직을 분리하여 관리함.
import { useReducer } from 'react';

//카운트 상태값 로직 처리 유형 열거형 타입 정의
enum CountActionType {
  PLUS = 'plus',
  MINUS = 'minus',
  INIT = 'init',
}

interface ActionType {
  type: CountActionType;
}

//방법 1 : reducer 함수 정의
//reducer 함수(관리하는 상태값 매개변수, 로직 처리 타입)
/* function countReducer(state: number, action: string): number {
  //처리 로직 유형에 따른 비즈니스 로직 처리 후,
  //관리하는 상태값 반환, default는 초기값 반환
  switch (action) {
    case 'plus':
      return state + 1;
    case 'minus':
      return state - 1;
    case 'init':
      return 0;
    default:
      return state;
  }
} */

//방법 2 : type 정의 reducer 함수 정의
function countReducer(state: number, action: ActionType): number {
  //type은 action 객체의 속성으로, CountActionType 열거형 타입으로 지정됨.
  const { type } = action;

  switch (type) {
    case CountActionType.PLUS:
      return state + 1;
    case CountActionType.MINUS:
      return state - 1;
    case CountActionType.INIT:
      return 100;
    default:
      return state;
  }
}

const ReducerCount = () => {
  //useReducer('리듀서 함수', '초기값);
  //reducer 함수는 재사용이 가능하며, 통합 로직을 처리하는 함수임.
  //useReducer() 함수는 관리하는 상태값과 해당 reducer 함수를 호출하는 dispatch 함수를 반환함.

  //dispatch 함수는 이벤트 발생 시, 해당 이벤트를 처리해주는 함수임.
  //dispatch 함수는 reducer 함수를 호출하며, reducer 함수는 상태값을 변경함.
  const [count, dispatchCount] = useReducer(countReducer, 100);

  return (
    <div>
      {/* 현재 카운트 값 표시 영역 */}
      <div className="text-center m-8">
        <h1 className="text-5xl m-8">Count Reducer</h1>
        <h1 className="text-3xl">{count}</h1>
      </div>

      {/* 카운트 값 증감, 초기화 버튼 영역 */}
      <div className="text-center m-6">
        <button
          onClick={() => dispatchCount({ type: CountActionType.PLUS })}
          className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          증가
        </button>
        <button
          onClick={() => dispatchCount({ type: CountActionType.MINUS })}
          className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          감소
        </button>
        <button
          onClick={() => dispatchCount({ type: CountActionType.INIT })}
          className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default ReducerCount;
