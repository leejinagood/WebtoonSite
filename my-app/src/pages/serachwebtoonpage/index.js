import React, { useEffect, useState } from "react";
import Header from "@/src/Header/header";
import Footer from "@/src/Footer/footer";
import { useRouter } from "next/router";
import style from "./SerchWebToonCss.module.css";
import Link from "next/link";
import RealTimeSearchKeywords from "@/src/Component/RealTimeSearchKeywords";
import {parseCookies} from "nookies"

function SerchWebToon() {
  
  const router = useRouter();
  const { word } = router.query;
  const [webtoonData, setWebtoonData] = useState([]);
  const [randomWebtoon, setRandomWebtoon] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [realTimeKeywords, setRealTimeKeywords] = useState([]);
  const initialSearchHistory = parseCookies().searchHistory || '';
  const handleSearch = (searchQuery) => {
    // 기존 검색 이력에 새로운 검색어를 추가합니다.
    const updatedSearchHistory = `${searchHistory},${searchQuery}`;
    setSearchHistory(updatedSearchHistory);

    // 검색 이력을 쿠키에 저장합니다.
    setCookie(null, 'searchHistory', updatedSearchHistory, {
      maxAge: 30 * 24 * 60 * 60, // 30일 동안 유지되는 쿠키
      path: '/', // 전체 사이트에서 사용 가능한 쿠키
    });

    // 이후 검색어와 검색 횟수를 저장하는 로직을 추가하세요 (필요한 경우).
  };


  useEffect(() => {
    // 검색 횟수가 가장 높은 순서로 검색어를 정렬하고 필터링합니다.
    const sortedKeywords = searchHistory.sort((a, b) => {
      // 검색 횟수를 기준으로 정렬하는 로직을 추가하세요.
      // 필요한 경우 검색어와 검색 횟수를 연동하여 정렬합니다.
    });

    // 필요한 개수만큼 검색어를 추출하여 상태를 업데이트합니다.
    const topKeywords = sortedKeywords.slice(0, 5); // 상위 10개 검색어 추출
    setRealTimeKeywords(topKeywords);
  }, [searchHistory]);




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
      {/* 실시간 검색어 컴포넌트를 추가합니다. */}
      <RealTimeSearchKeywords keywords={realTimeKeywords} />
      {/* 이하 생략 */}
      </div>

      <Footer />
    </div>
  );
}

export default SerchWebToon;
