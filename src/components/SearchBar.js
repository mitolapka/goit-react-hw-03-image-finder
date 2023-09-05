import React, { Component } from 'react';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}



// import React, { useState } from 'react';

// export const Searchbar = ({ onSearch }) => {
//     const [query, setQuery] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     onSearch(query);
//   };

//   return (
//     <header className="Searchbar">
//       <form className="SearchForm" onSubmit={handleSubmit}>
//         <button type="submit" className="SearchForm-button">
//           <span className="SearchForm-button-label">Search</span>
//         </button>
//         <input
//           className="SearchForm-input"
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </form>
//     </header>
//   );
// }


