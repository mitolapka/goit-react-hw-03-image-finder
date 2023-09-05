import React, { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose(); 
      }
    };

    const handleClickOutside = (e) => {
      if (e.target === e.currentTarget) {
        onClose(); 
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
};
