// src/App.jsx
import { useEffect, Fragment } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingRoutes from "./pages/user/routes/LandingRoutes";
import AdminRoutes from "./pages/admin/routes/AdminRoutes";
import UserRoutes from "./pages/user/routes/UserRoutes";
import { Toaster } from "sonner";

// socket imports removed

const pageTitles = {
  "/": "Kasama mo sa Pag-unlad! - Barangay Santa Monica mula Quezon City",
};

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title =
      pageTitles[location.pathname] ||
      "Kasama mo sa Pag-unlad! - Barangay Santa Monica mula Quezon City";
  }, [location.pathname]);

  return null;
}

function App() {
  // socket initialization removed entirely

  return (
    <Fragment>
      <TitleUpdater />
      <Toaster position="top-center" richColors />
      <Routes>
        {LandingRoutes()}
        {UserRoutes()}
        {AdminRoutes()}
      </Routes>
    </Fragment>
  );
}

export default App;
