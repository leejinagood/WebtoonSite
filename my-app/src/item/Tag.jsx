import React from "react";
import Link from "next/link";
import TagCss from "../styles/TagCss.css";

const Tag =()=>{

    return(
        <div className="tag">
        <h3 className="Categories">웹툰 바로가기</h3>
            <div className="tagItem">
                <li>#로멘스</li>
                <li>#액션</li>
                <li>#무협</li>
                <li>#일상</li>
                <li>#힐링</li>
                <li>#드라마</li>
                <li>#스포츠</li>
                <li>#호러/공포</li>
            </div>
        </div>
    )
}
export default Tag;