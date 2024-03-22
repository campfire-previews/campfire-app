import React, { useEffect, useState } from "react";
import NameModal from './components/NameModal';
import DisplayNameBanner from './components/DisplayNameBanner';
import Toolbox from './components/Toolbox'; 
import "./App.css";

import Dashboard from "./components/Dashboard.jsx";
import PreviewEnvironment from "./components/PreviewEnvironment.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState(''); 

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    } else {
      setModalVisible(true);
    }
  }, []);

  const handleNameSubmit = (name) => {
    localStorage.setItem('userName', name);
    setUserName(name);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/:repo/:issue_number" element={<PreviewEnvironment />} />
        </Routes>
      </Router>
      <DisplayNameBanner userName={userName} onClick={toggleModal} />
      {!isModalVisible && <Toolbox />}
      {isModalVisible && 
        <NameModal isVisible={isModalVisible} onSubmit={handleNameSubmit} defaultName={userName} />
      }
    </div>
  );
}

export default App;
