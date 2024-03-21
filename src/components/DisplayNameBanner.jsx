import React from 'react';

const DisplayNameBanner = ({ userName }) => {
  if (!userName) return null;

  return (
    <div className="display-name-banner">
      visiting campfire as {userName}
    </div>
  );
};

export default DisplayNameBanner;
