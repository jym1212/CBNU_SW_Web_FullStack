//2024.08.19
//게시글 등록 페이지 컴포넌트
//호출 주소 : http://localhost:3003/mypage/blog/create

//백엔드 RESTful API 통신을 위한 axios 패키지 참조
import axios from 'axios';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ICreateBlog } from '@/interfaces/blog';

const BlogCreate = () => {
  const router = useRouter();

  //최초 화면 컴포넌트 렌더링(마운팅) 시점에 로컬스토리지 내 토큰값 존재 여부 체크
  //토큰값이 없다면 로그인 페이지로 리다이렉션 처리
  useEffect(() => {
    //서버 인증 JWT 사용자 인증 토큰이 스토리지에 없다면 로그인 페이지로 이동
    if (localStorage.getItem('token') == undefined) {
      router.push('/login');
    }
  }, []);

  const [blog, setBlog] = useState<ICreateBlog>({
    title: '',
    contents: '',
    display: 1,
  });

  //신규 게시글 정보를 백엔드 API로 전달하여 등록 처리
  const blogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //웹브라우저 로컬스토리지 저장소에서 로그인 사용자 JWT 토큰 조회
    const token = localStorage.getItem('token');

    //axios나 fetch() 함수를 통해 백엔드 RESTful API 호출
    try {
      //case1 : axios를 이용한 데이터 처리
      //axios.post('API 주소', 전달할 데이터);
      const response = await axios.post(
        'http://localhost:5000/api/article/create',
        blog,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log('axios를 통해 호출한 게시글 등록 :', response);

      if (response.data.code == 200) {
        alert('게시글 등록 완료');
        router.push('/mypage/blog/list');
      } else {
        console.log('게시글 등록 실패 :', response.data.msg);
      }

      //case2 : fetch() 함수를 이용한 데이터 처리
      /* const response = await fetch('http://localhost:5000/api/article/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });

      const result = await response.json();
      if (result.code == 200) {
        alert('게시글 등록 완료');
        router.push('/mypage/blog/list');
      } else {
        console.log('게시글 등록 실패 :', result.msg);
      } */
    } catch (err) {
      console.error('백엔드 API 호출 에러 발생 :', err);
    }
  };

  return (
    <form onSubmit={blogSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            신규 게시글
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            신규 게시글을 작성합니다.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* 글제목 영역 */}
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                글 제목
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={blog.title}
                    onChange={(e) => {
                      setBlog({ ...blog, title: e.target.value });
                    }}
                    placeholder="제목을 입력해주세요."
                    className="block flex-1 border-0  bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* 글내용 영역 */}
            <div className="col-span-full">
              <label
                htmlFor="contents"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                글 내용
              </label>
              <div className="mt-2">
                <textarea
                  id="contents"
                  name="contents"
                  rows={5}
                  value={blog.contents}
                  onChange={(e) => {
                    setBlog({ ...blog, contents: e.target.value });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 게시여부 영역 */}
            <div className="sm:col-span-3">
              <label
                htmlFor="display"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                게시여부
              </label>
              <div className="mt-2">
                <select
                  id="display"
                  name="display"
                  value={blog.display}
                  onChange={(e) => {
                    setBlog({ ...blog, display: Number(e.target.value) });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={1}>게시함</option>
                  <option value={0}>게시안함</option>
                </select>
              </div>
            </div>

            {/* 첨부파일 영역 */}
            <div className="col-span-full">
              <label
                htmlFor="file"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                첨부파일
              </label>
              <div className="mt-2">
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="block border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        {/* 취소 버튼 영역 */}
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => {
            router.push('/mypage/blog/list');
          }}
        >
          Cancel
        </button>

        {/* 저장 버튼 영역 */}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default BlogCreate;
