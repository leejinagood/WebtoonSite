import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./addAdminAlltoon.module.css"

const addAllToonAdmin = () => {
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

 
  

  
  
  // }  ? ? ? ? 

return (
  <div  id={styles.AB}  className={styles.ATBox}>
          {/* <div className="addButtonContainer">
        <button className={style.addBtn} onClick={handleAddToon}>
          추가
        </button>
      </div> */}
      
    {webtoons.length > 0 && webtoons.map((webtoon, index) => (
      <div id={styles.ABI} className={styles.AllToonInfo} key={index}>

          <p id={styles.hoP}className={styles.hoverP}><span className={styles.leftWn}>{webtoon.webtoonName}</span><span className={styles.rightAr}><span className={styles.likee}>👍  {webtoon.totalLikes} / </span> {webtoon.webtoonAuthor} /{webtoon.webtoonWeek}  </span></p>



      </div>
    ))}


  </div>
);

  
};

export default addAllToonAdmin;
