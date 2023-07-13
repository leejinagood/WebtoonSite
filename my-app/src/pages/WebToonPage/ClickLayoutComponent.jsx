import React, { useState ,useEffect } from "react";
import ClickLayoutCss from "./styles/ClickLayoutCss.css";
import Link from 'next/link';
import { useRouter } from "next/router";
const ClickLayoutComponent = ({webtoonName,episodeNumber}) => {
  const router = useRouter();
  const [exists, setExists] = useState([null]);

  useEffect(() => {
    fetch(`/api/next_episode?Webtoon_Name=${webtoonName}&Episode_Number=${episodeNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const { exists } = data;
        setExists(exists);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, [webtoonName, episodeNumber]);


  console.log(webtoonName,episodeNumber)
  console.log(exists);


  const handleNextEpisode = () => {
    if (exists == 0) {
      console.log("다음화가 없음");
      // router.push({pathname: "about", query: {keyword: WebToonName}});
    }
    else if(exists ==1){
      const nextEp = episodeNumber + 1;
      console.log(episodeNumber,nextEp);
      router.push(`/WebToonPage/WebToonPage?webtoonName=${webtoonName}&episodeNumber=${nextEp}`);
    }
  };
  const handlePrevEpisode = () => {
    if (episodeNumber > 1) {

      const PrevEp = episodeNumber - 1;
      console.log(episodeNumber);
      router.push(`/WebToonPage/WebToonPage?webtoonName=${webtoonName}&episodeNumber=${PrevEp}`);
      // router.push({pathname: "about", query: {keyword: WebToonName}});
    }
    else {
      console.log("이전화가 없음");
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
                  {episodeNumber}화
                </p>
              </div>
            </div>
          </div>
          <div className="RigthLayout">
            <div className="RightLayoutItem">
              <div className="Ritem">
                <p>
                  <span className="BackEpisode"onClick={handlePrevEpisode} >&lt;이전화</span>
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
