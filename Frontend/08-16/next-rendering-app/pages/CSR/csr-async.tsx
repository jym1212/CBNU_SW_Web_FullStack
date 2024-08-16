//2024.08.16
//CSR 방식으로 페이지 렌더링

//CSR (Client Side Rendering)
//- 서버에서는 클라이언트에게 정적 파일(HTML, CSS, JS)을 전달하고,
//  클라이언트(웹브라우저)에서 렌더링을 하는 방식
//- 정적 리소스 파일을 모두 서버상의 공간에 업로드하고 도메인을 통해 웹브라우저에 전달

//React Hook 함수 참조
import { useState, useEffect } from 'react';

//게시글 공통 타입 참조
import {
  IArticle,
  ArticleTypeCode,
  BoardTypeCode,
  DisplayTypeCode,
} from '@/Interfaces/article';

//client.js 파일에 의해 웹브라우저 환경에서 해당 컴포넌트 최초 화면을 렌더링함.
const CSR = () => {
  //게시글 목록 상태 데이터 정의 및 초기값 설정
  const [articles, setArticles] = useState<IArticle[]>([]);

  //화면이 최초로 렌더링 되는 시점(마운팅)을 감지하기 위해 useEffect 훅 사용
  useEffect(() => {
    //최초 화면 렌더링(CSR) 되기 전에 백엔드 API에서 게시글 목록 가져옴.
    //** 비동기 방식으로 useEffect 훅과 fetch 함수를 이용하여 데이터 처리 (비동기 방식 추천)

    //비동기 fetching 함수 정의
    const fetchData = async () => {
      //NODE EXPRESS 실제 백엔드 API 주소 호출
      const res = await fetch('http://localhost:5000/api/article/list');

      //DB가 구축되어있지 않다면 임시 DB 데이터로 응답
      //const res = await fetch('http://localhost:3000/api/article');

      if (!res.ok) {
        throw new Error('HTTP 호출 에러 발생');
      }

      const result = await res.json();
      setArticles(result.data);
    };

    //비동기 fetching 함수 호출하고, 에러발생 예외 처리
    fetchData().catch((e) => {
      console.log('백엔드 호출 에러 발생 :', e);
    });
  }, []);

  return (
    <div>
      <h1 className="m-4 text-xl">CSR (Client Side Rendering) - async</h1>

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

export default CSR;
