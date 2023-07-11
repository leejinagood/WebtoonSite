import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../Header/header";
import ListPageCss from "./styles/ListPageCss.css";
import Footer from "../Footer/footer";
import ListItem from "./ListItem";

const ListPage = () => {
  const router = useRouter();
  const [webtoonInfo, setWebtoonInfo] = useState(null);
  const [webtoons, setWebtoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

  useEffect(() => {
    const { webtoonName } = router.query;

    if (webtoonName) {
      fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`)
        .then((response) => response.json())
        .then((data) => {
          const { webtoons } = data;
          setWebtoonInfo(webtoons[0]);
          setWebtoons(webtoons);
        })
        .catch((error) => {
          console.error("Error fetching API:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.query.webtoonName]);

  const handleLike = () => {
    setLike((prevLike) => prevLike + 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 변경 시 현재 페이지 업데이트
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const webtoonsPerPage = 8;
  const totalWebtoons = webtoons.length;
  const totalPages = Math.ceil(totalWebtoons / webtoonsPerPage);

  const startWebtoonIndex = (currentPage - 1) * webtoonsPerPage;
  const endWebtoonIndex = currentPage * webtoonsPerPage;

  return (
    <div className="ListPage">
      <Header />

      <div className="ListInfoBox">
        <div className="ListInfo">
          <div className="ListImgBox">
            <img src="1.jpg" alt="썸네일" />
          </div>
          <div className="ListInfo">
            <div className="TextBox">
              <p id="line" className="tab2">
                {webtoonInfo.webtoon_name}
              </p>
              <p id="line" className="GrayP">
                글/그림<span>{webtoonInfo.author}</span> | {webtoonInfo.week} 요웹툰
                <br />
                {webtoonInfo.content}
                <div className="InfoBtn">
                  <button id="PointBtn" className="IBtn" onClick={handleLike}>
                    좋아요 {like}
                  </button>
                  <button className="IBtn">첫화보기 1화</button>
                  <button className="SNSBTN">공유하기</button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="List">
        {webtoons.slice(startWebtoonIndex, endWebtoonIndex).map((webtoon) => (
          <li key={webtoon.webtoon_name}>
            <ListItem webtoonName={webtoon.webtoon_name} uploadDate={webtoon.Episode_Number} />
          </li>
        ))}
      </div>

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
