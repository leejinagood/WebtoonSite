import React, { useEffect, useState } from "react";
import Link from "next/link";

const Rank = () => {
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/rank?day=rank");
        const data = await response.json();
        setWebtoons(data);
      } catch (error) {
        console.error("API를 불러오는 도중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="HHH">인기 웹툰</h3>
      <div className="HotToon">
        {webtoons.map((webtoon, index) => (
          <div className="RBox" key={index}>
            <Link href={`/listpage?EnName=${encodeURIComponent(webtoon.webtoon_en_name)}`}>
              <div className="Rank">
                <div className="Rankitem">
                  <div className="RankImg">
                    <img src={webtoon.thumbnail} alt={`${index + 1}등`} />
                  </div>
                  <div className="RankNum">
                    <h2>{`${index + 1}등`}</h2>
                  </div>
                  <div className="RankText">
                    <p className="RankWN">{webtoon.webtoon_name}</p>
                    <p className="RankAT">{webtoon.author}</p>
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
