import React from "react";
import Link from 'next/link';
import { Component } from "react";

class ListItem extends Component{
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

