import React, { useState, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";
import Link from "next/link";
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [webtoons, setWebtoons] = useState([]);
  const timerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/newtoon?day=All`);
        const data = await response.json();
        setWebtoons(data);
        console.log(data[0].webtoonEnName);
      } catch (error) {
        console.error("API를 불러오는 도중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  const getRecentWebtoons = () => {
    const sortedWebtoons = webtoons.sort((a, b) => {
      return new Date(b.webtoonDate) - new Date(a.webtoonDate);
    });
    const recentWebtoons = sortedWebtoons.slice(0, 5);
    return recentWebtoons.map((webtoon) => webtoon.webtoonThumbnail);
  };

  const imageUrls = getRecentWebtoons();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // 슬라이드 이동 시마다 translateX 값 초기화
        const newIndex = (prevIndex + 1) % (imageUrls.length * 2);
        if (newIndex === 0) {
          return 0;
        }
        return newIndex;
      });
    }, 2000);
  
    return () => {
      clearInterval(timerRef.current);
    };
  }, [imageUrls.length]);

// ... (이전 코드 생략)

return (
    <div className={styles.carousel}>
      <div
        className={styles.slider}
        style={{
          transform: `translateX(-${(100 / imageUrls.length) * currentIndex}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {Array.from({ length: 10 }).map((_, slideIndex) =>
          imageUrls.map((imageUrl, index) => (
            <Link href={`/listpage?EnName=${webtoons[index].webtoonEnName}&id=${webtoons[index].webtoonID}`} key={index + slideIndex * imageUrls.length}>
              <div className={styles.slide}>
                <div className={styles.imgBox}>
                <img src={imageUrl} alt={`Image ${index + 1}`} />
                <p className={styles.hoverP}><span className={styles.leftWn}>{webtoons[index].webtoonName}</span><span className={styles.rightAr}>{webtoons[index].webtoonAuthor}</span></p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
          }  

export default Carousel;
