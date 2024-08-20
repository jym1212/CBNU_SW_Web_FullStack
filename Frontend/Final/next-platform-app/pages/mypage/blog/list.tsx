//2024.08.19
//게시글 목록 페이지 컴포넌트
//호출 주소 : http://localhost:3003/mypage/blog/list

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { IBlog } from '@/interfaces/blog';

import axios from 'axios';

//SSR 방식으로 최초 화면 렌더링 시, 사용
//const BlogList = ({blogs}:{blogs:IBlog[]})

const BlogList = () => {
  const router = useRouter();

  //case1 : CSR (Client Side Rendering)
  //CSR 방식에만 useState 훅 사용
  //게시글 목록 데이터 상태 정의
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  //CSR 방식으로 최초 화면 렌더링 시,
  //웹브라우저 서버 RESTful API 호출 게시글 목록 조회 바인딩 처리
  useEffect(() => {
    if (localStorage.getItem('token') == undefined) {
      router.push('/login');
    }

    getBlogList();
  }, []);

  //비동기 방식으로 백엔드 게시글 목록 데이터 호출
  async function getBlogList() {
    try {
      //axios.get('API 주소');
      const res = await axios.get('http://localhost:5000/api/article/list');

      if (res.data.code == 200) {
        setBlogs(res.data.data);
      } else {
        console.error('Server Error :', res.data.msg);
      }
    } catch (err) {
      console.error('백엔드 API 호출 에러 :', err);
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            블로그 목록
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            관심 있는 주제에 대해 블로그를 작성하고 공유하세요.
          </p>
        </div>

        {/* 게시글 작성 버튼 영역 */}
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              router.push('/mypage/blog/create');
            }}
          >
            게시글 작성
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    글 번호
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    글 제목
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    게시 여부
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    조회수
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    IP 주소
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    게시 일시
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {blog.article_id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {blog.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {blog.is_display_code == 1 ? '게시 중' : '게시 안 함'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {blog.view_count}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {blog.ip_address}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {blog.reg_date}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href="/mypage/blog/modify"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {blog.article_id}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

//case2 : SSR (Server Side Rendering)
//SSR 방식으로 최초 화면 렌더링 시, 서버에서 데이터 조회
//서버에서 HTML 소스 생성하여 클라이언트에게 전달
/* export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:5000/api/article/list');

  const result = await res.json();
  return { props: { blogs: result.data } };
}; */

export default BlogList;
