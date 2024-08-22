//2024.08.21
//전역 데이터 타입 정의

export interface IGlobalData {
  token: string;
  member: ILoginMember;
}

export interface ILoginMember {
  member_id: number;
  name: string;
  email: string;
}
