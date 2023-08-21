import React, { useState ,useEffect} from "react";
import axios from "axios";
import style from "./styles/LoginCss.module.css";
import Link from 'next/link';
import Router from "next/router";
import {REDIRECT_URL} from "/src/OAuth.js";
import {Kakao_Auth_Url} from "/src/OAuth.js";
import {CLIENT_ID} from "/src/OAuth.js";


const LoginPage = () => {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(""); // User_Name 값을 저장하는 상태
  const [userEmail, setUserEmail] = useState(""); // User_Name 값을 저장하는 상태
  console.log(REDIRECT_URL);
  console.log(Kakao_Auth_Url);
  

  const handleIDChange = (e) => {
    setID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  useEffect(() => {
    console.log(document.cookie);
    const getCookies = () => {
      const cookieString = document.cookie;
      const cookies = {};
  
      cookieString.split(';').forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        cookies[key] = decodeURIComponent(value);
      });
  
      return cookies;
    };
  }, []);
  


  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.get(`http://107.23.243.5:4000/api/LoginPage`,{params: {
        ID: ID,
        password: password
      },
      withCredentials: true // 쿠키 포함 설정
    });
      if (response.data.token) {
        const tokenPayload = {
          userName: response.data.userName,
          userEmail: response.data.userEmail
        };
        console.log(tokenPayload.userName);
        console.log(tokenPayload.userEmail);
        console.log(response.data.token);


        const token = response.data.token;

        // 로그인 성공 처리
        console.log("토큰:", token);
        console.log("사용자 이름:", response.data.userName);
        console.log("사용자 이메일:", response.data.userEmail);
        console.log(tokenPayload.userName);
        console.log(tokenPayload.userEmail);
        setCookie('ㅇㅇ',token,1);

        // 토큰 저장
        sessionStorage.setItem("token", token);

        // 사용자 이름 저장
        setUserName(response.data.userName);
        setUserEmail(response.data.userEmail);
        sessionStorage.setItem("userName", response.data.userName);
        sessionStorage.setItem("userEmail", response.data.userEmail);
        // 페이지 이동
        Router.push("/");
      } else {
        // 로그인 실패 처리
        console.log("로그인 실패" + ID + password +"토큰 :  "+response.data.token  + "유저네임 : " + userName + "유저이멜 :  " + userEmail );
        alert("로그인 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

  const kakaohandleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 카카오 인가 URL로 리다이렉트
      window.location.href = Kakao_Auth_Url;
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); 

    if (token) {
      const redirectUrl = `https://main.d9cidza1ul6q9.amplifyapp.com`;
      window.location.href = redirectUrl; // 리다이렉트 수행
      console.log(token);
    }
  }, []);
  

  
  useEffect(() => {
    // 쿠키에 저장된 정보를 가져오기
    const userEmail = getCookie("userEmail");
    const userName = getCookie("userName");
    const token = getCookie("token");
  
    if (userEmail && userName && token) {
      // 쿠키에 저장된 정보가 있을 경우, 해당 정보를 상태에 저장
      setUserEmail(userEmail);
      setUserName(userName);
      sessionStorage.setItem("userEmail", userEmail);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("token", token);
    }
  }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  }


  return (
    <div className={style.LoginPage}>
      <div className={style.LoginBox}>
        <Link href="/">
          <h2 className={style.LoginLogo}><span className={style.red}>A</span >VA<span className={style.red}>T</span>YE</h2>
        </Link>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td className={style.INPUT}>
                  <input type="text" name="ID" id="ID" value={ID} onChange={handleIDChange} placeholder="아이디를 입력하세요" />
                </td>
              </tr>
              <tr>
                <td className={style.INPUT}>
                  <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호를 입력하세요" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className={style.LoginPageBtn}>로그인</button>
          <button className={style.KLoginPageBtn} onClick={kakaohandleSubmit}>
          카카오로 시작하기
        </button>
        </form>

        <div className={style.LoginMenu}>
          <Link href="/password" ><li>비밀번호 찾기</li></Link>
          <Link href="/id"><li>아이디 찾기</li></Link>
          <Link href="/signuppage"><li>회원가입</li></Link>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
