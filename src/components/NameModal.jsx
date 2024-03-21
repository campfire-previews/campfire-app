import React, { useState, useEffect } from 'react';

const NameModal = ({ isVisible, onSubmit, defaultName }) => {
  const [name, setName] = useState(defaultName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setName(defaultName);
    setIsEditing(!!localStorage.getItem('userName'));
    setError(''); // Reset error message when modal is opened or defaultName changes
  }, [defaultName, isVisible]);

  const handleOutsideClick = (event) => {
    if (!event.target.closest('#name-modal-content') && isEditing && name) {
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
  }, [isVisible, isEditing, name]);

  const handleSubmit = () => {
    event.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
   // console.log('username: ', name);
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
          <input type="text" value={name} onChange={(e) => {
            setName(e.target.value);
            setError('');  // clear error when user starts typing
          }} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">{isEditing ? 'save changes' : 'join the campfire'}</button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;