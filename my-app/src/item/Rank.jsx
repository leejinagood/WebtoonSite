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
                      <img src="1.jpg" alt={`${index + 1}등`} />
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
