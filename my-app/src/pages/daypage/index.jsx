import React, { useEffect, useState } from "react";
import Header from "@/src/Header/header";
import Footer from "@/src/Footer/footer";
import NewToon from "../../Component/NewToon";
import Rank from "../../Component/Rank";
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useRouter } from "next/router";
import Link from "next/link";
const WeekPage = () => {
  const router = useRouter();
  const { day } = router.query;
  const [dayToonItemCounts, setDayToonItemCounts] = useState([]);
  const { token } = parseCookies({});
  const tokenPayload = jwt.decode(token);

  const [webtoons, setWebtoons] = useState([]);
  const [week , setWeek] = useState([]);



  useEffect(() => {
    fetch(`/api/daytoon?day=${day}`)
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data);
        setDayToonItemCounts([3, 0, 0]); // 예시로 하드코딩된 배열을 대체할 데이터를 받아서 설정하세요.
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });

      if(day=="mon"){
        setWeek("월")
      }else if(day=="tues"){
        setWeek("화")
      }else if(day=="wendes"){
        setWeek("수")
      }else if(day=="thurs"){
        setWeek("목")
      }else if(day=="fri"){
        setWeek("금")
      }else if(day=="satur"){
        setWeek("토")
      }else if(day=="sun"){
        setWeek("일")
      }
    
  }, [day]);

  const Thumbnail = ({ day }) => {
    return <img className="DayToonIMG" src={day.thumbnail} alt="" />;
  };
  
  

  return (
    <div className="DayBox">
      <Header token={token} />
      <h3 className="Categories">{week}요일 추천 웹툰</h3>
      <div className="MNewToon">
        <NewToon />
      </div>
      <div className="Mid">
        <div>
          <h3>전체{week}요 웹툰</h3>
          {dayToonItemCounts.map((count, index) => (
            <div className="DayToonBox" key={index}>
              {[...Array(count)].map((_, subIndex) => {
                const webtoon = webtoons[subIndex];
                return webtoon ? (
                  
                  <div className={`DayToonItem ${subIndex === 1 ? "second-item" : ""}`} key={subIndex}>
                  <Link href={`/listpage?EnName=${encodeURIComponent(webtoon.webtoon_en_name)}`}>

                    <Thumbnail day={webtoon} />
                    <p className="ToonTitle">{webtoon.webtoon_name}</p>
                    <p className="Writer">{webtoon.author}</p>
                    <p className="Star">⭐️{webtoon.like}</p>
                    </Link>
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
