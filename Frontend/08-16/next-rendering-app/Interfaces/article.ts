//2024.08.16
//article 인터페이스 정의

//단일 게시글 정보 인터페이스 타입 정의
export interface IArticle {
  article_id: number;
  board_type_code: BoardTypeCode;
  title: string;
  article_type_code: ArticleTypeCode;
  contents?: string;
  view_count: number;
  ip_address: string;
  is_display_code: DisplayTypeCode;
  reg_date: string;
  reg_member_id: number;
  edit_date?: string | null;
  edit_member_id?: number | null;
}

//게시판 유형코드 열거형 타입 정의
export enum BoardTypeCode {
  NOTICE = 1,
  GENERAL = 2,
}

//게시글 유형코드 열거형 정의
export enum ArticleTypeCode {
  GENERAL = 0,
  TOP_FIXED = 1,
}

//게시글 노출 여부 코드 열거형 정의
export enum DisplayTypeCode {
  DISPLAY = 1,
  HIDE = 0,
}
