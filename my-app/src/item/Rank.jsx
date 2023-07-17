import React, { Component } from "react";
import Link from 'next/link';

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webtoons: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:4000/popular`);
      const data = await response.json();
      this.setState({ webtoons: data });
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  }

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
    const { webtoons } = this.state;

    return (
      <div>
        <h3 className="HHH">인기 웹툰</h3>
        <div className="HotToon">
          {webtoons.map((webtoon, index) => (
            <div className="RBox" key={index}>
              <Link href={`/ListPage/ListPage?webtoonName=${encodeURIComponent(webtoon.webtoon_name)}`}>
                <div className="Rank">
                  <div className="Rankitem">
                    <div className="RankImg">
                      <img src="" alt={`${index + 1}등`} ref={imgRef => {
                        if (imgRef) {
                          this.getThumbnailImage(webtoon)
                            .then(thumbnail => imgRef.src = thumbnail)
                            .catch(error => console.error("Error loading thumbnail:", error));
                        }
                      }} />
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
