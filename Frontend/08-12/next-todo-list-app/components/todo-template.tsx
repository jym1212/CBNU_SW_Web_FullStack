//2024.08.12
//TodoTemplate 컴포넌트
const TodoTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {children}
    </div>
  );
};

export default TodoTemplate;
