//2024.08.14

import Link from 'next/link';
import { title } from 'process';

//컴포넌트 내에서의 데이터 상태 관리를 위한 useState 훅 참조
//현재 컴포넌트 생애주기(LifeCycle) 관리를 위한 useEffect 훅 참조

//** 중요 : useEffect 훅을 이용할 땐 반드시 프로젝트의
//next.config.mjs 파일 내 reactStrictMode 설정을 false로 변경해야 함.
//(reactStrictMode 설정은 개발 시에만 사용되고, 서비스 배포 시에는 사용하지 않음)
import { useState, useEffect } from 'react';

interface BlogItem {
  id: number;
  title: string;
  viewCnt: number;
  createDate: string;
}

//임시 데이터베이스 객체
const orginalData: BlogItem[] = [
  { id: 1, title: '제목1', viewCnt: 10, createDate: '2024-08-11' },
  { id: 2, title: '제목2', viewCnt: 20, createDate: '2024-08-12' },
  { id: 3, title: '제목3', viewCnt: 30, createDate: '2024-08-13' },
  { id: 4, title: '제목4', viewCnt: 40, createDate: '2024-08-14' },
  { id: 5, title: '제목5', viewCnt: 50, createDate: '2024-08-15' },
];

const BlogList = () => {
  //검색어 키워드  상태 데이터 값 정의 및 초기화
  const [searchWord, setSearchWord] = useState<string>('');

  //검색 결과 블로그 목록 상태 데이터 값 정의 및 초기화
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  //현재 컴포넌트 최초로 화면에 렌더링 되는 시점(mount)에 실행되는 useEffect 훅
  //useEffect('마운팅 될 때 실행할 콜백함수', '[생애주기 시점 빈 배열]');
  //생애주기 시점 배열 : [] => 최초 한번만 실행, [searchWord] => searchWord 값이 변경될 때마다 실행
  useEffect(() => {
    console.log('최초 화면이 나타나는 시점(마운팅)에 호출됨.');

    //최초 해당 컴포넌트가 마우팅 될 때 백엔드 REST API를 호출하여 블로그 목록 조회
    //조회한 블로그 목록 데이터를 setter 함수(setBlogs)를 이용하여 상태 데이터에 저장
    setBlogs(orginalData);

    //해당 컴포넌트가 사라지는 시점에 실행되는 콜백함수 정의 (clean-up 함수)
    return () => {
      console.log('해당 컴포넌트가 사라지기 전에 실행됨.');
    };
  }, []);

  //화면 내 변화가 발생할 때마다 실행되는 useEffect 훅
  useEffect(() => {
    console.log('화면 내 데이터가 변경되어 렌더링이 일어날 때마다 실행됨.');
  });

  //특정 상태 데이터 변경을 감지하여 프로그래밍을 구현할 때 사용하는 useEffect 훅
  //useEffect('실행할 콜백함수', ['감지할 상태 데이터']);
  //감지할 상태 데이터 값이 변경될 때마다 콜백함수가 실행
  useEffect(() => {
    console.log('searchWord 값이 변경될 때마다 실행됨.', searchWord);
    blogSearch();
  }, [searchWord]);

  //검색어 기반 블로그 검색 처리 함수
  const blogSearch = () => {
    let searchResult: BlogItem[] = [];

    if (searchWord.length > 0) {
      searchResult = orginalData.filter((item) =>
        item.title.includes(searchWord),
      );
      setBlogs(searchResult);
    } else {
      setBlogs(orginalData);
    }
  };

  // https://tailwindui.com : tailwind css UI 컴포넌트 제공 참고 사이트
  return (
    <div>
      <h1 className="m-4">블로그 조회</h1>
      {/* 상단 검색어 입력 영역 */}
      <div className="flex m-4">
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          type="button"
          //onClick={blogSearch}
          className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          검색
        </button>
        <Link
          href="/"
          className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          메인 이동
        </Link>
      </div>

      {/* 블로그 검색 결과 목록 표시 영역 */}
      <div className="m-4">
        <table className="w-full">
          <thead>
            <tr>
              <th>글 번호</th>
              <th>글 제목</th>
              <th>조회수</th>
              <th>등록 일자</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.viewCnt}</td>
                <td>{item.createDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
