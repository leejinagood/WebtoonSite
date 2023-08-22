import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./addAdminAlltoon.module.css"

const addAllToonAdmin = () => {
  const [webtoons, setWebtoons] = useState([]);
  const [sortType, setSortType] = useState("asc"); // 기본 오름차순
  const [sortColumn, setSortColumn] = useState(""); // 정렬된 열의 정보
  const [searchKeyword, setSearchKeyword] = useState(""); // 추가: 검색어 상태


  const highlightSearch = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span
          key={index}
          className={styles.highlight} // 추가: 하이라이팅 클래스 적용
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const sortWebtoons = (a, b) => {
    if (sortColumn === "webtoonID") {
      return sortType === "asc" ? a.webtoonID - b.webtoonID : b.webtoonID - a.webtoonID;
    } else if (sortColumn === "totalLikes") {
      return sortType === "asc" ? a.totalLikes - b.totalLikes : b.totalLikes - a.totalLikes;
    }
    return 0;
  };
  
  
    const toggleSortType = (column) => {
      if (sortColumn === column) {
        setSortType(sortType === "asc" ? "desc" : "asc");
      } else {
        setSortType("asc");
      }
      setSortColumn(column);
    };

  // }  ? ? ? ? 
  const sortedWebtoons = [...webtoons].sort(sortWebtoons);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/adminWebtoon");
        const data = await response.json();
        setWebtoons(data);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, []);

  

  console.log(webtoons);
  const handleWebtoonDelete = async (enName) => {

    const WebtoonDelete = prompt(`삭제하려면 "삭제"를 입력하세요`, "");

    if (WebtoonDelete === "삭제"){
      try {
      // 삭제 요청 보내는 로직 추가 (axios 또는 fetch 사용)
      const response = await fetch("/api/webtoonDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EnName: enName, // 클릭한 웹툰의 영어 이름 전달
        }),
      });
  
      if (response.ok) {
        console.log("웹툰 삭제 성공");
        window.alert("웹툰 삭제 성공");
        // 웹툰 삭제 성공 후 필요한 동작 수행
      }
       else {
        console.log("웹툰 삭제 실패");
        // 웹툰 삭제 실패 처리
      }
      } catch (error) {
        console.log("API 호출 오류:", error);
        // 오류 처리
      }
    }
    else{
      window.alert("삭제하지 않습니다");
    }
    
  };
 
  

  
  
  // }  ? ? ? ? 

return (
  <div  id={styles.AB}  className={styles.ATBox}>
    <input className={styles.seach}
      type="text"
      value={searchKeyword}
      onChange={handleSearchInputChange}
      placeholder="검색어를 입력하세요"
    />
    <table>
      <thead>
        <tr>
          <th>
            ID{" "}
            <span
              className={styles.asc}
              onClick={() => toggleSortType("webtoonID")}
            >
            {sortColumn === "webtoonID" && sortType === "asc" ? "▼" : "▴"}
            </span>
          </th>
          <th>제목</th>
          <th>작가</th>
          <th>요일</th>
          <th>좋아요 
            <span className={styles.asc} onClick={() => toggleSortType("totalLikes")}>
            {sortColumn === "totalLikes" && sortType === "asc" ? "▴" : "▼"} 
            </span>
          </th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody >
        {sortedWebtoons.map((webtoon, index) => (
          <tr
          key={index}
          style={{
          backgroundColor:
          searchKeyword &&
          (webtoon.webtoonID.toString().includes(searchKeyword) ||
          webtoon.webtoonName.includes(searchKeyword) ||
          webtoon.webtoonAuthor.includes(searchKeyword) ||
          webtoon.webtoonWeek.includes(searchKeyword) ||
          webtoon.totalLikes.toString().includes(searchKeyword))
          ? "yellow"
          : "transparent",
        }}
>


            <td>{highlightSearch(webtoon.webtoonID.toString(), searchKeyword)}</td>
            <td >{highlightSearch(webtoon.webtoonName, searchKeyword)}</td>
            <td>{highlightSearch(webtoon.webtoonAuthor, searchKeyword)}</td>
            <td>{highlightSearch(webtoon.webtoonWeek, searchKeyword)}</td>
            <td>{highlightSearch(webtoon.totalLikes.toString(), searchKeyword)}</td>
            <td>
              <button className={styles.dbtn} onClick={() => handleWebtoonDelete(webtoon.webtoonEnName)}>
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>



  </div>
);

  
};

export default addAllToonAdmin;
