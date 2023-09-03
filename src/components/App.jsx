import React, { useState } from 'react';
import { Searchbar } from './SearchBar';
import { ImageGallery } from './ImageGallery';

const API_KEY = '38400499-9377fca084918dc6c22b9bff8';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const handleSearch = (query) => {
     setImages([]);
    setSearchQuery(query);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage(page + 1);
  };


  return (
    <div className="App">
      <Searchbar onSearch={handleSearch} />
      <ImageGallery apiKey={API_KEY} searchQuery={searchQuery} page={page} onLoadMore={loadMoreImages} images={images} />
    </div>
  );
};
