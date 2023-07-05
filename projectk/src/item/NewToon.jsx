import React from "react";
import { Link } from "react-router-dom";


const NewToon =()=>{

    return(
        
        <Link to="/list"><div className="NewToonInfo">
        <img src="1.jpg"></img>
        <span className="Title">제목</span>
        <p className="Info">작품 설명</p>
    </div></Link>
    )
}

export default NewToon;