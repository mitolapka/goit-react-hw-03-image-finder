import React, { useState, useEffect } from 'react';
import { Searchbar } from './SearchBar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';

const API_KEY = '38400499-9377fca084918dc6c22b9bff8';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const handleSearch = (query) => {
    setImages([]);
    setSearchQuery(query);
    setPage(1);
    setLoading(false);
    setTotalImages(0);
  };
  useEffect(() => {
    const fetchImages = async () => {
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

        setImages((prevImages) => [...prevImages, ...newImages]);
        setLoading(false);
        setTotalImages(data.totalHits);
      } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
      }
    };
     if (searchQuery && (searchQuery !== '' || page !== 1)) {
    fetchImages();
  }
  }, [searchQuery, page]);

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <Searchbar onSearch={handleSearch} />
      <ImageGallery
        onLoadMore={loadMoreImages}
        images={images}
        loading={loading}
        searchQuery={searchQuery}
        totalImages={totalImages}
        onImageClick={openModal}
      />
      {modalIsOpen && selectedImage && (
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
          imageSrc={selectedImage.webformatURL}
          imageAlt={selectedImage.tags}
        />
      )}
    </div>
  );
};

