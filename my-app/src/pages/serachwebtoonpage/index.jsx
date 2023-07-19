import React, { useEffect, useState } from "react";
import Header from "@/src/Header/header";
import Footer from "@/src/Footer/Footer";
import { useRouter } from "next/router";
import SerchWebToonCss from "./SerchWebToonCss.css";
import MainPageCss from "@/src/styles/MainPageCss.css";
import Link from "next/link";

function SerchWebToon() {
  const router = useRouter();
  const { word } = router.query;
  const [webtoonData, setWebtoonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search?word=${word}`);
        const data = await response.json();
        setWebtoonData(data[0]);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchData();
  }, [word]);

  const getThumbnailImage = async (webtoonName) => {
    try {
      const response = await fetch(`/api/Webtoon_Thumbnail?webtoonName=${encodeURIComponent(webtoonName)}`);
      const data = await response.json();
      const thumbnail = data.rows[0]?.[0]?.Webtoon_Thumbnail;
      return thumbnail || "";
    } catch (error) {
      console.error("Error fetching API:", error);
      return "";
    }
  };

  return (
    <div className="SerchWebToon">
      <Header />
      <div>
        <ul>
          {webtoonData.map((webtoon, index) => (
            <li key={index}>
              <Link href={`/ListPage/ListPage?webtoonName=${webtoon.Webtoon_Name}`}>
                <div className="ListItem">
                  <div className="ListImg">
                    <img src="" ref={imgRef => {
                      if (imgRef) {
                        getThumbnailImage(webtoon.Webtoon_Name)
                          .then(thumbnail => imgRef.src = thumbnail)
                          .catch(error => console.error("Error loading thumbnail:", error));
                      }
                    }} />
                  </div>
                  <div className="ListItemContent">
                    <p className="Episode">
                      {webtoon.Webtoon_Name}
                      <br />
                      <span className="tab">{webtoon.Webtoon_Author}</span>
                    </p>
                    <p className="SU">
                      <span className="tab">{webtoon.Category_Kinds}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default SerchWebToon;
