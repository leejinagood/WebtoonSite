import React, { Component } from 'react';
import Information from './Information.json';
import TestCss from './TestCss.css'
// import React, { Component } from 'react'; - React와 Component를 가져옵니다.
// import Information from './Information.json'; - Information.json 파일을 가져옵니다.
// constructor() - 클래스의 생성자를 정의합니다. search라는 초기 상태를 설정합니다.
// searchSpace - 검색어를 입력할 때마다 호출되는 함수입니다. 입력된 검색어로 search 상태를 업데이트합니다.
// render() - 컴포넌트의 렌더링 메서드입니다.
// styleInfo - 정보 스타일을 지정하기 위한 객체입니다.
// elementStyle - 검색 입력 요소의 스타일을 지정하기 위한 객체입니다.
// filter() - 검색어에 해당하는 데이터만 필터링하여 새로운 배열을 생성합니다.
// map() - 필터링된 데이터를 매핑하여 JSX 요소로 변환합니다.
// input 요소 - 검색어를 입력할 수 있는 입력 상자입니다. onChange 이벤트 핸들러를 통해 검색어를 업데이트합니다.
// {items} - 검색 결과를 출력하는 부분입니다.



class SerchTest extends Component {

  constructor(){
    super();

    this.state={
      search:null
    };
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }

  render(){
    const styleInfo = {
      paddingRight:'10px'
    }
    const elementStyle ={
      border:'solid',
      borderRadius:'10px',
      position:'relative',
      left:'10vh',
      height:'3vh',
      width:'20vh',
      marginTop:'5vh',
      marginBottom:'10vh'
    }
    const items = Information.filter((data)=>{
      if(this.state.search == null)
          return data
      else if(data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.country.toLowerCase().includes(this.state.search.toLowerCase())){
          return data
      }
      else if(data.country.toLowerCase().includes(this.state.search.toLowerCase()) || data.country.toLowerCase().includes(this.state.search.toLowerCase())){
        return data
    }
    }).map(data=>{
      return(
      <div>
        <ul>
          <li style={{position:'relative',left:'10vh'}}>
            <span style={styleInfo}>{data.name}</span>
            <span style={styleInfo}>{data.age}</span>
            <span style={styleInfo}>{data.country}</span>
          </li>
        </ul>
      </div>
      )
    })

    return (
      <div>
      <input type="text" placeholder="Enter item to be searched" style={elementStyle} onChange={(e)=>this.searchSpace(e)} />
      <div>
        {items}
      </div>
      </div>
    )
  }
}

export default SerchTest;