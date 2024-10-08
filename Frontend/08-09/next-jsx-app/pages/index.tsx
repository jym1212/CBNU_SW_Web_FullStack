//2024.08.09
//Next.js 프로젝트의 기본 페이지 컴포넌트

import Head from 'next/head';

//Image 컴포넌트 참조
//Next.js에서 Image 컴포넌트를 사용하면 이미지를 최적화하여 빠르게 로딩할 수 있음.
import Image from 'next/image';

import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

//React 패키지 참조와 Fragment 컴포넌트 참조
import React, { Fragment } from 'react';

const inter = Inter({ subsets: ['latin'] });

//인삿말 출력 전역 함수 컴포넌트
function Hello(isLogin: boolean): JSX.Element {
  if (isLogin) {
    return <b>로그인 되었습니다.</b>;
  } else {
    return <b>로그인이 필요합니다.</b>;
  }
}

//주제 배열 데이터 생성
const topics = [
  {
    id: 1,
    title: 'React',
    content: '리액트는 페이스북에서 개발한 웹 UI 라이브러리',
  },
  {
    id: 2,
    title: 'Angular',
    content: '앵귤러는 구글에서 개발한 웹 UI 라이브러리',
  },
  {
    id: 3,
    title: 'Next.js',
    content: 'Next.js는 버셀사에서 개발한 웹 풀스택 개발 프레임워크',
  },
];

export default function Home() {
  //프로그래밍 로직을 구현하는 영역

  const userName: string = '정윤민';
  const isLogin: boolean = true;

  //인삿말 출력 지역 함수 컴포넌트
  const Greeting = () => {
    if (isLogin) {
      return <b>{userName}님으로 로그인했습니다.</b>;
    } else {
      return <b>Guest님, 로그인이 필요합니다.</b>;
    }
  };

  //현재 컴포넌트에서 재사용 가능한 스타일 정의
  const myStyle = {
    color: 'white',
    backgroundColor: 'gray',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  };

  return (
    //최상위의 폼태그로 구성하여 감싸줘야 함.
    //폼태크는 <></> or <div></div> or <Fragment></Fragment>와 같이 다양하게 사용 가능함.
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            {/* 안녕하세요, {userName}님! &nbsp; <br /> */}
            {/* {isLogin ? '로그인 되었습니다' : '로그인이 필요합니다.'} <br /> */}

            {/* {isLogin ? (
              <b>{userName}님으로 로그인했습니다.</b>
            ) : (
              <b>Guest님, 로그인이 필요합니다.</b>
            )} */}

            {/* {Hello(isLogin)} */}

            {Greeting()}

            <code className={styles.code}>pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
              {/* HTML 이미지 태그 */}
              {/* <img
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
              /> */}
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        {/* JSX 요소 내에 인라인 스타일 정의 */}
        <div style={{ color: 'white', background: 'gray' }}>
          React Next.js
          <br />
          JSX 스타일링 방법
        </div>

        <br />

        {/* 직접 정의한 스타일 적용 */}
        <div style={myStyle}>index.tsx 내부 지정한 스타일</div>
        <div style={myStyle}>재사용 가능한 스타일 JSX 스타일링</div>

        {/* 클래스로 정의된 공통 스타일 적용 */}
        <div className={styles.sample1}>
          Home.module.css 내부 클래스로 지정한 스타일
        </div>
        <div className="sample2">global.css 내부 클래스로 지정한 스타일</div>

        <div className={styles.grid}>
          {topics.map((topics, index) => (
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <h2>
                {topics.title} <span>-&gt;</span>
              </h2>
              <p>{topics.content} &nbsp;API.</p>
            </a>
          ))}

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </Fragment>
  );
}
