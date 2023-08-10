import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import style from "./styles/Heder.module.css";
import { useRouter } from "next/router";
import { parseCookies ,destroyCookie} from 'nookies'; // nookies 라이브러리 import
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리

const Header = ({ showAdminLink }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // 클라이언트 사이드에서 실행되도록 설정
    setIsClient(true);
  }, []);


  // 유저가 검색창에 입력하는 값
  const [userInput, setUserInput] = useState('');
  const [user, setUser] = useState(""); // API 응답에서 가져온 유저 이름
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

  const [admin,setAdmin] = useState("");

  const handleLogout = () => {
    // 세션 스토리지에서 토큰 삭제
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    destroyCookie(null, "userEmail");
    destroyCookie(null, "userName");
    destroyCookie(null, "token");
    sessionStorage.removeItem("userName");

    console.log("토큰 유저네임 삭제");
    // userId와 userName 초기화
    setUser("login");
    // 페이지 이동
    router.push("/");
    window.location.reload(); // 페이지 리프레시

  };
  useEffect(() => {
    // 쿠키에서 토큰 값을 추출
    const cookies = document.cookie.split(';');
    let token = '';

    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            token = decodeURIComponent(value);
            break;
        }
    }

    if (token) {
        // JWT 토큰 디코딩하여 클레임 값을 추출
        const decodedToken = jwt_decode(token);
        setAdmin(decodedToken.UserEmail);
        // userEmail 클레임 값을 콘솔에 출력
        console.log(admin);
        console.log('userEmail:', decodedToken.UserEmail);
    }
}, []);
  useEffect(() => {
    // 쿠키에서 토큰 값을 추출
    if(!showAdminLink ){
    console.log(admin);
    if (admin === 'qkaejwnj%40naver.com' || admin === 'mnb2098%40naver.com') { // 수정: 이메일 주소에서 URL 인코딩된 문자 제거
      const addButton = document.createElement("button");
      addButton.className = style.addBtn;
      addButton.textContent = "adminPage";
      document.querySelector(".addButtonContainer").appendChild(addButton);
    }
  }
  }, [admin]);




  let token ; // Declare the 'token' variable here

  useEffect(() => {
    // 쿠키에 저장된 정보를 가져오기
    const cookies = parseCookies();
    token = cookies.token;

    if (cookies.token) {
      token = cookies.token; // 쿠키에서 토큰 값을 'token' 변수에 할당합니다.

      const decodedToken = jwt_decode(token);
      const userEmail = decodedToken.UserEmail;
      const userName = decodedToken.UserName;
      console.log(decodedToken);
      setUser(userName); // 상태 업데이트
    }
  }, []);

  useEffect(() => {
    // user 상태가 변경될 때마다 실행됩니다.
    console.log("user", user);
  }, [user]);



  function gogo(){
    window.location.href="https://comic.naver.com/webtoon";
  }
  console.log(user);
  return (
    
    <div className={style.HederBox}>

      <div className={style.header}>
        <div className={style.TopHeader}>
        <link rel="manifest" href="/manifest.json" />
          <div className={style.LogoBox}>
        <Link href="/">
            <h1 className={style.Logo}><span className={style.Color}>A</span>VA<span className={style.Color}>T</span>OON</h1>
            </Link>
            <span className={style.Color} id={style.go} onClick={gogo}>Go</span>
          </div>

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
                    {user ? (
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
    {[
      { day: 'All', text: '전체요일', index: -1 },
      { day: 'mon', text: '월', index: 1 },
      { day: 'tues', text: '화', index: 2 },
      { day: 'wendes', text: '수', index: 3 },
      { day: 'thurs', text: '목', index: 4 },
      { day: 'fri', text: '금', index: 5 },
      { day: 'satur', text: '토', index: 6 },
      { day: 'sun', text: '일', index: 0 },
    ].map(({ day, text, index }) => (
      <Link key={index} href={{ pathname: `/daypage`, query: { day } }}>
        {currentDay === index && <p className={style.TodayText}>today !</p>}
        <li
          className={`${getDayStyle(index)} ${day === 'All' ? style.AD : ''}`}
        >{text}</li>      </Link>
    ))}
  </div>
</div>

      <Link href="/adminpage"><div className="addButtonContainer"></div> {/* 버튼을 추가할 컨테이너 */}</Link>

    </div>
  );
};

export default Header;
