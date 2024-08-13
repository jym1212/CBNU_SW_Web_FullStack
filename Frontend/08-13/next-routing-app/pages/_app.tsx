//2024.08.13
//_app 파일

//pages 폴더 내에서 제공되는 모든 페이지에 대한 최상위 레이아웃을 제공함.
//pages 폴더 내 모든 페이지 컴포넌트(document.tsx 제외)는 _app.tsx 파일로 감싸져서 제공됨.
//_app.tsx 파일에서 전체 화면 레이아웃을 구성하거나 전역 CSS를 적용함.
//페이지별 공통 레이아웃 구성하고 유지 가능하며, 자식 컴포넌트를 구성할 수 있음.

//react next.js front app의 전역 스타일 시트 참조 및 적용
import '@/styles/globals.css';

//NextApp 최상위 App 컴포넌트의 타입인  AppProps를 참조
//기본 props 값과 자식 컴포넌트를 파라메터로 받아 App 컴포넌트 생성
import type { AppProps } from 'next/app';

//현재 사용자 URL 라우팅 주소 분석을 위해 useRouter 훅 참조
import { useRouter } from 'next/router';

//레이아웃 구성 재사용 컴포넌트 참조
import Header from '@/components/header';
import Footer from '@/components/footer';
import BaseLayout from '@/components/base-layout';
import AuthLayout from '@/components/auth-layout';

export default function App({ Component, pageProps }: AppProps) {
  //component는 App 컴포넌트 내에 포함(출력)되는 자식 컴포넌트를 의미함.
  //자식 컴포넌트 최상위 App 컴포넌트의 각종 props의 복사본을 자식 컴포넌트에게 전달함.

  const router = useRouter();

  //현재 웹 브라우저의 URL 주소 경로 정보 조회
  const currentPath = router.pathname;
  console.log('currentPath :', currentPath);

  return (
    // 구성 방법 1
    // <>
    //    {/* 상단 헤더 GNB 영역 */}
    //    <Header />
    //
    //    {/* 주소가 변경될 때마다 바뀌는 페이지 컴포넌트 영역 */}
    //    <Component {...pageProps} />
    //
    //    {/* 하단 푸터 영역 */}
    //    <Footer />
    // </>

    // 구성 방법 2
    // <>
    //   <BaseLayout>
    //     <Component {...pageProps} />
    //   </BaseLayout>
    // </>

    //사용자가 접속한 URL 경로에 따라 레이아웃 다르게 구성
    <>
      {currentPath.includes('mypage') ? (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      )}
    </>
  );
}
