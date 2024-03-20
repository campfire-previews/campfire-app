import React, { useEffect, useState } from "react";
// import ben from "../ben/ben";
import "./App.css";

// import { createTheme } from '@mui/material/styles';

// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';

import Dashboard from "./components/Dashboard.jsx";
import PreviewEnvironment from "./components/PreviewEnvironment.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/:repo/:issue_number" element={<PreviewEnvironment />} />
      </Routes>
    </Router>
  );
}

export default App;
