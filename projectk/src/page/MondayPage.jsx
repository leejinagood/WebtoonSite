import React from "react";
import Header from "./header";
import { Component } from "react";
import Footer from "./footer";
import NewToon from "./NewToon";
class MondayPage extends Component{
    static defaultProps = {
        title:'제목',
        week: '월',
        writer:'작가',
        star:9.9
      }
    render(){
    return(
        <div>
      <Header/>  
      <h3 className="Categories">{this.props.week}요일 추천 웹툰</h3>
      <div className="NewToon">

        <NewToon/>
        <NewToon/>
        <NewToon/>
      </div>
      <div className="Mid">
        <div className="DayToon">

            <h3>전체{this.props.week}요 웹툰</h3>
            <table>
                <tr>
                    <td>
                        <div className="DayToonItem">
                            <img src="1.jpg" alt="ss" />
                            <p className="ToonTitle">{this.props.title}</p>
                            <p className="Writer">{this.props.writer}</p>
                            <p className="Star">⭐️{this.props.star}</p>
                        </div>
                    </td>
                    <td>
                        <div className="DayToonItem">
                            <img src="1.jpg" alt="ss" />
                            <p className="ToonTitle">{this.props.title}</p>
                            <p className="Writer">{this.props.writer}</p>
                            <p className="Star">⭐️{this.props.star}</p>
                        </div>
                    </td>
                    <td>
                        <div className="DayToonItem">
                            <img src="1.jpg" alt="ss" />
                            <p className="ToonTitle">{this.props.title}</p>
                            <p className="Writer">{this.props.writer}</p>
                            <p className="Star">⭐️{this.props.star}</p>
                        </div>
                    </td>
                    <td>
                        <div className="DayToonItem">
                            <img src="1.jpg" alt="ss" />
                            <p className="ToonTitle">{this.props.title}</p>
                            <p className="Writer">{this.props.writer}</p>
                            <p className="Star">⭐️{this.props.star}</p>
                        </div>
                    </td>
                    <td>
                        <div className="DayToonItem">
                            <img src="1.jpg" alt="ss" />
                            <p className="ToonTitle">{this.props.title}</p>
                            <p className="Writer">{this.props.writer}</p>
                            <p className="Star">⭐️{this.props.star}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="DayToonItem">
                            <img src="1.jpg" alt="ss" />
                            <p className="ToonTitle">{this.props.title}</p>
                            <p className="Writer">{this.props.writer}</p>
                            <p className="Star">⭐️{this.props.star}</p>
                        </div>
                    </td>
                    <td>
                        <div className="DayToonItem">
                            <img src="1.jpg" alt="ss" />
                            <p className="ToonTitle">{this.props.title}</p>
                            <p className="Writer">{this.props.writer}</p>
                            <p className="Star">⭐️{this.props.star}</p>
                        </div>
                    </td>
                </tr>
                
            </table>
            

        </div>
        <div className="RBox">
            <div className="HotToon">
                <h3>실시간 인기 웹툰</h3>
                
                    <div className="Rank">
                        <div className="RankImg">
                            <img src="1.jpg" alt="1등" />
                        </div>
                        <div className="RankNum">
                            <h2>1</h2>
                        </div>
                        <div className="RankText">
                            <p>{this.props.title}</p>
                            <p>{this.props.writer}</p>
                        </div>
                    </div>
                    <div className="Rank">
                        <div className="RankImg">
                            <img src="1.jpg" alt="1등" />
                        </div>
                        <div className="RankNum">
                            <h2>2</h2>
                        </div>
                        <div className="RankText">
                            <p>{this.props.title}</p>
                            <p>{this.props.writer}</p>
                        </div>
                    </div>
                    <div className="Rank">
                        <div className="RankImg">
                            <img src="1.jpg" alt="1등" />
                        </div>
                        <div className="RankNum">
                            <h2>3</h2>
                        </div>
                        <div className="RankText">
                            <p>{this.props.title}</p>
                            <p>{this.props.writer}</p>
                        </div>
                    </div>
                    <div className="Rank">
                        <div className="RankImg">
                            <img src="1.jpg" alt="1등" />
                        </div>
                        <div className="RankNum">
                            <h2>4</h2>
                        </div>
                        <div className="RankText">
                            <p>{this.props.title}</p>
                            <p>{this.props.writer}</p>
                        </div>
                    </div>
                    <div className="Rank">
                        <div className="RankImg">
                            <img src="1.jpg" alt="1등" />
                        </div>
                        <div className="RankNum">
                            <h2>5</h2>
                        </div>
                        <div className="RankText">
                            <p>{this.props.title}</p>
                            <p>{this.props.writer}</p>
                        </div>
                    </div>

                    
            </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
    }
}
export default MondayPage;