import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "../styles/MainPageCss.module.css";

const Rank = () => {
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/rank?day=All");
        const data = await response.json();

        // totalLikes 기준으로 정렬하여 상위 5개만 가져오기
        const sortedData = data.sort((a, b) => b.totalLikes - a.totalLikes);
        const top5Webtoons = sortedData.slice(0, 5);

        setWebtoons(top5Webtoons);
      } catch (error) {
        console.error("API를 불러오는 도중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className={style.HHH}>인기 웹툰</h3>
      <div className={style.HotToon}>
        {webtoons.map((webtoon, index) => (
          <div className={style.RBox} key={index}>
            <Link href={`/listpage?EnName=${encodeURIComponent(webtoon.webtoonEnName)}&id=${webtoon.webtoonID}`}>
              <div className={style.Rank}>
                <div className={style.Rankitem}>
                  <div className={style.RankImg}>
                    <img src={webtoon.webtoonThumbnail} alt={`${index + 1}등`} />
                  </div>
                  <div className={style.RankNum}>
                    <h2>{`${index + 1}등`}</h2>
                  </div>
                  <div className={style.RankText}>
                    <p className={style.RankWN}>{webtoon.webtoonName}</p>
                    <p className={style.RankAT}>{webtoon.webtoonAuthor}</p>
                  </div>
                  
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rank;
