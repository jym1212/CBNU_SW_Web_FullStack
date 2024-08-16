//2024.08.16
//ISR 방식으로 페이지 렌더링

//ISR (Incremental Static Regeneration)
//- SSG 방식의 단점을 보완하기 위해 도입된 확장 방식
//- SSG 방식은 정적 파일을 미리 만든 후, 클라이언트에게 전달하는 방식이므로,
//  데이터 변경이 발생하면 다시 빌드하여 배포해야 함.
//- ISR 방식은 정적 파일을 미리 만들어 놓고, 클라이언트에게 전달한 후,
//  데이터 변경이 발생하면 변경된 부분만 업데이트하여 보여줌.

import {
  IArticle,
  ArticleTypeCode,
  BoardTypeCode,
  DisplayTypeCode,
} from '@/Interfaces/article';

const ISR = ({ articles }: { articles: IArticle[] }) => {
  return (
    <div>
      <h1 className="m-4 text-xl">ISR (Incremental Static Regeneration)</h1>

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

//getStaticProps 함수
export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/api/article/list');
  const result = await res.json();

  //페이지 수명 설정 및 수명이 지난 페이지는 최신 정보로 서버 측에서 재생성 후 반환
  //revalidate 속성을 사용하여 페이지 유효기간 설정(유효기간 이후 화면 갱신)
  return {
    props: { articles: result.data },
    revalidate: 30, //페이지 유효기간(수명)을 초단위로 지정
  };
};

export default ISR;
