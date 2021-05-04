import React from "react";
import './SearchBar.css';
 

export class SearchBar extends React.Component {
  // 70
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.search = this.search.bind(this);    
    // 72
    this.handleTermChange = this.handleTermChange.bind(this);    
  }
  
  // 69 ???correct??? who calls this method???
  search() {
    const term = this.state.searchTerm;
    this.props.onSearch(term);
  }

  // 71 ???correct???
  handleTermChange(e) {
    const term = e.target.value;
    this.setState(
      { searchTerm: term } 
      );
  }
  
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}