//2024.08.16
//getStaticPaths() 함수를 사용하여 SSG 방식으로 페이지 렌더링

//SSG (Static Site Generation)
//- 미리 서버에서 정적 파일을 만들어 저장하고, 클라이언트에게 전달하는 방식
//- 정적인 웹페이지 소스를 개발환경 빌드 타임에 미리 만들어서 서버에 배포하고,
//  배포된 서버 소스를 클라이언트에게 전달하여 해석하여 보여줌.
//- 정적 웹사이트(DB 프로그래밍이 필요 없는 경우),
//  데이터 등록이나 변경 주기가 긴 웹사이트를 개발할 때 주로 사용함.

//** 기본적으로 Next.js의 모든 컴포넌트 파일은 JSX만 표시할 때 SSG 방식으로 작동함.

import {
  IArticle,
  ArticleTypeCode,
  BoardTypeCode,
  DisplayTypeCode,
} from '@/Interfaces/article';

//ParsedUrlQuery 참조
import { ParsedUrlQuery } from 'querystring';

//파라메터 형식 정의
interface ArticleParams extends ParsedUrlQuery {
  id: string;
}

const SSG = ({ article }: { article: IArticle }) => {
  return (
    <div>
      <h1 className="m-4 text-xl">SSG (Static Site Generation)</h1>

      <div className="mt-4 ml-4 mr-4">
        <table className="border-collapse table-auto text-left w-full">
          <thead className="border border-slate-400">
            <tr>
              <th className="border border-slate-400 p-1">글 번호</th>
              <th className="border border-slate-400 p-1">글 제목</th>
              <th className="border border-slate-400 p-1">글 내용</th>
              <th className="border border-slate-400 p-1">IP 주소</th>
              <th className="border border-slate-400 p-1">등록자</th>
              <th className="border border-slate-400 p-1">등록 일시</th>
            </tr>
          </thead>

          {/* 정적인 데이터를 사용 */}
          <tbody>
            <tr>
              <td className="border border-slate-400 p-1">
                {article.article_id}
              </td>
              <td className="border border-slate-400 p-1">{article.title}</td>
              <td className="border border-slate-400 p-1">
                {article.contents}
              </td>
              <td className="border border-slate-400 p-1">
                {article.ip_address}
              </td>
              <td className="border border-slate-400 p-1">
                {article.reg_member_id}
              </td>

              <td className="border border-slate-400 p-1">
                {article.reg_date}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

//getStaticPaths() 함수
//데이터 기반 SSG 렌더링 방식 사용 시, 여러 데이터를 기반으로
//여러 정적 웹페이지를 생성할 때 사용

//SSG 실행 순서
//getStaticPaths() 함수 실행 -> 실행 파라메터를 getStaticProps() 함수로 전달 ->
//getStaticProps(파라메터값)의 결과값을 해당 컴포넌트 props로 전달 -> return값으로 해당 정적 페이지 생성

export async function getStaticPaths() {
  //여러 페이지 정보를 가지고 있는 데이터 목록 조회
  const res = await fetch('http://localhost:5000/api/article/list');
  const result = await res.json();

  //목록 데이터 기반 Path 생성
  const paths = result.data.map((article: IArticle) => ({
    params: { id: article.article_id.toString() },
  }));

  //반환되는 getStaticPaths() 함수의 결과값이 getStaticProps() 함수의 props(파라메터)로 자동 전달
  //fallback : false로 설정하면, 추출된 패스값 외에 다른 값이 파라메터로 전달 시, 404 에러 생성
  return { paths, fallback: false };
}

//getStaticProps() 함수
//빌드 타임에 getStaticPaths() 함수에서 전달된 파라메터를 기반으로
//단일 게시글 정보를 조회하여 해당 컴포넌트에 props로 전달
export const getStaticProps = async ({ params }: { params: ArticleParams }) => {
  const res = await fetch(`http://localhost:5000/api/article/${params.id}`);
  const result = await res.json();

  //백엔드에서 단일 게시글 데이터를 조회하여 해당 컴포넌트의 props 데이터 파라메터 형식으로 전달
  return { props: { article: result.data } };
};

export default SSG;
