import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import ClickLayoutComponent from "./ClickLayoutComponent";
import WebToonPageCss from "./styles/WebToonPageCss.css";

const WebToonPage = () => {
  const router = useRouter();
  const { webtoonId } = router.query;

  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [ep, setEp] = useState(null); // ep 값을 상태로 관리

  useEffect(() => {
    fetch("/api/daywebtoon?day=All")
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data.webtoons);
        const selectedWebtoon = data.webtoons.find((webtoon) => webtoon.id === webtoonId);
        setEp(selectedWebtoon.ep);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, [webtoonId]);

  const handleWebToonCutClick = (webtoon) => {
    setSelectedWebtoon(webtoon);
    setIsVisible(true);

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
      {selectedWebtoon && isVisible && <ClickLayoutComponent ep={webtoonId} />}
      <Footer />
    </div>
  );
};

export default WebToonPage;
