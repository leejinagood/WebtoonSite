import React, { useState } from "react";
import axios from "axios";
import LoginCss from "./styles/LoginCss.css";
import Link from 'next/link';
import Router from "next/router";
import jwt from 'jsonwebtoken'; // jwt 라이브러리 import
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
  console.log(Kakao_Auth_Url.userName);
  

  const handleIDChange = (e) => {
    setID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/LoginPage`,{params: {
        ID: ID,
        password: password
      }
    });
      if (response.data.token) {
        const tokenPayload = {
          userName: response.data.userName,
          userEmail: response.data.userEmail
        };
        console.log(tokenPayload.userName);
        console.log(tokenPayload.userEmail);
        console.log(response.data.token);


        const token = jwt.sign(tokenPayload, 'your-secret-key');

        // 로그인 성공 처리
        console.log("토큰:", token);
        console.log("사용자 이름:", response.data.userName);
        console.log("사용자 이메일:", response.data.userEmail);
        console.log(tokenPayload.userName);
        console.log(tokenPayload.userEmail);


        // 토큰 저장
        sessionStorage.setItem("token", token);

        // 사용자 이름 저장
        setUserName(response.data.userName);
        setUserEmail(response.data.userEmail);
        sessionStorage.setItem("userName", tokenPayload.userName);
        sessionStorage.setItem("userEmail", tokenPayload.userEmail);

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


  const kakaohandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`);
      console.log(response.data); // 응답 내용 확인
  
      // 응답에서 토큰과 사용자 정보 추출
      const { token, userName, userEmail } = response.data;
      console.log("토큰:", token);
      console.log("사용자 이름:", userName);
      console.log("사용자 이메일:", userEmail);
  
      // 토큰 저장
      sessionStorage.setItem("token", token);
      // 사용자 이름 저장
      setUserName(userName);
      setUserEmail(userEmail);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("userEmail", userEmail);
      console.log(userName);
      // 페이지 이동
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <div className="LoginPage">
      <div className="LoginBox">
        <Link href="/mainpage">
          <h2 className="LoginLogo">AVATYE</h2>
        </Link>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td className="INPUT">
                  <input type="text" name="ID" id="ID" value={ID} onChange={handleIDChange} placeholder="아이디를 입력하세요" />
                </td>
              </tr>
              <tr>
                <td className="INPUT">
                  <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호를 입력하세요" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="LoginPageBtn">fh</button>
        </form>
        <button onClick={kakaohandleSubmit} >
            카카오 로그인
          </button>
        <div className="LoginMenu">
          <Link href="/password" ><li>비밀번호 찾기</li></Link>
          <Link href="/id"><li>아이디 찾기</li></Link>
          <Link href="/signuppage"><li>회원가입</li></Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
