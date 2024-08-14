//2024.08.14
//useState 훅을 이용하여 데이터 관리

import { useState } from 'react';

const Count = () => {
  const [count, setCount] = useState<number>(0);

  const plusCount = () => {
    setCount(count + 1);
  };

  const minusCount = () => {
    setCount(count - 1);
  };

  const initCount = () => {
    setCount(0);
  };

  return (
    <div>
      {/* 현재 카운트 값 표시 영역 */}
      <div className="text-center m-8">
        <h1 className="text-5xl m-8">Count State</h1>
        <h1 className="text-3xl">{count}</h1>
      </div>

      {/* 카운트 값 증감, 초기화 버튼 영역 */}
      <div className="text-center m-6">
        <button
          //onClick={plusCount}
          onClick={() => {
            setCount(count + 1);
          }}
          className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          증가
        </button>
        <button
          //onClick={minusCount}
          onClick={() => {
            setCount(count - 1);
          }}
          className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          감소
        </button>
        <button
          //onClick={initCount}
          onClick={() => {
            setCount(0);
          }}
          className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default Count;
