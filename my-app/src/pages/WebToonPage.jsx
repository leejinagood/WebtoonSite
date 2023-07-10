import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from "react";
import WebToonPageCss from "../styles/WebToonPageCss.css";
import ClickLayoutComponet from "../item/ClickLayoutComponent";

const WebToonPage = () => {
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    fetch("/api/daywebtoon?day=All")
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data.webtoons);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, []);

  return (
    <div className="WebToonPage">
      <Header />
      <div className="WebToonBox">
        <ClickLayoutComponet/>
        {webtoons.map((webtoon, index) => (
          <div className="WebToonCut" key={index}>
            <img src="1.jpg" alt="1컷" />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default WebToonPage;
