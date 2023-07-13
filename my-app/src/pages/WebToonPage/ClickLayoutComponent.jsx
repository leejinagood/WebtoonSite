import React, { useState ,useEffect } from "react";
import ClickLayoutCss from "./styles/ClickLayoutCss.css";
import Link from 'next/link';
import { useRouter } from "next/router";
const ClickLayoutComponent = ({ep}) => {
  const router = useRouter();
  const { id } = router.query;
  // const [exists, setExists] = useState([]);


    // fetch(`/api/api/next_episode?Webtoon_Name=${webtoonName}&Episode_Number=${episodeNumber}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setWebtoons(data.webtoons);
    //     const selectedWebtoon = data.webtoons.find((webtoon) => webtoon.id === webtoonId);
    //     setSelectedWebtoon(selectedWebtoon);

    //     const fetchWebtoonDetail = async () => {
    //       try {
    //         const response = await fetch(`/api/webtoondetail?name=${encodeURIComponent(selectedWebtoonName)}`);
    //         const data = await response.json();
    //         const { exists } = data;
    //         const selectedWebtoon = webtoons[0];
    //         setExists(exists);
    //       } catch (error) {
    //         console.error("Error fetching API:", error);
    //       }
    //     };

      //   if (selectedWebtoon) {
      //     setSelectedWebtoonName(selectedWebtoon.webtoon_name);
      //     fetchWebtoonDetail();
      //   }
      // })
      // .catch((error) => {
      //   console.error("Error fetching API:", error);
      // });
  


  const handleNextEpisode = () => {
    const webtoonNameStartIdx = queryString.indexOf("Webtoon_Name=") + 13; // "Webtoon_Name=" 다음 인덱스
    const webtoonNameEndIdx = queryString.indexOf("&");
    const webtoonName = webtoonNameEndIdx !== -1 ? queryString.slice(webtoonNameStartIdx, webtoonNameEndIdx):"";
  
    const episodeNumberStartIdx = queryString.indexOf("Episode_Number=") + 15; // "Episode_Number=" 다음 인덱스
    const episodeNumber = queryString.slice(episodeNumberStartIdx);
  
    if (exists == 1) {
      const nextEp = episodeNumber + 1;
      router.push({pathname: "about", query: {keyword: webtoonName}});
      // router.push({ path: '/', query: { Webtoon_Name: `${webtoonName}` }})    } else {
      // window.alert("마지막 화입니다."); // 오류 메시지 출력
    }
    else{
      console.log({webtoonName});
      router.push({pathname: "about", query: {keyword: `${webtoonName}`}});
    }
  };

  return (
    <div className="ClickLayout">
      <div className="LayoutContent">
        <div className="Layout">
          <div className="LeftLayout">
            <div className="LeftLayoutItem">
              <div className="Litem">
                <p>
                  <Link href="./"><span className="back">&lt;</span></Link>
                  {ep}화
                </p>
              </div>
            </div>
          </div>
          <div className="RigthLayout">
            <div className="RightLayoutItem">
              <div className="Ritem">
                <p>
                  <span className="BackEpisode" onClick={handleNextEpisode}>&lt;이전화</span>
                  <Link href="../"><span>목록</span></Link>
                  <span className="NextEpisode" onClick={handleNextEpisode}>다음화&gt;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClickLayoutComponent;
