import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import SignUpCss from "../styles/SignUpCss.css"

const SignUpPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

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

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/SignUpPage", {
        email: id,
        pass: password,
        name: name,
        age: age,
      });
      console.log(response.data);
      alert("입력 성공");
    } catch (error) {
      console.error(error);
    }
  };

  const isPasswordMatch = password === confirmPassword;
  const isNameValid = name.length <= 5;

  return (
    <div className="SignUpPage">
      <form onSubmit={handleSubmit}>
        <div className="SignUpBox">
          <h2>AVATYE</h2>
          <div>
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" value={id} onChange={handleIdChange} />
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
            <input
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
            <label htmlFor="age">나이</label>
            <input
              type="text"
              id="age"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <button className="SignBtn" type="submit">가입하기</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
