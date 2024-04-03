import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import NotFound from "./components/NotFound.jsx";
import PreviewEnvironment from "./components/PreviewEnvironment.jsx";
import AdBlockerMessage from "./components/AdBlockerMessage.jsx";
import MobileBanner from "./components/MobileBanner.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [loadingError, setLoadingError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // dynamic import for SessionReplay component
  const SessionReplay = React.lazy(() =>
    import("./components/SessionReplay.jsx").catch((error) => {
      setLoadingError(true);
    })
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      console.log('Resize detected, is mobile:', mobile);
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    import("rrweb").catch((error) => {
      console.error('Failed to load rrweb:', error);
      setLoadingError(true);
    });
  }, []);

  if (loadingError) {
    return <AdBlockerMessage />;
  }

  console.log('Rendering App, isMobile:', isMobile);

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
      {isMobile && <MobileBanner />}
    </div>
  );
}

export default App;
