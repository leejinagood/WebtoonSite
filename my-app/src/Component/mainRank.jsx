import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "./mainRank.module.css";

const mainRank = () => {
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/rank?day=All");
        const data = await response.json();

        // totalLikes 기준으로 정렬하여 상위 5개만 가져오기
        const sortedData = data.sort((a, b) => b.totalLikes - a.totalLikes);
        const top5Webtoons = sortedData.slice(0, 6);

        setWebtoons(top5Webtoons);
        console.log(webtoons);
        console.log(webtoons.webtoonThumbnail);


      } catch (error) {
        console.error("API를 불러오는 도중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={style.mrbox}>
      <h3 className={style.HHH}>인기 웹툰</h3>
      <div className={style.HotToon}>
        {webtoons.map((webtoon, index) => (
          <div className={style.RBox} key={index}>
            <Link href={`/listpage?EnName=${encodeURIComponent(webtoon.webtoonEnName)}&id=${webtoon.webtoonID}`}>
              <div className={style.Rank}>
                <div className={style.Rankitem}>
                  <div className={`${style.RankImg} ${index === 0 ? style.FirstImgBox : ""}`}>
                    <img       src={
        webtoon.webtoonThumbnail === "https://i.imgur.com/ogEdd6I.png"
          ? "WebtoonImg/maruisdog/maruisdog2.jpeg"
          : webtoon.webtoonThumbnail === "https://i.imgur.com/2qdwJdc.jpg"
          ? "WebtoonImg/lookism/lookism2.jpeg":
          webtoon.webtoonThumbnail === "https://i.imgur.com/KGqTqqC.jpg"
          ? "WebtoonImg/daughter_mom_looks_just_like/ddonk.jpeg"
          :webtoon.webtoonThumbnail === "https://i.imgur.com/FQDv300.jpg"
          ? "WebtoonImg/questsupremacy/so1.jpg"
          :webtoon.webtoonThumbnail === 
          "https://i.imgur.com/Hwq8Zhg.jpg"
          ? "WebtoonImg/honeymoondiary/jagga.jpeg"
          :webtoon.webtoonThumbnail === 
          "https://i.imgur.com/ZYLM90o.jpg"?
          "WebtoonImg/monstercat/moncat.jpeg"
          :webtoon.webtoonThumbnail === 
          "https://i.imgur.com/GkxfvA6.jpg"
          ? "WebtoonImg/questsupremacy/q.jpeg"
          : webtoon.webtoonThumbnail === "https://i.imgur.com/bicvcUQ.jpg"
          ? "WebtoonImg/GyeBaeksoon/nojob.jpeg"

          : webtoon.webtoonThumbnail
      //
      } alt={`${index + 1}등`} 
      
      className={style.webtoonImage}/>
                  </div>
                  <div className={`${style.rankNum} ${index === 0 ? style.FirstRank : ""}`}>{index+1}</div>
                  <div className={`${style.RankText} ${index === 0 ? style.FirstRank : ""}`}>
                    <p className={style.RankWN}>{webtoon.webtoonName}</p>
                    <p className={style.RankAT}>{webtoon.webtoonAuthor}</p>
                  </div>
                  <div className={style.rc}>
                    <p className={style.rankContent}>{webtoon.webtoonContent}</p>
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

export default mainRank;
