//2024.08.23
//기본 호출 주소 : http://localhost:3000/api/agent/pagebot (Backend)
//라우팅 주소는 /api 폴더 아래 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨.

//웹페이지 지식 베이스 Agent 기반 챗봇 구현

//NextApiRequest 타입 : 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체 (req)
//NextApiResponse 타입 : 서버에서 웹브라우저로 전달되는 각종 정보를 추출하는 HTTPResponse 객체 (res)
import type { NextApiRequest, NextApiResponse } from 'next';

//프론트엔드로 반환할 메세지 데이터 타입 참조
import { IMemberMessage, UserType } from '@/interfaces/message';

//OpenAI LLM 서비스 객체 참조
import { ChatOpenAI } from '@langchain/openai';

//cheerio 웹페이지 크롤링 라이브러리 참조
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';

//텍스트 스플리터 객체 참조
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

//임베딩 처리를 위한 OpenAI Embedding  객체 참조
//임베딩 : 문장 내 단어를 벡터 수치화하는 과정
import { OpenAIEmbeddings } from '@langchain/openai';

//수치화된 벡터 데이터 저장할 메모리형 벡터 저장소 객체 참조
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

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

      //Step3 : cheerio를 이용해 특정 웹페이지 내용 크롤링
      const loader = new CheerioWebBaseLoader(
        'https://yozm.wishket.com/magazine/detail/2702/',
      );

      //웹페이지 내용 로딩
      const rowDocs = await loader.load();
      console.log('Cheerio를 통해 로딩한 웹페이지 데이터 : ', rowDocs);

      //Step4 : 텍스트 스플리터 처리
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      //Splitting된 단어 집합 문서 생성
      const docs = await splitter.splitDocuments(rowDocs);

      //Step5 : Splitting된 문서 내 단어를 임베딩(벡터화 처리)해서 메모리 벡터 저장소에 저장
      //MemoryVectorStore.fromDocuments('임베딩된 문서', 사용할 임베딩 모델 처리기);
      const vectorStore = await MemoryVectorStore.fromDocuments(
        docs,
        new OpenAIEmbeddings(),
      );

      //Step6 : 메모리 벡터 저장소에서 사용자 질문으로 Query
      //vector 저장소 기반 검색기 변수 정의
      const retriever = vectorStore.asRetriever();
      const searchResult = await retriever.invoke(prompt);

      console.log('백터 저장소 검색 결과 :', searchResult);

      //메세지 처리 결과 데이터
      const resultMsg: IMemberMessage = {
        user_type: UserType.BOT,
        message: searchResult[0].pageContent,
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
