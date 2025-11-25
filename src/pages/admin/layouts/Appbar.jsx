import { useState, useEffect, useRef } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { FloatingTopBar } from "../components/FloatingTopBar";
import { Footer } from "../components/Navbar";
import UserProfileStore from "../../user/stores/user-profile.store";

function App_Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fetchUserProfile } = UserProfileStore();
  const didFetch = useRef(false);

  // Only call fetch once, do not wait for results
  useEffect(() => {
    if (!didFetch.current) {
      didFetch.current = true;
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");

      if (userId && token) {
        fetchUserProfile(userId, token);
      }
    }
  }, [fetchUserProfile]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div id="admin-wrapper" className="min-h-screen bg-gray-100 flex">
      <Sidebar
        onToggle={setIsSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`flex-1 flex flex-col relative transition-all duration-300 ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
          } ml-0`}
      >
        <FloatingTopBar
          isSidebarCollapsed={isSidebarCollapsed}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
        <main id="admin-main" className="flex-1 p-6 pt-16 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App_Layout;
