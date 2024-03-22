import React from 'react';

const DisplayNameBanner = ({ userName, onClick }) => {
  if (!userName) return null;

  return (
    <div className="display-name-banner" onClick={onClick}>
      visiting campfire as {userName}
    </div>
  );
};

export default DisplayNameBanner;
