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
      <div className="SerchPage">
        <ul>
          {webtoonData.map((webtoon, index) => (
            <li key={index}>
              <Link href={`/listpage?EnName=${webtoon.webtoon_en_name}`}>
                <div className="ListItem">
                  <div className="ListImg">
                    <img src={webtoon.thumbnail}/>
                  </div>
                  <div className="ListItemContent">
                    <p className="EpisodeP">
                      {webtoon.webtoon_name}
                      <br />
                    </p>
                    <span className="tab2">{webtoon.webtoon_author} /</span>
                      <span className="tab2"> {webtoon.categoris}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={MainPageCss.a}></div>
      <div className={SerchWebToonCss.a}></div>

      <Footer />
    </div>
  );
}



export default SerchWebToon;
