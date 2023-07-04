import React from "react";
import Header from "./header";
import { Component } from "react";
import ListItem from "./ListItem";
import ListPageCss from "../styles/ListPageCss.css";
class ListPage extends Component{

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
                        <ListItem />
                    </li>
                    <li><ListItem /></li>
                    <li><ListItem /></li>
                    <li><ListItem /></li>
                    <li><ListItem /></li>
                    <li><ListItem /></li>
                </div>
            </div>
            
        </div>
    )
    }
}
export default ListPage;