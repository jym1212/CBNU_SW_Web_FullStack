//2024.08.14

//자식 컴포넌트 참조
import Child1 from '../components/child1';
import Child2 from '../components/child2';
import Child3_1 from '../components/child3-1';
import Child3_2 from '../components/child3-2';
import Child4 from '../components/child4';
import Child5 from '../components/child5';

//전역 메세지 데이터 참조
//useContext 훅을 사용하여 전역 컨텍스트 영역의 데이터 추출
import { useContext } from 'react';

//App.tsx에서 생성한 전역 상태 데이터 참조
//_app.tsx 내에서 제공하는 AppContext 참조
import { AppContext } from '@/pages/_app';

const Complex = () => {
  //useContext 훅을 이용해 AppContext에서 관리하는
  //msg 전역 데이터와 msg 전역 데이터 변경 setter 함수인 setMsg를 불러옴.
  const { msg, setMsg } = useContext(AppContext);

  return (
    <>
      <div className="bg-red-950 h-[600px]">
        <h1 className="text-white text-center text-5xl p-7">
          Complex Component : {msg}
        </h1>
        <Child1>
          <Child2>
            <Child3_1>
              <Child4 />
            </Child3_1>
            <Child3_2>
              <Child5 />
            </Child3_2>
          </Child2>
        </Child1>
      </div>
    </>
  );
};

export default Complex;
