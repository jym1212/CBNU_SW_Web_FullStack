//2024.08.14

//리듀서 함수 관련 타입 참조
import { CountActionType, ActionType } from '@/interfaces/common';

//Reducer 함수 정의
//reducer 함수는 재사용이 가능하며, 통합 로직을 처리하는 함수임.
//reducer 함수를 reducer-count2.tsx 파일 바깥에서 정의하여 관리함.
export function countReducer(state: number, action: ActionType): number {
  const { type } = action;

  switch (type) {
    case CountActionType.PLUS:
      return state + 1;
    case CountActionType.MINUS:
      return state - 1;
    case CountActionType.INIT:
      return 100;
    default:
      return state;
  }
}
