import React, { useState ,useEffect } from "react";
import ClickLayoutCss from "./styles/ClickLayoutCss.css";
import Link from 'next/link';
// import { useRouter } from "next/router";
const ClickLayoutComponent = ({ ep }) => {
  // const router = useRouter();
  const [count, setCount] = useState(ep); // 현재 화 수

  const handlePrevEpisode = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleNextEpisode = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // useEffect(() => {
  //   const { webtoonName } = router.query;

  //   if (webtoonName) {
  //     fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const { webtoons, count } = data; // 카운터 값을 가져와서 상태에 설정
  //         setWebtoonInfo(webtoons[0]);
  //         setWebtoons(webtoons);
  //         setCount(count);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching API:", error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }, [router.query.webtoonName]);

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
                  <span className="BackEpisode" onClick={handlePrevEpisode}>&lt;이전화</span>
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
