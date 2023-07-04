import React from "react";
import LoginCss from "../styles/LoginCss.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 시 실행할 로직을 작성하세요.
    // 예: 서버로 데이터 전송, 상태 업데이트 등
  };

  return (
    <div className="LoginPage">
      <div className="LoginBox">
        <h2 className="LoginLogo">AVATYE</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input type="text" name="ID" id="ID" placeholder="아이디를 입력하세요" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="password" id="password" placeholder="비밀번호를 입력하세요" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="LoginPageBtn">로그인</button>
        </form>
        <div className="LoginMenu">
          <Link to="../password" ><li>비밀번호 찾기</li></Link>
          <Link to="../id"><li>아이디 찾기</li></Link>
          <Link to="../signup"><li>회원가입</li></Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
