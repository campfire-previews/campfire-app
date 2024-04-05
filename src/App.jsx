import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import NotFound from "./components/NotFound.jsx";
import PreviewEnvironment from "./components/PreviewEnvironment.jsx";
import AdBlockerMessage from "./components/AdBlockerMessage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [loadingError, setLoadingError] = useState(false);

  // dynamic import for SessionReplay component
  const SessionReplay = React.lazy(() =>
    import("./components/SessionReplay.jsx").catch((error) => {
      setLoadingError(true);
    })
  );

  useEffect(() => {
    // dynamic import for rrweb
    import("rrweb").catch((error) => {
      setLoadingError(true);
    });
  }, []);

  if (loadingError) {
    return <AdBlockerMessage />;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:repo/:issue_number" element={<PreviewEnvironment />} />
          <Route
            path="/:repo/:issue_number/session_replay/:id"
            element={
              <Suspense fallback={<div>Loading Session Replay...</div>}>
                <SessionReplay />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
