import React, { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    if (this.props.isOpen) {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('click', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, imageSrc, imageAlt, onClose } = this.props;

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
  }
}



// import React, { useEffect } from 'react';

// export const Modal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') {
//         onClose(); 
//       }
//     };

//     const handleClickOutside = (e) => {
//       if (e.target === e.currentTarget) {
//         onClose(); 
//       }
//     };

//     if (isOpen) {
//       window.addEventListener('keydown', handleKeyDown);
//       window.addEventListener('click', handleClickOutside);
//     }

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('click', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="Overlay" onClick={onClose}>
//       <div className="Modal">
//         <img src={imageSrc} alt={imageAlt} />
//       </div>
//     </div>
//   );
// };
