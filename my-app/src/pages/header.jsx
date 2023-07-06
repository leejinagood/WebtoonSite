import React, { useState } from "react";
import Link from 'next/link';
import axios from 'axios';
import Hedercss from "../styles/Heder.css";

const Header = () => {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  
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

  return (
    <div>
      <div className="header">
        <div className="TopHeader">
        <div className="LogoBox">
          <h1 className="Logo">AVATOON</h1>
        </div>
        <div className="rb">
          <div className="SerchBar">
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" value={search} onChange={onChange} placeholder="작가/제목으로 검색할 수 있습니다." />
                <button type="submit" className="SerchBtn">검색</button>
                <Link href="/login"><button className="LoginBtn">login</button></Link>
                {/* {rows && rows.map((row, index) => <p key={index}>{row}</p>)} */}
                <br />
              </div>
            </form>
            
          </div>
        </div>
        </div>
      </div>
      <div className="DayBox">
        <div className="Day">
          <Link href={{ pathname: '/mainpage', query: { day: 'All' } }}>
          <li className="AllDay">요일 전체</li>
          </Link>
          <Link href={{ pathname: '/MondayPage', query: { day: 'mon' } }}>
          <li className="AllDay">월</li>
          </Link>
          <Link href={{ pathname: '/TuesDayPage', query: { day: 'mon' } }}>
          <li className="AllDay">화</li>
          </Link>
          <Link href={{ pathname: '/WednesDayPage', query: { day: 'mon' } }}>
          <li className="AllDay">수</li>
          </Link>
          <Link href={{ pathname: '/ThursDayPage', query: { day: 'mon' } }}>
          <li className="AllDay">목</li>
          </Link>
          <Link href={{ pathname: '/FirDayPage', query: { day: 'mon' } }}>
          <li className="AllDay">금</li>
          </Link>
          <Link href={{ pathname: '/SaturDaypage', query: { day: 'mon' } }}>
          <li className="AllDay">토</li>
          </Link>
          <Link href={{ pathname: '/SunDayPage', query: { day: 'mon' } }}>
          <li className="AllDay">일</li>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
