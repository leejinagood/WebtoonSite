import React from "react";
import MainPageCss from "../styles/MainPageCss.css";

const MainPage = () =>{

    return(
        <div className="MainPage">
            <div className="header">
                    <h1 className="Logo">Avatye Webtoon</h1>
                    <input className="SerchBar" type="text"  value="작가/제목으로 검색할 수 있습니다."/>
                    <button className="LoginBtn">로그인</button>
            </div>
            <div className="DayBox">
                <div className="Day">
                <li>요일 전체</li>
                    <li>월</li>
                    <li>화</li>
                    <li>수</li>
                    <li>목</li>
                    <li>금</li>
                    <li>토</li>
                    <li>일</li>

                </div>
            </div>
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
                <li>
                <div className="Monday">
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                </div>
                </li>
                <li>
                <div className="Tuesday">
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                    <div className="AllToonInfo">
                        <img src="1.jpg"></img>
                        <p className="Title">제목</p>
                    </div>
                </div>
                </li>
            </div>
       </div>
    )
}

export default MainPage;