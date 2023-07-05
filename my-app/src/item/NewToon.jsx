import React from "react";
import Link from 'next/link';


const NewToon =()=>{

    return(
        
        <Link href="/ListPage"><div className="NewToonInfo">
        <img src="1.jpg"></img>
        <span className="Title">제목</span>
        <p className="Info">작품 설명</p>
    </div></Link>
    )
}

export default NewToon;