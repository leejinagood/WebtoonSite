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
        const response = await fetch(`/api/searchtoon?word=${word}`);
        const data = await response.json();
        setWebtoonData(data);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchData();
  }, [word]);
  console.log(word);
  console.log(webtoonData);


  return (
    <div className="SerchWebToon">
      <Header />
      <div>
        <ul>
          {webtoonData.map((webtoon, index) => (
            <li key={index}>
              <Link href={`/ListPage/ListPage?webtoonName=${webtoon.webtoon_Name}`}>
                <div className="ListItem">
                  <div className="ListImg">
                    <img src={webtoon.thumbnail}/>
                  </div>
                  <div className="ListItemContent">
                    <p className="Episode">
                      {webtoon.webtoon_name}
                      <br />
                      <span className="tab">{webtoon.webtoon_author}</span>
                    </p>
                    <p className="SU">
                      <span className="tab">{webtoon.category_kinds}</span>
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
