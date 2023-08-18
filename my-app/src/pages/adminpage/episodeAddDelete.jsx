import Header from "@/src/Header/header";
import React, { useState ,useEffect} from "react";
import style from "./style/adminpageCss.module.css";
import styles from "./style/addEpList.module.css";
import AdminList from "../../Component/AdminList";
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리
import { parseCookies ,destroyCookie} from 'nookies'; // nookies 라이브러리 import
import { useRouter } from 'next/router';
import axios from 'axios'; // 이미 import 문이 사용되었을 것으로 가정
import Link from "next/link";
const episodeAdd = () => {
  const router = useRouter();
  const [id, setId] = useState("");

  // const [webtoonId, setWebtoonId] = useState(""); // 웹툰 아이디를 저장할 상태 변수
  // const [episodeId, setEpisodeId] = useState(""); // 웹툰 아이디를 저장할 상태 변수

  const [epEnName, setEpEnName] = useState(""); // 웹툰 영문 제목을 저장

  const [count, setCount] = useState(""); // 초기값을 0으로 설정
  const [thumbnailPath, setThumbnailPath] = useState(""); // 초기값은 빈 문자열
  const [episode, setEpisode] = useState(""); // 에피소드 입력 상태
  const [webtoonData, setWebtoonData] = useState([]); // Add this state variable
  const [selectedWebtoonId, setSelectedWebtoonId] = useState(null);
  const [selectedWebtoonEnName, setSelectedWebtoonEnName] = useState(null);


  const [admin,setAdmin] = useState("");
  let token = "";
  useEffect(() => {
    // Fetch webtoon data and set initial selected values
    fetch("/api/adminWebtoon")
      .then((response) => response.json())
      .then((data) => {
        setWebtoonData(data);
        setSelectedWebtoonId(data[0]?.webtoonID);
        setSelectedWebtoonEnName(data[0]?.webtoonEnName);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, []);
  
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

const handleWebtoonClick = (enName, id) => {
    setSelectedWebtoonEnName(enName);
    setSelectedWebtoonId(id);
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
        && decodedToken.UserEmail !== "admin" ) {
          window.alert("접근불가");
          router.push('/'); // 다른 페이지로 리다이렉트
        }
      }
      else{
        window.alert("접근불가");
        router.push('/'); // 다른 페이지로 리다이렉트
      }
    }, []);
  




  const isAdminPage = true; // 어드민 페이지 여부를 true 또는 false로 설정





   


  
  



  







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
              <li  className={style.choise}>
              <Link href="/adminpage/episodeAddDelete">에피소드 등록 / 삭제</Link>
              </li>
              <li>
                <Link href="/adminpage/webtoonDelete">웹툰 삭제</Link>
              </li>

          </ul>
      </nav>
      
      {admin === "qkaejwnj%40naver.com" ||
      admin === "mnb2098%40naver.com" || admin === "admin"? (
      <form>


        <div className={style.newWebtoon}>
        <ul className={styles.wbox}>
  {webtoonData.map((webtoon) => (
    <li
      key={webtoon.webtoonID}
      className={`${styles.border} ${selectedWebtoonId === webtoon.webtoonID ? style.selected : ''}`}
      onClick={() => handleWebtoonClick(webtoon.webtoonEnName, webtoon.webtoonID)}
      style={{ cursor: "pointer" }}
    >
      <span>
        {webtoon.webtoonName} / {webtoon.webtoonAuthor}
      </span>
    </li>
  ))}
</ul>

  {webtoonData.map((webtoon) => (
    <div className={styles.addEpList} key={webtoon.webtoonID}>
      <div className={styles.AdminList}>
        {selectedWebtoonId === webtoon.webtoonID && (
          <AdminList EnName={selectedWebtoonEnName} id={selectedWebtoonId}/>
        )}
      </div>
    </div>
  ))}
</div>


 



      </form>
            ) : (
              <p className={style.accessDenied} >접근 불가</p>
              )}
    </div>
  );
};

export default episodeAdd;
