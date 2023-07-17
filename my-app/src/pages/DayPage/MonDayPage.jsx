import React, { Component } from "react";
import MainPageCss from "@/src/styles/MainPageCss.css";

import Header from "../Header/header";
import Footer from "../Footer/footer";
import NewToon from "../../item/NewToon";
import DayMain from "../../item/DayMain";
import Rank from "../../item/Rank";
import Slider from "../../item/Slider";

class MondayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayToonItemCounts: [],
      webtoons: []
    };
  }

  componentDidMount() {
    // 다른 요일페이지의 key day를 가져오는것
    const { day } = this.props;

    //요청 메서드, 결과값 추출
    fetch(`/api/daywebtoon?day=${day}`)
      .then((response) => response.json())
      .then((data) => {
        const { webtoons } = data;
        this.setState({ webtoons });
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
    const fetchedDayToonItemCounts = [3, 0, 0];
    //요일별 아이템 갯수
    this.setState({ dayToonItemCounts: fetchedDayToonItemCounts });
  }

  //기본값 월요일
  static defaultProps = {
    day: "mon",
    week: "월",
    writer: "작가",
    star: 9.9
  };

  getThumbnailImage = async (webtoon) => {
    try {
      const response = await fetch(`/api/Webtoon_Thumbnail?webtoonName=${encodeURIComponent(webtoon.webtoon_name)}`);
      const data = await response.json();
      const thumbnail = data.rows[0]?.[0]?.Webtoon_Thumbnail;
      return thumbnail || ""; 
    } catch (error) {
      console.error("Error fetching API:", error);
      return ""; 
    }
  };

  render() {
    const { dayToonItemCounts, webtoons } = this.state;
    const { week, writer, star } = this.props;

    return (
      <div className="DayBox">
        <Header />
        <h3 className="Categories">{week}요일 추천 웹툰</h3>
        <div className="MNewToon">
          <NewToon />
        </div>
        <div className="Mid">
          <div>
            <h3>전체{week}요 웹툰</h3>
            {dayToonItemCounts.map((count, index) => (
              <div className="DayToonBox" key={index}>
                {[...Array(count)].map((_, subIndex) => (
                  <div className="DayToon" key={subIndex}>
                    {webtoons[subIndex] && (
                      <div className={`DayToonItem ${subIndex === 1 ? "second-item" : ""}`}>
                        <img src="" alt={webtoons[subIndex].webtoon_name} ref={imgRef => {
                          if (imgRef) {
                            this.getThumbnailImage(webtoons[subIndex])
                              .then(thumbnail => imgRef.src = thumbnail)
                              .catch(error => console.error("Error loading thumbnail:", error));
                          }
                        }} />
                        <p className="ToonTitle">{webtoons[subIndex].webtoon_name}</p>
                        <p className="Writer">{webtoons[subIndex].author}</p>
                        <p className="Star">⭐️{webtoons[subIndex].like}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Rank />
        </div>
        <Footer />
      </div>
    );
  }
}

export default MondayPage;
