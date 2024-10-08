//2024.08.20
//갤러리 페이지 컴포넌트
//호출 주소 : http://localhost:3003/gallary

import { useState, useEffect } from 'react';

import { IBlogFile } from '@/interfaces/blog';

const Gallery = () => {
  //모델 타입, 프롬프트 상태 값 정의
  const [model, setModel] = useState<string>('dall-e-3');

  // 사용자 프롬프트 텍스트 상태 값 정의
  const [prompt, setPrompt] = useState<string>('');

  // 이미지 정보 목록 상태 값 정의
  const [fileList, setFileList] = useState<IBlogFile[]>([]);

  //최초로 화면이 렌더링 되는 시점(마운팅)에서 백엔드 API 호출
  useEffect(() => {
    //백엔드 API에서 이미지 목록을 가져옴.
    getBlogFiles();
  }, []);

  //백엔드에서 이미지 목록 데이터를 가져오는 비동기 함수 기능 정의
  async function getBlogFiles() {
    //fetch() 함수를 통해 백엔드 목록 API 호출
    const response = await fetch('http://localhost:5000/api/openai/all', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const resultData = await response.json();
    console.log('백엔드에서 전달해준 결과 값 :', resultData);

    await setFileList(resultData.data as IBlogFile[]);
  }

  //이미지 생성 요청 함수
  const generateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //fetch() 함수를 통해 백엔드 DALLE API 호출
    const response = await fetch('http://localhost:5000/api/openai/dalle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: model, prompt: prompt }),
    });

    const resultData = await response.json();
    console.log('백엔드에서 전달해준 결과 값 확인:', resultData);

    //파일 목록 데이터 조회 출력
    await getBlogFiles();

    // 이미지 생성 후 프롬프트 모델 선택 값 초기화 처리
    setPrompt('');
    setModel('dall-e-3');
  };

  return (
    <div className="bg-white">
      <div className="mx-auto mt-8 max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="m-5 text-center">
          <h1 className="text-2xl font-bold">생성형 이미지 활용하기</h1>
        </div>
        <form className="flex" onSubmit={generateSubmit}>
          {/* 모델 선택 영역 */}
          <select
            id="model"
            name="model"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
            className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="dall-e-2">Dalle.2</option>
            <option value="dall-e-3">Dalle.3</option>
          </select>

          {/* 프롬프트 입력 영역 */}
          <input
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            type="text"
            className="block ml-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          {/* 이미지 생성 버튼 */}
          <button
            type="submit"
            className="rounded-md ml-4 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Generate
          </button>
        </form>

        {/* 이미지 파일 목록 영역 */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {fileList.map((file, index) => (
            <a href="#" key={index} className="group text-sm">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={file.file_path}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <h3 className="mt-4 font-medium text-gray-900">
                {file.contents}
              </h3>

              <p className="italic text-gray-500">{file.title}</p>
              <p className="mt-2 font-medium text-gray-900">
                {file.reg_member_name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
