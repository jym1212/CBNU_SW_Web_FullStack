//2024.08.21
//전역 상태 데이터 관리

//전역 상태 데이터를 관리하려면 반드시 페이지 컴포넌트 간 이동 시, Link 컴포넌트 이용
//Link 컴포넌트를 이용하지 않으면 페이지 이동 시, 전역 상태 데이터 초기화

import { createContext, ReactNode, useState } from 'react';

//전역 데이터 타입 참조
import { IGlobalData, ILoginMember } from '@/interfaces/global';

export const GlobalContext = createContext({
  globalData: { token: '', member: { member_id: 0, name: '', email: '' } },
  setGlobalData: (data: IGlobalData) => {},
});

type Props = { children: ReactNode };

export default function GlobalProvider({ children }: Props) {
  const [globalData, setGlobalData] = useState<IGlobalData>({
    token: '',
    member: { member_id: 0, name: '', email: '' },
  });

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
}
