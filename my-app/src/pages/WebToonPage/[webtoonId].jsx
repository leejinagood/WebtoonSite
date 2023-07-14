import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import ClickLayoutComponent from "./ClickLayoutComponent";
import WebToonPageCss from "./styles/WebToonPageCss.css";

const WebToonPage = () => {
  const router = useRouter();
  const { webtoonName } = router.query;
  //undefined일 때 경우 추가
  const episodeNumber = typeof router.query.episodeNumber === "string" ? parseInt(router.query.episodeNumber) : undefined;
  const [webtoons, setWebtoons] = useState([]);
  // parseInt 함수를 사용하여 문자열로 변환된 경우에만 숫자로 변환하도록
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
  // episodeNumber 추가
  // 이미지 url 코드 최소화
  const getWebtoonImage = (webtoon, episodeNumber) => {
    const webtoonImages = {
      "똑 닮은 딸": { // 제목이 똑 닮은 딸이고
        1: Array.from({ length: 102 }, (_, i) => `/WebtoonImg/web1/web1_1/web1_1_${i + 1}.png`), // 1화일 때
        2: Array.from({ length: 5 }, (_, i) => `/WebtoonImg/web1/web1_2/web1_2_${i + 1}.png`), // 2화일 때
        3: Array.from({ length: 5 }, (_, i) => `/WebtoonImg/web1/web1_3/web1_3_${i + 1}.png`), // 3화일 때
      },
      "마루는 강쥐": { // 제목이 마루는 강쥐이고 
        1: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web2/web2_1/web2_1_${i + 1}.png`),
        2: Array.from({ length: 4 }, (_, i) => `/WebtoonImg/web2/web2_2/web2_2_${i + 1}.png`),
        3: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web2/web2_3/web2_3_${i + 1}.png`),
      },
      "소녀재판": { // 제목이 소녀재판이고
        1: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web3/web3_1/web3_1_${i + 1}.png`),
        2: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web3/web3_2/web3_2_${i + 1}.png`),
        3: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web3/web3_3/web3_3_${i + 1}.png`),
      },
      "신혼일기": { // 제목이 신혼일기이고
        1: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web4/web4_1/web4_1_${i + 1}.png`),
        2: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web4/web4_2/web4_2_${i + 1}.png`),
      },
      "외모지상주의": { // 제목이 외지주이고 
        1: Array.from({ length: 6 }, (_, i) => `/WebtoonImg/web5/web5_1/web5_1_${i + 1}.png`),
        2: Array.from({ length: 5 }, (_, i) => `/WebtoonImg/web5/web5_2/web5_2_${i + 1}.png`),
        3: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web5/web5_3/web5_3_${i + 1}.png`),
      },
      "퀘스트지상주의": { // 제목이 퀘스트지상주의이고 
        1: Array.from({ length: 3 }, (_, i) => `/WebtoonImg/web6/web6_1/web6_1_${i + 1}.png`),
        2: Array.from({ length: 4 }, (_, i) => `/WebtoonImg/web6/web6_2/web6_2_${i + 1}.png`),
      },
    };

    return webtoonImages[webtoon.webtoon_name]?.[episodeNumber] || [];
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
      {/* webtoons.map 배열로 이미지를 표시 */}
        {webtoons.map((webtoon, index) => (
          <div className="WebToonCut" key={index} onClick={() => handleWebToonCutClick(webtoon)}>
            {/* 조건을 사용하여 웹툰 이름과 에피소드를 비교 */}
            {webtoon.webtoon_name === webtoonName && episodeNumber ? (
              // 일치하면 getWebtoonImage 함수 호출
              getWebtoonImage(webtoon, episodeNumber).map((image, imageIndex) => (
                //src 속성은 해당 이미지의 경로
                <img key={imageIndex} src={image} alt="" />
              ))
            ) : (
              // 일치하지 않으면 ""
              <img src="" alt="Webtoon Image" />
            )}
          </div>
        ))}
      </div>
      {selectedWebtoon && isVisible && <ClickLayoutComponent webtoonName={webtoonName} episodeNumber={episodeNumber} maxEp={count} />}
      <Footer />
    </div>
  );
};

export default WebToonPage;
