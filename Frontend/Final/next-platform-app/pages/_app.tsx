//NextJSApp 전역 스타일  파일 참조
import '@/styles/globals.css';

//Next.js에서 제공하는 AppProps 타입 참조
import type { AppProps } from 'next/app';

//개발자 정의 컴포넌트 참조
import MainLayout from '@/components/main-layout';
import MyPageLayout from '@/components/mypage-layout';

import { useRouter } from 'next/router';

// import Header from '@/components/header';
// import Container from '@/components/container';
// import Footer from '@/components/footer';

//App 함수는 컴포넌트와 pageProps를 인자로 받아서 JSX를 반환함.
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath: string = router.pathname;
  console.log('currentPath:', currentPath);

  //레이아웃 모드 설정
  let layoutMode: string = 'general';
  if (currentPath === '/login' || currentPath === '/regist') {
    layoutMode = 'auth'; //레이아웃 적용하지 않음.
  } else if (currentPath.indexOf('/mypage') > -1) {
    layoutMode = 'mypage'; //마이페이지 레이아웃 적용
  } else {
    layoutMode = 'general'; //메인 레이아웃 적용
  }

  console.log('layoutMode:', layoutMode);

  //UI 요소를 반환하는 함수형 컴포넌트
  const renderLayoutOnPath = () => {
    switch (layoutMode) {
      case 'auth': //login, regist 컴포넌트
        return <Component {...pageProps} />;
      case 'mypage': //mypage 컴포넌트
        return (
          <MyPageLayout>
            <Component {...pageProps} />
          </MyPageLayout>
        );
      default: //나머지 컴포넌트
        return (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        );
    }
  };

  //Component : 현재 페이지 컴포넌트
  //pageProps : 현재 페이지 컴포넌트에 전달되는 초기 props
  //초기 props는 getServerSideProps 또는 getStaticProps,getInitialProps를 통해 가져올 수 있음.
  //페이지 요청할 때마다 Component 내용은 변경함.
  // ...pageProps는 pageProps 객체 복사본을 Component로 전달함.
  return (
    // <div className="bg-white">
    //   <Header />
    //   <Component {...pageProps} />
    //   <Footer />
    // </div>

    // <Container>
    //   <Header />
    //   <Component {...pageProps} />
    //   <Footer />
    // </Container>

    // <MainLayout>
    //   <Component {...pageProps} />
    // </MainLayout>

    // <>
    //   {currentPath === '/login' || currentPath === '/regist' ? (
    //     <Component {...pageProps} />
    //   ) : (
    //     <MainLayout>
    //       <Component {...pageProps} />
    //     </MainLayout>
    //   )}
    // </>

    <>{renderLayoutOnPath()}</>
  );
}
