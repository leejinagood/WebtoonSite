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
  const [webtoonImages, setWebtoonImages] = useState([]);

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

    const fetchImg = async () => {
      try { 
        // 받아온 웹툰 제목과 에피소드 번호를 파라미터에 할당하여 
        const response = await fetch(`/api/Webtoon_Img?webtoonName=${webtoonName}&episodeNumber=${episodeNumber}`);
        //값을 data에 저장
        const data = await response.json();
        const { EpisodeImg } = data;
        //이미지 경로
        const episodeImage = EpisodeImg[0].Episode_Image;
        //이미지 갯수
        const episodeImageCount = EpisodeImg[0].Episode_Img_Count;

        //url을 생성하여 이미지 배열에 저장
        const images = [];
        for (let i = 1; i <= episodeImageCount; i++) {
          // 반복문으로 1부터 이미지 카운트 갯수만큼
          const imageUrl = `${episodeImage}${i}.png`;
          images.push(imageUrl);
        }
        console.log(episodeImage, episodeImageCount);
        setWebtoonImages(images);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    if (webtoonName) {
      //선택된 웹툰을 selectedWebtoon 상태로 설정, 모든 웹툰 목록을 webtoons 상태로..
      fetchData();
    }

    if (webtoonName && episodeNumber) {
      // 가져온 api를 가지고 webtoonImages 설정
      fetchImg();
    }
  }, [webtoonName, episodeNumber]);

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
        {/* 각 이미지를 배열로 순회 */}
        {webtoons.map((webtoon, index) => (
          <div className="WebToonCut" key={index} onClick={() => handleWebToonCutClick(webtoon)}>
            {/* 주소창에 받아온 내용과 일치하는지 */}
            {webtoon.webtoon_name === webtoonName && episodeNumber ? (
              webtoonImages.map((image, imageIndex) => (
                <img key={imageIndex} src={image} alt={`Webtoon Image ${imageIndex}`} />
              ))
            ) : (
              <img src="" alt="Webtoon Image" />
            )}
          </div>
        ))}
      </div>
      {selectedWebtoon && isVisible && (
        <ClickLayoutComponent webtoonName={webtoonName} episodeNumber={episodeNumber} maxEp={count} />
      )}
      <Footer />
    </div>
  );
};

export default WebToonPage;
