import React from "react";
import { Link } from "react-router-dom";

const footer = () =>{
    return(
        <div className="footer">
        <div className="FL">
            <Link><li>아바티웹툰 이용약관</li></Link>
            <Link><li>개인정보처리방침</li></Link>
            <Link><li>청소년보호정책</li></Link>
            <Link><li>웹툰 고객센터</li></Link>
            <Link><li>광고/사업문의</li></Link>

        </div>
        <div className="FR">
        <p>사업자등록번호 ***-**-**** 신고번호 ****-**-*** (사업자정보확인) 대표이사 ***</p>
    </div>
        <p><br/>
        <br/>
        AVATYE WEBTOON</p>

    </div>
    )
}
export default footer;