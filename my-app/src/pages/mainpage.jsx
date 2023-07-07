import React from "react";
import MainPageCss from "../styles/MainPageCss.css";
import Header from "./header";
import Footer from "./footer";
import NewToon from "../item/NewToon";
import Tag from "../item/Tag";
import Head from 'next/head';
import AllToonInfo from "../item/AllToonInfo"; // AllToonInfo 컴포넌트를 import

const MainPage = () => {
  return (
    <div className="MainPage">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Header />
      <div className="NewToon">
        <NewToon />
      </div>
      <h3 className="Categories">요일별 전체 웹툰</h3>
      <div className="AllToon">
        <table>
          <tbody>
            <tr>
              <td>
                <AllToonInfo /> 
              </td>
              <td>
                <AllToonInfo /> 
              </td>
              <td>
                <AllToonInfo /> 
              </td>
              </tr>
              <td>
                  <AllToonInfo /> 
                </td>
                <td>
                  <AllToonInfo /> 
                </td>
                <td>
                  <AllToonInfo /> 
                </td>
          </tbody>
        </table>
      </div>
      <Tag />
      <Footer />
    </div>
  );
};

export default MainPage;
