//2024.08.09

//가이드 자식 컴포넌트에 전달할 props 데이터 타입 정의
export type GuideProps = {
  href: string;
  title: string;
  desc: string;
};

export interface IGuide {
  href: string;
  title: string;
  desc: string;
}
