import Header from "@/src/Header/header";
import React, { useState ,useEffect} from "react";
import style from "./style/adminpageCss.module.css";
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리
import { parseCookies } from 'nookies'; // nookies 라이브러리 import
import { useRouter } from 'next/router';
import Link from "next/link";
import AllToonIAdmin from "../../Component/AllToonIAdmin";
const webtoonDelete = () => {
  const router = useRouter();
  const isAdminPage = true; // 어드민 페이지 여부를 true 또는 false로 설정
  // const [webtoonData, setWebtoonData] = useState([]); // Add this state variable
  const [admin,setAdmin] = useState("");
  // let token = "";
  // useEffect(() => {

  // fetch("/api/daytoon?day=All")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setWebtoonData(data); // Store the fetched data in the state
  // })
  // .catch((error) => {
  //   console.error("Error fetching API:", error);
  // });
  // },[])

// const findWebtoonTitleById = (EnName) => {
//   if (EnName === null) {
//     return <span style={{ color: 'gray' }}>입력된 영어제목이 없습니다</span>;
//   }
//   const webtoon = webtoonData.find((item) => item.webtoonEnName === EnName);
//   if (webtoon) {
//     return <span style={{ color: 'rgb(131,220,117)' }}>{webtoon.webtoonName}</span>;
//   } else {
//     return <span style={{ color: 'red' }}>웹툰을 찾을 수 없음</span>;
//   }
// };





  // useEffect(() => {
  //   const cookies = parseCookies();
  //   const token = cookies.token; // 실제 JWT 토큰 쿠키 이름으로 대체해주세요
  //     if (token) {
  //       const decodedToken = jwt_decode(token);
  //       setAdmin(decodedToken.UserEmail); 
  //       console.log(decodedToken.UserEmail);
  //       console.log(admin);
  
  //       if (decodedToken.UserEmail !== "qkaejwnj%40naver.com" 
  //       && decodedToken.UserEmail !== "mnb2098%40naver.com"
  //       &&decodedToken.UserEmail !== "admin" ) {
  //         window.alert("접근불가");
  //         router.push('/'); // 다른 페이지로 리다이렉트
  //       }
  //     }
  //     else{
  //       window.alert("접근불가");
  //       router.push('/'); // 다른 페이지로 리다이렉트
  //     }
  // }, []);
  
// 핸들 펀션 스테이트 하나로 줄이기
// 쪼개기 메뉴로
// 웹툰 목록 체크박스로 지우듯이
  return (
    <div className={style.adminpage}>
      <Header showAdminLink={isAdminPage} />
        <nav className={style.Nav}>
          <ul>
            <li>
            <Link href="/adminpage">웹툰 등록 / 삭제</Link>
            </li>
            <li>
              <Link href="/adminpage/episodeAddDelete">에피소드 등록 / 삭제</Link>
            </li>
            <li  className={style.choise}>
              <Link href="/adminpage/webtoonDelete">웹툰 삭제</Link>
            </li>
          </ul>
        </nav>
      
      {admin === "qkaejwnj%40naver.com" ||
      admin === "mnb2098%40naver.com" || admin === "admin"
      || admin === "" ? (
          
      <form>
        <h2 id={style.dT}>웹툰 전체 삭제</h2>
        <AllToonIAdmin></AllToonIAdmin>
      </form>
            ) : (
              <p className={style.accessDenied} >접근 불가</p>
              )}
    </div>
  );
};

export default webtoonDelete;

