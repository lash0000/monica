import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LandingRoutes from './pages/user/routes/LandingRoutes';
import AdminRoutes from './pages/admin/routes/AdminRoutes';
import UserRoutes from './pages/user/routes/UserRoutes';

const pageTitles = {
  "/": "Kasama mo sa Pag-unlad! - Barangay Santa Monica mula Quezon City",
};

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitles[location.pathname] || "Kasama mo sa Pag-unlad! - Barangay Santa Monica mula Quezon Cit";
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        {LandingRoutes()}
        {UserRoutes()}
        {AdminRoutes()}
      </Routes>
    </Router>
  );
}

export default App;
