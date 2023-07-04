import React from "react";
import MainPageCss from "../styles/MainPageCss.css";
import { Link } from "react-router-dom";
import Header from "./header";

const MainPage = () =>{

    return(
        <div className="MainPage">
            <Header/>
            <h3 className="Categories">이달의 신규 웹툰</h3>
            <div className="NewToon">

                <div className="NewToonInfo">
                    <img src="1.jpg"></img>
                    <span className="Title">제목</span>
                    <p className="Info">작품 설명</p>
                </div>
                <div className="NewToonInfo">
                    <img src="1.jpg"></img>
                    <span className="Title">제목</span>
                    <p className="Info">작품 설명</p>
                </div>
                <div className="NewToonInfo">
                    <img src="1.jpg"></img>
                    <span className="Title">제목</span>
                    <p className="Info">작품 설명</p>
                </div>
            </div>
            <h3 className="Categories">요일별 전체 웹툰</h3>
            <div className="AllToon">
                <table>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                    <th>토</th>
                    <th>일</th>
                    <tr>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                        <td>
                            <div className="AllToonInfo">
                                <img src="1.jpg" alt="" />
                                <p>제목</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div className="tag">
            <h3 className="Categories">웹툰 바로가기</h3>
                <div className="tagItem">
                    <li>#로멘스</li>
                    <li>#액션</li>
                    <li>#무협</li>
                    <li>#일상</li>
                    <li>#스포츠</li>
                    <li>#호러/공포</li>

                </div>
            </div>
       </div>
    )
}

export default MainPage;