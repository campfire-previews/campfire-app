import React, { useState, useEffect } from 'react';

const NameModal = ({ isVisible, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    event.preventDefault();
    console.log('username: ', name);
    onSubmit(name);
  };

  if (!isVisible) return null;

  return (
    <div className="name-modal-overlay">
      <div id="name-modal-content" className="name-modal-content">
        <form onSubmit={handleSubmit}>
          <h1>welcome to campfire!</h1>
          <h2>what is your name? (for comments)</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleSubmit}>join the campfire</button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;