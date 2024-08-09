//2024.08.09
//Next.js 프로젝트의 기본 페이지 컴포넌트

//nfe : 화살표 함수 기반 함수형 컴포넌트 생성
//파스칼 표기법으로 컴포넌트 이름 정의

//구글 폰트 (폰트 스타일) 참조
import { Inter } from 'next/font/google';

//폰트 스타일 적용하기 위해 Inter 함수 호출
const inter = Inter({ subsets: ['latin'] });

//interface 참조
import { GuideProps, IGuide } from '@/interface/Main';

//각종 재사용 컴포넌트 참조
import Header from '@/components/header';
import LogoContents from '@/components/logo-contents';
import Guide from '@/components/guide';

function Main() {
  //next.js 로고 이미지 경로 데이터
  const logoPath = '/next.svg';

  //프론트엔드 핵심 기술 가이드 데이터
  const guides: GuideProps[] = [
    {
      href: 'https://nextjs.org',
      title: 'Next.js',
      desc: 'Next.js 기술',
    },
    {
      href: 'https://tailwindcss.com',
      title: 'Tailwind',
      desc: 'Tailwind CSS Framework 기술',
    },
    {
      href: 'https://js.langchain.com',
      title: 'LangChain.js',
      desc: 'LangChain.js 기술',
    },
    {
      href: 'https://mixedcode.com',
      title: 'MixedCode',
      desc: 'MixedCode 사이트',
    },
  ];

  //자식 컴포넌트에서 발생한 이벤트 처리 함수
  const handleChildClick = (url: string) => {
    console.log('이동할 URL 데이터 :', url);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* 헤더 컴포넌트 영역 */}
      <Header mainPage="pages/main.tsx" onClick={handleChildClick} />

      {/* 로고 컴포넌트 영역 */}
      <LogoContents logoPath={logoPath} />

      {/* 가이드 컴포넌트 영역 */}
      <Guide guides={guides} />
    </main>
  );
}

export default Main;

/*
동일한 포멧이지만 가독성을 위해 위와 같이 사용함.

export default function Main() {
  return <div>Main Page</div>;
}
*/
