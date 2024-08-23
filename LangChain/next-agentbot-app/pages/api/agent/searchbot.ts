//2024.08.23
//기본 호출 주소 : http://localhost:3000/api/agent/searchbot (Backend)
//라우팅 주소는 /api 폴더 아래 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨.

//검색엔진 Agent 기반 챗봇 구현
//검색엔진 서비스로 Tavily(타빌리) Agent 서비스를 이용하여
//최신 검색  결과 기반 응답 챗봇

//NextApiRequest 타입 : 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체 (req)
//NextApiResponse 타입 : 서버에서 웹브라우저로 전달되는 각종 정보를 추출하는 HTTPResponse 객체 (res)
import type { NextApiRequest, NextApiResponse } from 'next';

//Tavily Agent 검색 서비스 조회 결과 객체 참조
//Tavily Agent : @langchain/coummunity/tools에 기본 포함되어 제공해주는 agent
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';

//프론트엔드로 반환할 메세지 데이터 타입 참조
import { IMemberMessage, UserType } from '@/interfaces/message';

//OpenAI LLM 서비스 객체 참조
import { ChatOpenAI } from '@langchain/openai';

//서버에서 웹브라우저로 반환하는 처리 결과 데이터 타입
type ResponseData = {
  code: number;
  data: string | null | IMemberMessage;
  msg: string;
};

//해당 업무(Hello)에 대한 CRUD 처리를 위한 RESTful API 기능 구현 핸들러 함수
//하나의 함수로 해당 업무의 모든 라우팅 방식을 통햅해서 기능을 제공하는 통합 라우팅 함수
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  let apiResult: ResponseData = {
    code: 400,
    data: null,
    msg: 'Failed',
  };

  try {
    //클라이언트에서 POST 방식으로 요청해오는 경우 처리
    if (req.method === 'POST') {
      //Step1 : 프론트엔드에서 사용자 프롬포트 추출
      const nick_name = req.body.nickName;
      const prompt = req.body.message;

      //Step2 : LLM 모델 생성
      const llm = new ChatOpenAI({
        model: 'gpt-4o',
        apiKey: process.env.OPENAI_API_KEY,
      });

      //Step3 : 타빌리 검색엔진 툴 기반 조회
      const searchTool = new TavilySearchResults();

      //검색엔진 타빌리에 사용자 질문 전달하고 응답 값 반환
      const searchResult = await searchTool.invoke(prompt);

      //타빌리 조회 결과 값은 JSON 문자열 포맷으로 제공
      //JSON 객체로 변환하여 사용
      const result = JSON.parse(searchResult);

      //외부 Agent Tool을 사용하는 경우 반환 값 타입을 정확히 확인
      console.log('Tavily Search Result :', searchResult);

      //메세지 처리 결과 데이터
      const searchResultMsg: IMemberMessage = {
        user_type: UserType.BOT,
        message: result[0].content,
        send_date: new Date(),
        nick_name: 'bot',
      };

      //Step4 : API 호출 결과 설정
      apiResult.code = 200;
      apiResult.data = searchResultMsg;
      apiResult.msg = 'OK';
    }
  } catch (err) {
    const searchResultMsg: IMemberMessage = {
      user_type: UserType.BOT,
      message: '조회 결과가 없습니다',
      send_date: new Date(),
      nick_name: 'bot',
    };

    apiResult.code = 500;
    apiResult.data = searchResultMsg;
    apiResult.msg = 'Server Error';
  }

  res.json(apiResult);
}
