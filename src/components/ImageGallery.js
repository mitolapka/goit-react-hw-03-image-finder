import React, { useEffect, useState } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Rings } from 'react-loader-spinner';

export const ImageGallery = ({ apiKey, searchQuery, page, onLoadMore, key }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!searchQuery) return;
    fetchImages();
  }, [apiKey, searchQuery, page, key]);

  const fetchImages = async () => {
    setLoading(true);

    try {
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

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

      // Фільтруємо унікальні зображення і додаємо їх до попереднього списку
      setImages((prevImages) => [...prevImages, ...newImages.filter(newImage => !prevImages.some(prevImage => prevImage.id === newImage.id))]);
      setTotalImages(data.totalHits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    onLoadMore(); // Виклик функції з батьківського компонента для збільшення сторінки
  };

  return (
    <div>
      <ul className="ImageGallery">
        {images.map((image) => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ul>
      {loading && (
        <div className="spinner-container">
          <Rings
            color="#303f9f"
            height="80"
            width="80"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      )}
      {images.length > 0 && images.length < totalImages && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {images.length === 0 && searchQuery && <p>No images found.</p>}
    </div>
  );
};
