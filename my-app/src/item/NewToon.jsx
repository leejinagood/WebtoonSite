import React, { useState ,useEffect } from "react";
import Link from 'next/link';
import  { Component } from "react";

import NewToonCss from '../styles/NewToonCss.css';

class NewToon extends Component{

  componentDidMount() {
    // 다른 요일페이지의 key day를 가져오는것
    const { day } = this.props;

    //요청 메서드, 결과값 추출
    fetch(`/api/daywebtoon?day=${day}`)
      .then((response) => response.json())
      .then((data) => {
        const { webtoons } = data;
        this.setState({ webtoons });
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
    const fetchedDayToonItemCounts = [3, 0, 0];
    //요일별 아이템 갯수
    this.setState({ dayToonItemCounts: fetchedDayToonItemCounts });
  }
  render(){
  return (
    <div className="NewToon">
<div class="slider">
  <ul>
    <li class="item1">
      1
      <p class="txt">안녕하세요1</p>
    </li>
    <li class="item2">
      2
      <p class="txt">안녕하세요2</p>
    </li>
    <li class="item3">
      3
      <p class="txt">안녕하세요3</p>
    </li>
    <li class="item4">
      4
      <p class="txt">안녕하세요4</p>
    </li>
    <li class="item5">
      5
      <p class="txt">안녕하세요5</p>
    </li>
  </ul>
  <button type="button" class="prev">이전</button>
  <button type="button" class="next">다음</button>
  <div class="bullet">
    <button type="button">1</button>
    <button type="button">2</button>
    <button type="button">3</button>
    <button type="button">4</button>
    <button type="button">5</button>
  </div>
    </div>

    </div>
  );
}
}

export default NewToon;
