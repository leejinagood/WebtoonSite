import React, { useState, useEffect } from "react";
import Link from "next/link";

const ListItem = ({ webtoonName, ep, uploadDate, handleClick }) => {
  const [webtoonItem, setWebtoonItem] = useState(null);
  console.log(webtoonName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listitem?EnName=${encodeURIComponent(webtoonName)}`);
        const { webtoonData } = await response.json();
        setWebtoonItem(webtoonData[0]);
        
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    if (webtoonName) {
      fetchData();
    } else {
      setWebtoonItem(null);
    }
  }, [webtoonName]);
  const handleItemClick = () => {
    handleClick(ep);
    const queryString = `?EnName=${encodeURIComponent(webtoonName)}&ep=${ep}`;
    window.location.href = `/webtoonpage${queryString}`;
  };

  if (!webtoonItem) {
    return "no data"; // 로딩 중이거나 데이터가 없을 때 null을 반환하여 아무 내용도 표시하지 않습니다.
  }


  console.log(webtoonItem);

  return (
    <Link href={`/webtoonpage?EnName=${encodeURIComponent(webtoonName)}&ep=${encodeURIComponent(ep)}`}>
      <div className="ListItem" onClick={handleItemClick}>
        <div className="ListImg">
          <img src={webtoonItem.episode_thumbnail} alt="s" />
        </div>
        <div className="ListItemContent">
          <p className="Episode">
            {webtoonItem.webtoon_name} <br />
            <span className="tab">{ep}화</span>
          </p>
          <p className="SU">
            <span className="tab">{webtoonItem.update}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
