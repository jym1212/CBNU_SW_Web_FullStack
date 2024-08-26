//2024.08.22
//채팅 데이터 타입 정의

export interface IMessage {
  user_type: UserType;
  message: string;
  send_date: Date;
}

export enum UserType {
  USER = 'User',
  BOT = 'Bot',
}

export enum BotType {
  LLMGPT = 'LLMGPT',
  LLMGEMINI = 'LLMGEMINI',
  RAGDOC = 'RAGDOC',
  RAGWEB = 'RAGWEB',
}

export interface ISendMessage {
  message: string;
  role: string;
}

export interface IMemberMessage extends IMessage {
  nick_name: string;
}
