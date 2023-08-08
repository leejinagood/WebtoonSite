// // pages/_app.js


import { register } from '../../public/serviceWorkerRegistration';
import React,{useEffect} from 'react';
import App from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 클라이언트 환경에서만 Service Worker를 등록하도록 조건부 처리
    if (typeof window !== 'undefined') {
      register();
    }
  }, []);

  // 공통 레이아웃이나 설정을 처리하는 로직을 추가할 수 있습니다.
  return(
    <>  
    <Head>
    <link rel="icon" href="/favicon.ico" />

    </Head>
    <Component {...pageProps} />
    <style jsx global>{`
      *{
        font-family: 'Jua', sans-serif;
        text-decoration-style: none;
        text-decoration: none;        color: inherit;
        margin:  0 auto;
        width:100%;
    }

    @media screen and (max-width:361px) and (min-width:10px) {
      *{
          width:100%;
      }
    }
    @media screen and (max-width:421px) and (min-width:362px) {
      *{
          width:100%;
      }
    }
    @media screen and (max-width:721px) and (min-width:422px) {
      *{
          width:100%;
      }
    }
    
    `}

    </style>
    </>

  ) ;
}

export default MyApp;
