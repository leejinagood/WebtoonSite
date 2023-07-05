import React from "react";
import Header from "./header";
import { Component } from "react";
import ListPageCss from "../styles/ListPageCss.css";
import MainPageCss from "../styles/MainPageCss.css";
import Footer from "./footer";
import ListItem from "./ListItem";

class ListPage extends Component {
    static defaultProps = {
        title:'제목',
        week: '월',
        writer:'작가',
        star:9.9,
        info:'나다라마바사 하 가나다라마 바사\n\n AbcDefG HH',
        like:0
      }  

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      like: this.props.like
    };
  }
  handleLike = () => {
    this.setState(prevState => ({
      like: prevState.like + 1
    }));
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };



  render() {

    const webtoonsPerPage = 8; // 페이지당 웹툰 개수
    const totalWebtoons = 20; // 총 웹툰 개수
    const totalPages = Math.ceil(totalWebtoons / webtoonsPerPage);
    const { currentPage , like } = this.state;

    // 현재 페이지에 해당하는 웹툰 목록을 가져오는 로직
    const startWebtoonIndex = (currentPage - 1) * webtoonsPerPage;
    const endWebtoonIndex = currentPage * webtoonsPerPage;

    return (
      <div className="ListPage">
        <Header />
        <div className="ListInfo">
          {/* 웹툰 정보 출력 */}
          <div className="ListImgBox">
            <img src="1.jpg" alt="썸네일" />
          </div>
          <div className="ListInfo">
            <h3>{this.props.title}</h3>
            <p className="GrayP">
              글/그림<span>{this.props.writer}</span> | {this.props.week}요웹툰
            </p>
            <div className="ToonTinfo">
              <p>{this.props.info}</p>
            </div>
          </div>
          <div className="InfoBtn">
          <button id="PointBtn" className="IBtn" onClick={this.handleLike}>
              좋아요 {like}
            </button>
            <button className="IBtn">첫화보기 1화</button>
            <button className="SNSBTN">공유하기</button>
          </div>
        </div>

        {/* 웹툰 목록 출력 */}
        <div className="List">
          {Array.from({ length: webtoonsPerPage }).map((_, index) => (
            <li key={startWebtoonIndex + index}>
              <ListItem />
              {/* 이 부분에 함수를 통해 ListItem props값 + 1 씩하면 될거 같음 */}
            </li>
          ))}
                  {/* 페이지 번호 출력 */}
        <div className="Pagination"><span className="Arrow">{'<'}</span>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => this.handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}<span className="arrow">{'>'}</span>
        </div>
        </div>



        <Footer />
      </div>
    );
  }
}

export default ListPage;
