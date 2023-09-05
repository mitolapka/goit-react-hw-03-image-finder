import React, { useState } from 'react';
import { Modal } from './Modal';

export const ImageGalleryItem = ({ image }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt={image.tags}
        onClick={openModal} // Відкрити модальне вікно при кліку на зображення
        style={{ cursor: 'pointer' }}
      />
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
          imageSrc={image.webformatURL} 
          imageAlt={image.tags}
        />
      )}
    </li>
  );
};
