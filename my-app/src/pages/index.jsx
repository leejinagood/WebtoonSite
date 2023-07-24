import React from "react";
import MainPageCss from "../styles/MainPageCss.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import NewToon from "../Component/NewToon";
import Tag from "../Component/Tag/Tag";
import Head from 'next/head';
import AllToonInfo from "../Component/AllToonInfo";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import

const MainPage = () => {
  const router = useRouter();
  const { token } = parseCookies({}); // 쿠키에서 토큰 가져오기

  return (
    <div className="MainPage">
      <a href="https://kauth.kakao.com/oauth/authorize?client_id=6298e4ccbcce464caa91f6a4a0e9c7a3&redirect_uri=http://localhost:3000&response_type=code&state=kakao_login">카카오 로그인</a>
          <Head>
       <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB"/>
        <title>AVATOON</title>

      </Head>
      <Header token={token} /> {/* Header 컴포넌트에 토큰 전달 */}
      <div className="MNewToon">
        <NewToon />
      </div>
      <h3 className="Categories">요일별 전체 웹툰</h3>
      <div className="AllToon">
        <div className="AllTonnbox">
          <AllToonInfo />
        </div>
      </div>
      <Tag/>
      <Footer />
     </div>
  );
};

export default MainPage;
