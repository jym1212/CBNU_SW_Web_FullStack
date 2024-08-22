//2024.08.21
//호출 주소 : http://localhost:3000/article
//제공기능: 게시글 정보관리 RESTAPI 기능제공 모듈
//라우팅 주소는 /api 폴더 아래 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨.

///NextApiRequest 타입 : 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체 (req)
//NextApiResponse 타입 : 서버에서 웹브라우저로 전달되는 각종 정보를 추출하는 HTTPResponse 객체 (res)
import { IArticle } from '@/interfaces/article';
import type { NextApiRequest, NextApiResponse } from 'next';

//서버에서 웹브라우저로 반환하는 처리 결과 데이터 타입
type ResponseData = {
  code: number;
  data: string | null | IArticle | IArticle[];
  msg: string;
};

//해당 업무(Hello)에 대한 CRUD 처리를 위한 RESTful API 기능 구현 핸들러 함수
//하나의 함수로 해당 업무의 모든 라우팅 방식을 통햅해서 기능을 제공하는 통합 라우팅 함수
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  let apiResult: ResponseData = {
    code: 400,
    data: null,
    msg: 'Failed',
  };

  try {
    //클라이언트에서 GET 방식으로 요청해오는 경우 처리
    //호출 결과 : 게시글 전체 목록 데이터 반환
    if (req.method === 'GET') {
      //Step1 : 로직 구현
      const articles: IArticle[] = [
        {
          id: 1,
          title: '게시글1',
          contents: '게시글 내용1 입니다',
          view_cnt: 0,
          ip_address: '111.111.111.111',
          created_at: Date.now().toString(),
          created_member_id: 1,
        },
        {
          id: 2,
          title: '게시글2',
          contents: '게시글 내용2 입니다',
          view_cnt: 0,
          ip_address: '222.222.222.222',
          created_at: Date.now().toString(),
          created_member_id: 2,
        },
        {
          id: 3,
          title: '게시글3',
          contents: '게시글 내용3 입니다',
          view_cnt: 0,
          ip_address: '333.333.333.333',
          created_at: Date.now().toString(),
          created_member_id: 3,
        },
      ];

      //Step2 : API 호출 결과 설정
      apiResult.code = 200;
      apiResult.data = articles;
      apiResult.msg = 'OK';
    }

    //클라이언트에서 POST 방식으로 요청해오는 경우 처리
    if (req.method === 'POST') {
      //Step1 : 프론트엔드 전달 데이터 추출
      const title: string = req.body.title;
      const contents: string = req.body.contents;
      const created_member_id: number = req.body.created_member_id;

      //Step2 : DB 저장
      const article = {
        id: 1,
        title: '게시글1',
        contents: '게시글 내용1 입니다',
        view_cnt: 0,
        ip_addreess: '111.111.111.111',
        created_at: Date.now().toString(),
        created_member_id: 1,
      };

      //Step3 : API 호출 결과 설정
      apiResult.code = 200;
      apiResult.data = article;
      apiResult.msg = 'OK';
    }
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = 'Server Error';
  }

  res.json(apiResult);
}
