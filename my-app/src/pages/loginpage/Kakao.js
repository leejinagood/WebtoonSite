import React, { useState ,useEffect} from "react";
import axios from "axios";
import style from "./styles/LoginCss.module.css";
import Link from 'next/link';
import { useRouter } from "next/router";
import { setCookie } from 'nookies';


const Kakao = () => {
    const router = useRouter();
    const { code } = router.query;
    console.log(code);

  const handleSetTokenCookie = (token) => {
    // 'token' 쿠키 설정
    setCookie(null, 'token', token, {
      maxAge: 60 * 60 * 24 * 3, // 3일 (초 단위)
      path: '/',               // 쿠키의 경로 설정
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.39.187.19:4000/api/Kakao?code=${code}`);
        const data = response.data;
        console.log(data);
        if (response.data.token) {
        const token = response.data.token;
        handleSetTokenCookie(token);
        window.location.href="/";
        }
        // 요일에 따라 setWeek 설정

      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    

    fetchData();

  }, [code]);

 

//   useEffect(() => {
//     if (code) {
//     const fetchData = async () => {

//     try {
//       const response = await axios.get(`/api/Kakao?code=${code}`);
//       if (response.data.token) {
//         const tokenPayload = {
//           token: response.data.token
//         };
//         const token = response.data.token;
//         console.log(response.data.token);
//         console.log("uE진입");
//         handleSetTokenCookie(response.data.token);



//         // 로그인 성공 처리
//         console.log("토큰:", token);
//         console.log("사용자 이름:", response.data.userName);
//         console.log("사용자 이메일:", response.data.userEmail);
//         console.log(tokenPayload.userName);
//         console.log(tokenPayload.userEmail);

//         // 토큰 저장
//         sessionStorage.setItem("token", token);

//         // 사용자 이름 저장
//         setUserName(response.data.userName);
//         setUserEmail(response.data.userEmail);
//         sessionStorage.setItem("userName", response.data.userName);
//         sessionStorage.setItem("userEmail", response.data.userEmail);
//         // 페이지 이동
//         Router.push("/");
//       } else {
//         // 로그인 실패 처리
//         console.log("로그인 실패" + ID + password +"토큰 :  "+response.data.token  + "유저네임 : " + userName + "유저이멜 :  " + userEmail );
//         alert("로그인 실패");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     fetchData();
//     }
// }
// }, [code]);

// console.log(token);

  

  
console.log(code);

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
        <form >
          <table>
            <tbody>
              <tr>
                <td className={style.INPUT}>
                  <input type="text" name="ID" id="ID"  placeholder="아이디를 입력하세요" />
                </td>
              </tr>
              <tr>
                <td className={style.INPUT}>
                  <input type="password" name="password" id="password"  placeholder="비밀번호를 입력하세요" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className={style.LoginPageBtn}>로그인</button>
          <button className={style.KLoginPageBtn}>
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

export default Kakao;
