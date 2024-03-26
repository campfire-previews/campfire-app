import React, { useState } from 'react';

const NameBanner = ({ userName, onClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = (event) => {
    event.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`name-banner ${isCollapsed ? 'name-banner-collapsed' : ''}`}>
      <button className="name-banner-collapse-toggle-button" onClick={handleToggleCollapse}>
        <i className={`fas ${isCollapsed ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
      </button>
      <span className={isCollapsed ? 'name-banner-hidden' : ''}>
        visiting campfire as {userName}
      </span>
      {!isCollapsed && (
        <button className="name-banner-edit-button" onClick={onClick}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      )}
    </div>
  );
};

export default NameBanner;
