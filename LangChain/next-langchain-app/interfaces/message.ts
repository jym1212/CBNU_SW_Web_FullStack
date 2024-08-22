//2024.08.22
//채팅 데이터 타입 정의

export interface IMessage {
  user_type: UserType;
  message: string;
  send_date: string;
}

export enum UserType {
  USER = 'User',
  BOT = 'Bot',
}

export interface ISendMessage {
  message: string;
  role: string;
}
