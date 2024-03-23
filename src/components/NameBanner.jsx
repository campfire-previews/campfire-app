import React from 'react';

const NameBanner = ({ userName, onClick }) => {
  return (
    <div className="name-banner" onClick={onClick}>
      visiting campfire as {userName}
    </div>
  );
};

export default NameBanner;
