//메인 레이아웃 컴포넌트

import Header from '@/components/header';
import Footer from '@/components/footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

//방법 1 : MainLayout 컴포넌트에 타입 지정
//const MainLayout = ({ children } : { children: React.ReactNode })

//방법 2 : NextPage 타입을 사용하여 MainLayoutProps 타입을 정의
//inmport { NextPage } from 'next';
//const MainLayout: NextPage<MainLayoutProps> = ({ children })

//방법 3 : MainLayoutProps 타입을 정의하고, MainLayout 컴포넌트에 타입을 적용
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-white">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
