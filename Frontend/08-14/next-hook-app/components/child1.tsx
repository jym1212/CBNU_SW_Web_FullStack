//2024.08.14
//자식 컴포넌트1 영역

const Child1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[1100px] bg-red-300">
      <div className="text-white text-center text-xl p-3">
        Child1
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Child1;
