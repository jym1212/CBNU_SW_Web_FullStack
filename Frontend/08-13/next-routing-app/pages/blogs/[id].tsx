// 2024.08.13
// 단일 블로그 페이지

// 리액트 훅은 use 접두사로 시작하는 재사용 가능한 함수
// useRouter Hook은 라우팅 처리와 정보를 관리함.
// 라우팅 주소 내 정보 추출과 로직을 위한 페이지 이동 처리를 위해 사용함.
import { useRouter } from 'next/router';
import { useState } from 'react';

import { BlogType } from '@/interface/blog';

const Blog = () => {
  //useRouter 훅 생성
  const router = useRouter();

  //라우팅 주소 파라메터 방식(/blogs/1)이나 쿼리스트링 방식(/blogs?id=1)으로 정보 전달
  //모두 router.query.키값으로 URL 주소에서 정보 추출
  console.log('게시글 고유번호 :', router.query.id);

  //단일 게시글 상태 정보 정의 및 초기화
  const [blog, setBlog] = useState<BlogType>({
    id: 1,
    title: '제목1',
    content: '내용1',
    viewCnt: 10,
    display: true,
    createdAt: '2024-08-11',
    updatedAt: '2024-08-11',
  });

  return (
    <div className="h-[700px] m-4">
      게시글 페이지 번호 : {router.query.id} <br />
      <br />글 번호 : {blog.id} <br />
      제목 : {blog.title} <br />
      내용 : {blog.content} <br />
      작성 일자 : {blog.createdAt} <br /> <br />
      <button
        onClick={() => router.push('/blogs')}
        className="block w- rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        목록 이동
      </button>
    </div>
  );
};

export default Blog;
