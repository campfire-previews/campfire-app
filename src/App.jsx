import React, { useEffect, useState } from "react";
import ben from "../ben/ben";
import NameModal from './components/NameModal';
import DisplayNameBanner from './components/DisplayNameBanner';
import "./App.css";

import { createTheme } from '@mui/material/styles';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';

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
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  }, []);

  const handleNameSubmit = (name) => {
    localStorage.setItem('userName', name);
    setUserName(name);
    setModalVisible(false);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/:repo/:issue_number" element={<PreviewEnvironment />} />
        </Routes>
      </Router>
      <DisplayNameBanner userName={userName} />
      <NameModal isVisible={isModalVisible} onSubmit={handleNameSubmit} />
    </div>
  );
}

export default App;
