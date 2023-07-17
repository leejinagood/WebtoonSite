import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";

const ListItem = ({ webtoonName, ep, uploadDate, handleClick, maxEp }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState(""); // 초기값은 빈 문자열

  const handleItemClick = () => {
    handleClick(ep);
    const queryString = `?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${ep}`;
    window.location.href = `/WebToonPage/WebToonPage${queryString}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Episode_Thumbnail?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${ep}`);
        const data = await response.json();
        const thumbnail = data.rows[0]?.[0]?.Episode_Thumbnail; // 서버 응답에서 썸네일 URL 추출
        if (thumbnail) {
          setThumbnailSrc(thumbnail);
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, [webtoonName, ep]);

  return (
    <Link href={`/WebToonPage/WebToonPage?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${encodeURIComponent(ep)}`}>
      <div className="ListItem" onClick={handleItemClick}>
        <div className="ListImg">
          {thumbnailSrc && <img src={thumbnailSrc} alt="s" />} {/* 이미지 URL이 존재할 때에만 이미지 요소 렌더링 */}
        </div>
        <div className="ListItemContent">
          <p className="Episode">
            {webtoonName} <br />
            <span className="tab">{ep}화</span>
          </p>
          <p className="SU">
            <span className="tab">{uploadDate}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
