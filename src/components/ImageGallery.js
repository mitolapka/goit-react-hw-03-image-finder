import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Rings } from 'react-loader-spinner';

export class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      totalImages: 0,
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps) {
    // Перемістіть ваши методи в componentDidUpdate
    if (
      prevProps.apiKey !== this.props.apiKey ||
      prevProps.searchQuery !== this.props.searchQuery ||
      prevProps.page !== this.props.page ||
      prevProps.componentKey !== this.props.componentKey
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ loading: true });

    try {
      const url = `https://pixabay.com/api/?key=${this.props.apiKey}&q=${encodeURIComponent(
        this.props.searchQuery
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.props.page}&per_page=12`;

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
        images: [
          ...prevState.images,
          ...newImages.filter(
            (newImage) =>
              !prevState.images.some((prevImage) => prevImage.id === newImage.id)
          ),
        ],
        totalImages: data.totalHits,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.props.onLoadMore();
  };

  render() {
    const { images, loading, totalImages } = this.state;
    const { searchQuery } = this.props;
if (!searchQuery || images === null) {
    return null; // Не отображать ничего, если нет запроса или изображений пока нет
  }
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
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {images.length === 0 && searchQuery && <p>No images found.</p>}
      </div>
    );
  }
}


// import React, { useEffect, useState } from 'react';
// import { ImageGalleryItem } from './ImageGalleryItem';
// import { Button } from './Button';
// import { Rings } from 'react-loader-spinner';

// export const ImageGallery = ({ apiKey, searchQuery, page, onLoadMore, componentKey }) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalImages, setTotalImages] = useState(0);

//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);

//       try {
//         const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
//           searchQuery
//         )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.totalHits === 0) {
//           console.log('No images found.');
//           return;
//         }

//         const newImages = data.hits.map((image) => ({
//           id: image.id,
//           webformatURL: image.webformatURL,
//           tags: image.tags,
//           likes: image.likes,
//           views: image.views,
//           comments: image.comments,
//           downloads: image.downloads,
//         }));

//         setImages((prevImages) => [...prevImages, ...newImages.filter(newImage => !prevImages.some(prevImage => prevImage.id === newImage.id))]);
//         setTotalImages(data.totalHits);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!searchQuery) return;
//     fetchImages();
//   }, [apiKey, searchQuery, page, componentKey]);

//   const handleLoadMore = () => {
//     onLoadMore(); 
//   };


//   return (
//     <div>
//       <ul className="ImageGallery">
//         {images.map((image) => (
//           <ImageGalleryItem key={image.id} image={image} />
//         ))}
//       </ul>
//       {loading && (
//         <div className="spinner-container">
//           <Rings
//             color="#303f9f"
//             height="80"
//             width="80"
//             radius="6"
//             wrapperStyle={{}}
//             wrapperClass=""
//             visible={true}
//             ariaLabel="rings-loading"
//           />
//         </div>
//       )}
//       {images.length > 0 && images.length < totalImages && (
//         <Button onLoadMore={handleLoadMore} />
//       )}
//       {images.length === 0 && searchQuery && <p>No images found.</p>}
//     </div>
//   );
// };
