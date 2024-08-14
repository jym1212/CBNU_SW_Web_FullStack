//2024.08.14
//자식 컴포넌트3-1 영역

const Child3_1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[500px] bg-red-500">
      Child3_1
      <div>{children}</div>
    </div>
  );
};

export default Child3_1;
