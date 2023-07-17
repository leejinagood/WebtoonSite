import React, { useState, useEffect, useRef } from "react";
import "../styles/NewToonCss.css";
import "../styles/MainPageCss.css"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

  const getThumbnailImage = (index) => {
    if (result[index] === "똑 닮은 딸") {
      return "/WebtoonImg/web1/web1_thumbnail.jpg";
    } else if (result[index] === "마루는 강쥐") {
      return "/WebtoonImg/web2/web2_thumbnail.jpg";
    } else if (result[index] === "소녀재판") {
      return "/WebtoonImg/web3/web3_thumbnail.jpg";
    } else if (result[index] === "신혼일기") {
      return "/WebtoonImg/web4/web4_thumbnail.jpg";
    } else if (result[index] === "외모지상주의") {
      return "/WebtoonImg/web5/web5_thumbnail.jpg";
    } else if (result[index] === "퀘스트지상주의") {
      return "/WebtoonImg/web6/web6_thumbnail.jpg";
    }
    
    // 기본값으로 설정할 썸네일 이미지 경로
    return "";
  };
  
    
    // 기본값으로 설정할 썸네일 이미지 경로

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
      <Link href={`/ListPage/ListPage?webtoonName=${result[index]}`}>

          <div className={`NewToonInfo ${index === 1 ? "active" : ""}`} key={index}>
            <div className="NewToonItem">
              <img src={getThumbnailImage(index)} alt={title} />
            </div>
          </div>
        </Link>

        ))}
  </Slider>
    </div>
  );
};

export default NewToon;
