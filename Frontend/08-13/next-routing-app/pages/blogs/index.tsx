// 2024.08.13
// 블로그 목록 페이지

import { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

import { BlogType } from '@/interface/blog';

const BlogList = () => {
  const router = useRouter();

  //게시글 목록 데이터 상태 정의 및 초기화
  const [blogs, setBlogs] = useState<BlogType[]>([
    {
      id: 1,
      title: '제목1',
      content: '내용1',
      viewCnt: 10,
      display: true,
      createdAt: '2024-08-11',
      updatedAt: '2024-08-11',
    },
    {
      id: 2,
      title: '제목2',
      content: '내용2',
      viewCnt: 20,
      display: true,
      createdAt: '2024-08-12',
      updatedAt: '2024-08-12',
    },
    {
      id: 3,
      title: '제목3',
      content: '내용3',
      viewCnt: 30,
      display: true,
      createdAt: '2024-08-13',
      updatedAt: '2024-08-13',
    },
  ]);

  //신규 게시글 버튼 클릭 이벤트 처리 함수
  //useRouter.push() 함수를 사용하여 신규 게시글 작성 페이지로 이동
  const moveDetail = () => {
    router.push('/blogs/new');
  };

  return (
    <div className="h-[700px] ml-4">
      <h1> 블로그 목록</h1>
      <div className="text-right">
        <button
          onClick={moveDetail}
          className="block w- rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          신규 게시글 작성
        </button>
      </div>

      <table className="w-full ml-4 mr-4 mt-4">
        <thead>
          <tr>
            <th>글 번호</th>
            <th>글 제목</th>
            <th>조회수</th>
            <th>등록 일시</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            //<tr key={blog.id} onClick={() => router.push(`/blogs/${blog.id}`)}>
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.viewCnt}</td>
              <td>{blog.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
