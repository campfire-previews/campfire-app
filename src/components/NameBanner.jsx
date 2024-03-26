import React, { useState } from 'react';

const NameBanner = ({ userName, onClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = (event) => {
    event.stopPropagation();  // prevent onClick from being triggered when toggling collapse
    setIsCollapsed(!isCollapsed);
  };

  const handleBannerClick = (event) => {
    if (!isCollapsed) {
      onClick(event);
    }
  };

  return (
    <div className={`name-banner ${isCollapsed ? 'name-banner-collapsed' : ''}`} onClick={handleBannerClick}>
      <button className="name-banner-collapse-toggle-button" onClick={handleToggleCollapse}>
        <i className={`fas ${isCollapsed ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
      </button>
      <span className={isCollapsed ? 'name-banner-hidden' : ''}>
        visiting campfire as {userName}
      </span>
    </div>
  );
};

export default NameBanner;
