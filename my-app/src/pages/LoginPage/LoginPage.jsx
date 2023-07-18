import React, { useState } from "react";
import axios from "axios";
import LoginCss from "./styles/LoginCss.css";
import Link from 'next/link';
import Router from "next/router";
import jwt from 'jsonwebtoken'; // jwt 라이브러리 import

const LoginPage = () => {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(""); // User_Name 값을 저장하는 상태

  const handleIDChange = (e) => {
    setID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/LoginPage", {
        params: {
          ID: ID,
          password: password
        }
      });

      if (response.data.token) {
        const tokenPayload = {
          User_Name: response.data.User_Name,
          User_Email: response.data.User_Email
        };
        console.log(tokenPayload.User_Name);
        console.log(tokenPayload.User_Email);

        const token = jwt.sign(tokenPayload, 'your-secret-key');

        // 로그인 성공 처리
        console.log("토큰:", token);
        console.log("사용자 이름:", response.data.User_Name);
        console.log("사용자 이메일:", response.data.User_Email);

        // 토큰 저장
        sessionStorage.setItem("token", token);

        // 사용자 이름 저장
        setUserName(response.data.User_Name);

        // 페이지 이동
        Router.push("/mainpage");
      } else {
        // 로그인 실패 처리
        console.log("로그인 실패");
        alert("로그인 실패");
      }
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
                <td>
                  <input type="text" name="ID" id="ID" value={ID} onChange={handleIDChange} placeholder="아이디를 입력하세요" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호를 입력하세요" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="LoginPageBtn">fh</button>
        </form>
        <div className="LoginMenu">
          <Link href="/password" ><li>비밀번호 찾기</li></Link>
          <Link href="/id"><li>아이디 찾기</li></Link>
          <Link href="/SignUpPage/SignUpPage"><li>회원가입</li></Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
