// App.js
import React, { Component } from 'react';
import { Searchbar } from './SearchBar';
import { ImageGallery } from './ImageGallery';

const API_KEY = '38400499-9377fca084918dc6c22b9bff8';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [], 
      searchQuery: '',
      page: 1,
      key: 0,
    };
  }

  handleSearch = (query) => {
    this.setState({
      images: [], 
      searchQuery: query,
      page: 1,
      key: this.state.key + 1,
    });
  };

  loadMoreImages = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  render() {
    const { images, searchQuery, page, key } = this.state;

    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery apiKey={API_KEY} searchQuery={searchQuery} page={page} onLoadMore={this.loadMoreImages} key={key} images={images} />
      </div>
    );
  }
}



// import React, { useState } from 'react';
// import { Searchbar } from './SearchBar';
// import { ImageGallery } from './ImageGallery';

// const API_KEY = '38400499-9377fca084918dc6c22b9bff8';

// export const App = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const [key, setKey] = useState(0); 


//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setPage(1);
//     setKey((prevKey) => prevKey + 1);
//   };

//   const loadMoreImages = () => {
//     setPage(page + 1);
//   };

//   return (
//     <div className="App">
//       <Searchbar onSearch={handleSearch} />
      
//       <ImageGallery apiKey={API_KEY} searchQuery={searchQuery} page={page} onLoadMore={loadMoreImages}   key={key} /> 
//     </div>
//   );
// };
