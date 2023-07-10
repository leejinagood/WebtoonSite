import React, { useState } from "react";
import ClickLayoutCss from "../styles/ClickLayoutCss.css";
const ClickLayoutComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="ClickLayout">
      <button onClick={handleClick}>클릭하여 레이아웃 토글</button>
      {isVisible && (
        <div className="LayoutContent">
          <h2>나타나는 레이아웃</h2>
          <p>여기에 내용을 추가할 수 있습니다.</p>
        </div>
      )}
    </div>
  );
};

export default ClickLayoutComponent;
