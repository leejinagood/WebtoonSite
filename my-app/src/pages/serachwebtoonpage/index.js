import React, { useEffect, useState } from "react";
import Header from "@/src/Header/header";
import Footer from "@/src/Footer/footer";
import { useRouter } from "next/router";
import style from "./SerchWebToonCss.module.css";
import Link from "next/link";

function SerchWebToon() {
  
  const router = useRouter();
  const { word } = router.query;
  const [webtoonData, setWebtoonData] = useState([]);
  const [randomWebtoon, setRandomWebtoon] = useState(null);

  const [searchHistory, setSearchHistory] = useState({});
  // 기존 코드 ...




  
  const highlightSearchText = (text, search) => {
    if (!text) return null;

    const regex = new RegExp(`(${search})`, "gi");
    const highlightedText = text.replace(regex, `<span class="${style.highlight}">$1</span>`);
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`/api/searchtoon?word=${word}`);
        const data1 = await response1.json();
  
        const response2 = await fetch(`/api/searchcategori?word=${word}`);
        const data2 = await response2.json();
  
        // 두 데이터를 합치거나 처리하여 webtoonData 상태를 업데이트
        const combinedData = [...data1, ...data2]; // 두 데이터를 합치는 예시
  
        setWebtoonData(combinedData);
  
        // 검색결과가 없으면 랜덤 웹툰을 가져오도록 설정
        if (combinedData.length === 0) {
          fetchRandomWebtoon();
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    
    if (word) {
      fetchData();
    }
  }, [word]);
  

  const fetchRandomWebtoon = () => {
    if (typeof window !== "undefined") {
      fetch("/api/daytoon?day=All")
        .then((response) => response.json())
        .then((data) => {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomWebtoon(data[randomIndex]);
        })
        .catch((error) => {
          console.error("Error fetching API:", error);
        });
    }
  };

  return (
    <div className={style.SerchWebToon}>
      <Header />
      <div className={style.SerchPage}>
        <div className={style.serchResult}>
          <p>
            <span className={style.color}>"{word}"</span>에 대한 검색 결과
          </p>
        </div>
        {webtoonData.length === 0 ? (
        <div>
        <p className={style.noResults}>검색 결과가 없습니다</p>

        {randomWebtoon && (
          <div className={style.RListItem}>
            <h1>이런 웹툰은 어떠세요 ?</h1>
            <Link href={`/listpage?EnName=${randomWebtoon.webtoonEnName}&id=${randomWebtoon.webtoonID}`}>
            <div className={style.RListImg}>
              <img src={randomWebtoon.webtoonThumbnail} alt="Random Webtoon" />
            </div>
            <div className={style.RListItemContent}>
              <p className={style.REpisodeP}>
                {highlightSearchText(randomWebtoon.webtoonName, word)} /{" "}
                {highlightSearchText(randomWebtoon.webtoonAuthor, word)}
                <br />
              </p>
            </div>
            </Link>
          </div>
        )}
        </div>
      ) : (
        <ul>
          {webtoonData.map((webtoon, index) => (
            <li key={index}>
              <Link
                href={`/listpage?EnName=${webtoon.webtoonEnName}&id=${webtoon.webtoonID}`}
              >
                <div className={style.ListItem}>
                  <div className={style.ListImg}>
                    <img src={webtoon.webtoonThumbnail} alt={`Thumbnail for ${webtoon.webtoonName}`} />
                  </div>
                  <div className={style.ListItemContent}>
                    <p className={style.EpisodeP}>
                      {highlightSearchText(webtoon.webtoonName, word)}
                      <br />
                    </p>
                    <span className={style.tab2}>
                      {highlightSearchText(webtoon.webtoonAuthor, word)} /{" "}
                      {highlightSearchText(webtoon.categoryKind, word)} {" "}

                      {highlightSearchText(webtoon.categoryKinds, word)} {" "}
                    </span>
                    <p className={style.content}>
                      {highlightSearchText(webtoon.content, word)}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      </div>

      <Footer />
    </div>
  );
}

export default SerchWebToon;
