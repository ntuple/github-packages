import React from 'react';

const LoadingSpinner = ({ small = false }) => {
  const className = `d-flex justify-content-center ${!small ? 'mt-6' : ''}`;
  return (
    <div className={className}>
      <div
        className="spinner-border"
        style={!small ? { width: '10rem', height: '10rem' } : {}}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
