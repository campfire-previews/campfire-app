import React, { useState, useEffect } from 'react';

const NameModal = ({ isVisible, onSubmit, defaultName }) => {
  const [name, setName] = useState(defaultName || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setName(defaultName);
    setIsEditing(!!localStorage.getItem('userName'));
  }, [defaultName]);

  const handleOutsideClick = (event) => {
    if (!event.target.closest('#name-modal-content') && isEditing) {
      onSubmit(name);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible, isEditing]);

  const handleSubmit = () => {
    event.preventDefault();
    console.log('username: ', name);
    onSubmit(name);
    window.dispatchEvent(new CustomEvent('username-set'));
  };

  if (!isVisible) return null;

  return (
    <div className="name-modal-overlay" onClick={handleOutsideClick}>
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