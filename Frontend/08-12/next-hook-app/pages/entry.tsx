//오픈소스 UI 라이브러리 기능 참조
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Switch, Field, Label } from '@headlessui/react';

//form tag를 사용하려면 @tailwindcss/forms 설치 필요 (폼 깨짐 방지)
//tailwind.config.ts에서 pligins에 require('@tailwindcss/forms') 추가

//리액트 로컬 데이터 상태 관리 훅인 useState 참조
import { useState } from 'react';

const Entry = () => {
  //원시 데이터 타입 기반 useState 훅 사용
  //개별 UI 요소 별로 state 생성 시, 관리 요소가 많이 발생함.
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telephoneType, setTelephoneType] = useState<number>(0);
  const [telephone, setTelephone] = useState<string>('');
  const [introduction, setIntrodunction] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(false);

  //이름 값이 변경될 때마다 name state 변경
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //이벤트가 발생한 input 요소의 현재 입력 값을 추출
    //관련 setter 함수에 값을 전달하여 상태값 변경
    setName(e.target.value);
  };

  //암호 값이 변경될 때마다 password state 변경
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //전화번호 유형 값이 변경될 때마다 telephoneType state 변경
  const handleTelephoneTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTelephoneType(Number(e.target.value));
  };

  //자기소개 값이 변경될 때마다 introduction state 변경
  const handleIntrodunctionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIntrodunction(e.target.value);
  };

  //체크박스 값이 변경될 때마다 agreed state 변경
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  //폼 요소 submit 이벤트 처리 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Submit 이벤트 실행으로 인한 화면 껌벅임 방지
    //기본 동작 중단
    e.preventDefault();

    //백엔드로 전달할 JSON 사용자 데이터 객체 생성
    const memberData = {
      name,
      password,
      email,
      telephoneType,
      telephone,
      introduction,
      agreed,
    };

    //백엔드의 회원가입 API에 해당 데이터를 전송함.
    console.log('회원가입 데이터 :', memberData);
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          신규 회원 가입
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          사용자 정보를 입력해주세요.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        {/* 회원가입 양식 영역 */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* 이름 영역 */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              이름
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                //onChange={(e) => setName(e.target.value)}
                onChange={handleNameChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* 암호 영역 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              암호
            </label>
            <div className="mt-2.5">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                //onChange={(e) => setPassword(e.target.value)}
                onChange={handlePasswordChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* 메일 주소 영역 */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              메일주소
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* 연락처 영역 */}
          <div className="sm:col-span-2">
            <label
              htmlFor="telephone"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              연락처
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="telephonetype" className="sr-only">
                  연락처 유형
                </label>
                <select
                  id="telephonetype"
                  name="telephonetype"
                  value={telephoneType}
                  onChange={handleTelephoneTypeChange}
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option value={0}>핸드폰</option>
                  <option value={1}>집전화</option>
                  <option value={2}>회사전화</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                />
              </div>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-32 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* 자기소개 영역 */}
          <div className="sm:col-span-2">
            <label
              htmlFor="introduction"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              자기소개
            </label>
            <div className="mt-2.5">
              <textarea
                id="introduction"
                name="introduction"
                rows={4}
                value={introduction}
                //onChange={(e) => setIntrodunction(e.target.value)}
                onChange={handleIntrodunctionChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* 개인정보보호정책 동의 영역 */}
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              {/* <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch> */}

              <input
                type="checkbox"
                id="agreed"
                name="agreed"
                checked={agreed}
                onChange={handleCheckboxChange}
              />
            </div>
            <Label className="text-sm leading-6 text-gray-600">
              <a href="#" className="font-semibold text-indigo-600">
                개인정보보호정책
              </a>
              에 동의합니다.
            </Label>
          </Field>
        </div>

        {/* 가입신청 버튼 영역 */}
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            가입신청
          </button>
        </div>
      </form>
    </div>
  );
};

export default Entry;
