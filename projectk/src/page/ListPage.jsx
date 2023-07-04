import React from "react";
import Header from "./header";
import { Component } from "react";
import ListPageCss from "../styles/ListPageCss.css";
class ListPage extends Component{
    static defaultProps = {
        title:'제목',
        week: '월',
        writer:'작가',
        star:9.9,
        info:'나다라마바사 하 가나다라마 바사\n\n AbcDefG HH'
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
                    <p>글/그림<span>{this.props.writer}</span> | {this.props.week}요웹툰</p>
                    <div className="ToonTinfo">
                        <p>{this.props.info}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}
export default ListPage;