//2024.08.13
//document 파일

//SPA (Single Page Application) - Single Web HTMML Page (SPA)를 생성해줌.
//Single Web Page(index.html)의 최상위 구조를 정의함.
//html, head, body, <div id="__next"> 등 구조를 정의함.
//각종 next.js 실행을 위한 클라이언트 자바스크립트 파일 생성함.
//tailwind를 통해 생성되는 각종 css 파일을 제공해줌.

//HTML : html 태그 생성
//Head : head 영역 태그 생성
//Main component : <div id="__next"></div>에 해당하는 부분을 생성
//NextScript : next.js 실행을 위한 클라이언트 자바스크립트 파일 생성
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
