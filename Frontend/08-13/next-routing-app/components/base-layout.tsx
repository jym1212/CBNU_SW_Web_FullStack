// 2024.08.13
// base 레이아웃 컴포넌트

import Header from '@/components/header';
import Footer from '@/components/footer';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
