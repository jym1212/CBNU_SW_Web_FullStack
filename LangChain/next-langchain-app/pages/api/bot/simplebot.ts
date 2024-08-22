//2024.08.21
//기본 호출 주소 : http://localhost:3000/api/bot/simplebot (Backend)
//라우팅 주소는 /api 폴더 아래 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨.

//NextApiRequest 타입 : 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체 (req)
//NextApiResponse 타입 : 서버에서 웹브라우저로 전달되는 각종 정보를 추출하는 HTTPResponse 객체 (res)
import type { NextApiRequest, NextApiResponse } from 'next';

//프론트엔드로 반환할 메세지 데이터 타입 참조
import { IMessage, UserType } from '@/interfaces/message';

//OpenAI LLM 서비스 객체 참조
import { ChatOpenAI } from '@langchain/openai';

//시스템, 휴먼 메세지 객체 참조
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

//프롬포트 템플릿 참조
import { ChatPromptTemplate } from '@langchain/core/prompts';

//LLM 응답 메세지 타입을 원하는 타입 결과물로 파싱해주는 OutputParser 객체 참조
//StringOutputParser : AI Message 타입에서 content 속성값만 문자열로 반환해주는 파서
import { StringOutputParser } from '@langchain/core/output_parsers';

//서버에서 웹브라우저로 반환하는 처리 결과 데이터 타입
type ResponseData = {
  code: number;
  data: string | null | IMessage;
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
      const prompt = req.body.message;

      //Step2 : LLM 모델 생성
      const llm = new ChatOpenAI({
        model: 'gpt-4o',
        apiKey: process.env.OPENAI_API_KEY,
      });

      //Step3 : OpenAI llm 모델 기반 질의응답 처리
      //case1 : llm 연동
      //const result = await llm.invoke(prompt);

      //case2 : 메세지 객체를 이용하여 llm 연동 (PropmtTemplate)
      //SystemMessage 객체는 LLM 역할이나 질문에 관련된 주요 정보를 LLM에게 전달하는 역할
      //HumanMessage 객체는 사용자가 보낸 질문 메세지를 저장하여 LLM에 전달 가능한 객체
      /* const messages = [
        new SystemMessage('당신은 세계적인 수준의 기술 문서 작성자힙니다.'),
        new HumanMessage(prompt),
      ];
      const result = await llm.invoke(messages);
      console.log('LLM 응답 결과 메세지 타입 확인 (AI Message) :', result); */

      //case3 : ChatPromptTemplate 객체를 이용하여 llm 연동 (ChatPromptTemplate)
      //프롬포트 템플릿 : LLM에게 전달할 수 있는 다양한 질문 템플릿을 제공하여
      //보다 효율적인 질문형식을 만들어 LLM에게 제공해 좋은 답변을 만들기 위한 방식 제공
      /* const promptTemplate = ChatPromptTemplate.fromMessages([
        ['system', '당신은 뛰어난 실력을 가진 쉐프입니다.'],
        ['user', prompt],
      ]);

      //template.pipe(LLM 모델) : chain 객체 반환 (chain은 처리할 작업의 기본 단위)
      //LangChain : chain(처리할 작업)을 여러 개 생성하고, chain을 연결하여 로직을 구현하는 방식
      const chain = promptTemplate.pipe(llm);
      const result = await chain.invoke({ input: prompt }); 

      const resultMsg: IMessage = {
        user_type: UserType.BOT,
        message: result.content as string,
        send_date: Date.now().toString(),
      }; */

      //case4 : OutputParser 객체를 이용하여 llm 연동 (OutputParser)
      //LLM 응답 결과 메세지는 기본 AI Message 객체를 반환하지만
      //해당 타입을 맞춤형 데이터 타입으로 변환해주는 OutputParser 객체를 이용하여 변환해주는
      //OutputParser를 이용하여 변환된 데이터를 사용자에게 반환함.
      const outputParser = new StringOutputParser();
      const promptTemplate = ChatPromptTemplate.fromMessages([
        ['system', '당신은 근대사 역사학자입니다.'],
        ['user', '{ input }'],
      ]);

      //template.pipe().pipe() : 2개의 체인을 만들어 순차적으로 2개의 체인 목록을 가진 결과 반환
      //llm 모델에 의해 결과 메세지(AI Message)를 받아 StringOutputParser를 통해 문자열로 변환한 결과 제공
      const chains = promptTemplate.pipe(llm).pipe(outputParser);

      //OutputParser로 인해
      const resultMessage = await chains.invoke({ input: prompt });

      //메세지 처리 결과 데이터
      const resultMsg: IMessage = {
        user_type: UserType.BOT,
        message: resultMessage,
        send_date: Date.now().toString(),
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
