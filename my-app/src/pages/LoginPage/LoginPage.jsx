import React, { useState } from "react";
import axios from "axios";
import LoginCss from "./styles/LoginCss.css";
import Link from 'next/link';
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

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
      //응답이 null이면
      if (response.data === "") {
        console.log(response.data);
        alert("로그인 실패");
      } //응답이 아이디가 없다면  
      else if((response.data === '아이디가 없습니다')){
        console.log(response.data);
        alert("로그인 실패");
      } // 로그인 성공 이후 이벤트
      else {
        console.log(response.data);
        alert("로그인 성공");

        // 로그인 성공 시 토큰 저장
        // localStorage에 저장하지만 추후 수정 필요 !!
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        router.push("/");;
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
          <button type="submit" className="LoginPageBtn">로그인</button> 
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
