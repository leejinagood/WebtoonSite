import React, { useState } from "react";
import Link from 'next/link';
import NewToonCss from '../styles/NewToonCss.css';

const NewToon = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, image: "1.jpg", link: "/ListPage" },
    { id: 2, image: "2.jpg", link: "/ListPage" },
    { id: 3, image: "3.jpg", link: "/ListPage" }
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="NewToon">
    <div className="slideshow">
      <Link href={slides[currentSlide].link}>
        <div className="NewToonInfo">
          <img src={slides[currentSlide].image} alt={`Slide ${slides[currentSlide].id}`} />
        </div>
      </Link>
    </div>

    </div>
  );
}

export default NewToon;
