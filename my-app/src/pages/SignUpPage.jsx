import React, { useState } from "react";
import Link from 'next/link';
import SignUpCss from "../styles/SignUpCss.css"


const SignUpPage = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
  
    const handleIdChange = (e) => {
      setId(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleBirthdateChange = (e) => {
      setBirthdate(e.target.value);
    };
  
    const handlePhoneNumberChange = (e) => {
      setPhoneNumber(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // 입력된 값들 처리 로직 추가
      console.log("ID:", id);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
      console.log("Name:", name);
      console.log("Birthdate:", birthdate);
      console.log("Phone Number:", phoneNumber);
      // ... 추가적인 로직 수행
    };
  
    const isPasswordMatch = password === confirmPassword;
  
    const isNameValid = name.length <= 5;
  
    const isBirthdateValid = /^\d{8}$/.test(birthdate);
  
    const isPhoneNumberValid = /^\d{11}$/.test(phoneNumber);
  
    return (
      <div className="SignUpPage">

        <form onSubmit={handleSubmit}>
        <div className="SignUpBox">
        <h2>AVATYE</h2>
          <div>
            
            <label className="MT" htmlFor="id">아이디</label>
            <input className="MT" type="text" id="id" value={id} onChange={handleIdChange} />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input className="MB"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!isPasswordMatch && (
              <p className="error">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <div>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
            {name.length > 5 && (
              <p className="error">이름은 5글자 이하여야 합니다.</p>
            )}
          </div>
          <div>
            <label htmlFor="birthdate">생년월일</label>
            <input
              type="text"
              id="birthdate"
              value={birthdate}
              onChange={handleBirthdateChange}
            />
            {!isBirthdateValid && (
              <p className="error">생년월일은 8자리 숫자여야 합니다.</p>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber">전화번호</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            {!isPhoneNumberValid && phoneNumber.length > 0 && (
              <p className="error">전화번호는 11자리 숫자여야 합니다.</p>
            )}
          </div>
          <button className="SignBtn" type="submit">가입하기</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default SignUpPage;