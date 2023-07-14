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

  // 웹툰 제목을 받고 일치하는 제목이면 img src 경로 수정
  const getThumbnailImage = (webtoon) => {
    if (webtoon.Webtoon_Name === "똑 닮은 딸") {
      return "/WebtoonImg/web1/web1_thumbnail.jpg";
    } else if (webtoon.Webtoon_Name === "마루는 강쥐") {
      return "/WebtoonImg/web2/web2_thumbnail.jpg";
    } else if (webtoon.Webtoon_Name === "소녀재판") {
      return "/WebtoonImg/web3/web3_thumbnail.jpg";
    } else if (webtoon.Webtoon_Name === "신혼일기") {
        return "/WebtoonImg/web4/web4_thumbnail.jpg";
    } else if (webtoon.Webtoon_Name === "외모지상주의") {
      return "/WebtoonImg/web5/web5_thumbnail.jpg";
    }else if (webtoon.Webtoon_Name === "퀘스트지상주의") {
      return "/WebtoonImg/web6/web6_thumbnail.jpg";
    }
    // 기본값으로 설정할 썸네일 이미지 경로
    return "";
  };

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
                <img src={getThumbnailImage(webtoon)} alt="" />
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
