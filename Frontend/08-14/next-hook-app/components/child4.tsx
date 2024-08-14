//2024.08.14
//자식 컴포넌트4 영역

import { useContext } from 'react';
import { AppContext } from '@/pages/_app';

const Child4 = () => {
  const { msg, setMsg } = useContext(AppContext);

  return (
    <div className="h-[500px] bg-red-700">
      Child4 : {msg}
      <button
        onClick={() => setMsg('기본값')}
        className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        기본값으로 변경
      </button>
    </div>
  );
};

export default Child4;
