import React from "react";
import { Link } from "react-router-dom";

const header = () =>{
    return(
        <div>
        <div className="header">
        <h1 className="Logo">Avatye Webtoon</h1>
        <input className="SerchBar" type="text"  value="작가/제목으로 검색할 수 있습니다."/>
        <button className="LoginBtn">로그인</button>
</div>
<div className="DayBox">
    <div className="Day">
        <Link to="/"><li>요일 전체</li></Link>
        <Link to="/mon"><li>월</li></Link>
        <Link to="/tues"><li>화</li></Link>
        <Link to="/wednes"><li>수</li></Link>
        <Link to="/thurs"><li>목</li></Link>
        <Link to="/fri"><li>금</li></Link>
        <Link to="/satur"><li>토</li></Link>
        <Link to="/sun"><li>일</li></Link>
    </div>
</div>
</div>
    )
}

export default header;