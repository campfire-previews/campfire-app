import React, { useState, useEffect } from 'react';

const NameModal = ({ isVisible, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log('username: ', name);
    onSubmit(name);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('#name-modal-content')) {
      onSubmit(name);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="name-modal-overlay">
      <div id="name-modal-content" className="name-modal-content">
        <h2>Howdy! Enter Your Name:</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default NameModal;