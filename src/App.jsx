import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import PreviewEnvironment from "./components/PreviewEnvironment.jsx";
import SessionReplay from "./components/SessionReplay.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:repo/:issue_number" element={<PreviewEnvironment />} />
					<Route path="/:repo/:issue_number/session-replay/:id" element={<SessionReplay />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
