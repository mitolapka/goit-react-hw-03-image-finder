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
      loading: false, 
    };
  }

  handleSearch = (query) => {
    this.setState(
      {
        images: [],
        searchQuery: query,
        page: 1,
        loading: false, 
      },
      this.fetchImages
    );
  };

  fetchImages = async () => {
  const { searchQuery, page } = this.state;
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.totalHits === 0) {
      console.log('No images found.');
      return;
    }

    const newImages = data.hits.map((image) => ({
      id: image.id,
      webformatURL: image.webformatURL,
      tags: image.tags,
      likes: image.likes,
      views: image.views,
      comments: image.comments,
      downloads: image.downloads,
    }));

    this.setState((prevState) => ({
      images: [...prevState.images, ...newImages],
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; 
  }
};


  loadMoreImages = async () => {
  this.setState({
    page: this.state.page + 1,
    loading: true, 
  });

  try {
    await this.fetchImages();
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    this.setState({ loading: false });
  }
};


  render() {
    const { images, searchQuery, loading } = this.state;

    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery
          searchQuery={searchQuery}
          onLoadMore={this.loadMoreImages}
          images={images}
          loading={loading} 
        />
      </div>
    );
  }
}
