import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/src/Header/header";
import ListPageCss from "./styles/ListPageCss.css";
import Footer from "@/src/Footer/footer";
import ListItem from "@/src/Component/ListItem";
import Head from "next/head";

const ListPage = () => {
  const [thumbnailIMG,setThumbnailIMG] =useState([]);
  const router = useRouter();
  const { webtoon_en_name } = router.query;
  const [webtoonInfo, setWebtoonInfo] = useState(null);
  const [webtoons, setWebtoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [ep, setEp] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listinfo?webtoon_ed_name=${encodeURIComponent(webtoon_en_name)}`);
        const data = await response.json();
        const { webtoons } = data;
        setWebtoonInfo(webtoons[0]);
        setWebtoons(webtoons);
        setTotalCount(webtoons.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false);
      }
    };

    if (webtoon_en_name) {
      fetchData();
    } else {
      setWebtoonInfo(null);
      setWebtoons([]);
      setTotalCount(0);
      setLoading(false);
    }
  }, [webtoon_en_name]);

  const getThumbnailImage = async (webtoon_en_name) => {
    try {
      const response = await fetch(`/api/thumbnail?webtoonName=${encodeURIComponent(webtoon_en_name)}`);
      const data = await response.json();
      
      const thumbnail = data.rows[0]?.[0]?.Webtoon_Thumbnail;
      return thumbnail || "";
    } catch (error) {
      console.error("Error fetching API:", error);
      return "";
    }
  };


  const handleLike = () => {
    setWebtoonInfo((prevInfo) => ({
      ...prevInfo,
      like: prevInfo.like + 1
    }));
  };

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

  return (
    <div className="ListPage">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <meta name="name" content="#317EFB" />
      </Head>

      <Header />

      <div className="ListInfoBox">
        <div className="ListInfo">
        <div className="ListImgBox">
  {webtoonInfo && (
    <img
      src=""
      alt={webtoonInfo.webtoon_name}
      ref={async (imgRef) => {
        if (imgRef) {
          try {
            const thumbnail = await getThumbnailImage(webtoonInfo.webtoon_name);
            imgRef.src = thumbnail || ""; // 이미지 주소를 할당합니다.
          } catch (error) {
            console.error("Error loading thumbnail:", error);
          }
        }
      }}
    />
  )}
</div>

          <div className="ListInfo">
            <div className="TextBox">
              {webtoonInfo && (
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
              )}
            </div>
          </div>
        </div>
      </div>

      <ul className="List">
        {webtoonInfo &&
          Array.from({ length: webtoonInfo.count }).map((_, index) => (
            <li key={index}>
              <ListItem
                webtoonName={webtoonInfo.webtoon_name}
                ep={index + 1}
                uploadDate={webtoonInfo.upload_date}
                handleClick={handleEpChange}
              />
            </li>
          ))}
      </ul>

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
