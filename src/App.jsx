import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LandingRoutes from './pages/user/routes/LandingRoutes';
import AdminRoutes from './pages/admin/routes/AdminRoutes';

const pageTitles = {
  "/": "Santa Monica | Umaagos ang Pag Asa",
};

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitles[location.pathname] || "Barangay Santa Monica | Umaagos ang Pag Asa";
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        {LandingRoutes()}
        {AdminRoutes()}
      </Routes>
    </Router>
  );
}

export default App;
