//2024.08.22
//역할 지정 챗봇 구현 (Frontend)
//호출 주소 : http://localhost:3000/translatebot

import React, { useState } from 'react';

import { IMessage, UserType, ISendMessage } from '@/interfaces/message';

const TranslateBot = () => {
  //사용자 입력 채팅 메세지 상태값 정의 및 초기화
  const [message, setMessage] = useState<ISendMessage>({
    role: '사용자 메세지를 영어로 번역해주세요.',
    message: '',
  });

  //챗봇 채팅 이력 상태값 목록 정의 및 초기화
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  //메세지 전송 버튼 클릭 시, 메세지 백엔드 API 전송 처리 함수
  const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //백엔드로 사용자 메세지를 전송하기 전에 사용
    const userMessage: IMessage = {
      user_type: UserType.USER,
      message: message.message,
      send_date: new Date(),
    };

    //백엔드로 사용자 입력메세지를 전송하기 전에 사용자 메세지를
    //메세지 목록에 추가하여 화면에 사용자 입력 정보를 출력함.
    //-> 현재 WebSocket 기반 실시간 통신이 아니기 때문에 백엔드에서 2번 응답을 받아올 수 없음.
    setMessageList((prev) => [...prev, userMessage]);

    const response = await fetch('/api/bot/translatebot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (response.status === 200) {
      const result = await response.json();
      setMessageList((prev) => [...prev, result.data]);
      setMessage({ role: '', message: '' });
    }
  };

  return (
    <div className="m-4">
      TranslateBot
      {/* 메세지 입력 전송 영역 */}
      <form className="mt-4" onSubmit={messageSubmit}>
        <div>
          <input
            type="text"
            name="role"
            placeholder="챗봇의 역할(목적)을 지정해주세요."
            value={message.role}
            onChange={(e) => {
              setMessage({ ...message, role: e.target.value });
            }}
            className="block rounded-md w-[500px] border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          />
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            name="message"
            placeholder="질문을 입력해주세요."
            value={message.message}
            onChange={(e) => {
              setMessage({ ...message, message: e.target.value });
            }}
            className="block rounded-md w-[500px] border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className=" rounded-md bg-indigo-600 px-3 py-2 ml-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            전송
          </button>
        </div>
      </form>
      {/* 메세지 출력 표시 영역 */}
      <div className="mt-4">
        <ul>
          {messageList.map((msg, index) => (
            <li key={index}>
              {msg.user_type} : {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TranslateBot;
