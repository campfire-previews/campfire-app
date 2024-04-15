import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import SessionReplay from "./components/SessionReplay.jsx";
import { isMobile, isTablet } from "react-device-detect";
import NotFound from "./components/NotFound.jsx";
import PreviewEnvironment from "./components/PreviewEnvironment.jsx";
import AdBlockerMessage from "./components/AdBlockerMessage.jsx";
import MobileBanner from "./components/MobileBanner.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [loadingError, setLoadingError] = useState(false);

  const SessionReplay = React.lazy(() =>
    import("./components/SessionReplay.jsx").catch((error) => {
      setLoadingError(true);
    })
  );

  useEffect(() => {
    import("rrweb").catch((error) => {
      console.error("Failed to load rrweb:", error);
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
            path="/:repo/:issue_number/session-replay/:id"
            element={
              <Suspense fallback={<div>Loading Session Replay...</div>}>
                <SessionReplay />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {(isMobile || isTablet) && <MobileBanner />}
    </div>
  );
}

export default App;
