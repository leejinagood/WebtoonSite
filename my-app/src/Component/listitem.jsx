import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";

const ListItem = ({ webtoonName, ep, uploadDate, handleClick, maxEp }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState(""); // 초기값은 빈 문자열로 셋팅

  const handleItemClick = () => {
    handleClick(ep);
    const queryString = `?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${ep}`;
    window.location.href = `/webtoonpage${queryString}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Episode_Thumbnail?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${ep}`);
        const data = await response.json();
        const thumbnail = data.rows[0]?.[0]?.Episode_Thumbnail; // 썸네일 이미지 경로 추출 
        if (thumbnail) {
          // 썸네일 변수에 할당
          setThumbnailSrc(thumbnail);
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, [webtoonName, ep]);

  return (
    <Link href={`/webtoonpage?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${encodeURIComponent(ep)}`}>
      <div className="ListItem" onClick={handleItemClick}>
        <div className="ListImg">
          {/* thumbnailSrc가 true일 때 조건부 렌더링 */}
          {thumbnailSrc && <img src={thumbnailSrc} alt="s" />} 
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
