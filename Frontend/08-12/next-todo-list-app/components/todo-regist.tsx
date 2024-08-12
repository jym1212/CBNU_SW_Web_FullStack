//2024.08.12
//컴포넌트 공통 타입 참조
import { TodoType } from '../interface/todo';

//부모 컴포넌트에서 TodoReigst 컴포넌트로 전달되는 props 타입 정의
type TodoRegistProps = {
  todo: TodoType;
  todoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveTodo: () => void;
};

//TodoReigst 컴포넌트
const TodoRegist = ({ todo, todoChange, saveTodo }: TodoRegistProps) => {
  return (
    <form className="flex mb-4">
      <input
        type="text"
        value={todo.title}
        onChange={todoChange}
        className="flex-grow border border-gray-300 rounded px-4 py-2 mr-2"
        placeholder="Enter a todo"
      />
      <button
        type="button"
        onClick={saveTodo}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default TodoRegist;
