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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/search', {
        params: { searchword: search }
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

        </div>
        <div className="rb">
          <div className="SerchBar">
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" value={search} onChange={onChange} placeholder="작가/제목으로 검색할 수 있습니다." />
                <button type="submit" className="SerchBtn">검색</button><Link href="/login"><button className="LoginBtn">login</button></Link>
                {/* <p>{search}</p> <br /> */}

                {rows && rows.map((row, index) => <p key={index}>{row}</p>)}
                <br />
              </div>

            </form>
            
          </div>
        </div>
      </div>
      <div className="DayBox">
        <div className="Day">
          <Link href="/"><li className="AllDay">요일 전체</li></Link>
          <Link href="/MondayPage"><li>월</li></Link>
          <Link href="/TuesDayPage"><li>화</li></Link>
          <Link href="/WednesDayPage"><li>수</li></Link>
          <Link href="/ThursDayPage"><li>목</li></Link>
          <Link href="/FirDayPage"><li>금</li></Link>
          <Link href="/SaturDaypage"><li>토</li></Link>
          <Link href="/SunDayPage"><li>일</li></Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
