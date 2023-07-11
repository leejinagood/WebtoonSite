import React, { useEffect, useState } from "react";
import Link from "next/link";

const AllToonInfo = () => {
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    fetch("/api/daywebtoon?day=All")
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data.webtoons);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, []);

  const getThumbnailImage = (webtoon) => {
    if (webtoon.webtoon_name === "똑 닮은 딸") {
      return "/WebtoonImg/web1/web1_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "마루는 강쥐") {
      return "/WebtoonImg/web2/web2_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "소녀재판") {
      return "/WebtoonImg/web3/web3_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "신혼일기") {
        return "/WebtoonImg/web4/web4_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "외모지상주의") {
      return "/WebtoonImg/web5/web5_thumbnail.jpg";
    }else if (webtoon.webtoon_name === "퀘스트지상주의") {
      return "/WebtoonImg/web6/web6_thumbnail.jpg";
    }
    // 기본값으로 설정할 썸네일 이미지 경로
    return "";
  };

  return (
    <div className="ATBox">
      {webtoons.map((webtoon, index) => (
        <div className="AllToonInfo" key={index}>
<<<<<<< HEAD
          <Link href={`/ListPage/ListPage?webtoonName=${encodeURIComponent(webtoon.webtoon_name)}`}>
            
              <img src="1.jpg" alt="" />
              <p className="ToonTitle">{webtoon.webtoon_name}</p>
            
          </Link>
=======
          <img src={getThumbnailImage(webtoon)} alt="" />
          <p className="ToonTitle">{webtoon.webtoon_name}</p>
>>>>>>> 98fbc8f8a7f3379c8391a83941165e78af2696bf
        </div>
      ))}
      {webtoons.length % 3 !== 0 && (
        <div className="AllToonInfo" style={{ visibility: "hidden" }}></div>
      )}
    </div>
  );
};

export default AllToonInfo;
