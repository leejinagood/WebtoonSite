import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "../styles/MainPageCss.module.css"
const AllToonInfo = () => {
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    fetch("/api/daytoon?day=All")
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, []);
  console.log(webtoons);
  // const AllDayToon = async () => {
  //   const res = await fetch('http://localhost:3000/api/daytoon?all')
  //   const data = await res.json()
    
  //   return data
  // }  ? ? ? ? 

return (
  <div className={style.ATBox}>
    {webtoons.length > 0 && webtoons.map((webtoon, index) => (
      <div className={style.AllToonInfo} key={index}>
        <Link href={`/listpage?EnName=${encodeURIComponent(webtoon.webtoonEnName)}`}>
          <Thumbnail className={style.ATimg} day={webtoon} />
          <div className={style.ATtext}>
          <p className={style.AToonTitle}>{webtoon.webtoonName}</p>
          <p className={style.ATMT}> {webtoon.author} </p>
          </div>
          
        </Link>
      </div>
    ))}
    {webtoons.length % 3 !== 0 && (
      <div id={style.ll} className={style.AllToonInfo} ></div>
    )}
  </div>
);

  
};

const Thumbnail = ({ day }) => {
  return <img className="ATIMG" src={day.thumbnail} alt="" />;
};
export default AllToonInfo;
