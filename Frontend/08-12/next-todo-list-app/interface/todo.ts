//2024.08.12
//할일 타입 정의

//Type-alias 방식으로 할일 타입 정의
export type TodoType = {
  title: string;
  desc: string;
  selected: boolean;
};

//interface 방식으로 할일 타입 정의
export interface ITodo {
  title: string;
  desc: string;
  selected: boolean;
}
