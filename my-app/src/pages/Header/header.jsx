import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import HederCss from "./styles/Heder.css";
import SerchWebToon from "../SerchWebToon";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import
import jwt from 'jsonwebtoken'; // jwt 라이브러리 import

const Header = () => {
  const [userId, setUserId] = useState(null);
  const [webtoonData, setWebtoonData] = useState([]);

  // 유저가 검색창에 입력하는 값
  const [userInput, setUserInput] = useState('');
  const [userName, setUserName] = useState(""); // API 응답에서 가져온 유저 이름

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 동작 막기
      window.location.href = `/SerchWebToon?word=${userInput}`;
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUserId(null);
    router.push("/");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/Token");
        if (response.status === 200) {
          setUserId(response.data.userId);
          console.log("토큰:", sessionStorage.getItem("token"));
        } else {
          setUserId(null);
          console.log("토큰:", sessionStorage.getItem("token"));
        }
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/userInfo", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            const { User_Name } = response.data;
            console.log("유저 이름:", User_Name);
            setUserName(User_Name);
          }
        }
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    };

    fetchUserInfo();
  }, []);

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
                        {userName} (로그아웃)
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
            <li id="AD" className="AllDay">전체요일</li>
          </Link>
          <Link href={{ pathname: '/DayPage/MonDayPage', query: { day: 'mon' } }}>
            <li className="AllDay">월</li>
          </Link>
          <Link href={{ pathname: '/DayPage/TuesDayPage', query: { day: 'tues' } }}>
            <li className="AllDay">화</li>
          </Link>
          <Link href={{ pathname: '/DayPage/WednesDayPage', query: { day: 'wedes' } }}>
            <li className="AllDay">수</li>
          </Link>
          <Link href={{ pathname: '/DayPage/ThursDayPage', query: { day: 'thu' } }}>
            <li className="AllDay">목</li>
          </Link>
          <Link href={{ pathname: '/DayPage/FirDayPage', query: { day: 'fir' } }}>
            <li className="AllDay">금</li>
          </Link>
          <Link href={{ pathname: '/DayPage/SaturDaypage', query: { day: 'satur' } }}>
            <li className="AllDay">토</li>
          </Link>
          <Link href={{ pathname: '/DayPage/SunDayPage', query: { day: 'sun' } }}>
            <li className="AllDay">일</li>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
