import React from "react";
import Header from "./header";
import { Component } from "react";
class MondayPage extends Component{
    static defaultProps = {
        week: '월'
      }
    render(){
    return(
        <div>
      <Header/>  
      <h3 className="Categories">{this.props.week}요일 추천 웹툰</h3>
      <div className="NewToon">

          <div className="NewToonInfo">
              <img src="1.jpg"></img>
              <span className="Title">제목</span>
              <p className="Info">@화 제목</p>
          </div>
          <div className="NewToonInfo">
              <img src="1.jpg"></img>
              <span className="Title">제목</span>
              <p className="Info">@화 제목</p>
          </div>
          <div className="NewToonInfo">
              <img src="1.jpg"></img>
              <span className="Title">제목</span>
              <p className="Info">@화 제목</p>
          </div>
      </div>
      <div className="Mid">

      </div>
      </div>
    );
    }
}
export default MondayPage;