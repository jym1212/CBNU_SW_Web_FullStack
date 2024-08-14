//2024.08.14
//자식 컴포넌트3-2 영역

const Child3_2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[500px] bg-red-500">
      Child3_2
      <div>{children}</div>
    </div>
  );
};

export default Child3_2;
