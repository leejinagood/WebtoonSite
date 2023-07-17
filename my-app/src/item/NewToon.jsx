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
        const response = await fetch(`/api/new`);
        const data = await response.json();
        setResult(data.result);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, []);

  const getThumbnailImage = async (index) => {
    try {
      const response = await fetch(`/api/Webtoon_Thumbnail?webtoonName=${encodeURIComponent(result[index])}`);
      const data = await response.json();
      const thumbnail = data.rows[0]?.[0]?.Webtoon_Thumbnail;
      return thumbnail || ""; 
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
          <Link href={`/ListPage/ListPage?webtoonName=${encodeURIComponent(result[index])}`} key={index}>
            <div className={`NewToonInfo ${index === 1 ? "active" : ""}`}>
              <div className="NewToonItem">
                <img src="" alt={title} ref={imgRef => {
                  if (imgRef) {
                    getThumbnailImage(index)
                      .then(thumbnail => imgRef.src = thumbnail)
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
