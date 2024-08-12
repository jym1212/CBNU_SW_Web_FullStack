import Personal from '../components/personal';
import Company from '../components/company';

const Profile = () => {
  return (
    <>
      {/* 개인정보 영역 */}
      {/* 자식 component에 props로 읽기 전용 데이터 전달 */}
      <Personal
        name="정윤민"
        email="test@test.co.kr"
        phone="010-1234-5678"
        age={23}
      >
        {/* 자식 component의 children 값 정의 */}
        <b>사용자 기본 프로필 정보입니다.</b>
      </Personal>

      <hr></hr>

      {/* 회사정보 영역 */}
      <Company
        company="엠소프트웨어"
        role="풀스택 개발자"
        address="서울시 강남구 테헤란로"
      >
        <b>소속 회사 기본 정보입니다.</b>
      </Company>
    </>
  );
};

export default Profile;
