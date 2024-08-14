//2024.08.12
//useReducer 훅을 이용하여 데이터 관리

//useState : 해당하는 컴포넌트에서만 상태 데이터를 관리할 때 사용함.
//useReducer : 여러 컴포넌트에서 공유하는 상태 데이터를 관리할 때 사용함.

import { useReducer } from 'react';

//리듀서 함수 관련 타입 참조
import { CountActionType } from '@/interfaces/common';

//재사용 가능한 리듀서 함수 참조
import { countReducer } from '@/utils/reducers';

const ReducerCount2 = () => {
  const [count, dispatchCount] = useReducer(countReducer, 100);

  return (
    <div>
      {/* 현재 카운트 값 표시 영역 */}
      <div className="text-center m-8">
        <h1 className="text-5xl m-8">Count Reducer2</h1>
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

export default ReducerCount2;
