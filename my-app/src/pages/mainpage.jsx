import React, { useEffect, useState } from "react";
import MainPageCss from "../styles/MainPageCss.css";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import NewToon from "../item/NewToon";
import Tag from "./Tag/Tag";
import Head from 'next/head';
import AllToonInfo from '../item/AllToonInfo';

const MainPage = () => {
  return (
    
    <div className="MainPage">
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Header />
      <div className="NewToon">
        <NewToon />
      </div>
      <h3 className="Categories">요일별 전체 웹툰</h3>
      <div className="AllToon">
        <div className="AllTonnbox">
          <table>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
      <Tag />
      <Footer />
    </div>
  );
};

export default MainPage;
