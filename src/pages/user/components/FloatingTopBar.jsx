import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';

export function FloatingTopBar({ isSidebarCollapsed, onMobileMenuToggle }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  return (
    <div className={`fixed top-0 z-50 flex items-center justify-between bg-white shadow-lg p-3 border-b border-gray-200 transition-all duration-300 ${isSidebarCollapsed ? 'md:left-16' : 'md:left-64'} left-0 right-0`}>
      {/* Left side - Burger menu (mobile) and Page title */}
      <div className="flex items-center space-x-4">
        {/* Burger Menu - Only visible on mobile */}
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
        >
          <FaBars className="w-5 h-5" />
        </button>
        
        {location.pathname === '/ticket' && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 ml-5">Dashboard</h1>
          
          </>
        )}
        {location.pathname === '/file-ticket' && (
          <h1 className="text-xl font-bold text-gray-800">File Ticket</h1>
        )}
        {location.pathname === '/e-application' && (
          <h1 className="text-xl font-bold text-gray-800">E-Application</h1>
        )}
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center space-x-2 lg:space-x-4">
      {/* Notification Icon with Dropdown */}
      <div className="relative" ref={notificationRef}>
        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
        >
          <FaBell className="w-5 h-5" />
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            3
          </span>
        </button>

        {/* Notification Dropdown */}
        {isNotificationOpen && (
          <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                <p className="text-sm text-gray-800 font-medium">New ticket submitted successfully</p>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </div>
              <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                <p className="text-sm text-gray-800 font-medium">Your ticket #12345 has been resolved</p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </div>
              <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm text-gray-800 font-medium">New announcement posted</p>
                <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <Link to="/notifications" className="text-sm text-[#4B663B] hover:text-[#3a5230] font-medium">
                View all notifications
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Profile Icon with Dropdown */}
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
        >
          <FaUser className="w-5 h-5" />
          <span className="text-sm font-medium">John Doe</span>
        </button>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsProfileOpen(false)}
            >
              <FaUser className="w-4 h-4 mr-3 text-gray-500" />
              Profile
            </Link>
            <Link to="/login" >
            <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <FaSignOutAlt className="w-4 h-4 mr-3 text-gray-500" />
              Logout
            </button></Link>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
