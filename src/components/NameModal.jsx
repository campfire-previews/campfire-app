import React, { useState, useEffect } from 'react';

const NameModal = ({ isVisible, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log('username: ', name);
    onSubmit(name);
  };

  if (!isVisible) return null;

  return (
    <div className="name-modal-overlay">
      <div id="name-modal-content" className="name-modal-content">
        <h2>Hello there! Please enter your name:</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default NameModal;