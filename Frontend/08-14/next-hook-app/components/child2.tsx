//2024.08.14
//자식 컴포넌트2 영역

import { useContext } from 'react';
import { AppContext } from '@/pages/_app';

const Child2 = ({ children }: { children: React.ReactNode }) => {
  const { msg, setMsg } = useContext(AppContext);

  return (
    <div className="h-[500px] bg-red-400">
      Child2 : {msg}
      <button
        onClick={() => setMsg('변경 완료')}
        className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        전역 메세지 변경
      </button>
      <div>{children}</div>
    </div>
  );
};

export default Child2;
