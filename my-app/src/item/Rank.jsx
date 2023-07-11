import React, { Component } from "react";
import Link from 'next/link';

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webtoons: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/popular`) 
      .then((response) => response.json())
      .then((data) => {
        this.setState({ webtoons: data });
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }

  render() {
    const getThumbnailImage = (webtoon) => {
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
      }else if (webtoon.webtoon_name === "퀘스트지상주의") {
        return "/WebtoonImg/web6/web6_thumbnail.jpg";
      }
      // 기본값으로 설정할 썸네일 이미지 경로
      return "";
    };
    const { webtoons } = this.state;

    return (
      <div>
        <h3 className="HHH">인기 웹툰</h3>
        <div className="HotToon">
          {webtoons.map((webtoon, index) => (
            <div className="RBox" key={index}>
              <Link href={`/ListPage/ListPage?webtoon_name=${webtoon.webtoon_name}`}>
                <div className="Rank">
                  <div className="Rankitem">
                    <div className="RankImg">
                    <img src={getThumbnailImage(webtoon)} alt={`${index + 1}등`}  />
                    </div>
                    <div className="RankNum">
                      <h2>{`${index + 1}등`}</h2>
                    </div>
                    <div className="RankText">
                      <p>{webtoon.webtoon_name}</p>
                      <p>{webtoon.author}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Rank;
