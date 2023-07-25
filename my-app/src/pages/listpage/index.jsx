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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listinfo?EnName=${encodeURIComponent(EnName)}`);
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
  console.log(webtoonItem);
  console.log(webtoonItem.episode_number);
  console.log(webtoonItem.episode_number);
  console.log(webtoonItem.episode_thumbnail);
  console.log(webtoonItem.webtoon_name);






  const handleLike = () => {
    setWebtoonInfo((prevInfo) => ({
      ...prevInfo,
      like: prevInfo.like + 1
    }));
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
                    글/그림<span>{webtoonInfo.author}</span> | {webtoonInfo.week} 요웹툰
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
