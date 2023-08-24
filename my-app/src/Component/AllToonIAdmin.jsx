import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "../styles/MainPageCss.module.css"
import styles from "./AdminAlltoon.module.css"

const AllToonIAdmin = () => {

  const [webtoons, setWebtoons] = useState([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {

      fetch("/api/adminWebtoon")
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
      }
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
  <div  id={styles.AB}  className={style.ATBox}>
          {/* <div className="addButtonContainer">
        <button className={style.addBtn} onClick={handleAddToon}>
          추가
        </button>
      </div> */}
      
    {webtoons.length > 0 && webtoons.map((webtoon, index) => (
      <div id={styles.ABI} className={style.AllToonInfo} key={index}>

          <div id={styles.ABimgbox} className={style.imgBox}>
          <img id={styles.ATIMG} src={webtoon.webtoonThumbnail} />
          <p id={styles.hoP}className={style.hoverP}><span className={style.leftWn}>{webtoon.webtoonName}</span><span className={style.rightAr}><span id={styles.likeeee} className={style.likee}>👍  {webtoon.totalLikes}  / </span> {webtoon.webtoonAuthor}</span></p>
          </div>

          <div id={styles.ATTEXT}className={style.ATtext}>
          <p className={style.AToonTitle}>{webtoon.webtoonName}</p>
          <p className={style.aTMT}> {webtoon.webtoonAuthor} </p>
          </div>
          <button className={styles.deleteButton} onClick={() => handleWebtoonDelete(webtoon.webtoonEnName)}>
            웹툰 삭제
          </button>
      </div>
    ))}


  </div>
);

  
};

const Thumbnail = ({ day }) => {
  return <img className="ATIMG" src={day.thumbnail} alt="" />;
};
export default AllToonIAdmin;
