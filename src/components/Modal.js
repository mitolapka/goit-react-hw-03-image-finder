import React, { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose(); // Закрити модальне вікно при натисканні клавіші ESC
      }
    };

    const handleClickOutside = (e) => {
      if (e.target === e.currentTarget) {
        onClose(); // Закрити модальне вікно при кліку на оверлей
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={imageSrc} alt={imageAlt}/>
      </div>
    </div>
  );
};
