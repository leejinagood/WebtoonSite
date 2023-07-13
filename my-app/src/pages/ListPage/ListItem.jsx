import React from "react";
import Link from 'next/link';
import { useEffect } from "react";
import WebToonPage from "../WebToonPage/[webtoonId]";
import { useRouter } from "next/router";

const ListItem = ({ webtoonName, ep, uploadDate, handleClick, maxEp }) => {
  const handleItemClick = () => {
    handleClick(ep); // ep 값을 업데이트
    const queryString = `?webtoonName=${encodeURIComponent(webtoonName)}&episodeNumber=${ep}`;
    window.location.href = `/WebToonPage/WebToonPage${queryString}`;
  };

  // useEffect(() => {
  //   const { webtoonName } = router.query;

  //   if (webtoonName) {
  //     fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const { webtoons, count } = data; // 카운터 값을 가져와서 상태에 설정
  //         setWebtoonInfo(webtoons[0]);
  //         setWebtoons(webtoons);
  //         setCount(count);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching API:", error);
  //       })
  //   }
  // }, [router.query.webtoonName]);
  return (
    // <div onClick={WebToonPageMove}>
    // <Link href={`/WebToonPage/WebToonPage?WebToonName=${webtoonName}&Episode=${ep}`}>
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
