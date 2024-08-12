//2024.08.12
//useState Hook 함수 참조
import { useState } from 'react';

//컴포넌트 공통 타입 참조
import { TodoType } from '../interface/todo';

//Todo 컴포넌트 참조
import TodoTemplate from '../components/todo-template';
import TodoRegist from '../components/todo-regist';
import TodoList from '../components/todo-list';

//Todo 페이지
const Todo = () => {
  //단일 할일 상태값 저장 변수
  const [todo, setTodo] = useState<TodoType>({
    title: '',
    desc: '',
    selected: false,
  });

  //할일 목록 문자열 배열 상태값 정의
  const [todos, setTodos] = useState<TodoType[]>([
    { title: 'sample', desc: 'sample', selected: false },
  ]);

  //할일 텍스트 변경 이벤트 처리 함수
  const todoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  //할일 저장 이벤트 처리 함수
  const saveTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ ...todo, title: '', desc: '', selected: false });
  };

  //할일 삭제 이벤트 처리 함수
  const removeTodo = (index: number) => {
    const filteredTodos = todos.filter(
      (todo: TodoType, i: number) => i !== index,
    );
    setTodos(filteredTodos);
  };
  return (
    <>
      {/* 할일 템플릿 영역 */}
      <TodoTemplate>
        {/* 할일 등록 영역 */}
        <TodoRegist todo={todo} todoChange={todoChange} saveTodo={saveTodo} />

        {/* 할일 목록 영역 */}
        <TodoList todos={todos} removeTodo={removeTodo} />
      </TodoTemplate>
    </>
  );
};

export default Todo;
