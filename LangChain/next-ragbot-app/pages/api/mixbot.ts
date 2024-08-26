//2024.08.26
//챗봇 구현 (Backend)
//기본 호출 주소 : http://localhost:3000/api/mixbot

//NextApiRequest 타입 : 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체 (req)
//NextApiResponse 타입 : 서버에서 웹브라우저로 전달되는 각종 정보를 추출하는 HTTPResponse 객체 (res)
import type { NextApiRequest, NextApiResponse } from 'next';

//프론트엔드로 반환할 메세지 데이터 타입 참조
import { BotType, IMemberMessage, UserType } from '@/interfaces/message';

//OpenAI LLM 서비스 객체 참조
import { ChatOpenAI } from '@langchain/openai';

//Google Gemini LLM 객체 참조
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

//Gemini 기반 RAG 구현 시, 사용할 수 있는 구글 임베딩 모델 참조
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

//프롬포트 템플릿 참조
import { ChatPromptTemplate } from '@langchain/core/prompts';

//LLM 응답 메세지 타입을 원하는 타입 결과물로 파싱해주는 OutputParser 객체 참조
import { StringOutputParser } from '@langchain/core/output_parsers';

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
      const message = req.body.message;
      const botType = req.body.botType;

      let resultMessage = '';

      //Step2 : LLM 모델 생성
      if (botType == BotType.LLMGPT) {
        const llm = new ChatOpenAI({
          modelName: 'gpt-4o',
          apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await llm.invoke(message);
        console.log('Gemini 챗봇 응답 :', response);

        const resultMessage = response.content as string;
      }

      if (botType == BotType.LLMGEMINI) {
        const llm = new ChatGoogleGenerativeAI({
          modelName: 'gemini-pro',
          maxOutputTokens: 2048,
        });
        const response = await llm.invoke(message);
        console.log('Gemini 챗봇 응답 :', response);

        const resultMessage = response.content as string;
      }

      //메세지 처리 결과 데이터
      const resultMsg: IMemberMessage = {
        user_type: UserType.BOT,
        message: resultMessage,
        send_date: new Date(),
        nick_name: 'bot',
      };

      //Step4 : API 호출 결과 설정
      apiResult.code = 200;
      apiResult.data = resultMsg;
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
