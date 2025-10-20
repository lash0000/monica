import { FaUserCircle, FaBell, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"
import { MdEmail } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../stores/store';

{/* Public Navbar */ }
export function Navbar_Public() {
  const { user } = useAuth();

  return (
    <div id="nav-wrapper" className="sticky top-0 z-50 w-full">
      <nav className="p-3 lg:p-4 shadow-2xs w-full bg-foreground">
        <div className="lg:container lg:mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" >
              <img src="/assets/images/mata.svg" alt="Logo" className="h-10 w-10 mr-2" />
            </Link>

          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-12">
            <Link to="/" className="text-white hover:text-gray-200 transition-colors text-base">Home</Link>
            <Link to="/about" className="text-white hover:text-gray-200 transition-colors text-base">About</Link>
            <Link to="/services" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Services</Link>
            <Link to="/emergency-hotlines" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Contact</Link>
            <a
              href={user ? "/dashboard" : "/login"}
              className="text-white hover:text-gray-200 transition-colors text-base font-bold bg-white/20 px-4 py-2 rounded-md hover:bg-white/30"
            >
              {user?.email || "Login"}
            </a>

          </div>
        </div>
      </nav>
    </div>
  )
}

{/* Authenticated Navbar */ }
export function Navbar_Authenticated() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    // You can add actual logout functionality like clearing tokens, redirecting, etc.
  };

  return (
    <div id="nav-wrapper" className="sticky top-0 z-50 w-full">
      <nav className="p-3 lg:p-4 shadow-2xs w-full bg-foreground">
        <div className="max-w-7xl lg:max-w-[1200px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex justify-between items-center">
          {/* Left Side - Logo and Burger Menu */}
          <div className="flex items-center space-x-4">
            {/* Logo/Brand */}
            <Link to="/" className="flex items-center">
              <img src="/assets/images/mata.svg" alt="Logo" className="h-10 w-10 mr-2" />
            </Link>

            {/* Burger Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:text-gray-200 transition-colors rounded-lg hover:bg-white/10"
              >
                {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </button>

              {/* Menu Dropdown */}
              {isMenuOpen && (
                <div className="absolute left-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <Link
                    to="/ticket"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Home</span>
                  </Link>
                  <Link
                    to="/file-ticket"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Ticket</span>
                  </Link>
                  <Link
                    to="/e-application"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">E-Application</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Notifications and Profile */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Notification Icon with Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-white hover:text-gray-200 transition-colors rounded-lg hover:bg-white/10"
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
                    <Link to="/notifications" className="text-sm text-foreground hover:text-foreground/80 font-medium">
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
                className="flex items-center space-x-2 px-3 py-2 text-white hover:text-gray-200 transition-colors rounded-lg hover:bg-white/10"
              >
                <FaUserCircle className="w-6 h-6" />
                <span className="text-sm lg:text-base font-medium hidden sm:block">John Doe</span>
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
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-3 text-gray-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}


{/* Footer */ }
export function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Account for actual navbar height
      let elementPosition = element.offsetTop - navbarHeight;

      // Special handling for different sections
      if (sectionId === 'announcements') {
        elementPosition = elementPosition - 60; // Larger adjustment for announcements to account for title section
      } else if (sectionId === 'about-barangay') {
        elementPosition = elementPosition - -5; // Larger adjustment for about section to show title properly
      } else if (sectionId === 'contact-us') {
        elementPosition = elementPosition - -5; // Small adjustment for contact section
      } else if (sectionId === 'barangay-officials') {
        elementPosition = elementPosition - -5; // Small adjustment for barangay officials section
      }

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="text-white py-16 xl:py-20 px-6 xl:px-8 bg-foreground border-t border-gray-300" >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16">

        {/* Services */}
        <div className=" ml-20">
          <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white ">Services</h3>
          <ul className="space-y-3 text-sm xl:text-base">
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Barangay Clearance
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Business Permit
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Certificate of Indigency
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Barangay ID
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Resident Certificate
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Building Permit
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="text-left ml-20">
          <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm xl:text-base">
            <li>
              <button
                onClick={() => scrollToSection('incident-report')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('announcements')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                Announcement
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about-barangay')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                About us
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('barangay-officials')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                Officials
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact-us')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                Contact us
              </button>
            </li>
            <li>
              <Link
                to="/emergency-hotlines"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Emergency Hotlines
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="ml-10">
          <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white">Contacts</h3>
          <ul className="space-y-3">
            <li>
              <a href="mailto:stamonica@gmail.com" className="text-white hover:text-gray-200 text-sm xl:text-base transition-colors flex items-center gap-2">
                <MdEmail size={16} />
                <span>stamonica@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+16267464596" className="text-white hover:text-gray-200 text-sm xl:text-base transition-colors flex items-center gap-2">
                <BiSolidContact size={16} />
                <span>+1 6267464596</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white mt-12 xl:mt-16 pt-6 xl:pt-8 text-center">
        <p className="text-sm xl:text-base text-white">© 2025 Barangay Santa Monica. All rights reserved.</p>
      </div>
    </footer>
  )
}

