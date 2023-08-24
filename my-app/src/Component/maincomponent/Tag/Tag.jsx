import React from "react";
import Link from "next/link";
import style from "./styles/TagCss.module.css";

const Tag =()=>{

    return(
        <div className={style.tag}>
        <h3 className={style.Categories} id={style.tagtop}>웹툰 바로가기</h3>
            <div className={style.tagItem}>
                <Link href="/serachwebtoonpage?word=로멘스"><li>#로멘스</li></Link>
                <Link href="/serachwebtoonpage?word=액션"><li>#액션</li></Link>
                <Link href="/serachwebtoonpage?word=무협"><li>#무협</li></Link>
                <Link href="/serachwebtoonpage?word=일상"><li>#일상</li></Link>
                <Link href="/serachwebtoonpage?word=힐링"><li>#힐링</li></Link>
                <Link href="/serachwebtoonpage?word=드라마"><li>#드라마</li></Link>
                <Link href="/serachwebtoonpage?word=스포츠"><li>#스포츠</li></Link>
                <Link href="/serachwebtoonpage?word=공포"><li>#공포</li></Link>
            </div>
        </div>
    )
}
export default Tag;