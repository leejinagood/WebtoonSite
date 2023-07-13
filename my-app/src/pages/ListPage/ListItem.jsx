import React from "react";
import Link from 'next/link';

const ListItem = ({ webtoonName, ep, uploadDate, handleClick, maxEp }) => {
  const handleItemClick = () => {
    handleClick(ep); // ep 값을 업데이트
    const queryString = `?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${ep}`;
    window.location.href = `/WebToonPage/WebToonPage${queryString}`;
  };
  return (
    <div className="ListItem" onClick={handleItemClick}>
      <Link href={`/WebToonPage/WebToonPage?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${encodeURIComponent(ep)}`}>
      <div className="ListItem" onClick={handleItemClick}>
        <div className="ListImg">
          <img src="1.jpg" alt="s" />
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
    </div>
  );
};

export default ListItem;
