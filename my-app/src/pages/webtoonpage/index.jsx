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
  const scrollYRef = useRef(0);

  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [count, setCount] = useState(1);
  const [webtoonImages, setWebtoonImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/webtoon?EnName=${EnName}&ep=${ep}`);
        const data = await response.json();
        const [webtoonData] = data; // 첫 번째 웹툰 데이터를 가져옴
        setSelectedWebtoon(webtoonData);
        setWebtoons(data);
        setCount(webtoonData?.count || 0); // count 값 설정
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };
  
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
  
    if (EnName && ep) {
      fetchData().then(() => {
        // API 호출이 완료된 후에 fetchImg 실행
        fetchImg(count);
      });
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
          webtoonName={EnName}
          episodeNumber={ep}
          maxEp={count}
        />
      )}
      <Comment webtoonName={EnName} episodeNumber={ep} />
      <Footer />
    </div>
  );
};

export default WebtoonPage;
