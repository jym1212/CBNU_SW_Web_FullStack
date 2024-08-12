//2024.08.12
//컴포넌트 공통 타입 참조
import { TodoType } from '../interface/todo';

//부모 컴포넌트에서 TodoList 컴포넌트로 전달되는 props 타입 정의
type TodoListProps = {
  todos: TodoType[];
  removeTodo: (index: number) => void;
};

//TodoList 컴포넌트
const TodoList = ({ todos, removeTodo }: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo: TodoType, index: number) => (
        <li
          key={index}
          className="flex items-center justify-between border-b border-gray-300 py-2"
        >
          <span>{todo.title}</span>
          <button
            type="button"
            onClick={() => removeTodo(index)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
