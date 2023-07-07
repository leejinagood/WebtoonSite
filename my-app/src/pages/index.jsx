import React from "react";
import MainPageCss from "../styles/MainPageCss.css";
import Header from "./header";
import Footer from "./footer";
import NewToon from "../item/NewToon";
import Tag from "../item/Tag";
import Head from 'next/head';
import AllToonInfo from "../item/AllToonInfo";
const MainPage = () => {
  return (
    
    <div className="MainPage">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Header />
      <div className="MNewToon">
        <NewToon />

      </div>
      <h3 className="Categories">요일별 전체 웹툰</h3>
      <div className="AllToon">
        <div className="AllTonnbox">
        <table>
          <tbody>
            <tr>
              <td>
                <AllToonInfo/>
              </td>
              {/* <td>
              <AllToonInfo/>
              </td>
              <td>
              <AllToonInfo/>
              </td>
          </tr>
          
            <tr>
              <td>
              <AllToonInfo/>
              </td>
              <td>
              <AllToonInfo/>
              </td>
              <td>
              <AllToonInfo/>
  </td> */}
            </tr> 
            
            {/* 여러 개의 <tr> 요소들 추가 */}
          </tbody>
        </table>
        </div>
      </div>

      <Tag/>
      <Footer />
    </div>
  );
};

export default MainPage;
