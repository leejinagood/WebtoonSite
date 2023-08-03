import React, { useState, useEffect } from "react";
import styles from "./test.module.css"; // 스타일 파일을 모듈로 불러옵니다

const Test = () => {
  const [angle, setAngle] = useState(0);
  const [webtoons, setWebtoons] = useState([]);




  useEffect(() => {
    const intervalId = setInterval(() => {
      galleryspin("");
    }, 2000);

    // 컴포넌트가 언마운트 될 때 clearInterval을 호출하여 타이머 정리
    return () => clearInterval(intervalId);
  }, [angle]); // 빈 배열([])을 전달하여 처음 마운트될 때만 실행되도록 설

  const galleryspin = (sign) => {
    let newAngle = angle;
    if (!sign) {
      newAngle = newAngle + 72;
    } else {
      newAngle = newAngle - 72;
    }
    setAngle(newAngle);
  };

  return (
    <div className={styles.nt}>
      <div id={styles.carousel}>
        <figure
          id={styles.spinner}
          className={styles.spinner}
          style={{
            WebkitTransform: `rotateY(${angle}deg)`,
            MozTransform: `rotateY(${angle}deg)`,
            transform: `rotateY(${angle}deg)`,
          }}
        >
          {webtoons.map((webtoon, index) => (
            <img key={index} src={webtoon.webtoonThumbnail} alt={webtoon.webtoonName} />
          ))}
        </figure>
      </div>
      <span
        id={styles.left}
        className={styles.ssicon}
        onClick={() => galleryspin("-")}
      >
        &lt;
      </span>
      <span
        id={styles.right}
        className={styles.ssicon}
        onClick={() => galleryspin("")}
      >
        &gt;
      </span>
    </div>
  );
};

export default Test;
