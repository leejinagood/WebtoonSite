import React from "react";
function RealTimeSearchKeywords({ keywords }) {
    return (
      <div className="RealTimeKeywords">
        <h2>실시간 검색어</h2>
        <ul>
          {keywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </div>
    );
  }
  

  export default RealTimeSearchKeywords;