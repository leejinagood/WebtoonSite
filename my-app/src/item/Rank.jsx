import React from "react";
import Link from 'next/link';
import { Component } from "react";

class Rank extends Component{
    constructor(props) {
        super(props);
        this.state = {
          dayToonItemCounts: [],
          webtoons: []
        };
      }
    static defaultProps = {
        title:'제목',
        week: '월',
        writer:'작가',
        star:9.9
    }

    componentDidMount() {
        const { day } = this.props;
    
        //요청 메서드, 결과값 추출
        fetch(`popular`)
          .then((response) => response.json())
          .then((data) => {
            const { webtoons } = data;
            this.setState({ webtoons });
          })
          .catch((error) => {
            console.error("Error fetching API:", error);
          });
        const fetchedDayToonItemCounts = [2, 0, 0];
        //5개임
        this.setState({ dayToonItemCounts: fetchedDayToonItemCounts });
      }

    render(){
        const { dayToonItemCounts, webtoons } = this.state;
        const { writer } = this.props;
        return(
            <div>
            <h3 className="HHH">인기 웹툰</h3>
            <div className="HotToon">
                
            <div className="RBox">
                    <Link href="ListPage"><div className="Rank">
                    <div className="Rankitem">
                        <div className="RankImg">
                            <img src="1.jpg" alt="1등" />
                        </div>
                        <div>
                        <table>
                            <tbody>
                                {dayToonItemCounts.map((count, index) => (
                                <tr key={index}>
                                    {[...Array(count)].map((_, subIndex) => (
                                    <td key={subIndex}>
                                        {webtoons[subIndex] && (
                                        <div className="DayToonItem">
                                            <img src="1.jpg" alt="ss" />
                                            <p >{webtoons[subIndex].webtoon_name}</p>
                                            <p >{webtoons[subIndex].author}</p>
                                        </div>
                                        )}
                                    </td>
                                    ))}
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div> 
                    </div>
                    </Link>

                    {/* <Link href="ListPage"><div className="Rank">
                    <div className="Rankitem">
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
                    </div>
                    </Link>
                    <Link href="ListPage"><div className="Rank">
                    <div className="Rankitem">
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
                    </div>
                    </Link>
                    <Link href="ListPage"><div className="Rank">
                    <div className="Rankitem">
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
                    
                    </div>
                    </Link>
                    <Link href="ListPage"><div className="Rank">
                    <div className="Rankitem">
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
                    </div>
                    </Link>  */}

                    </div>
            </div>
            </div>
    )
    }
}

export default Rank;