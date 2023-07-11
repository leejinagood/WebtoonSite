import React, { useState } from "react";
import Link from 'next/link';
import axios from 'axios';
import HederCss from "./styles/Heder.css";

const Header = () => {



  
  //입력받은 값 서버로 넘기기
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/search', {
        params: { word: search }
      });
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };


    // 유저가 검색창에 입력하는 값
    const [userInput, setUserInput] = useState('');
    // 입력값을 가져와서 소문자로변경
    const getValue = (e) => {
      setUserInput(e.target.value.toLowerCase())};
  
  
    // 웹툰 데이터 배열
    const [webtoons, setWebtoons] = useState([]); 
  
    // 데이터 목록중, name에 사용자 입력값이 있는 데이터만 불러오기
    // 사용자 입력값을 소문자로 변경해주었기 때문에 데이터도 소문자로
    const searched = webtoons.filter((item) =>
          item.name.toLowerCase().includes(userInput)
    );


  const handleLinkClick = async (day) => {
    try {
      const response = await axios.get('/api/daywebtoon', {
        params: { day }
      });
      console.log(response.data);
      // 여기서 서버 응답 데이터를 처리하거나 상태 업데이트를 수행할 수 있습니다.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="HederBox">
      <div className="header">
        <div className="TopHeader">
          <div className="LogoBox">      
            <h1 className="Logo">AVATOON</h1>
          </div>
          <div className="rb">
            <div className="SerchBar">
              <form onSubmit={handleSubmit}>
                <div className="InputBox">
                  <input type="text" onChange={getValue} placeholder="작가/제목으로 검색할 수 있습니다." />
                  {searched.map((item) => (
                  <SerchWebToon key={item.webtoons_name} {...item} />  // 잔여연산자 사용
                  ))}
                  <div className="BTN">
                    <button type="submit" className="SerchBtn">검색</button>
                    <Link href="/LoginPage/LoginPage"><button className="LoginBtn">login</button></Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="HDayBox">
        <div className="Day">
          <Link href={{ pathname: '/', query: { day: 'All' }  }}>
          <li id="AD" className="AllDay"onClick={() => handleLinkClick('All')} >전체요일</li>
          </Link>
          <Link href={{ pathname: '/DayPage/MonDayPage', query: { day: 'mon' } }}>
          <li className="AllDay" onClick={() => handleLinkClick('mon')}>월</li>
          </Link>
          <Link href={{ pathname: '/DayPage/TuesDayPage', query: { day: 'tues' } }}>
          <li className="AllDay" onClick={() => handleLinkClick('tues')}>화</li>
          </Link>
          <Link href={{ pathname: '/DayPage/WednesDayPage', query: { day: 'wedes' } }}>
          <li className="AllDay" onClick={() => handleLinkClick('wedes')}>수</li>
          </Link>
          <Link href={{ pathname: '/DayPage/ThursDayPage', query: { day: 'thu' } }}>
          <li className="AllDay" onClick={() => handleLinkClick('thu')}>목</li>
          </Link>
          <Link href={{ pathname: '/DayPage/FirDayPage', query: { day: 'fir' } }}>
          <li className="AllDay" onClick={() => handleLinkClick('fir')}>금</li>
          </Link>
          <Link href={{ pathname: '/DayPage/SaturDaypage', query: { day: 'satur' } }}>
          <li className="AllDay" onClick={() => handleLinkClick('satur')}>토</li>
          </Link>
          <Link href={{ pathname: '/DayPage/SunDayPage', query: { day: 'sun' } }}>
          <li className="AllDay" onClick={() => handleLinkClick('sun')}>일</li>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
