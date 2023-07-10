import React, { useEffect, useState } from "react";

const AllToonInfo = () => {
  // const [webtoons, setWebtoons] = useState([]);

  // useEffect(() => {
  //   fetch("/api/daywebtoon?day=All")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setWebtoons(data.webtoons);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching API:", error);
  //     });
  // }, []);

  return (
    <div className="ATBox">
      {/* {webtoons.map((webtoon, index) => (
        <div className="AllToonInfo" key={index}>
          <img src="1.jpg" alt="" />
          <p className="ToonTitle">{webtoon}</p>
        </div>
      ))}
      {webtoons.length % 3 !== 0 && (
        <div className="AllToonInfo" style={{ visibility: "hidden" }}></div>
      )} */}
    </div>
  );
};

export default AllToonInfo;
