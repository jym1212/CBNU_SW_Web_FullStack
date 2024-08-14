//2024.08.14

//카운트 상태값 로직 처리 유형 열거형 타입 정의
export enum CountActionType {
  PLUS = 'plus',
  MINUS = 'minus',
  INIT = 'init',
}

//ActionType 인터페이스 정의
export interface ActionType {
  type: CountActionType;
}
