import React, { useEffect, useState } from "react";
import Link from 'next/link';

const ListItem = ({ webtoonName, uploadDate  }) => {
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

  const [webtoons, setWebtoons] = useState([]);

  return (
    <Link href="/WebToonPage/WebToonPage">
      <div className="ListItem">
        <div className="ListImg">
          <img src="1.jpg" alt="s" />
        </div>
        <div className="ListItemContent">
          <p className="Episode">
            {webtoonName} <br />
            <span className="tab">sss</span>
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
