import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ClickLayoutCss.module.css";

const ClickLayoutComponent = ({ webtoonName, episodeNumber,exists }) => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleButtonClick2 = () => {
    scrollToTop();
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleButtonClick = () => {
    scrollToBottom();
  };


  const handleNextEpisode = () => {
    if (exists === 0) {
      console.log("다음화가 없음");
    } else if (exists === 1) {
      const nextEp = parseInt(episodeNumber, 10) + 1;
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
    } else {
      console.log("이전화가 없음");
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsSticky(scrollY >= 10);
  };

  const handleScreenClick = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
    <div className={`${styles.ClickLayout} ${isSticky ? styles.sticky : ""}`}>
      <div className={`${styles.LayoutContent} ${isSticky ? styles.sticky : ""}`}>
        <div className={`${styles.Layout} ${isSticky ? styles.sticky : ""}`}>
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
        <div ref={scrollRef} />
      </div>
      <div className={`${styles.ScrollBTN} ${isSticky ? styles.sticky : ""}`}>
        <button className={`${styles.ScrollTop}`} onClick={handleButtonClick2}>
          맨 위로
        </button>
        <button className={styles.ScrollDown} onClick={handleButtonClick}>
          맨 아래로
        </button>
      </div>
    </div>
          )}
          </>
      
  );
};

export default React.memo(ClickLayoutComponent);