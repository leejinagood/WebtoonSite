import React from "react";
import MainPageCss from "../styles/MainPageCss.css";
import Header from "./header";
import Footer from "./footer";
import NewToon from "../item/NewToon";
import Tag from "../item/Tag";
import Head from 'next/head';
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
                <div className="AllToonInfo">
                  <img src="1.jpg" alt="" />
                  <p className="ToonTitle">제목</p>
                </div>
              </td>
              <td>
                <div className="AllToonInfo">
                  <img src="1.jpg" alt="" />
                  <p className="ToonTitle">제목</p>
                </div>
              </td>
              <td>
                <div className="AllToonInfo">
                  <img src="1.jpg" alt="" />
                  <p className="ToonTitle">제목</p>
                </div>
              </td>
          </tr>
          
            <tr>
              <td>
                <div className="AllToonInfo">
                  <img src="1.jpg" alt="" />
                  <p className="ToonTitle">제목</p>
                </div>
              </td>
              <td>
                <div className="AllToonInfo">
                  <img src="1.jpg" alt="" />
                  <p className="ToonTitle">제목</p>
                </div>
              </td>
              <td>
                <div className="AllToonInfo">
                  <img src="1.jpg" alt="" />
                  <p className="ToonTitle">제목</p>
                </div>
              </td>
            </tr>
            
            {/* 여러 개의 <tr> 요소들 추가 */}
          </tbody>
        </table>
      </div>

      <Tag/>
      <Footer />
    </div>
  );
};

export default MainPage;
