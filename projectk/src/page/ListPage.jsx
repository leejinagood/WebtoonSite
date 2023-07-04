import React from "react";
import Header from "./header";
import { Component } from "react";
import ListPageCss from "../styles/ListPageCss.css";
class ListPage extends Component{
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
    return(
        <div className="ListPage">
            <Header />
            <div className="ListInfo">
                <div className="ListImgBox">
                    <img src="1.jpg" alt="썸네일" />
                </div>
                <div className="ListInfo" >
                    <h3>{this.props.title}</h3>
                    <p className="GrayP">글/그림<span>{this.props.writer}</span> | {this.props.week}요웹툰</p>
                    <div className="ToonTinfo">
                        <p>{this.props.info}
                        </p>
                    </div>
                </div>
                <div className="InfoBtn">
                    <button id="PointBtn" className="IBtn">
                        좋아요 {this.props.like}
                    </button>
                    <button className="IBtn">
                        첫화보기 1화
                    </button>
                    <button className="SNSBTN">
                        공유하기
                    </button>
                </div>
                <div className="List">
                    <li>
                        <div className="ListItem">
                            <div className="ListImg">
                                <img src="1.jpg" alt="s" />
                            </div>
                            <div>
                                <p className="Episode">
                                    {this.props.episode}화 {this.props.title}
                                </p>
                                <p>
                                    {this.props.star}<span className="tab">{this.props.uproad}</span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
            </div>
            
        </div>
    )
    }
}
export default ListPage;