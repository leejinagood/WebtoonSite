import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
class DayMain extends Component{
    static defaultProps = {
        title:'제목',
        week: '월',
        writer:'작가',
        star:9.9
    }
    render(){
        return(
    <div className="DayToonItem">
    <img src="1.jpg" alt="ss" />
    <p className="ToonTitle">{this.props.title}</p>
    <p className="Writer">{this.props.writer}</p>
    <p className="Star">⭐️{this.props.star}</p>
    </div>
    )
    }
}

export default DayMain;