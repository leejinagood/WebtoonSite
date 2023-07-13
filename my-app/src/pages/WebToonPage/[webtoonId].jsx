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
    fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`)
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data.webtoons);
        const selectedWebtoon = data.webtoons.find((webtoon) => webtoon.webtoon_name === webtoonName);
        setSelectedWebtoon(selectedWebtoon);
          

        // const fetchWebtoonDetail = async () => {
        //   try {
        //     const response = await fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`);
        //     const data = await response.json();
        //     const { webtoons } = data;
        //     const selectedWebtoon = webtoons[0];
        //     const count = selectedWebtoon.count;
        //     setCount(count);
        //   } catch (error) {
        //     console.error("Error fetching API:", error);
        //   }
        // };

        if (selectedWebtoon) {
          fetchWebtoonDetail();
        }
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, [webtoonName]);

  const getWebtoonImage = (webtoon) => {
    if (webtoon.webtoon_name === "똑 닮은 딸") {
      return "/WebtoonImg/web1/web1_1/web1_1_1.png";
    } else if (webtoon.webtoon_name === "마루는 강쥐") {
      return "/WebtoonImg/web2/web2_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "소녀재판") {
      return "/WebtoonImg/web3/web3_1/web3_1_1.png";
    }
    // 기본값으로 설정할 이미지 경로
    return "1.jpg";
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
