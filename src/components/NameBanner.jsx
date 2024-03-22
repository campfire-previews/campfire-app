import React from 'react';

const NameBanner = ({ userName, onClick }) => {
  if (!userName) return null;

  return (
    <div className="display-name-banner" onClick={onClick}>
      visiting campfire as {userName}
    </div>
  );
};

export default NameBanner;
