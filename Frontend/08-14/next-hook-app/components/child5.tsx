//2024.08.14
//자식 컴포넌트5 영역

import { useContext } from 'react';
import { AppContext } from '@/pages/_app';

const Child5 = () => {
  const { msg, setMsg } = useContext(AppContext);

  return <div className="h-[500px] bg-red-800">Child5 : {msg}</div>;
};

export default Child5;
