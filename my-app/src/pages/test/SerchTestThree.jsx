import React, { Component } from 'react';
import Information from './Information.json';

class SerchTest extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchResults: []
    };
  }

  searchSpace = () => {
    const { search } = this.state;
    const filteredData = Information.filter((data) => {
      const lowercaseName = data.name.toLowerCase();
      const lowercaseCountry = data.country.toLowerCase();
      return lowercaseName.includes(search.toLowerCase()) || lowercaseCountry.includes(search.toLowerCase());
    });
    this.setState({ searchResults: filteredData });
  }

  handleInputChange = (event) => {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    this.searchSpace(); // 페이지가 로드될 때 초기 검색 결과를 보여줍니다.
  }

  render() {
    const { search, searchResults } = this.state;
    const styleInfo = {
      paddingRight: '10px'
    };

    return (
      <div>
        <input
          type="text"
          placeholder="Enter item to be searched"
          value={search}
          onChange={this.handleInputChange}
        />
        <button onClick={this.searchSpace}>검색</button>
        {Information.map((data) => (
          <div key={data.id}>
            <ul style={{ display: search === '' || searchResults.includes(data) ? 'block' : 'none' }}>
              <li>
                <span style={styleInfo}>{data.name}</span>
                <span style={styleInfo}>{data.age}</span>
                <span style={styleInfo}>{data.country}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default SerchTest;
