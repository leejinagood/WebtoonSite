import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";

import WebToonPageCss from "./styles/WebToonPageCss.css";
import MainPageCss from "./styles/MainPageCss.css";
import ClickLayoutComponent from "./ClickLayoutComponent";

const WebToonPage = () => {
  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);

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

  const handleWebToonCutClick = (webtoon) => {
    setSelectedWebtoon(webtoon);
    setIsVisible(true);

    // 토글이 일정 시간(1.5초) 후에 자동으로 사라지도록 설정
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  const handleScreenClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="WebToonPage" onClick={handleScreenClick}>
      <Header />
      <div className="WebToonBox">
        {webtoons.map((webtoon, index) => (
          <div
            className="WebToonCut"
            key={index}
            onClick={() => handleWebToonCutClick(webtoon)}
          >
            <img src="1.jpg" alt="1컷" />
          </div>
        ))}

      </div>
      {selectedWebtoon && isVisible && (
        <ClickLayoutComponent />
      )}
      <Footer />
    </div>
  );
};

export default WebToonPage;
