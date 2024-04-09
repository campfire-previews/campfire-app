function MobileBanner() {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0,
      right: 0,
      backgroundColor: '#007bff',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '20px'
    }}>
      For the best experience please<br></br>
      visit campfire on a desktop browser
    </div>
  );
}

export default MobileBanner;
