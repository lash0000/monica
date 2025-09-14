import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import LandingRoutes from './pages/user/routes/LandingRoutes';
const pageTitles = {
  "/": "Hotels & Condominiums Just for You!",
};

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitles[location.pathname] || "Hotels & Condominiums Just for You!";
  }, [location.pathname]);

  return null;
}

function App() {

  return (
    <Router>
      <TitleUpdater />
      <Routes>
        // {LandingRoutes()}
      </Routes>
    </Router>
  );
}

export default App;