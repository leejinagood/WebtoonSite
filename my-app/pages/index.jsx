import React,{useEffect} from "react";
import style from "../src/styles/MainPageCss.module.css";
import Header from ".././src/Header/header";
import Footer from ".././src/Footer/footer";
import NewToon from ".././src/Component/NewToon";
import Tag from ".././src/Component/Tag/Tag";
import Head from 'next/head';
import AllToonInfo from ".././src/Component/AllToonInfo";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import

const MainPage = () => {

  const router = useRouter();
  const { token } = parseCookies({}); // 쿠키에서 토큰 가져오기

  useEffect(()=>{
    //서비스워커
    navigator.serviceWorker.register('./sw.js')
    .then((registration) => {
      console.log('Service Worker registered sucess:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  },[])
    //


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
        <NewToon />
      </div>
      <h3 className={style.Categories}>요일별 전체 웹툰</h3>
      <div className={style.AllToon}>
        <div className={style.AllTonnbox}>
          <AllToonInfo />
        </div>
      </div>
      <Tag/>
      <Footer />
     </div>
     </div>
  );
};

export default MainPage;
