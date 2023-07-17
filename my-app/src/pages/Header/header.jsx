import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import HederCss from "./styles/Heder.css";
import SerchWebToon from "../SerchWebToon";
import { useRouter } from "next/router";

const Header = () => {
  const [token, setToken] = useState('');

  const [userId, setUserId] = useState(null);
  const [webtoonData, setWebtoonData] = useState([]);
  const router = useRouter();
  const { userName = "login"} = router.query;

  // 유저가 검색창에 입력하는 값
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };









  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 동작 막기
      window.location.href = `/SerchWebToon?word=${userInput}`;
    }
  };


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/Token");
        if (response.status === 200) {
          setUserId(response.data.userId);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLinkClick = async (day) => {
    try {
      const response = await axios.get('/api/daywebtoon', {
        params: { day }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserId(null);
    router.push("/");
  };

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
                    {userId ? (
                      <p className="LoginBtn" onClick={handleLogout}>
                        {userId} (로그아웃)
                      </p>
                    ) : (
                      <Link href="/LoginPage/LoginPage">
                        <p className="LoginBtn">{userName}</p>
                      </Link>
                    )}
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
            <li id="AD" className="AllDay" onClick={() => handleLinkClick('/all')}>전체요일</li>
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
