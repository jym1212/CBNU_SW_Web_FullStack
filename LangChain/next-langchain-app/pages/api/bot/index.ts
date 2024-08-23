//2024.08.23
//기본 호출 주소 : http://localhost:3000/api/bot/ (Backend)
//라우팅 주소는 /api 폴더 아래 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨.

//대화 이력 기반 챗봇 구현
//기본적으로 LLM은 사용자와 챗봇 간의 대화 이력 데이터를 관리하지 않음.
//대화 중에 발생한 데이터에 대해 물어보면 모르는 상황이 발생함.
//랭체인, 백엔드 영역에서 대화이력을 관리하고 해당 대화 이력과 프롬포트를
//LLM에게 전달하여 대화 이력 기반 챗봇 구현이 가능함.

//NextApiRequest 타입 : 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체 (req)
//NextApiResponse 타입 : 서버에서 웹브라우저로 전달되는 각종 정보를 추출하는 HTTPResponse 객체 (res)
import type { NextApiRequest, NextApiResponse } from 'next';

//프론트엔드로 반환할 메세지 데이터 타입 참조
import { IMemberMessage, UserType } from '@/interfaces/message';

//OpenAI LLM 서비스 객체 참조
import { ChatOpenAI } from '@langchain/openai';

//시스템, 휴먼 메세지 객체 참조
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

//프롬포트 템플릿 참조
import { ChatPromptTemplate } from '@langchain/core/prompts';

//LLM 응답 메세지 타입을 원하는 타입 결과물로 파싱해주는 OutputParser 객체 참조
//StringOutputParser : AI Message 타입에서 content 속성값만 문자열로 반환해주는 파서
import { StringOutputParser } from '@langchain/core/output_parsers';

//챗봇과의 대화 이력 정보 관리를 위한 메모리 기반 InMemoryChatHistory 객체 참조
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history';

//대화 이력 관리를 위한 세부 주요 객체 참조
import {
  RunnableWithMessageHistory,
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';

//서버에서 웹브라우저로 반환하는 처리 결과 데이터 타입
type ResponseData = {
  code: number;
  data: string | null | IMemberMessage;
  msg: string;
};

//메모리 영역에 실제 대화 이력이 저장되는 전역 변수 선언 및 구조 정의
//Record<string: 사용자 세션 아이디, InMemoryChatMessageHistory: 대화 이력 객체>
const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

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

      //Step3 : OpenAI llm 모델 기반 질의응답 처리
      //const result = await llm.invoke(prompt);

      //챗봇에게 대화 이력 기반 채팅을 할 것을 알려주고,
      //대화 이력 정보를 챗봇에게 제공하며 사용자 메세지를 포함한 채팅 전용 템플릿을 생성
      const promptTemplate = ChatPromptTemplate.fromMessages([
        ['system', '당신은 사용자와의 모든 대화 이력을 기억하는 조력자입니다.'],
        ['placeholder', '{chat_history}'],
        ['human', '{input}'],
      ]);

      //LLM OutputParser 객체 생성
      const outputParser = new StringOutputParser();

      //LLM 모델 체인 생성 (LLM 기본 작업)
      const llmChain = promptTemplate.pipe(llm).pipe(outputParser);

      //대화 이력 관리를 위한 체인 생성 (대화 이력 관리 작업)
      //RunnableWithMessageHistory({runnable: llm 모델 정보, getMessageHistory: () => {저장된 사용자 대화 이력 반환}})
      const historyChain = new RunnableWithMessageHistory({
        runnable: llmChain,
        getMessageHistory: async (sessionId) => {
          //메모리 영역에 해당 세션 아이디 사용자의 대화 이력이 없으면 대화 이력 관리 객체 생성
          if (messageHistories[sessionId] == undefined) {
            messageHistories[sessionId] = new InMemoryChatMessageHistory();
          }

          return messageHistories[sessionId];
        },

        //inMemoryChatMessageHistory : 사용자 입력 프롬포트 값 전달
        //historyMessagesKey : 지정된 사용자의 대화 이력 정보를 llm에게 전달
        inputMessagesKey: 'input',
        historyMessagesKey: 'chat_history',
      });

      //사용자 세션 아이디 값 구성
      //현재 챗봇을 호출한 사용자 아이디 값을 세선 아이디로 설정
      //추후 프론트엔드에서 전달된 사용자 아이디 값을 세션 아이디 값으로 설정
      const config = {
        configurable: { sessionId: nick_name },
      };

      //대화 이력 관리 기반 챗봇 LLM 호출
      //historyChain.invoke({input : 사용자 입력 프롬포트}, config : 사용자 세션 아이디)

      //case1 : 한 번에 LLM 응답 메세지 수신
      const resultMessage = await historyChain.invoke(
        { input: prompt },
        config,
      );

      //case2 : LLM 응답 메세지 스트림 방식으로 전달
      //LLM에서 전달된 응답메세지 문자열을 잘라서 순차적으로 전송
      /* const stream = await historyChain.stream({ input: prompt }, config);
      let resultMessage = '';

      for await (const chunk of stream) {
        console.log('|', chunk);
        resultMessage += chunk;
      } */

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
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = 'Server Error';
  }

  res.json(apiResult);
}
