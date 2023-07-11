import React from "react";
import Header from "../Header/header";
import { Component } from "react";
import ListPageCss from "./styles/ListPageCss.css";
import Footer from "../Footer/footer";
import ListItem from "./ListItem";

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      like: this.props.like,
      webtoonInfo: {} // 웹툰 정보를 저장할 상태값 추가
    };
  }

  componentDidMount() {
    const webtoonName = new URLSearchParams(window.location.search).get(
      "webtoon_name"
    );

    fetch(`/api/webtoondetail?name=${webtoonName}`)
      .then((response) => response.json())
      .then((data) => {
        const { webtoons } = data;
        this.setState({ webtoonInfo: webtoons[0] });
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }

  handleLike = () => {
    this.setState((prevState) => ({
      like: prevState.like + 1
    }));
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const webtoonsPerPage = 8; // 페이지당 웹툰 개수
    const totalWebtoons = this.props.totalWebtoons;
    const totalPages = Math.ceil(totalWebtoons / webtoonsPerPage);
    const { currentPage, like, webtoonInfo } = this.state;

    // 현재 페이지에 해당하는 웹툰 목록을 가져오는 로직
    const startWebtoonIndex = (currentPage - 1) * webtoonsPerPage;
    const endWebtoonIndex = currentPage * webtoonsPerPage;

    return (
      <div className="ListPage">
        <Header />
        <div className="ListInfoBox">
          <div className="ListInfo">
            {/* 웹툰 정보 출력 */}
            <div className="ListImgBox">

            

              <img src="1.jpg" alt="썸네일" />
            </div>
            <div className="ListInfo">
              <div className="TextBox">
                <p id="line" className="tab2">
                  {webtoonInfo.webtoon_name}
                </p>
                <p id="line" className="GrayP">
                  글/그림<span>{webtoonInfo.author}</span> | {webtoonInfo.week}
                  요웹툰
                  <br />
                  {webtoonInfo.content}
                  <div className="InfoBtn">
                    <button
                      id="PointBtn"
                      className="IBtn"
                      onClick={this.handleLike}
                    >
                      좋아요 {like}
                    </button>
                    <button className="IBtn">첫화보기 1화</button>
                    <button className="SNSBTN">공유하기</button>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 웹툰 목록 출력 */}
        <div className="List">
          {Array.from({ length: webtoonsPerPage }).map((_, index) => (
            <li key={startWebtoonIndex + index}>
              <ListItem webtoonName="웹툰 이름" uploadDate="2023.07.01" />
            </li>
          ))}
        </div>

        {/* 페이지 번호 출력 */}
        <div className="Pagination">
          <span className="Arrow">{'<'}</span>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => this.handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <span className="arrow">{'>'}</span>
        </div>

        <Footer />
      </div>
    );
  }
}

export default ListPage;
