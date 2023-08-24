import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import style from "./styles/SignUpCss.module.css"

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
      alert("회원가입 성공");
      window.location.href = '/loginpage';
    } catch (error) {
      console.error(error);
    }
  };

  const isPasswordMatch = password === confirmPassword;

  return (
    <div className={style.SignUpPage}>
      <form onSubmit={handleSubmit}>
        <div className={style.SignUpBox}>
        <Link href="/">
          <h2><span className={style.red}>A</span>VA<span className={style.red}>T</span>YE</h2>
          </Link>
          <div>
            <input type="text" id="id" value={id} placeholder="아이디" onChange={handleIdChange} />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="비밀번호"
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="비밀번호 확인"

              onChange={handleConfirmPasswordChange}
            />
            {!isPasswordMatch && (
              <p className={style.error}>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <div>
            <input type="text" id="name" value={name} onChange={handleNameChange}
            placeholder="이름" />
            {name.length > 5 && (
              <p className={style.error}>이름은 5글자 이하여야 합니다.</p>
            )}
          </div>
          <div>
            <input
              type="text"
              id="age"
              value={age}
              onChange={handleAgeChange}
              placeholder="나이"
            />
          </div>
          <button className={style.SignBtn} type="submit">가입하기</button>
        </div>
      </form>
      <div className={style.dn}></div>
    </div>
  );
};

export default SignUpPage;
