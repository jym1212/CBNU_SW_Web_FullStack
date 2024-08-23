//2024.08.23
//채팅 페이지 컴포넌트 (Frontend)
//호출 주소 : http://localhost:3000/bot

import React, { useState } from 'react';
import moment from 'moment';

import { IMessage, UserType } from '@/interfaces/message';

const Bot = () => {
  //사용자 입력 채팅 메세지 상태값 정의 및 초기화
  const [message, setMessage] = useState<string>('');

  //챗봇 채팅 이력 상태값 목록 정의 및 초기화
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  //메세지 전송 버튼 클릭 시, 메세지 백엔드 API 전송 처리 함수
  const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //백엔드로 사용자 메세지를 전송하기 전에 사용
    const userMessage: IMessage = {
      user_type: UserType.USER,
      message: message,
      send_date: new Date(),
    };

    //백엔드로 사용자 입력메세지를 전송하기 전에 사용자 메세지를
    //메세지 목록에 추가하여 화면에 사용자 입력 정보를 출력함.
    //-> 현재 WebSocket 기반 실시간 통신이 아니기 때문에 백엔드에서 2번 응답을 받아올 수 없음.
    setMessageList((prev) => [...prev, userMessage]);

    const response = await fetch('/api/bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (response.status === 200) {
      const result = await response.json();
      setMessageList((prev) => [...prev, result.data]);
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen antialiased text-gray-800 mt-14 pb-10">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {/* 메시지 목록 출력영역 */}
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messageList.map((msg, index) =>
                    msg.user_type === UserType.USER ? (
                      // 오른쪽 본인 메시지 출력 영역
                      <div
                        key={index}
                        className="col-start-6 col-end-13 p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{msg.message}</div>
                            <div className="absolute w-[200px] text-right text-xs bottom-0 right-0 -mb-5 text-gray-500">
                              User{' '}
                              {moment(msg.send_date).format(
                                'YYYY-MM-DD HH:mm:ss',
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // 왼쪽 다른 사용자 메시지 출력 영역
                      <div
                        key={index}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{msg.message}</div>
                            <div className="absolute w-[200px] text-xs bottom-0 left-0 -mb-5 text-gray-500">
                              Bot{' '}
                              {moment(msg.send_date).format(
                                'YYYY-MM-DD HH:mm:ss',
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* 메시지 입력 및 보내기 영역 */}
            <form
              onSubmit={messageSubmit}
              className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
              {/* 파일첨부버튼영역 */}
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
              </div>

              {/* 메시지 입력요소 영역 */}
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    name={message}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                </div>
              </div>

              {/* 메시지 전송버튼 영역 */}
              <div className="ml-4">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bot;
