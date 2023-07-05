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
            <div className="HotToon">
                <h3>실시간 인기 웹툰</h3>
                
                    <Link href="ListPage"><div className="Rank">
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
                    </Link>
                    <Link href="ListPage"><div className="Rank">
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
                    </Link>
                    <Link href="ListPage"><div className="Rank">
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
                    </Link>
                    <Link href="ListPage"><div className="Rank">
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
                    </Link>
                    <Link href="ListPage"><div className="Rank">
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
                    </Link> 
                    
            </div>
    )
    }
}

export default Rank;