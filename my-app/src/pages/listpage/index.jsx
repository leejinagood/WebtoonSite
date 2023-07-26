import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/src/Header/header";
import ListPageCss from "./styles/ListPageCss.css";
import Footer from "@/src/Footer/footer";
import ListItem from "@/src/Component/ListItem";
import Head from "next/head";

const ListPage = () => {
  const [thumbnailIMG, setThumbnailIMG] = useState([]);
  const router = useRouter();
  const { EnName } = router.query;
  const [webtoonInfo, setWebtoonInfo] = useState(null);
  const [webtoons, setWebtoons] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listinfo?EnName=${encodeURIComponent(EnName)}`,{
          cache: 'no-store', // 캐시 사용 안 함
        });
        
        const { webtoonData } = await response.json(); // 데이터를 가져와서 변수에 저장
        setWebtoonInfo(webtoonData[0]);
        setLoading(false);
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

  
  //리스트아이템 
  const [webtoonItem, setWebtoonItem] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listitem?EnName=${encodeURIComponent(EnName)}`);
        const { webtoonData } = await response.json();
        setWebtoonItem(webtoonData);
        
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    if (EnName) {
      fetchData();
    } else {
      setWebtoonItem(null);
    }
  }, [EnName]);



  const handleItemClick = () => {
    handleClick(ep);
    window.location.href = `/webtoonpage?EnName=${EnName}&ep=${ep}}`;
  };

  if (!webtoonItem) {
    return "no data"; // 로딩 중이거나 데이터가 없을 때 null을 반환하여 아무 내용도 표시하지 않습니다.
  }
 






  const isTokenValid = () => {
    const token = getTokenFromLocalStorage();
    // 토큰이 존재하면 유효한 것으로 간주합니다.
    return !!token;
  };

  const handleLike = async () => {
    // 토큰이 있는 경우에만 userEmail 값을 가져오도록 합니다.
    const tokenExists = isTokenValid();
    
    if (tokenExists) {
      const userEmail = sessionStorage.getItem("userEmail");
      console.log(EnName, userEmail + "102line");
      
      // 세션에 좋아요를 누른 웹툰 정보를 저장합니다.
      // const likedWebtoons = JSON.parse(sessionStorage.getItem("likedWebtoons")) || [];
      
      // if (likedWebtoons.includes(EnName)) {
      //   window.alert("이미 좋아요를 누른 웹툰입니다 !");
      //   return; // 이미 좋아요를 누른 경우, 함수 종료
      // }
      
      try {
        const response = await fetch('/api/update_like', {
          method: 'PUT', // PUT 메서드로 변경
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            EnName: EnName,
            UserEmail: userEmail // userEmail 변수를 사용
          }),
        });
    
        if (response.ok) {
          // 좋아요가 성공적으로 추가되면 세션에 기록합니다.
          // sessionStorage.setItem("likedWebtoons", JSON.stringify(likedWebtoons));
    
          setWebtoonInfo((prevInfo) => ({
            ...prevInfo,
            like: prevInfo.like + 1 // 좋아요 개수 업데이트
          }));
          console.log("Like UP");
        } else {
          console.error('좋아요 추가 실패:', response);
          console.log("Like UP false");

        }
      } catch (error) {
        console.error('좋아요 추가 오류:', error);
      }
    } else {
      window.alert("로그인 후 이용 가능합니다 !");
    }
  };


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

  if(webtoonInfo.week == "mon"){
    KrDay = "월";
  }else if(webtoonInfo.week == "tues"){
    KrDay = "화";
  }else if(webtoonInfo.week == "wendes"){
    KrDay = "수";
  }else if(webtoonInfo.week == "thurs"){
    KrDay = "목";
  }else if(webtoonInfo.week == "fri"){
    KrDay = "금";
  }else if(webtoonInfo.week == "satur"){
    KrDay = "토";
  }else if(webtoonInfo.week == "sun"){
    KrDay = "일";
  }

  return (
    <div className="ListPage">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <meta name="name" content="#317EFB" />
      </Head>

      <Header />

      <div className="ListInfoBox">
        {webtoonInfo && (
          <div className="ListInfo">
            <div className="ListImgBox">
              <img
                src={webtoonInfo.thumbnail}
                alt={webtoonInfo.webtoon_name}
              />
            </div>
            
            <div className="ListInfo">
              <div className="TextBox">
                <>
                  <p id="line" className="tab2">
                    {webtoonInfo.webtoon_name}
                  </p>
                  <p id="line" className="GrayP">
                    글/그림<span>{webtoonInfo.author}</span> | {KrDay} 요웹툰
                    <br />
                    {webtoonInfo.content}
                    <div className="InfoBtn">
                      <button id="PointBtn" className="IBtn" onClick={handleLike}>
                        좋아요 {webtoonInfo.like}
                      </button>
                      <button className="IBtn">첫화보기 1화</button>
                      <button className="SNSBTN">공유하기</button>
                    </div>
                  </p>
                </>
              </div>
            </div>
          </div>
        )}
        
      </div>
      {!webtoonItem ? (
  <div>Loading...</div>
) : (
  <>
  <div className="ListBox">
    <div className="DESC">
      <span onClick={handleAscSort}>오름차순 /</span><span onClick={handleDescSort}> 내림차순</span>
    </div>
    <ul className="List">
      {webtoonInfo && Array.from({ length: webtoonInfo.count }).map((_, index) => (
        <li key={index}>
          <ListItem
            EnName={EnName}
            thumbnail = {webtoonItem[index]?.episode_thumbnail}
            webtoonName={webtoonItem[index]?.webtoon_name}
            ep={webtoonItem[index]?.episode_number}
            uploadDate={webtoonItem[index]?.update}
            handleClick={handleEpChange}
          />
        </li>
      ))}
    </ul>
    </div>
  </>
)}


      <div className="Pagination">
        
        <span className="Arrow">{"<"}</span>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <span className="arrow">{">"}</span>
      </div>

      <Footer />
    </div>
  );
};

export default ListPage;
