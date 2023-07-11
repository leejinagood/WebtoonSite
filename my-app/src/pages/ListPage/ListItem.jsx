import React from "react";
import Link from 'next/link';
import { Component } from "react";

class ListItem extends Component{
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
    fetch(`/api/listpage?webtoon_name=${webtoon_name}`)
      .then((response) => response.json())
      .then((data) => {
        const { webtoons } = data;
        this.setState({ webtoons });
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
    const fetchedDayToonItemCounts = [2, 0, 0];
    //요일별 아이템 갯수
    this.setState({ dayToonItemCounts: fetchedDayToonItemCounts });
  }

    static defaultProps = {
        title:'제목',
        week: '월',
        writer:'작가',
        episode:1,
        star:9.9,
        like:0,
        uproad:'2023.07.04',
        info:'나다라마바사 하 가나다라마 바사\n AbcDefG HH'
      }
      render(){
        const { dayToonItemCounts, webtoons } = this.state;
        const startWebtoonIndex = (currentPage - 1) * webtoonsPerPage;
        const endWebtoonIndex = currentPage * webtoonsPerPage;
        
    
    return(
        <Link href="/WebToonPage/WebToonPage"><div className="ListItem">
        <div className="ListImg">
          <img src="1.jpg" alt="s" />
        </div>
        <div className="ListItemContent">
          <p className="Episode">
            {this.props.episode}화<br />
            <span className="tab">{this.props.title}</span>
          </p>
          <p className="SU">
            ⭐️{this.props.star}<span className="tab">{this.props.uproad}</span>
          </p>
        </div>
      </div>
      </Link>
    )
      }
}
export default ListItem;

