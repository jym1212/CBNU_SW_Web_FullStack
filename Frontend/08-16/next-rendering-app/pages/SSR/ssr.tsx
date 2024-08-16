//2024.08.16
//SSR 방식으로 페이지 렌더링

//SSR (Server Side Rendering)
//- 서버에서 매번 html 문서를 동적으로 만들어서 클라이언트로 전달하고,
//  클라이언트에서 받은 순수 html 문서를 보여주는 방식
//- 서버에서 렌더링을 하기 때문에 초기 로딩 속도가 빠르고
//  SEO(Search Engine Optimization)시 사용함.
//  (CSR 로딩 지연이 발생할 때 SSR로 대체 가능함.)

import {
  IArticle,
  ArticleTypeCode,
  BoardTypeCode,
  DisplayTypeCode,
} from '@/Interfaces/article';

//사용자 요청할 때, 서버에서 HTML + DATA 결과물을 동적으로 생성하고,
//동적으로 서버에서 만들어진 HTML 소스를 웹브라우저로 가져와 해당 영역에 표시함.
const SSR = ({ articles }: { articles: IArticle[] }) => {
  return (
    <div>
      <h1 className="m-4 text-xl">SSR (Server Side Rendering)</h1>

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

//SSR 구현을 위한 getServersideProps() 함수
//- SSR 구현을 위한 이미 정해져 있는 함수의 기능을 구현하고, 해당 함수를 호출함.
//- getServerSideProps() 함수는 해당 컴포넌트를 최초로 화면에 렌더링 시에
//  자동으로 먼저 호출되며, 서버에서만 실행됨.

//SSR 실행 순서
//getServerSideProps() 함수 실행 -> 해당 컴포넌트 렌더링(props 전달) ->
//서버에서 실행 -> return 구문(jsx) 실행 -> 웹브라우저에 최종 화면 표시

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:5000/api/article/list');
  const result = await res.json();

  //백엔드에서 게시글 데이터를 조회하여 해당 컴포넌트의 props 데이터 파라메터 형식으로 전달
  return { props: { articles: result.data } };
};

export default SSR;
