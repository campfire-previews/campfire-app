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
      padding: '20px' 
    }}>
      Howdy camper!<br></br>
      We recommend disabling your ad blocker when using this site<br></br>
      Our app uses the rrweb library, which may cause our app to blocked by ad blocker extensions<br></br>
    </div>
  );
}

export default AdBlockerMessage;
