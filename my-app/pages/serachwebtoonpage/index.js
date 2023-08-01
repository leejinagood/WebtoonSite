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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/searchtoon?word=${word}`);
        const data = await response.json();
        setWebtoonData(data);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    if (word) {
      fetchData();
    }
  }, [word]); // 검색어인 word를 의존성 배열에 추가

  console.log(word);
  console.log(webtoonData);

  return (
    <div className={style.SerchWebToon}>
      <Header />
      <div className={style.SerchPage}>
        <ul>
          {webtoonData.map((webtoon, index) => (
            <li key={index}>
              <Link href={`/listpage?EnName=${webtoon.webtoon_en_name}`}>
                <div className={style.ListItem}>
                  <div className={style.ListImg}>
                    <img src={webtoon.thumbnail} />
                  </div>
                  <div className={style.ListItemContent}>
                    <p className={style.EpisodeP}>
                      {webtoon.webtoon_name}
                      <br />
                    </p>
                    <span className={style.tab2}>{webtoon.webtoon_author} /</span>
                    <span className={style.tab2}> {webtoon.categoris}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default SerchWebToon;
