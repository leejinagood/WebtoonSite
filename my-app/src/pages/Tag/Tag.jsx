import React from "react";
import Link from "next/link";
import TagCss from "./styles/TagCss.css";

const Tag =()=>{

    return(
        <div className="tag">
        <h3 className="Categories">웹툰 바로가기</h3>
            <div className="tagItem">
                <Link href=""><li>#로멘스</li></Link>
                <Link href=""><li>#액션</li></Link>
                <Link href=""><li>#무협</li></Link>
                <Link href=""><li>#일상</li></Link>
                <Link href=""><li>#힐링</li></Link>
                <Link href=""><li>#드라마</li></Link>
                <Link href=""><li>#스포츠</li></Link>
                <Link href=""><li>#공포</li></Link>
            </div>
        </div>
    )
}
export default Tag;