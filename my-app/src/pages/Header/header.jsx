import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import HederCss from "./styles/Heder.css";
import SerchWebToon from "../SerchWebToon";
import { useRouter } from "next/router";
const Header = () => {
  const [webtoonData, setWebtoonData] = useState([]);

  // 유저가 검색창에 입력하는 값
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.target.value);
    console.log(userInput);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 동작 막기

      window.location.href = `/SerchWebToon?word=${userInput}`;  
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search?word=${userInput}`);
        const data = await response.json();
        setWebtoonData(data);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, [userInput]);

  console.log(webtoonData);

  // const handleLinkClick = async (day) => {
  //   try {
  //     const response = await axios.get('/api/daywebtoon', {
  //       params: { day }
  //     });
  //     console.log(response.data);
  //     // 여기서 서버 응답 데이터를 처리하거나 상태 업데이트를 수행할 수 있습니다.
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="HederBox">
      <div className="header">
        <div className="TopHeader">
          <div className="LogoBox">      
            <h1 className="Logo">AVATOON</h1>
          </div>
          <div className="rb">
            <div className="SerchBar">
              <form>
                <div className="InputBox">
                  <input
                    type="text"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="작가/제목으로 검색할 수 있습니다."
                  />
                  <div className="BTN">
                    <button type="submit" className="SerchBtn">검색</button>
                    <Link href="/LoginPage/LoginPage"><button className="LoginBtn">login</button></Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="HDayBox">
        <div className="Day">
          <Link href={{ pathname: '/', query: { day: 'All' } }}>
            <li id="AD" className="AllDay" onClick={() => handleLinkClick('All')}>전체요일</li>
          </Link>
          <Link href={{ pathname: '/DayPage/MonDayPage', query: { day: 'mon' } }}>
            <li className="AllDay" onClick={() => handleLinkClick('mon')}>월</li>
          </Link>
          <Link href={{ pathname: '/DayPage/TuesDayPage', query: { day: 'tues' } }}>
            <li className="AllDay" onClick={() => handleLinkClick('tues')}>화</li>
          </Link>
          <Link href={{ pathname: '/DayPage/WednesDayPage', query: { day: 'wedes' } }}>
            <li className="AllDay" onClick={() => handleLinkClick('wedes')}>수</li>
          </Link>
          <Link href={{ pathname: '/DayPage/ThursDayPage', query: { day: 'thu' } }}>
            <li className="AllDay" onClick={() => handleLinkClick('thu')}>목</li>
          </Link>
          <Link href={{ pathname: '/DayPage/FirDayPage', query: { day: 'fir' } }}>
            <li className="AllDay" onClick={() => handleLinkClick('fir')}>금</li>
          </Link>
          <Link href={{ pathname: '/DayPage/SaturDaypage', query: { day: 'satur' } }}>
            <li className="AllDay" onClick={() => handleLinkClick('satur')}>토</li>
          </Link>
          <Link href={{ pathname: '/DayPage/SunDayPage', query: { day: 'sun' } }}>
            <li className="AllDay" onClick={() => handleLinkClick('sun')}>일</li>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
