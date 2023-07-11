import React from "react";


function SerchWebToon({ webtoons_id,webtoons_name, webtoon_author}) {   // 넘겨받은 객체 데이터중, id/name/email의 값만 받을것이다.
    return (
      <div className='SerchWebToon'>
        <img src={`https://robohash.org/${webtoons_id}?set=set2&size=180x180`} alt='' />
        <h2>{webtoons_name}</h2>
        <p>{webtoon_author}</p>
      </div>
    );
  }

export default SerchWebToon;