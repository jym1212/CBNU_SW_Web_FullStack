//2024.08.16
//getStaticProps() 함수를 사용하여 SSG 방식으로 페이지 렌더링

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

const SSG = ({ articles }: { articles: IArticle[] }) => {
  return (
    <div>
      <h1 className="m-4 text-xl">SSG (Static Site Generation)</h1>

      <div className="mt-4 ml-4 mr-4">
        <table className="border-collapse table-auto text-left w-full">
          <thead className="border border-slate-400">
            <tr>
              <th className="border border-slate-400 p-1">글 번호</th>
              <th className="border border-slate-400 p-1">글 제목</th>
              <th className="border border-slate-400 p-1">조회수</th>
              <th className="border border-slate-400 p-1">IP 주소</th>
              <th className="border border-slate-400 p-1">등록 일시</th>
            </tr>
          </thead>

          {/* 정적인 데이터를 사용 */}
          <tbody>
            {articles.map((article, index) => (
              <tr key={index}>
                <td className="border border-slate-400 p-1">
                  {article.article_id}
                </td>
                <td className="border border-slate-400 p-1">{article.title}</td>
                <td className="border border-slate-400 p-1">
                  {article.view_count}
                </td>
                <td className="border border-slate-400 p-1">
                  {article.ip_address}
                </td>
                <td className="border border-slate-400 p-1">
                  {article.reg_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//getStaticProps() 함수
//- SSG 방식으로 페이지를 렌더링 하기 위한 함수
//- 개발자 컴퓨터(환경)에서 빌드 타임에 REST API를 호출하여 빌드 타임의 데이터를 기준으로
//  정적 웹페이지를 생성함

//SSG 실행 순서
//개발환경 npm run build를 통한 빌드 실행 -> getStaticProps() 함수를 사용하여 컴포넌트 탐색 ->
//컴포넌트 별 getStaticProps() 함수 실행 -> 실행 결과(반환 데이터)를 해당 컴포넌트 props로 전달 ->
//해당 컴포넌트 렌더링(props 전달) -> return 구문(jsx) 실행 -> 정적 파일 생성

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/api/article/list');
  const result = await res.json();

  //백엔드에서 전체 게시글 데이터를 조회하여 해당 컴포넌트의 props 데이터 파라메터 형식으로 전달
  return { props: { articles: result.data } };
};

export default SSG;
