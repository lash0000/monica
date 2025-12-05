import { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { FloatingTopBar } from "../components/FloatingTopBar";
import { Footer } from "../components/Navbar";

function Authenticated_Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Start collapsed for auto-expand
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Hide footer on ticket and file-ticket pages
  const hideFooter = location.pathname === '/ticket' || location.pathname === '/file-ticket';

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div id="authenticated-wrapper" className="min-h-screen bg-gray-100 flex">
      <Sidebar
        onToggle={setIsSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />
      <div className={`flex-1 flex flex-col relative transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} ml-0`}>
        <FloatingTopBar
          isSidebarCollapsed={isSidebarCollapsed}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
        <main id="authenticated-main" className="flex-1 p-6 pt-16 overflow-y-auto">
          <Outlet />
        </main>
        {!hideFooter && <Footer />}
      </div>
    </div>
  )
}

export default Authenticated_Layout;
