//Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//기본 호출 주소 : http://localhost:3000/api/hello
//라우팅 주소는 /api 폴더 아래 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨.

//NextApiRequest 타입 : 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체 (req)
//NextApiResponse 타입 : 서버에서 웹브라우저로 전달되는 각종 정보를 추출하는 HTTPResponse 객체 (res)
import type { NextApiRequest, NextApiResponse } from 'next';

//서버에서 웹브라우저로 반환하는 처리 결과 데이터 타입
type ResponseData = {
  code: number;
  data: string | null;
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
    if (req.method === 'GET') {
      //Step1 : 로직 구현

      //Step2 : API 호출 결과 설정
      apiResult.code = 200;
      apiResult.data = '백엔드 서버 데이터';
      apiResult.msg = 'OK';
    }

    if (req.method === 'POST') {
      //Step1 : 로직 구현

      //Step2 : API 호출 결과 설정
      apiResult.code = 200;
      apiResult.data = '백엔드 서버 데이터';
      apiResult.msg = 'OK';
    }
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = 'OK';
  }
}
