import Header from "@/src/Header/header";
import React, { useState ,useEffect} from "react";
import style from "./style/adminpageCss.module.css";
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리
import { parseCookies ,destroyCookie} from 'nookies'; // nookies 라이브러리 import
import { useRouter } from 'next/router';
import axios from 'axios'; // 이미 import 문이 사용되었을 것으로 가정
import Link from "next/link";
const episodeDelete = () => {
  const router = useRouter();
  const [EwebtoonEnName, setEwebtoonEnName] = useState(""); // 웹툰 아이디를 저장할 상태 변수

  // const [webtoonId, setWebtoonId] = useState(""); // 웹툰 아이디를 저장할 상태 변수
  // const [episodeId, setEpisodeId] = useState(""); // 웹툰 아이디를 저장할 상태 변수
  const [ep, setEp] = useState(""); // 웹툰 아이디를 저장할 상태 변수

  const [webtoonData, setWebtoonData] = useState([]); // Add this state variable

  const isAdminPage = true; // 어드민 페이지 여부를 true 또는 false로 설정

  const [admin,setAdmin] = useState("");
  let token = "";
  useEffect(() => {

    fetch("/api/adminWebtoon")
    .then((response) => response.json())
  .then((data) => {
    setWebtoonData(data); // Store the fetched data in the state



  })
  .catch((error) => {
    console.error("Error fetching API:", error);
  });
},[])

const findWebtoonTitleById = (EnName) => {
  if (EnName === null) {
    return <span style={{ color: 'gray' }}>입력된 영어제목이 없습니다</span>;
  }
  const webtoon = webtoonData.find((item) => item.webtoonEnName === EnName);
  if (webtoon) {
    return <span style={{ color: 'rgb(131,220,117)' }}>{webtoon.webtoonName}</span>;
  } else {
    return <span style={{ color: 'red' }}>웹툰을 찾을 수 없음</span>;
  }
};





  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token; // 실제 JWT 토큰 쿠키 이름으로 대체해주세요
      if (token) {
        const decodedToken = jwt_decode(token);
        setAdmin(decodedToken.UserEmail); 
        console.log(decodedToken.UserEmail);
        console.log(admin);
  
        if (decodedToken.UserEmail !== "qkaejwnj%40naver.com" 
        && decodedToken.UserEmail !== "mnb2098%40naver.com"
        && decodedToken.UserEmail !== "admin") {
          window.alert("접근불가");
          router.push('/'); // 다른 페이지로 리다이렉트
        }
      }
      else{
        window.alert("접근불가");
        router.push('/'); // 다른 페이지로 리다이렉트
      }
    }, []);
  








  




  const handleEpisodeDelete = async () => {
    event.preventDefault(); // 이벤트의 기본 동작을 막음

    const errors=[]


    if(!EwebtoonEnName){
      errors.push("에피소드를 삭제할 웹툰 영어이름을 입력하세요");
    }

    const webtoonToDelete = webtoonData.find(
      (webtoon) => webtoon.webtoonEnName === EwebtoonEnName
    );



    if(!webtoonToDelete){
      errors.push("해당 웹툰은 존재하지 않습니다");
    }
    if(!ep){
      errors.push("ep를 입력하세요");
    }
    if(errors.length>0){
      console.error("에러 발생:", errors);
      window.alert(errors);
      return; // 에러가 있으면 함수 종료
    }
    else{
    try {
      const response = await fetch("/api/episodeDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EnName: EwebtoonEnName, // 웹툰 아이디 전달
          ep: ep, // 삭제할 에피소드 번호 전달
        }),
      });

      if (response.ok) {
        console.log("에피소드 삭제 성공");
        window.alert("에피소드가 삭제되었습니다.");
        // 에피소드 삭제 성공 후 필요한 동작 수행
      } else {
        console.error("에피소드 삭제 실패");
        window.alert("없는 웹툰 에피소드 입니다");
                // 에피소드 삭제 실패 처리
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 오류 처리
    }
  }

  };



// 핸들 펀션 스테이트 하나로 줄이기
// 쪼개기 메뉴로
// 웹툰 목록 체크박스로 지우듯이
  return (
    <div className={style.adminpage}>

      <Header showAdminLink={isAdminPage} />
          <nav className={style.Nav}>
            <ul>
            <li>
                <Link href="/adminpage">웹툰 등록</Link>
              </li>
              <li>
                <Link href="/adminpage/episodeAdd">에피소드 등록</Link>
              </li>
              <li >
                <Link href="/adminpage/webtoonDelete">웹툰 삭제</Link>
              </li>
              <li  className={style.choise}>
                <Link href="/adminpage/episodeDelete">에피소드 삭제</Link>
              </li>
          </ul>
      </nav>
      
      {admin === "qkaejwnj%40naver.com" ||
      admin === "mnb2098%40naver.com" ||
      admin === "admin" ? (
          
      <form>
                <div className={style.newWebtoon}>
       
            <h2 id={style.top}>웹툰 회차 삭제</h2>

          {/* 웹툰 회차  삭제 */}
          <input
              type="text"
              placeholder="에피소드를 삭제할 웹툰 영어이름"
              value={EwebtoonEnName}
              onChange={(e) => setEwebtoonEnName(e.target.value)}
            />
        <p className={style.deleteP}>웹툰 제목: {findWebtoonTitleById(EwebtoonEnName !== "" ? EwebtoonEnName : null)}</p>

            <input
              type="number"
              placeholder="삭제할 에피소드"
              value={ep}
              onChange={(e) => setEp(e.target.value)}
            />
            <button className={style.bottomm}id={style.uploadBtn} onClick={handleEpisodeDelete}>선택한 웹툰 회차 삭제</button>
        </div>

      </form>
            ) : (
              <p className={style.accessDenied} >접근 불가</p>
              )}
    </div>
  );
};

export default episodeDelete;
