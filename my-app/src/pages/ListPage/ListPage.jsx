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
  const [ep, setEp] = useState(1); // ep 값을 상태로 관리

  useEffect(() => {
    const { webtoonName } = router.query;

    if (webtoonName) {
      fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`)
        .then((response) => response.json())
        .then((data) => {
          const { webtoons, count } = data; // 카운터 값을 가져와서 상태에 설정
          setWebtoonInfo(webtoons[0]);
          setWebtoons(webtoons);
          setCount(count);
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

  const handleEpChange = (ep) => {
    setEp(ep); // ep 값 업데이트
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
                    좋아요 {webtoonInfo.like}
                  </button>
                  <button className="IBtn">첫화보기 1화</button>
                  <button className="SNSBTN">공유하기</button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ul className="List">
        {/* 카운터 값을 이용하여 리스트 아이템 렌더링 */}
        {Array.from({ length: webtoonInfo.count }).map((_, index) => (
          <li key={index}>
            <ListItem
              webtoonName={webtoonInfo.webtoon_name}
              ep={index + 1}
              uploadDate={webtoonInfo.Episode_Number}
              handleClick={handleEpChange} // 클릭 시 handleEpChange 함수 호출
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
