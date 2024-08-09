//2024.08.09
//전역 css 파일 참조하여 react app 전체 컴포넌트에서 스타일 사용
import '@/styles/globals.css';

//App 컴포넌트 참조
//최상위 컴포넌트에 전달되는 파라메터 타입 참조
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  // component 파라메터는 라우팅 주소에 따라 변경되는 컨텐츠 페이지 컴포넌트 의미
  return <Component {...pageProps} />;
}
