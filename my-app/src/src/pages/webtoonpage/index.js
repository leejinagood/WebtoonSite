import React, { useState, useEffect, useRef,useCallback } from "react";
import { useRouter } from "next/router";
import Header from "@/src/Header/header";
import Footer from "@/src/Footer/footer";
import Comment from "@/src/Component/Comment";
import ClickLayoutComponent from "@/src/Component/ClickLayoutComponent";
import style from "./styles/WebToonPageCss.module.css";

const WebtoonPage = () => {
  const router = useRouter();
  const { EnName, ep } = router.query;
  const scrollYRef = useRef(0);

  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [count, setCount] = useState(1);
  const [webtoonImages, setWebtoonImages] = useState([]);

// 웹툰 데이터를 가져오는 useEffect
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/webtoon?EnName=${EnName}&ep=${ep}`);
      const data = await response.json();
      const [webtoonData] = data; // 첫 번째 웹툰 데이터를 가져옴
      setSelectedWebtoon(webtoonData);
      setWebtoons(data);
      setCount(webtoonData?.episodeImgCount || 0); // count 값 설정
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  if (EnName && ep) {
    fetchData();
  }
}, [EnName, ep]);

// 웹툰 이미지를 가져오는 useEffect
useEffect(() => {
  const fetchImg = async (count) => {
    const images = [];
    // webtoonImages 설정
    for (let i = 1; i <= count; i++) {
      const response = await fetch(
        `/WebtoonImg/${EnName}/${ep}/${EnName}_${ep}_${i}.png`
      );
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      images.push(imageUrl);
    }
    setWebtoonImages(images);
  };

  if (EnName && ep && count) {
    fetchImg(count);
  }
}, [EnName, ep, count]);

  const handleWebToonCutClick = (webtoon) => {
    setSelectedWebtoon(webtoon);
    setIsVisible(true);

    // 현재 스크롤 위치를 저장
    scrollYRef.current = window.scrollY;
  
    setTimeout(() => {
      setIsVisible(false);
      // 저장한 스크롤 위치로 스크롤 이동
    }, 2500);
  };


    // 클릭레이아웃의 exists 값을 계산하는 함수
    const calculateExists = () => {
      if (count === null || count === undefined) return 0; // count가 없는 경우
      const episodeNum = parseInt(ep, 10);
      return episodeNum < count ? 1 : 0;
    };
  
    // 클릭레이아웃의 exists 값 계산
    const exists = calculateExists();
  const handleScreenClick = useCallback(() => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  }, []);
  return (
    <div className={style.WebToonPage}>
      <Header />
      <div className={style.WebToonBox}>
        {/* 각 이미지를 배열로 순회 */}
        {webtoonImages.map((imageUrl, index) => (
          <div
            className={style.WebToonCut}
            key={index}
            onClick={() => handleWebToonCutClick(selectedWebtoon)}
          >
            <img src={imageUrl} alt={`Webtoon Image ${index}`} />
          </div>
        ))}
      </div>
      {selectedWebtoon && isVisible && (
        <ClickLayoutComponent
          webtoonName={EnName}
          episodeNumber={ep}
          maxEp={count}
          exists={exists}
        />
      )}
      <Comment webtoonName={EnName} episodeNumber={ep} />
      <Footer />
    </div>
  );
};

export default WebtoonPage;
