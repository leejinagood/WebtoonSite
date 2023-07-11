// SerchTestTwo.jsx
import React, { Component } from 'react';
import TestItem from './TestItem';
import Information from './Information.json'
class SerchTestTwo extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchResults: []
    };
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.searchSpace();
    }
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

  render() {
    const { search, searchResults } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="Enter item to be searched"
          value={search}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.searchSpace}>검색</button>
        <TestItem data={searchResults} />
      </div>
    );
  }
}

export default SerchTestTwo;
