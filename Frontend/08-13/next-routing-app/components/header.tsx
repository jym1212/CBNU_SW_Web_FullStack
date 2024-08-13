// 2024.08.13
// 상단 헤더 영역 컴포넌트
// GNB (Global Navigation Bar) 영역

// 메뉴 링크를 위한 Link 컴포넌트 참조
import Link from 'next/link';

const Header = () => {
  return (
    /* 
    flex: flex 속성을 사용하여 좌우 레이아웃을 구성함.
    w-8/12 : 너비(width)를 전체 12 중 8로 설정함.
    mt-4 : 상단 여백(margin-top)을 4로 설정함.
    px-4 : 좌우 여백(padding)을 4로 설정함. 
    */
    <div className="flex bg-gray-400 m-1 p-1">
      <div className="w-8/12 mt-4 px-4">
        <Link href="/">HOME</Link> |{' '}
        <Link href="/company/intro">회사 소개</Link> |{' '}
        <Link href="/products/1/price">제품 분류</Link> |{' '}
        <Link href="/blogs/index">블로깅</Link> |{' '}
        <Link href="/blogs/1">상세 블로깅</Link> |{' '}
        <Link href="/company/contact">문의하기</Link> |
      </div>
      <div className="w-4/12 mt-4 px-4 text-right">
        <Link href="/auth/login">로그인</Link> |{' '}
        <Link href="/auth/entry">회원가입</Link> |{' '}
        <Link href="/mypage/profile">프로필</Link> |{' '}
        <Link href="/mypage/settings/config">환경설정</Link> |{' '}
      </div>
    </div>
  );
};

export default Header;
