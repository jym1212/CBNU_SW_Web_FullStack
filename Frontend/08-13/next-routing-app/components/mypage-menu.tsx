// 2024.08.13
// 마이페이지 메뉴 컴포넌트

import Link from 'next/link';

const MypageMenu = () => {
  return (
    <div className="h-[700px]">
      <ul>
        <li>
          <Link href="/mypage/profile">프로필</Link>
        </li>
        <li>
          <Link href="/mypage/settings/config">환경설정</Link>
        </li>
      </ul>
    </div>
  );
};

export default MypageMenu;
