import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../src/Header/header";
import style from "./styles/ListPageCss.module.css";
import Footer from "../../src/Footer/footer";
import ListItem from "../../src/Component/listitem";
import Head from "next/head";
import Link from "next/link";
const ListPage = () => {
  const router = useRouter();
  const { EnName } = router.query;
  const [webtoonInfo, setWebtoonInfo] = useState({});
  const [webtoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ep, setEp] = useState(1);

  const [ascSort, setAscSort] = useState(false); // 오름차순 여부
  const [descSort, setDescSort] = useState(false); // 내림차순 여부



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
        const response = await fetch(`/api/listinfo?EnName=${encodeURIComponent(EnName)}`, {
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
        const response = await fetch(`/api/listitem?EnName=${encodeURIComponent(EnName)}`);
        const { webtoonData } = await response.json();
        setWebtoonItem(webtoonData);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLike = async () => {
    // 토큰이 있는 경우에만 userEmail 값을 가져오도록 합니다.
        const tokenExists = isTokenValid();

    const userEmail = sessionStorage.getItem("userEmail");
    console.log(userEmail,EnName);

      try {
        // 좋아요 요청을 서버에 보냅니다.
        const response = await fetch("/api/update_like", {
          method: "PUT", // PUT 메서드로 변경
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EnName: EnName,
            UserEmail: userEmail, // userEmail 변수를 사용
          }),
        });
        
        const data = await response.json(); // JSON 데이터를 받아옵니다.
        const likeCheck = data.change; // 좋아요 체크 결과를 변수에 저장합니다.
        console.log(likeCheck);
        console.log(data);

        if (likeCheck === 0) {
          // 좋아요가 성공적으로 추가되면 좋아요 개수를 업데이트합니다.
          setWebtoonInfo((prevInfo) => ({
            ...prevInfo,
            LikesCount: webtoonInfo.LikesCount + 1, // 현재 좋아요 개수에 1을 더해 업데이트
          }));
          console.log("Like UP");
          window.alert("좋아요 추가");
        } 
        else if (likeCheck === 1) {
          // 좋아요가 성공적으로 추가되면 좋아요 개수를 업데이트합니다.
          setWebtoonInfo((prevInfo) => ({
            ...prevInfo,
            LikesCount: webtoonInfo.LikesCount - 1, // 현재 좋아요 개수에 1을 더해 업데이트
          }));
          window.alert("좋아요 취소");

        }
          else {
          console.error("좋아요 추가 실패:", response);
          window.alert("로그인 후 이용 가능합니다 ");
        }
      } catch (error) {
        console.error("좋아요 추가 오류:", error);
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



  const handleAscSort = () => {
    if (!ascSort) {
      setAscSort(true);
      setDescSort(false);
      // webtoonItem을 오름차순으로 정렬
      setWebtoonItem((prevItems) => prevItems.slice().sort((a, b) => a.episode_number - b.episode_number));
    }
  };

  // 내림차순 정렬 버튼을 클릭했을 때
  const handleDescSort = () => {
    if (!descSort) {
      setDescSort(true);
      setAscSort(false);
      // webtoonItem을 내림차순으로 정렬
      setWebtoonItem((prevItems) => prevItems.slice().sort((a, b) => b.episode_number - a.episode_number));
    }
  };

  let KrDay = "";
  if (webtoonInfo && webtoonInfo.week) {
  if(webtoonInfo.week === "mon"){
    KrDay = "월";
  }else if(webtoonInfo.week === "tues"){
    KrDay = "화";
  }else if(webtoonInfo.week === "wendes"){
    KrDay = "수";
  }else if(webtoonInfo.week === "thurs"){
    KrDay = "목";
  }else if(webtoonInfo.week === "fri"){
    KrDay = "금";
  }else if(webtoonInfo.week === "satur"){
    KrDay = "토";
  }else if(webtoonInfo.week === "sun"){
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
        <meta name="theme-color" content="#317EFB" />
        <meta name="name" content="#317EFB" />
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
                  글/그림<span>{webtoonInfo.webtoonAuthor}</span> | {KrDay} 요웹툰

                    </p>
                    <p className={style.ConTent}>
                    {webtoonInfo.webtoonContent}
                    </p>

                </>
                
              </div>

                    <div className={style.InfoBtn}>
                      <button id={style.PointBtn} className={style.IBtn} onClick={handleLike}>
                        좋아요 {webtoonInfo.LikesCount}
                      </button>
                      <Link href={`/webtoonpage?EnName=${EnName}&ep=1`}><button className={style.IBtn}>첫화보기 1화</button></Link>
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
      <span onClick={handleAscSort}>오름차순 /</span><span onClick={handleDescSort}> 내림차순</span>
    </div>
  <div className={style.ListBox}>

    <ul className={style.List}>
      {webtoonInfo && Array.from({ length: webtoonInfo.episodeCount }).map((_, index) => (
        <li key={index}>
          <ListItem
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
            className={currentPage === index + 1 ? `${style.active}` : ""}
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
