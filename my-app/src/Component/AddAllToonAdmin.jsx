import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./addAdminAlltoon.module.css"

const addAllToonAdmin = () => {
  const [webtoons, setWebtoons] = useState([]);
  
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
      } else {
        console.log("웹툰 삭제 실패");
        // 웹툰 삭제 실패 처리
      }
    } catch (error) {
      console.log("API 호출 오류:", error);
      // 오류 처리
    }
  };
 
  

  
  
  // }  ? ? ? ? 

return (
  <div  id={styles.AB}  className={styles.ATBox}>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>작가</th>
          <th>요일</th>
          <th>좋아요</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
      {webtoons.length > 0 && webtoons.map((webtoon, index) => (
      <tr key={index}>
        <td>{webtoon.webtoonID}</td>
        <td>{webtoon.webtoonName}</td>
        <td>{webtoon.webtoonAuthor}</td>
        <td>{webtoon.webtoonWeek}</td>
        <td>{webtoon.totalLikes}</td>
        <td>
          <button onClick={() => handleWebtoonDelete(webtoon.webtoonEnName)}>
             삭제 </button>
        </td>
      </tr>
      ))}
      </tbody>

    </table>



  </div>
);

  
};

export default addAllToonAdmin;
