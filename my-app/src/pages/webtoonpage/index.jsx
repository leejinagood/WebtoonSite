import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Header from "@/src/Header/header";
import Footer from "@/src/Footer/footer";
import MainPageCss from "@/src/styles/MainPageCss.css";
import Comment from "@/src/Component/Comment";
import ClickLayoutComponent from "@/src/Component/ClickLayoutComponent";
import WebToonPageCss from "./styles/WebToonPageCss.css";

const WebtoonPage = () => {
  const router = useRouter();
  const { EnName, ep } = router.query;

  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [count, setCount] = useState(0);
  const [webtoonImages, setWebtoonImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/webtoon?webtoonName=${EnName}&${ep}`);
        const data = await response.json();
        const { webtoons } = data;
        const selectedWebtoon = webtoons.find(
          (webtoon) => webtoon.webtoon_name === EnName
        );
        setSelectedWebtoon(selectedWebtoon);
        setWebtoons(webtoons);
        setCount(selectedWebtoon?.count || 0);
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    const fetchImg = async () => {
      const images = [];
      // webtoonImages 설정
      for (let i = 1; i <= count; i++) {
        const response = await fetch(
          `/WebtoonImg/${EnName}/${ep}/${EnName}_${i}_.png`
        );
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        images.push(imageUrl);
      }
      setWebtoonImages(images);
    };

    if (EnName && ep) {
      fetchData();
      fetchImg();
    }
  }, [EnName, ep, count]);

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
    <div className="WebToonPage">
      <Header />
      <div className="WebToonBox">
        {/* 각 이미지를 배열로 순회 */}
        {webtoonImages.map((imageUrl, index) => (
          <div
            className="WebToonCut"
            key={index}
            onClick={() => handleWebToonCutClick(selectedWebtoon)}
          >
            <img src={imageUrl} alt={`Webtoon Image ${index}`} />
          </div>
        ))}
      </div>
      {selectedWebtoon && isVisible && (
        <ClickLayoutComponent
          webtoonName={selectedWebtoon.webtoon_name}
          episodeNumber={selectedWebtoon.ep}
          maxEp={count}
        />
      )}
      <Comment webtoonName={EnName} episodeNumber={ep} />
      <Footer />
    </div>
  );
};

export default WebtoonPage;
