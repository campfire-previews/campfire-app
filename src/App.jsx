import React from "react";
import "./App.css";
import NotFound from "./components/NotFound.jsx";
import PreviewEnvironment from "./components/PreviewEnvironment.jsx";
import SessionReplay from "./components/SessionReplay.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:repo/:issue_number" element={<PreviewEnvironment />} />
          <Route
            path="/:repo/:issue_number/session-replay/:id"
            element={<SessionReplay />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
