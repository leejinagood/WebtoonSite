import React, { useEffect, useState } from "react";
import Link from "next/link";

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
  <div className="ATBox">
    {webtoons.length > 0 && webtoons.map((webtoon, index) => (
      <div className="AllToonInfo" key={index}>
        <Link href={`/listpage?EnName=${encodeURIComponent(webtoon.webtoon_en_name)}`}>
          <Thumbnail className="ATimg" day={webtoon} />
          <div className="ATtext">
          <p className="ToonTitle">{webtoon.webtoon_name}</p>
          </div>
          
        </Link>
      </div>
    ))}
    {webtoons.length % 3 !== 0 && (
      <div className="AllToonInfo" style={{ visibility: "hidden" }}></div>
    )}
  </div>
);

  
};

const Thumbnail = ({ day }) => {
  return <img className="ATIMG" src={day.thumbnail} alt="" />;
};
export default AllToonInfo;
