import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import ClickLayoutComponent from "./ClickLayoutComponent";
import WebToonPageCss from "./styles/WebToonPageCss.css";

const WebToonPage = () => {
  const router = useRouter();
  const { webtoonId } = router.query;

  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [selectedWebtoonName, setSelectedWebtoonName] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/daywebtoon?day=All")
      .then((response) => response.json())
      .then((data) => {
        setWebtoons(data.webtoons);
        const selectedWebtoon = data.webtoons.find((webtoon) => webtoon.id === webtoonId);
        setSelectedWebtoon(selectedWebtoon);

        const fetchWebtoonDetail = async () => {
          try {
            const response = await fetch(`/api/webtoondetail?name=${encodeURIComponent(selectedWebtoonName)}`);
            const data = await response.json();
            const { webtoons } = data;
            const selectedWebtoon = webtoons[0];
            const count = selectedWebtoon.count;
            setCount(count);
          } catch (error) {
            console.error("Error fetching API:", error);
          }
        };

        if (selectedWebtoon) {
          setSelectedWebtoonName(selectedWebtoon.webtoon_name);
          fetchWebtoonDetail();
        }
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, [webtoonId, selectedWebtoonName]);

  const handleWebToonCutClick = (webtoon) => {
    setSelectedWebtoon(webtoon);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  const handleScreenClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="WebToonPage" onClick={handleScreenClick}>
      <Header />
      <div className="WebToonBox">
        {webtoons.map((webtoon, index) => (
          <div
            className="WebToonCut"
            key={index}
            onClick={() => handleWebToonCutClick(webtoon)}
          >
            <img src="1.jpg" alt="1컷" />
          </div>
        ))}
      </div>
      {selectedWebtoon && isVisible && <ClickLayoutComponent ep={webtoonId} MaxEp={count} />}
      <Footer />
    </div>
  );
};

export default WebToonPage;
