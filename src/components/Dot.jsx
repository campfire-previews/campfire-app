function Dot({ isDotVisible }) {
  return <div id="dot" className={isDotVisible ? "visible" : "hidden"}></div>;
}

export default Dot;
