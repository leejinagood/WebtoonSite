import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import style from "@/src/styles/NewToonCss.module.css"

const NewToon = () => {
  const [webtoons, setWebtoons] = useState([]);
  const sliderRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const day = "new";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/newtoon?day=All`);
        const data = await response.json();
        setWebtoons(data);
      } catch (error) {
        console.error("API를 불러오는 도중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

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
    <div className={style.NewToonBOx}>
    <div
      className={style.NewToonPage}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={sliderRef}
    >
      <Slider>
        {Array.isArray(webtoons) &&
          webtoons.map((webtoon, index) => (
            <Link
              key={index}
              href={`/listpage?EnName=${encodeURIComponent(
                webtoon.webtoonEnName
              )}`}
            >
              <div className={`${style.NewToonInfo} ${index === 1 ? "active" : ""}`}>
                <div className={style.NewToonItem}>
                  <img src={webtoon.webtoonThumbnail} alt={webtoon.webtoonName} />
                </div>
              </div>
            </Link>
          ))}
      </Slider>
    </div>
    </div>
  );
};

export default NewToon;
