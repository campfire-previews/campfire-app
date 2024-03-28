function AdBlockerMessage() {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0,
      right: 0,
      backgroundColor: '#F36464',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '20px',
      lineHeight: '1.25em',
    }}>
      Howdy camper! We recommend disabling your ad blocker when using this site<br></br>
      Certain features of our app may not load when an ad blocker is enabled<br></br>
    </div>
  );
}

export default AdBlockerMessage;
