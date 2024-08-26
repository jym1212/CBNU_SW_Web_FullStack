//2024.08.26
//RAG 기반 QNA 챗봇 구현 (backend)
//호출 주소 : http://localhost:3000/api/qnabot

import type { NextApiRequest, NextApiResponse } from 'next';

//웹페이지 크롤링을 위한 cheerio 패키지 참조하기
//** npm i cheerio 설치필요
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';

//텍스트 분할기 객체 참조하기
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

//수치화된 벡터 데이터 저장할 메모리형 벡터 저장소 객체 참조
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

//OpenAI LLM 서비스 객체 참조
//임베딩 처리를 위한 OpenAI Embedding  객체 참조
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';

//프롬포트 템플릿 참조
import { ChatPromptTemplate } from '@langchain/core/prompts';

//rag chain, LLM 생성을 위한 모듈 참조
import { pull } from 'langchain/hub';

//LLM 모델에 RAG 기반 체인 생성 클래스 참조
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

//LLM 응답 메세지 타입을 원하는 타입 결과물로 파싱해주는 OutputParser 객체 참조
import { StringOutputParser } from '@langchain/core/output_parsers';

//프론트엔드로 반환할 메세지 데이터 타입 참조
import { IMemberMessage, UserType } from '@/interfaces/message';

//API 호출 결과 반환 데이터 타입 정의
type ResponseData = {
  code: number;
  data: string | null | IMemberMessage;
  msg: string;
};

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
    if (req.method === 'POST') {
      const message = req.body.message;
      const nick_name = req.body.nickName;

      //Step1 : Indexing 웹페이지 로더 객체 생성하고, 페이지 로딩
      //Step1-1 : 웹페이지 로딩
      const loader = new CheerioWebBaseLoader(
        'https://api.ncloud-docs.com/docs/common-ncpapi',
      );
      const docs = await loader.load();

      //Step1-2 : 텍스트 분할기 객체 생성 및 텍스트 분할(Chunk)
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      //텍스트 분할 처리
      const splitDocs = await textSplitter.splitDocuments(docs);

      //Step1-3 : 임베팅 처리(split된 단어를 벡터 데이터화 처리) 후, 벡터 저장소에 저장
      //임베딩 시, 반드시 지정된 임베딩 모델을 통해 처리
      const vectorStore = await MemoryVectorStore.fromDocuments(
        splitDocs,
        new OpenAIEmbeddings(),
      );

      //Step2 : 임베딩된 데이터 조회 (retriever 실행)
      //검색기 생성
      const retriever = vectorStore.asRetriever();

      //사용자 질문을 이용하여 벡터 저장소를 조회하고, 조회 결과를 반환
      const retrieverResult = await retriever.invoke(message);
      console.log('벡터 저장소 검색 결과 :', retrieverResult);

      //Step3 : RAG 기반 (증강된 검색 데이터를 통한) LLM 호출
      const gptModel = new ChatOpenAI({
        model: 'gpt-4o',
        temperature: 0.2,
        apiKey: process.env.OPENAI_API_KEY,
      });

      //RAG 전용 프롬포트 템플릿 생성
      const ragPrompt = await pull<ChatPromptTemplate>('rlm/rag-prompt');

      //RAg 전용 프롬포트 기반 체인 생성
      const ragChain = await createStuffDocumentsChain({
        llm: gptModel,
        prompt: ragPrompt,
        outputParser: new StringOutputParser(),
      });

      //Step4 : 체인 실행하여 RAG 조회 결과를 LLM에 전달하고 결과 반환
      const resultMessage = await ragChain.invoke({
        question: message,
        context: retrieverResult,
      });

      //RESTfull API 챗봇 응답 메세지 포맷 지정
      const resultMsg: IMemberMessage = {
        user_type: UserType.BOT,
        nick_name: 'bot',
        message: resultMessage,
        send_date: new Date(),
      };

      apiResult.code = 200;
      apiResult.data = resultMsg;
      apiResult.msg = 'OK';
    }
  } catch (err) {
    //RESTfull API 챗봇 응답 메세지 포맷 지정
    const resultMsg: IMemberMessage = {
      user_type: UserType.BOT,
      nick_name: 'bot',
      message: '조회 결과가 없습니다',
      send_date: new Date(),
    };

    apiResult.code = 500;
    apiResult.data = resultMsg;
    apiResult.msg = 'Server Error';
  }

  res.json(apiResult);
}
