import React, { useEffect, useState } from "react";
import Link from "next/link";

const AllToonInfo = () => {
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    fetch("/api/daytoon?day=All")
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data.webtoons);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, []);

  return (
    <div className="ATBox">
      {webtoons.map((webtoon, index) => (
        <div className="AllToonInfo" key={index}>
          <Link href={`/listpage?webtoonName=${encodeURIComponent(webtoon.webtoon_name)}`}>
            <Thumbnail day={webtoon} />
            <p className="ToonTitle">{webtoon.webtoon_name}</p>
          </Link>
        </div>
      ))}
      {webtoons.length % 3 !== 0 && (
        <div className="AllToonInfo" style={{ visibility: "hidden" }}></div>
      )}
    </div>
  );
};

const Thumbnail = ({ day }) => { //webtoon prop을 매개변수로 받아오는 썸네일 컴포넌트
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  useEffect(() => { //webtoon_name이 변경될 때마다
    const fetchThumbnail = async () => {
      try {//엔드포인트
        const response = await fetch(`/api/daytoon?day=All`);
        const data = await response.json();
        const {thumbnail} =data;
        if (thumbnail) {
          setThumbnailSrc(thumbnail);
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchThumbnail(); //fetchThumbnail가 실행되어 썸네일 이미지 경로를 가져오고 thumbnailSrc 상태가 변함
  }, []);

  return <img src={thumbnailSrc} alt="" />;
};

export default AllToonInfo;
