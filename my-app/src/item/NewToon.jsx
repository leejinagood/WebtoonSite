import React, { useState, useEffect, useRef } from "react";
import "../styles/NewToonCss.css";
import "../styles/MainPageCss.css"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
          <div className={`NewToonInfo ${index === 1 ? "active" : ""}`} key={index}>
            <div className="NewToonItem">
              <img src={`/${index + 1}.jpg`} alt={title} />
            </div>
          </div>
        ))}
  </Slider>
    </div>
  );
};

export default NewToon;
