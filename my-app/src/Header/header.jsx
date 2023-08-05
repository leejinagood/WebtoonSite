import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import style from "./styles/Heder.module.css";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import

const Header = () => {
  const [userId, setUserId] = useState(null);
  const [webtoonData, setWebtoonData] = useState([]);
  const router = useRouter();
  let token;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // 클라이언트 사이드에서 실행되도록 설정
    setIsClient(true);
  }, []);

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

  const [currentDay, setCurrentDay] = useState(new Date().getDay()); // 현재 요일 가져오기

  const getDayStyle = (dayIndex) => {
    if (dayIndex === currentDay) {
      return style.CurrentDay; // 현재 요일에만 적용될 스타일 클래스
    }
    return style.AllDay; // 다른 요일에 적용될 스타일 클래스
  };


  const handleLogout = () => {
    // 세션 스토리지에서 토큰 삭제
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");

    sessionStorage.removeItem("userName");

    console.log("토큰 유저네임 삭제");
    // userId와 userName 초기화
    setUserId(null);
    setUser("login");
    // 페이지 이동
    router.push("/");
  };

  
  useEffect(() => {
    const checkLoginStatus = async () => {
      // 클라이언트 사이드에서만 실행
      if (typeof window !== "undefined") {
        // sessionStorage에 토큰이 있는지 확인
        const token = sessionStorage.getItem("token");
        if (token) {
          try {
            const response = await axios.get("/api/Token");
            if (response.status === 200) {
              setUserId(response.data.userId);
              console.log("유저네임:", sessionStorage.getItem("userName"));
              setUser(sessionStorage.getItem("userName"));
              console.log("토큰:", sessionStorage.getItem("token"));
            } else {
              setUserId(null);
              console.log("토큰:", sessionStorage.getItem("token"));
            }
          } catch (error) {
            console.error("API 호출 에러:", error);
          }
        } else {
          console.log("토큰 없음");
        }
      }
    };
  
    checkLoginStatus();
  }, []);
  




  useEffect(() => {
    // 쿠키에 저장된 정보를 가져오기
    const cookies = parseCookies();
    const userEmail = cookies.userEmail;
    const userName = cookies.userName;
    const token = cookies.token;

    // 쿠키에 정보가 있을 경우 상태에 저장
    if (userEmail && userName && token) {
      sessionStorage.setItem("userEmail", userEmail);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("token", token);
    }
  }, []);

  return (
    <div className={style.HederBox}>
      <div className={style.header}>
        <div className={style.TopHeader}>
        <link rel="manifest" href="/manifest.json" />
        <Link href="/">
          <div className={style.LogoBox}>
            <h1 className={style.Logo}><span className={style.Color}>A</span>VA<span className={style.Color}>T</span>OON</h1>
          </div>
          </Link>

          <div className={style.rb}>
            <div className={style.SerchBar}>
              <form>
                <div className={style.InputBox}>
                  <input
                    type="text"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="작가/제목으로 검색할 수 있습니다."
                  />
                    <div className={style.BTN}>
                {isClient && ( // 클라이언트 사이드에서만 렌더링
                  <>
                    <button type="submit" className={style.SerchBtn}>검색</button>
                    {token ? (
                      <>
                        <p onClick={handleLogout} className={style.LoginBtn}>{decodeURIComponent(user)}</p>
                      </>
                    ) : (
                      <Link href="/loginpage">
                        <p className={style.LoginBtn}>login</p>
                      </Link>
                    )}
                  </>
                )}
              </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={style.HDayBox}>
        <div className={style.Day}>
          <Link href={{ pathname: '/', query: { day: 'All' } }}>
            <li id={style.AD}>전체<span className={style.vis}>요일</span></li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'mon' } }}>
          {currentDay === 1 && <p className={style.TodayText}>today !</p>}
            <li className={getDayStyle(1)}>월</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'tues' } }}>
          {currentDay === 2 && <p className={style.TodayText}>today !</p>}
            <li className={getDayStyle(2)}>화</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'wendes' } }}>
          {currentDay === 3 && <p className={style.TodayText}>today !</p>}
            <li className={getDayStyle(3)}>수</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'thurs' } }}>
          {currentDay === 4 && <p className={style.TodayText}>today !</p>}

            <li className={getDayStyle(4)}>목</li>
          </Link>
          <Link href={{ pathname: 'daypage', query: { day: 'fri' } }}>
          {currentDay === 5 && <p className={style.TodayText}>today !</p>}

            <li className={getDayStyle(5)}>금</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'satur' } }}>
          {currentDay === 6 && <p className={style.TodayText}>today !</p>}

            <li className={getDayStyle(6)}>토</li>
          </Link>
          <Link href={{ pathname: '/daypage', query: { day: 'sun' } }}>
          {currentDay === 0 && <p className={style.TodayText}>today !</p>}
            <li className={getDayStyle(0)}>일</li>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
