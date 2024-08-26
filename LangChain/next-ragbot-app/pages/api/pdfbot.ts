//2024.08.26
//RAG 기반 PDF 파일 요약 챗봇 구현 (Backend)
//기본 호출 주소 : http://localhost:3000/api/pdfbot

//NextApiRequest 타입 : 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체 (req)
//NextApiResponse 타입 : 서버에서 웹브라우저로 전달되는 각종 정보를 추출하는 HTTPResponse 객체 (res)
import type { NextApiRequest, NextApiResponse } from 'next';

//프론트엔드로 반환할 메세지 데이터 타입 참조
import { IMemberMessage, UserType } from '@/interfaces/message';

//PDF 파일 로더 참조
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

//웹사이트 상에 존재하는 PDF 파일 로더 참조
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';

//OpenAI LLM 서비스 객체 참조
import { ChatOpenAI } from '@langchain/openai';

//텍스트 스플리터 객체 참조
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

//LLM 응답 메세지 타입을 원하는 타입 결과물로 파싱해주는 OutputParser 객체 참조
import { StringOutputParser } from '@langchain/core/output_parsers';

//프롬포트 템플릿 참조
import { ChatPromptTemplate } from '@langchain/core/prompts';

//임베딩 처리를 위한 OpenAI Embedding  객체 참조
//임베딩 : 문장 내 단어를 벡터 수치화하는 과정
import { OpenAIEmbeddings } from '@langchain/openai';

//수치화된 벡터 데이터 저장할 메모리형 벡터 저장소 객체 참조
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

//LLM 모델에 RAG 기반 체인 생성 클래스 참조
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

//rag chain, LLM 생성을 위한 모듈 참조
//LangChain Hub : 일종의 오픈소스 저장소와 같이 langchain에 특하된 각종 RAG 전용 프롬포트 테믈릿 제공
//각종 RAG 전용 프롬포트 템플릿들이 제공되며,  HUB와 통신하기 위해 pull 객체 참조
import { pull } from 'langchain/hub';

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

      //Step2 : LLM 모델 생성
      const llm = new ChatOpenAI({
        model: 'gpt-4o',
        temperature: 0.2,
        apiKey: process.env.OPENAI_API_KEY,
      });

      //Step3 : PDF 파일 Indexing 과정
      //Step3-1 : Indexing 과정의 document loading 과정
      const loader = new PDFLoader('example_data/Manual.pdf', {
        parsedItemSeparator: '',
      });

      //PDF 파일 내 페이지 하나 당 문서 하나다 생성 (docs 내 pdf page 1개)
      const docs = await loader.load();

      //Step3-2 : 문서 내 문장을 splitting(chunk화) 처리\
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      //Splitting된 단어 집합 문서 생성
      //pdf document를 지정한 splitter로 단어 단위 쪼갠 (ChunkData) 데이터로 변환
      const splitDocs = await splitter.splitDocuments(docs);

      //Step3-3 : Splitting된 문서 내 단어를 임베딩(벡터화 처리)해서 메모리 벡터 저장소에 저장
      //MemoryVectorStore.fromDocuments('임베딩된 문서', 사용할 임베딩 모델 처리기);
      //지정한 임베딩 모델을 통해 chunk data를 개별 vector로 수치화
      //수치화된 데이터를 지정한 vector 전용 저장소에 저장
      const vectorStore = await MemoryVectorStore.fromDocuments(
        docs,
        new OpenAIEmbeddings(),
      );

      //Step4 : Query를 통해 벡터 저장소에서 사용자 질문과 관련된 검색 결과 조회
      //메모리 벡터 저장소에서 사용자 질문으로 Query
      //vector 저장소 기반 검색기 변수  정의하고, 검색기 객체 생성
      const retriever = vectorStore.asRetriever();
      const searchResult = await retriever.invoke(message);

      console.log('백터 저장소 검색 결과 :', searchResult);

      //Step5 : RAG 전용 prompt와 chain 생성
      //Step5-1 : RAG 전용 prompt 생성
      //langchain/hub를 통해 공유된 rag 전용 프롬포트 템플릿 참조 생성
      const ragPrompt = await pull<ChatPromptTemplate>('rlm/rag-prompt');

      //Step5-2 : LLM 모델에 RAG 기반 검색 결과를 전달 가능한 prompt 사용 chain 생성
      //createStuffDocumentsChain() : LLM 모델에 RAG 기반 검색 결과를 전달 가능한 프롬포트 사용 체인 생성
      const ragChain = await createStuffDocumentsChain({
        llm: llm,
        prompt: ragPrompt,
        outputParser: new StringOutputParser(),
      });

      //Step6 : LLM Chain을 실행하고 실행 시, 벡터 저장소 검색 결과를 추가로 전달하여 LLM 실행
      const resultMessage = await ragChain.invoke({
        question: message, //사용자 질문
        context: searchResult, //사용자 질문 결과 벡터 저장소 RAG 기반 검색 결과 값
      });

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
