import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { FloatingTopBar } from "../components/FloatingTopBar";
import { Footer } from "../components/Navbar";

function App_Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle mobile menu toggle
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
      <div className={`flex-1 flex flex-col relative transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} ml-0`}>
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
  )
}

export default App_Layout;
