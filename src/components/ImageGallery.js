import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Rings } from 'react-loader-spinner';

export class ImageGallery extends Component {
  render() {
    const { images, loading, searchQuery } = this.props;

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
        {!loading && images.length < this.props.totalImages && (
  <Button onLoadMore={this.props.onLoadMore} />
)}
        {images.length === 0 && searchQuery && !loading && <p>No images found.</p>}

      </div>
    );
  }
}
