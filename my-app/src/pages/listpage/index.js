import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../Header/header";
import style from "./styles/ListPageCss.module.css";
import Footer from "../../Footer/footer";
import ListItem from "../../Component/listitem";
import Head from "next/head";
import Link from "next/link";
import { parseCookies ,destroyCookie} from 'nookies'; // nookies 라이브러리 import
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리

const ListPage = () => {
  const router = useRouter();
  const { EnName,id } = router.query;
  const [webtoonInfo, setWebtoonInfo] = useState({});
  const [webtoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ep, setEp] = useState(1);

  const [ascSort, setAscSort] = useState(false); // 오름차순 여부
  const [descSort, setDescSort] = useState(false); // 내림차순 여부
  const getThemeColor = (enName) => {
    // EnName에 따라 원하는 테마 컬러를 반환하도록 설정합니다.
    //
    switch (enName) {
      case "daughter_mom_looks_just_like":
        return "rgb(231,59,40)"; 
      case "maruisdog":
        return "rgb(255,229,164)";
      case "girltrial":
        return "rgb(233,60,128)"; 
      case "honeymoondiary":
        return "rgb(171,230,157)"; 
      case "questsupremacy":
        return "rgb(161,245,254)"; 
      case "lookism":
        return "rgb(18,28,243)"; 
      case "monstercat":
        return "rgb(228,241,101)"; 
      case "GyeBaeksoon":
        return "rgb(187,181,169)"; 
      case "new":
        return "black";         
      default:
        return "rgb(171,230,157)"; // 기본 테마 컬러
    }
    
  };

  const getTokenFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("token");
    }
    return null;
  };


  const isTokenValid = () => {
    // 토큰 유효성을 검사하는 로직을 구현해야 함
    const token = getTokenFromLocalStorage();
    // 예시: 토큰이 있으면 유효하다고 가정
    return !!token;
  };
  
  
  //리스트아이템 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listinfo?ID=${id}`, {
          cache: 'no-store', // 캐시 사용 안 함
        });
        const { webtoonData } = await response.json(); // 데이터를 가져와서 변수에 저장
        setWebtoonInfo(webtoonData[0]);
        setLoading(false);
        console.log(webtoonData);
        console.log(webtoonInfo);

      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false);
      }
    };

    if (EnName) {
      fetchData();
    } else {
      setWebtoonInfo(null);
      setLoading(false);
    }
  }, [EnName]);
  const [webtoonItem, setWebtoonItem] = useState([]);

  // 리스트 아이템을 받아오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listitem?ID=${id}`);
        const { webtoonData } = await response.json();
        setWebtoonItem(webtoonData.reverse());

        console.log(webtoonData[0]);
        
        console.log(webtoonItem);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false);
      }
    };

    if (EnName) {
      fetchData();
    } else {
      setWebtoonItem(null);
    }
  }, [EnName]);

  const [like , setLike] =useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/likecount?id=${id}`);
        const data = await response.json(); // JSON 데이터를 받아옵니다.
        setLike(data.likecount);
        console.log(like);
        console.log(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false);
      }
    };

    if (EnName) {
      fetchData();
    } else {
      setWebtoonItem(null);
    }
  }, [EnName]);

  if (loading) {
    return <div>Loading...</div>;
  }
  let token;
  const handleLike = async () => {
    const cookies = parseCookies();
    token = cookies.token; // 쿠키에서 토큰 값을 'token' 변수에 할당합니다.



    if(token){
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      console.log(decodedToken.UserID,EnName);
      try {
        // 좋아요 요청을 서버에 보냅니다.
        console.log(decodedToken.UserID,EnName);

        const response = await fetch("/api/update_like", {
          method: "PUT", // PUT 메서드로 변경
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EnName: EnName,
            userID: decodedToken.UserID, // userEmail 변수를 사용
          }),

        });


              
        if (response.ok) {
          // 서버로부터 좋아요 갯수를 다시 받아와서 업데이트합니다.
          const likeResponse = await fetch(`/api/likecount?id=${id}`);
          const data = await likeResponse.json();
          setLike(data.likecount);
          console.log(like);
        }
      } 
      catch (error) {
        console.error("좋아요 추가 오류:", error);
      }

    }
    else{
      window.alert("로그인 후 이용 가능");
    }
}
  if (loading) {
    return <div>Loading...</div>;
  }


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEpChange = (ep) => {
    setEp(ep);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const webtoonsPerPage = 8;
  const totalWebtoons = webtoons.length;
  const totalPages = Math.ceil(totalWebtoons / webtoonsPerPage);



 

  // 내림차순 정렬 버튼을 클릭했을 때
  const handleAscSort = () => {
    if (!ascSort) {
      setAscSort(true);
      setDescSort(false);
      // webtoonItem을 오름차순으로 정렬
      setWebtoonItem((prevItems) =>
        prevItems.slice().sort((a, b) => a.episodeNumber - b.episodeNumber)
      );
    }
  };

  // 내림차순 정렬 버튼을 클릭했을 때
  const handleDescSort = () => {
    if (!descSort) {
      setDescSort(true);
      setAscSort(false);
      // webtoonItem을 내림차순으로 정렬
      setWebtoonItem((prevItems) =>
        prevItems.slice().sort((a, b) => b.episodeNumber - a.episodeNumber)
      );
    }
  };

  let KrDay = "";
  if (webtoonInfo && webtoonInfo.webtoonWeek) {
  if(webtoonInfo.webtoonWeek === "mon"){
    KrDay = "월";
  }else if(webtoonInfo.webtoonWeek === "tues"){
    KrDay = "화";
  }else if(webtoonInfo.webtoonWeek === "wendes"){
    KrDay = "수";
  }else if(webtoonInfo.webtoonWeek === "thurs"){
    KrDay = "목";
  }else if(webtoonInfo.webtoonWeek === "fri"){
    KrDay = "금";
  }else if(webtoonInfo.webtoonWeek === "satur"){
    KrDay = "토";
  }else if(webtoonInfo.webtoonWeek === "sun"){
    KrDay = "일";
  }else {
    // 웹툰 정보가 없거나 요일 정보가 없는 경우
    KrDay = "요일 정보 없음";
  }
  }
  


  return (
    <div className={style.ListPage}>
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content={getThemeColor(EnName)} />
    </Head>


      <Header />

      <div className={style.ListInfoBox}>
        {webtoonInfo && (
          <div className={style.ListInfo}>
            <div className={style.ListImgBox}>
              <img
                src={webtoonInfo.webtoonThumbnail}
                alt={webtoonInfo.webtoonName}
              />
            </div>
            
            <div className={style.ListInfot}>
              <div className={style.TextBox}>
                <>
                  <p id="line" className={style.tab2}>
                    {webtoonInfo.webtoonName}
                  </p>
                  <p id={style.line} className={style.GrayP}>
                  글/그림<span>{webtoonInfo.webtoonAuthor}</span> | {KrDay}요웹툰

                    </p>
                    <p className={style.ConTent}>
                    {webtoonInfo.webtoonContent}
                    </p>

                </>
                
              </div>

                    <div className={style.InfoBtn}>
                      <button id={style.PointBtn} className={style.IBtn} onClick={handleLike}> 
                        좋아요 {like}
                      </button>
                      <Link href={`/webtoonpage?EnName=${EnName}&ID=${id}&ep=1`}><button className={style.IBtn}>첫화보기 1화</button></Link>
                      <button className={style.SNSBTN}>공유<a className={style.short}>하기</a></button>
                    </div>
            </div>
          </div>
        )}
        
      </div>
      {!webtoonItem ? (
  <div>Loading...</div>
) : (
  
  <>
  <div className={style.DESC}>
      <span onClick={handleDescSort}>오름차순 /</span><span onClick={handleAscSort}> 내림차순</span>
    </div>
  <div className={style.ListBox}>

    <ul className={style.List}>
      {webtoonInfo && Array.from({ length: webtoonInfo.episodeCount }).map((_, index) => (
        <li key={index}>
          <ListItem
            ID={id}
            EnName={EnName}
            thumbnail = {webtoonItem[index]?.episodeThumbnail}
            webtoonName={webtoonItem[index]?.webtoonName}
            ep={webtoonItem[index]?.episodeNumber}
            uploadDate={webtoonItem[index]?.uploadDate}
            handleClick={handleEpChange}
          />
            
        </li>
      ))}
    </ul>
    </div>
  </>
)}


      <div className={style.Pagination}>
        
        <span className={style.Arrow}>{"<"}</span>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? style.active : ""}
            >
            {index + 1}
          </button>
        ))}
        <span className={style.arrow}>{">"}</span>
      </div>

      <Footer />
      <div className={style.dn}></div>
    </div>
  );
};

export default ListPage;
