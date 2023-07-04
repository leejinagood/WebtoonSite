import React from "react";
import LoginCss from "../styles/LoginCss.css"
import { Link } from "react-router-dom";
const LoginPage = () => {
    return (
      <div className="LoginPage">
        <div className="LoginBox">

        <h2 className="LoginLogo">AVATYE</h2>
          <table>
            <tbody> {/* tbody 요소 추가 */}
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
          <button className="LoginBtn">로그인
          </button>
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
