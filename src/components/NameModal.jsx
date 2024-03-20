import React, { useState, useEffect } from 'react';

const NameModal = ({ isVisible, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log('username: ', name);
    onSubmit(name);
  };

  const handleOutsideClick = (event) => {
    // Check if the click is outside the modal content using the ID
    if (!event.target.closest('#modal-content')) {
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div id="modal-content" style={{ backgroundColor: 'white', padding: 20 }}>
        <h2>Howdy!  Enter Your Name:</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default NameModal;