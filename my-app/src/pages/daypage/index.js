import React, { useEffect, useState } from "react";
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
// import NewToon from "../../src/Component/NewToon";
import Rank from "../../Component/Rank";
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Slick from "../../Component/Slick";
import Cookies from 'js-cookie';
import axios from "axios"; // axios 임포트
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "../../styles/MainPageCss.module.css"
import Tag from "@/src/Component/Tag/Tag";
const WeekPage = () => {
  const router = useRouter();
  const { day } = router.query;
  const [dayToonItemCounts, setDayToonItemCounts] = useState([]);
  const { token } = parseCookies({});
  const tokenPayload = jwt.decode(token);

  const [webtoons, setWebtoons] = useState([]);
  const [week , setWeek] = useState([]);


  useEffect(() => {
    console.log(document.cookie);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/daytoon?day=${day}`);
        const data = response.data;

        setWebtoons(data);
        setDayToonItemCounts([3, 0, 0]); // 예시로 하드코딩된 배열을 대체할 데이터를 받아서 설정하세요.
        
        // 요일에 따라 setWeek 설정
        switch (day) {
          case "mon":
            setWeek("월");
            break;
          case "tues":
            setWeek("화");
            break;
          case "wendes":
            setWeek("수");
            break;
          case "thurs":
            setWeek("목");
            break;
          case "fri":
            setWeek("금");
            break;
          case "satur":
            setWeek("토");
            break;
          case "sun":
            setWeek("일");
            break;
          default:
            setWeek("");
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    

    fetchData();

  }, [day]);

  // console.log(document.cookie);

  const Thumbnail = ({ day }) => {
    return <img className="DayToonIMG" src={day.thumbnail} alt="" />;
  };
  
  

  return (
    <div className={style.DayBox}>
      <Header token={token} />
      <h3 className={style.Categories}>{week}요일 추천 웹툰</h3>
      <div className={style.MNewToon}>
        <Slick />
      </div>
      <div className={style.Mid}>
        <div>
          <h3 className={style.Categories}>전체{week}요 웹툰</h3>
          {dayToonItemCounts.map((count, index) => (
            <div className={style.DayToonBox} key={index}>
              {[...Array(count)].map((_, subIndex) => {
                const webtoon = webtoons[subIndex];
                return webtoon ? (
                  
                  <div className={style.DayToonItem} key={subIndex}>
                           <Head>
       <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF0000"/>
        <title>AVATOON</title>

      </Head>
                  <Link href={`/listpage?EnName=${encodeURIComponent(webtoon.webtoonEnName)}&id=${webtoon.webtoonID}`}>
                    {/* <Thumbnail day={webtoon} /> */}
                    <div className={style.dayimgBox}>
                    <img src={webtoon.webtoonThumbnail} alt="" />
                    <p id={style.DhoverP} className={style.hoverP}><span className={style.leftWn}>{webtoon.webtoonName}</span><span className={style.rightAr}>{webtoon.webtoonAuthor}</span></p>

                    </div>
                  <div className={style.DtextBox}>
                  <p className={style.ToonTitle}>{webtoon.webtoonName}</p>
                    <p className={style.Writer}>{webtoon.webtoonAuthor}</p>
                  </div>

                  </Link>
                    
                  </div>
                ) : null;
              })}
            </div>
          ))}
        </div>
        <Rank />
      </div>
      <Tag></Tag>
      <Footer />
    </div>
  );
};

const Thumbnail = ({ webtoon }) => {
  return <img src={webtoon.thumbnail} alt="" />;
};

export default WeekPage;
