import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import testcss from "./test.css";
const test=()=>{
    var angle = 0;
    function galleryspin(sign) { 
    spinner = document.querySelector("#spinner");
    if (!sign) { angle = angle + 45; } else { angle = angle - 45; }
    spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
    }
    return(
        <div>

        <div id="carousel">
        <figure id="spinner">
            <img src="icons/favicon-196x196.png" alt/>
            <img src="icons/favicon-196x196.png"  alt/>
            <img src="icons/favicon-196x196.png"  alt/>
            <img src="icons/favicon-196x196.png"  alt/>
            <img src="icons/favicon-196x196.png"  alt/>
            <img src="icons/favicon-196x196.png"  alt/>
            <img src="icons/favicon-196x196.png"  alt/>
            <img src="icons/favicon-196x196.png"  alt/>
        </figure>
        </div>
<span id="left" class="ss-icon" onclick="galleryspin('-')">&lt;</span>
<span id="right" class="ss-icon" onclick="galleryspin('')">&gt;</span>
</div>
    )
}

export default test;