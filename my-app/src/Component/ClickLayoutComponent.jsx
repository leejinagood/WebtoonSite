import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ClickLayoutCss.module.css";

const ClickLayoutComponent = ({ webtoonName, episodeNumber }) => {
  const router = useRouter();
  const [exists, setExists] = useState(null);
  const scrollRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const handleButtonClick2 = () => {
    scrollToTop();
    // 기타 원하는 동작 수행
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  const handleButtonClick = () => {
    scrollToBottom();
    // 기타 원하는 동작 수행
  };


  useEffect(() => {
    fetch(`/api/webtoon?EnName=${webtoonName}&ep=${episodeNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const [webtoonData] = data; // 첫 번째 웹툰 데이터를 가져옴
        setExists(webtoonData.nextEpisode);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, [webtoonName, episodeNumber]);
  console.log(exists);
  const handleNextEpisode = () => {
    if (exists === 0) {
      console.log("다음화가 없음");
      // router.push({pathname: "about", query: {keyword: WebToonName}});
    } else if (exists === 1) {
      const nextEp = parseInt(episodeNumber, 10)  + 1;
      console.log(episodeNumber, nextEp);
      console.log("실행");
      router.push(`/webtoonpage?EnName=${webtoonName}&ep=${nextEp}`);
    }
  };

  const handlePrevEpisode = () => {
    if (episodeNumber > 1) {
      const PrevEp = episodeNumber - 1;
      console.log(episodeNumber);
      router.push(`/webtoonpage?EnName=${webtoonName}&ep=${PrevEp}`);
      // router.push({pathname: "about", query: {keyword: WebToonName}});
    } else {
      console.log("이전화가 없음");
    }
  };

  return (
    <div className={styles.ClickLayout}>
      <div className={styles.LayoutContent}>
        <div className={styles.Layout}>
          <div className={styles.LeftLayout}>
            <div className={styles.LeftLayoutItem}>
              <div className={styles.Litem}>
                <p>
                  <Link href="./">
                    <span className={styles.back}>&lt;</span>
                  </Link>
                  {episodeNumber}화
                </p>
              </div>
            </div>
          </div>
          <div className={styles.RigthLayout}>
            <div className={styles.RightLayoutItem}>
              <div className={styles.Ritem}>
                <p>
                  <span className={styles.BackEpisode} onClick={handlePrevEpisode}>
                    &lt;이전화 
                  </span>
                  <Link href="../">
                    <span> 목록 </span>
                  </Link>
                  <span className={styles.NextEpisode} onClick={handleNextEpisode}>
                     다음화&gt;
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div ref={scrollRef} /> {/* 스크롤 대상 요소를 참조하기 위한 빈 요소 */}
      </div>

      <button className={styles.ScrollTop} onClick={handleButtonClick2}>
        맨 위로
      </button>
      <button className={styles.ScrollDown} onClick={handleButtonClick}>
        맨 아래로
      </button>
    </div>
  );
};

export default ClickLayoutComponent;
