import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import ClickLayoutComponent from "./ClickLayoutComponent";
import WebToonPageCss from "./styles/WebToonPageCss.css";

const WebToonPage = () => {
  const router = useRouter();
  const { webtoonName, episodeNumber } = router.query;

  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`);
        const data = await response.json();
        const { webtoons } = data;
        //data 의 webtoon_name을 찾아 맞는 webtoon_name를
        const selectedWebtoon = webtoons.find((webtoon) => webtoon.webtoon_name === webtoonName);
        // selectedWebtoon로 할당
        setSelectedWebtoon(selectedWebtoon);
        setWebtoons(webtoons);
        setCount(selectedWebtoon?.count || 0);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
  
    if (webtoonName) {
      fetchData();
    }
  }, [webtoonName]);
  
  // 기존 코드에서 간소화
  const getWebtoonImage = (webtoon) => {
    const webtoonImages = {
      "똑 닮은 딸": "/WebtoonImg/web1/web1_1/web1_1_1.png",
      "마루는 강쥐": "/WebtoonImg/web2/web2_thumbnail.jpg",
      "소녀재판": "/WebtoonImg/web3/web3_1/web3_1_1.png",
    };
    return webtoonImages[webtoon.webtoon_name] || "1.jpg";
  };
  

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
            <img src={getWebtoonImage(webtoon)}/>
          </div>
        ))}
      </div>
      {selectedWebtoon && isVisible && <ClickLayoutComponent webtoonName={webtoonName} episodeNumber={episodeNumber} maxEp={count} />}
      <Footer />
    </div>
  );
};

export default WebToonPage;
