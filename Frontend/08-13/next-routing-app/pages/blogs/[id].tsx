// 2024.08.13
// 단일 블로그 페이지

// 리액트 훅은 use 접두사로 시작하는 재사용 가능한 함수
// useRouter Hook은 라우팅 처리와 정보를 관리함.
// 라우팅 주소 내 정보 추출과 로직을 위한 페이지 이동 처리를 위해 사용함.
import { useRouter } from 'next/router';

const Blog = () => {
  //useRouter 훅 생성
  const router = useRouter();

  //라우팅 주소 파라메터 방식(/blogs/1)이나 쿼리스트링 방식(/blogs?id=1)으로 정보 전달
  //모두 router.query.키값으로 URL 주소에서 정보 추출
  console.log('게시글 고유번호 :', router.query.id);

  return <div>게시글 페이지 번호 : {router.query.id}</div>;
};

export default Blog;
