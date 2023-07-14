import React, { useEffect, useState } from "react";
import Header from "./Header/header";
import Footer from "./Footer/Footer";
import { useRouter } from "next/router";

function SerchWebToon() {
  const router = useRouter();
  const { word } = router.query;
  const [webtoonData, setWebtoonData] = useState([]);

  console.log(word);
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

  console.log(webtoonData);

  return (
    <div className="SerchWebToon">
      <Header />
      <div>
        <ul>
          {webtoonData.map((webtoon, index) => (
            <li key={index}>
              <div className="ListItem">
                <div className="ListImg">
                  <img src="1.jpg" alt="s" />
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
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default SerchWebToon;
