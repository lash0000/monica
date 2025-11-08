import { FaUserCircle, FaBell, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { MdEmail } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../stores/store';

{/* Public Navbar */ }
export function Navbar_Public() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  // Function to scroll to a section smoothly
  const scrollToSection = (sectionId) => {
    if (sectionId === 'home' || sectionId === 'top') {
      // Scroll to top for Home
      if (isLandingPage) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        // Clear hash from URL
        window.history.pushState(null, '', '/');
      } else {
        navigate('/');
      }
      return;
    }

    if (isLandingPage) {
      // If already on landing page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        // For services section, use a smaller offset to position title right below navbar
        // For contact-us section, use 70px offset (10px higher than standard)
        // For barangay-officials section, use 45px offset (15px higher than 60px, 35px higher than standard)
        // For community-news section, use 65px offset
        // For community-gallery section, use 50px offset (15px higher than 65px)
        // For other sections, use standard offset
        const offset = sectionId === 'services' ? 60 : 
                       sectionId === 'contact-us' ? 70 : 
                       sectionId === 'barangay-officials' ? 45 : 
                       sectionId === 'community-news' ? 65 : 
                       sectionId === 'community-gallery' ? 50 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
          behavior: 'smooth'
        });
        // Update URL hash without triggering navigation
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      // If not on landing page, navigate to landing page
      // Store the section ID to scroll to after navigation
      sessionStorage.setItem('scrollToSection', sectionId);
      navigate('/');
      // Scroll will be handled by LandingV2 component after navigation
    }
  };

  // Handle navigation clicks
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

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
            <button 
              onClick={(e) => handleNavClick(e, 'home')} 
              className="text-white hover:text-gray-200 transition-colors text-base cursor-pointer bg-transparent border-none outline-none p-0 font-normal"
            >
              Home
            </button>
            <button 
              onClick={(e) => handleNavClick(e, 'community-gallery')} 
              className="text-white hover:text-gray-200 transition-colors text-base cursor-pointer bg-transparent border-none outline-none p-0 font-normal"
            >
              About
            </button>
            <button 
              onClick={(e) => handleNavClick(e, 'services')} 
              className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl cursor-pointer bg-transparent border-none outline-none p-0 font-normal"
            >
              Services
            </button>
            <button 
              onClick={(e) => handleNavClick(e, 'contact-us')} 
              className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl cursor-pointer bg-transparent border-none outline-none p-0 font-normal"
            >
              Contact
            </button>
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

{/* Footer */ }
export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  // Function to scroll to a section smoothly (same as Navbar)
  const scrollToSection = (sectionId) => {
    if (sectionId === 'home' || sectionId === 'top') {
      // Scroll to top for Home
      if (isLandingPage) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', '/');
      } else {
        navigate('/');
      }
      return;
    }

    if (isLandingPage) {
      // If already on landing page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        // For services section, use a smaller offset to position title right below navbar
        // For contact-us section, use 70px offset (10px higher than standard)
        // For barangay-officials section, use 45px offset (15px higher than 60px, 35px higher than standard)
        // For community-news section, use 65px offset
        // For community-gallery section, use 50px offset (15px higher than 65px)
        // For other sections, use standard offset
        const offset = sectionId === 'services' ? 60 : 
                       sectionId === 'contact-us' ? 70 : 
                       sectionId === 'barangay-officials' ? 45 : 
                       sectionId === 'community-news' ? 65 : 
                       sectionId === 'community-gallery' ? 50 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
          behavior: 'smooth'
        });
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      // If not on landing page, navigate to landing page
      // Store the section ID to scroll to after navigation
      sessionStorage.setItem('scrollToSection', sectionId);
      navigate('/');
      // Scroll will be handled by LandingV2 component after navigation
    }
  };

  // Handle footer link clicks
  const handleFooterClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="text-white py-16 xl:py-20 px-6 xl:px-8 bg-foreground border-t border-gray-300" >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16">

        {/* Services */}
        <div className=" ml-20">
          <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white ">Services</h3>
          <ul className="space-y-3 text-sm xl:text-base">
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'services')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                Barangay Clearance
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'services')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                Business Permit
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'services')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                Certificate of Indigency
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'services')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                Barangay ID
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'services')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                Resident Certificate
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'services')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                Building Permit
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="text-left ml-20">
          <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm xl:text-base">
            <li>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'community-news')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                Announcement
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'community-gallery')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                About us
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'barangay-officials')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
              >
                Officials
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFooterClick(e, 'contact-us')}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left"
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
        <p className="text-sm xl:text-base text-white">© 2025 Barangay Santa Monica of Quezon City. All rights reserved.</p>
      </div>
    </footer>
  )
}

