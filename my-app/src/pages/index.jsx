import React from "react";
import MainPageCss from "../styles/MainPageCss.css";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import NewToon from "../item/NewToon";
import Tag from "./Tag/Tag";
import Head from 'next/head';
import AllToonInfo from "../item/AllToonInfo";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import

const MainPage = () => {
  const router = useRouter();
  const { token } = parseCookies({}); // 쿠키에서 토큰 가져오기

  return (
    <div className="MainPage">
      <Head>
        <link rel="manifest" href="/manifest.json" />
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
