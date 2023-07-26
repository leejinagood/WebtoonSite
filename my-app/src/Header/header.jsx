import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import HederCss from "./styles/Heder.css";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import
import jwt from 'jsonwebtoken'; // jwt 라이브러리 import

const Header = () => {
  const [userId, setUserId] = useState(null);
  const [webtoonData, setWebtoonData] = useState([]);
  const router = useRouter();
  let token;

  if (typeof window !== 'undefined') {
    // 브라우저 환경에서만 sessionStorage에 접근
    token = sessionStorage.getItem("token");
  }
  // 유저가 검색창에 입력하는 값
  const [userInput, setUserInput] = useState('');
  const [user, setUser] = useState("login"); // API 응답에서 가져온 유저 이름
  const userName = "";
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 동작 막기
      window.location.href = `/serachwebtoonpage?word=${userInput}`;
      //나중에 라우트로 변경
    }
  };

  const handleLogout = () => {
    // 세션 스토리지에서 토큰 삭제
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    console.log("토큰 유저네임 삭제");
    // userId와 userName 초기화
    setUserId(null);
    setUser("login");
    // 페이지 이동
    router.push(router.pathname);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/Token");
        if (response.status === 200) {
          setUserId(response.data.userId);
          console.log("유저네임:",sessionStorage.getItem("userName") );
          console.log("토큰:", sessionStorage.getItem("token"));
          setUser(sessionStorage.getItem("userName"));
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



  return (
    <div className="HederBox">
      <div className="header">
        <div className="TopHeader">
          <div className="LogoBox">
          <link rel="manifest" href="/manifest.json" />
            <Link href="/">
            <h1 className="Logo"><span className="Color">A</span>VA<span className="Color">T</span>OON</h1>
            </Link>
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
                    {token ? (
                      <>
                        <p onClick={handleLogout} className="LoginBtn">{user}</p>
                        {/* <button onClick={handleLogout} className="LogoutBtn">
                          로그아웃
                        </button> */}
                      </>
                    ) : (
                      <Link href="/loginpage">
                        <p className="LoginBtn">login</p>
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
          <Link href={{ pathname: '/daypage', query: { day: 'mon' } }}>
            <li className="AllDay">월</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'tues' } }}>
            <li className="AllDay">화</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'wendes' } }}>
            <li className="AllDay">수</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'thurs' } }}>
            <li className="AllDay">목</li>
          </Link>
          <Link href={{ pathname: 'daypage', query: { day: 'fri' } }}>
            <li className="AllDay">금</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'satur' } }}>
            <li className="AllDay">토</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'sun' } }}>
            <li className="AllDay">일</li>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
