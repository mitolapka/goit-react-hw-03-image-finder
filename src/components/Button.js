import React from 'react';

export const Button = ({ onLoadMore }) => {
  return (
    <div className="btn-container">
      <button type="button" className="Button" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
}

