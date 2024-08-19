//2024.08.19
//신규 회원가입 페이지 컴포넌트
//호출 주소 : http://localhost:3003/regist

//화면 상에 데이터 관리를 위한 useState 훅 호출
import { useState } from 'react';

//프론트엔드 라우팅 주소 이동 처리를 위한 useRouter() 훅 호출
import { useRouter } from 'next/router';

//신규 회원가입 정보 인터페이스 타입 참조
import { IEntryMember } from '@/interfaces/member';

//회원가입 페이지 컴포넌트
const Regist = () => {
  //useRouter 훅 객체 생성
  const router = useRouter();

  //신규 회원가입 정보 상태 데이터 정의 및 초기화
  //useState(초기값 설정) 함수 : [변수, 변수값 변경 setter 함수] 배열 반환
  const [member, setMemeber] = useState<IEntryMember>({
    email: '',
    password: '',
    name: '',
  });

  //사용자 입력 요소 값이 변경될 때마다 데이터 소스, 동기화 처리해주는 이벤트 함수
  const memberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //...member : 현재 member 상수의 복사본 객체 생성
    //e.target : change 이벤트가 발생하는 UI 요소 객체
    //[e.target.name = 이벤트 발생한 요소 name 속성값] : e.target.name(이벤트 발생한 요소의 현재 입력 value 값)
    setMemeber({ ...member, [e.target.name]: e.target.value });
  };

  //회원가입 버튼 클릭 시, 신규 회원정보 백엔드 처리 함수
  const registSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //e.preventDefault() : 이벤트 발생 시, 기본 이벤트 동작 중단
    //form submit 이벤트를 취소하여 화면이 리프레시 되는 것을 방지
    e.preventDefault();

    //백엔드 RESTful API 중 신규 회원가입 API를 fetch() ajax 호출 기능을 통해 백엔드로 전달
    //예시 : ES2015 자바스크립트 기본 AJAX 통신 내장 라이브러리인 fetch()를 통해 백엔드 통신

    //await fetch('백엔드 API 호출 주소', 호출 옵션);
    //fetch() 함수를 통해 데이터를 백엔드로 전달할 때, 반드시 json 문자열 형태로 전달
    //JSON.stringify(json 데이터) : json 데이터를 json 문자열로 변환
    try {
      //Step1 : fetch() 함수 호출
      const response = await fetch('http://localhost:5000/api/member/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //프론트엔드에서 제공하는 데이터 타입의 유형 지정(필수)
        body: JSON.stringify(member),
      });

      //Step2 : fetch() 함수 호출 결과 백엔드 반환 실제 데이터 추출
      const result = await response.json();

      if (result.code == 200) {
        console.log('백엔드에서 제공한 json 데이터 :', result);

        //정상적으로 회원가입된 경우, 로그인 페이지 컴포넌트로 이동
        //router.push('이동 url 주소') : 이동시키고 싶은 url 주소 (프론트엔드 도메인 주소 제외)
        router.push('/login');
      } else {
        console.log('백엔드 서버 에러 발생 :', result.msg);

        if (result.msg == 'Exist Member' && result.code == 400) {
          alert('동일한 메일주소가 존재합니다.');
          return false;
        }
      }
    } catch (err) {
      console.error('백엔드 REST API 호출 중 에러가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Regist your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* 신규 회원가입 폼 영역 */}
          <form className="space-y-6" onSubmit={registSubmit}>
            {/* 이메일 입력 영역 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={member.email}
                  onChange={memberChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 비밀번호 입력 영역 */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={member.password}
                  onChange={memberChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 이름 입력 영역 */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={member.name}
                  onChange={memberChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 회원가입 버튼 영역 */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Regist
              </button>
            </div>
          </form>

          {/* 로그인 페이지 이동 */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Regist;
