import React, { Component } from "react";
import MainPageCss from "../styles/MainPageCss.css";

import Header from "./header";
import Footer from "./footer";
import NewToon from "../item/NewToon";
import DayMain from "../item/DayMain";
import DayToonItem from "../item/DayToonItem";
import Rank from "../item/Rank";

class MondayPage extends Component {
  static defaultProps = {
    title: '제목',
    week: '월',
    writer: '작가',
    star: 9.9
  }

  render() {
    return (
      <div>
        <Header />  
        <h3 className="Categories">{this.props.week}요일 추천 웹툰</h3>
        <div className="NewToon">
          <NewToon />

        </div>
        <div className="Mid">
          <div className="DayToon">
            <h3>전체{this.props.week}요 웹툰</h3>
            <table>
                <tr>
                  <td>
                    <DayToonItem />
                  </td>
                  <td>
                    <DayToonItem />
                  </td>
                </tr>
            </table>

          </div>

          <Rank />
        </div>
        <Footer />
      </div>
    );
  }
}

export default MondayPage;
