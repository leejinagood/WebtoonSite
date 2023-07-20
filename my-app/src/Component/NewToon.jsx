import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

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
        const response = await fetch(`/api/newtoon?day=new`);
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
    <div
      className="NewToonPage"
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
              href={`/listpage?webtoonName=${encodeURIComponent(
                webtoon.webtoon_en_name
              )}`}
            >
              <div className={`NewToonInfo ${index === 1 ? "active" : ""}`}>
                <div className="NewToonItem">
                  <img src={webtoon.thumbnail} alt={webtoon.webtoon_name} />
                </div>
              </div>
            </Link>
          ))}
      </Slider>
    </div>
  );
};

export default NewToon;
