import React from "react";
import Link from 'next/link';
import { Component } from "react";
class Rank extends Component{
    static defaultProps = {
        title:'제목',
        week: '월',
        writer:'작가',
        star:9.9
    }
    render(){
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
                    </div>
                    
            </div>
            </div>
    )
    }
}

export default Rank;