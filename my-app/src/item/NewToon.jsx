import React, { useState, useEffect } from "react";
import "../styles/NewToonCss.css";

const NewToon = () => {
  const [result, setResult] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideAnimation, setSlideAnimation] = useState(""); // 슬라이드 애니메이션 클래스

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/new`);
        const data = await response.json();
        setResult(data.result);
        console.log(data.result);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (index) => {
    if (index === activeIndex) return;

    const slides = result.slice();
    const activeSlide = slides.splice(index, 1)[0];
    slides.splice(1, 0, activeSlide);

    setResult(slides);
    setActiveIndex(1);

    setSlideAnimation("slide-animation"); // 슬라이드 애니메이션 클래스 추가
    setTimeout(() => {
      setSlideAnimation(""); // 일정 시간 후에 슬라이드 애니메이션 클래스 제거
    }, 500); // 애니메이션 시간 설정 (0.5초)
  };

  return (
    <div className="NewToonPage">
      <div className={`slider ${slideAnimation}`}>
        {result.map((title, index) => (
          <div
            className={`NewToonInfo ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <div className="NewToonItem">
              <img src={`/${index + 1}.jpg`} alt={title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewToon;
