import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import PreviewEnvironment from "./components/PreviewEnvironment.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:repo/:issue_number" element={<PreviewEnvironment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
