import React, { Component } from "react";
import MainPageCss from "@/src/styles/MainPageCss.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import NewToon from "../../item/NewToon";
import DayMain from "../../item/DayMain";
import Rank from "../../item/Rank";
import Slider from "../../item/Slider";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import

class MondayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayToonItemCounts: [],
      webtoons: []
    };
  }

  getThumbnailImage(webtoon) {
    if (webtoon.webtoon_name === "똑 닮은 딸") {
      return "/WebtoonImg/web1/web1_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "마루는 강쥐") {
      return "/WebtoonImg/web2/web2_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "소녀재판") {
      return "/WebtoonImg/web3/web3_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "신혼일기") {
      return "/WebtoonImg/web4/web4_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "외모지상주의") {
      return "/WebtoonImg/web5/web5_thumbnail.jpg";
    } else if (webtoon.webtoon_name === "퀘스트지상주의") {
      return "/WebtoonImg/web6/web6_thumbnail.jpg";
    }
    // 기본값으로 설정할 썸네일 이미지 경로
    return "";
  }


  componentDidMount() {
    const { day } = this.props;
    const { token } = parseCookies({}); // 쿠키에서 토큰 가져오기

    fetch(`/api/daywebtoon?day=${day}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const { webtoons } = data;
        this.setState({ webtoons });
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
    const fetchedDayToonItemCounts = [3, 0, 0];
    this.setState({ dayToonItemCounts: fetchedDayToonItemCounts });
  }

  static defaultProps = {
    day: "mon",
    week: "월",
    writer: "작가",
    star: 9.9
  };

  render() {
    const { dayToonItemCounts, webtoons } = this.state;
    const { week, writer, star } = this.props;
    const { token } = parseCookies({});
  
    return (
      <div className="DayBox">
        <Header token={token} />
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
                        <img src={this.getThumbnailImage(webtoons[subIndex])} alt={webtoons[subIndex].webtoon_name} /> {/* 여기 수정 */}
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
