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



  console.log(word);
  console.log(webtoonData);

  const highlightSearchText = (text, search) => {
    if (!text) return ""; // 텍스트가 없는 경우 빈 문자열 반환
 // 정규 표현식을 생성하여 검색어와 일치하는 부분을 찾음
    const regex = new RegExp(`(${search})`, "gi");    //g 플래그 문자열 내에서 모든 일치 항목을 찾음 i 대소문자 가리지 않고 찾음
  // 검색어와 일치하는 부분을 찾아 하이라이트 스타일을 적용한 HTML로 대체
  const highlightedText = text.replace(regex, `<span class="${style.highlight}">$1</span>`);
  // 위에서 생성한 HTML 코드를 렌더링하면서 dangerouslySetInnerHTML을 사용하여
  // 실제 HTML로 변환하고 스타일이 적용된 검색 결과를 화면에 표시
  return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;  
};



const [randomWebtoon, setRandomWebtoon] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/searchtoon?word=${word}`);
      const data = await response.json();
      setWebtoonData(data);
      console.log(data);

      // 검색결과가 없으면 랜덤 웹툰을 가져오도록 설정
      if (data.length === 0) {
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

        <div className={style.RListItem}>
          <h1>이런 웹툰은 어떠세요 ?</h1>
                  <div className={style.RListImg}>
                    <img src={randomWebtoon.webtoonThumbnail} />
                  </div>
                  <div className={style.RListItemContent}>
                    <p className={style.REpisodeP}>
                      {highlightSearchText(randomWebtoon.webtoonName, word)} /{" "}
                      {highlightSearchText(randomWebtoon.webtoonAuthor, word)}

                      <br />
                    </p>


                  </div>
                </div>
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
                    <img src={webtoon.webtoonThumbnail} />
                  </div>
                  <div className={style.ListItemContent}>
                    <p className={style.EpisodeP}>
                      {highlightSearchText(webtoon.webtoonName, word)}
                      <br />
                    </p>
                    <span className={style.tab2}>
                      {highlightSearchText(webtoon.webtoonAuthor, word)} /{" "}
                      {highlightSearchText(webtoon.categoryKind, word)} {" "}
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
