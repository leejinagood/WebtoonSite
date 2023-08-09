import React,{useEffect} from "react";
import style from "../styles/MainPageCss.module.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import Slick from "../Component/Slick";
import MainRank from "../Component/mainRank";

import Tag from "../Component/Tag/Tag";
import Head from 'next/head';
import AllToonInfo from "../Component/AllToonInfo";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리

const MainPage = () => {

  const router = useRouter();
  const { token, userName, userEmail } = parseCookies(); // 쿠키에서 필요한 값 가져오기


  // useEffect(() => {

  //   if (typeof window !== 'undefined') {
  //     // 브라우저 환경에서만 실행되도록 조건부 처리

  //     navigator.serviceWorker
  //       .register('./sw.js')
  //       .then((registration) => {
  //         console.log('Service Worker registered successfully:', registration);
  //       })
  //       .catch((error) => {
  //         console.error('Service Worker registration failed:', error);
  //       });
  //   }
  // }, []);
  
  useEffect(() => {
    // 쿠키에서 토큰 값을 추출
    const cookies = document.cookie.split(';');
    let token = '';

    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            token = decodeURIComponent(value);
            break;
        }
    }

    if (token) {
        // JWT 토큰 디코딩하여 클레임 값을 추출
        const decodedToken = jwt_decode(token);

        // userEmail 클레임 값을 콘솔에 출력
        console.log('userEmail:', decodedToken.UserEmail);
    }
}, []);


  return (
    <div className={style.mp}>
    <div className={style.MainPage}>
       <Head>
       <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB"/>
        <title>AVATOON</title>

      </Head>
      <Header token={token} /> {/* Header 컴포넌트에 토큰 전달 */}
      <div className={style.MNewToon}>
        <Slick />
      </div>
      <h3 className={style.Categories}>요일별 전체 웹툰</h3>
      <div className={style.AllToon}>
        <div className={style.AllTonnbox}>
          <AllToonInfo />
        </div>
      </div>
      <div className={style.mr}>
        <MainRank/>
      </div>
      <Tag/>
      <Footer />
     </div>
     </div>
  );
};

export default MainPage;
