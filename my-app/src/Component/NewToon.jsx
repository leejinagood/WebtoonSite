import React, { useState, useEffect, useRef } from "react";
import "../styles/NewToonCss.css";
import "../styles/MainPageCss.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const NewToon = () => {
  const [result, setResult] = useState([]);
  const sliderRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/newtoon`);
        const data = await response.json();
        const { thumbnail, webtoon_name, webtoon_en_name } = data; // 해결된 데이터에서 추출
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, []);

  const getThumbnailImage = async (index) => { //index를 매개변수로 받음
    try {
      const response = await fetch(`/api/Webtoon_Thumbnail?webtoonName=${encodeURIComponent(result[index])}`); //result 배열에서 인코딩
      const data = await response.json();
      const thumbnail = data.rows[0]?.[0]?.Webtoon_Thumbnail; // 썸네일 이미지 경로 추출하여 thumbnail 변수에 할당
      return thumbnail || "";  //존재하지 않을 땐 빈 문자열
    } catch (error) {
      console.error("Error fetching API:", error);
      return "";
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="NewToonPage"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={sliderRef}
    >
      <Slider>
        {result.map((title, index) => (
          <Link href={`/listpage?webtoonName=${encodeURIComponent(result[index])}`} key={index}>
            <div className={`NewToonInfo ${index === 1 ? "active" : ""}`}>
              <div className="NewToonItem">
                <img src="" alt={title} ref={imgRef => { //imgRef 를 매개변수로 받음
                  if (imgRef) { //존재할 때
                    getThumbnailImage(index) //호출
                      .then(thumbnail => imgRef.src = thumbnail) //src 속성을 동적으로 설정
                      .catch(error => console.error("Error loading thumbnail:", error));
                  }
                }} />
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default NewToon;
