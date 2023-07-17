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

  return (
    <div className="ATBox">
      {webtoons.map((webtoon, index) => (
        <div className="AllToonInfo" key={index}>
          <Link href={`/ListPage/ListPage?webtoonName=${encodeURIComponent(webtoon.webtoon_name)}`}>
            <Thumbnail webtoon={webtoon} />
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

const Thumbnail = ({ webtoon }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await fetch(`/api/Webtoon_Thumbnail?webtoonName=${webtoon.webtoon_name}`);
        const data = await response.json();
        const thumbnail = data.rows[0]?.[0]?.Webtoon_Thumbnail;
        if (thumbnail) {
          setThumbnailSrc(thumbnail);
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchThumbnail();
  }, [webtoon.webtoon_name]);

  return <img src={thumbnailSrc} alt="" />;
};

export default AllToonInfo;
