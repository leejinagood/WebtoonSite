import React, { useEffect, useState } from "react";
import Header from "@/src/Header/header";
import Footer from "@/src/Footer/footer";
import NewToon from "../../Component/NewToon";
import Rank from "../../Component/Rank";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import
import jwt from 'jsonwebtoken'; // jwt 라이브러리 import

const WeekPage = ({ day }) => {
  const [dayToonItemCounts, setDayToonItemCounts] = useState([]);
  const [webtoons, setWebtoons] = useState([]);
  const { token } = parseCookies({});
  const tokenPayload = jwt.decode(token);

  useEffect(() => {
    fetch(`/api/daytoon?day=${day}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      const { webtoons } = data;
      const { thumbnail } = webtoons[0] || {};
      setWebtoons(webtoons);
      setDayToonItemCounts([3, 0, 0]); // 예시로 하드코딩된 배열을 대체할 데이터를 받아서 설정하세요.
    })
    .catch((error) => {
      console.error("Error fetching API:", error);
    });
  }, [day, token]);

  return (
    <div className="DayBox">
      <Header token={token} />
      <h3 className="Categories">{day}요일 추천 웹툰</h3>
      <div className="MNewToon">
        <NewToon />
      </div>
      <div className="Mid">
        <div>
          <h3>전체{day}요 웹툰</h3>
          {dayToonItemCounts.map((count, index) => (
            <div className="DayToonBox" key={index}>
              {[...Array(count)].map((_, subIndex) => {
                const webtoon = webtoons[subIndex];
                return webtoon ? (
                  <div className={`DayToonItem ${subIndex === 1 ? "second-item" : ""}`} key={subIndex}>
                    <Thumbnail className="DayToonItem" webtoon={webtoon} />
                    <p className="ToonTitle">{webtoon.webtoon_name}</p>
                    <p className="Writer">{webtoon.author}</p>
                    <p className="Star">⭐️{webtoon.like}</p>
                  </div>
                ) : null;
              })}
            </div>
          ))}
        </div>
        <Rank />
      </div>
      <Footer />
    </div>
  );
};

const Thumbnail = ({ webtoon }) => {
  return <img src={webtoon.thumbnail} alt="" />;
};

export default WeekPage;
