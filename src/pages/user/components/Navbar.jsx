import { FaUserCircle, FaBell, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../stores/store';

/* Public Navbar */
export function Navbar_Public() {
  const { accessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  // Function to scroll to a section smoothly
  const scrollToSection = (sectionId) => {
    if (sectionId === 'home' || sectionId === 'top') {
      if (isLandingPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        navigate('/');
      }
      return;
    }

    if (isLandingPage) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset =
          sectionId === 'services' ? 60 :
            sectionId === 'contact-us' ? 70 :
              sectionId === 'barangay-officials' ? 45 :
                sectionId === 'community-news' ? 65 :
                  sectionId === 'about' ? 50 :
                    sectionId === 'ayuda' ? 60 :
                      80;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });

        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      sessionStorage.setItem('scrollToSection', sectionId);
      navigate('/');
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <div id="nav-wrapper" className="sticky top-0 z-50 w-full">
      <nav className="p-3 lg:p-4 shadow-2xs w-full bg-foreground">
        <div className="lg:container lg:mx-auto flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" >
              <img src="/assets/images/mata.svg" alt="Logo" className="h-10 w-10 mr-2" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-12">
            <button
              onClick={(e) => handleNavClick(e, 'home')}
              className="text-white hover:text-gray-200 transition-colors text-base cursor-pointer bg-transparent border-none"
            >
              Home
            </button>

            <button
              onClick={(e) => handleNavClick(e, 'about')}
              className="text-white hover:text-gray-200 transition-colors text-base cursor-pointer bg-transparent border-none"
            >
              About
            </button>

            <button
              onClick={(e) => handleNavClick(e, 'services')}
              className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base cursor-pointer bg-transparent border-none"
            >
              Services
            </button>

            <button
              onClick={(e) => handleNavClick(e, 'contact-us')}
              className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base cursor-pointer bg-transparent border-none"
            >
              Contact
            </button>

            {/* LOGIN / DASHBOARD BASED ON TOKEN */}
            <a
              href={accessToken ? "/dashboard" : "/login"}
              className="text-white hover:text-gray-200 transition-colors text-base font-bold bg-white/20 px-4 py-2 rounded-md hover:bg-white/30"
            >
              {accessToken ? "Dashboard" : "Login"}
            </a>

          </div>
        </div>
      </nav>
    </div>
  );
}

/* Footer */
export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home' || sectionId === 'top') {
      if (isLandingPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        navigate('/');
      }
      return;
    }

    if (isLandingPage) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset =
          sectionId === 'services' ? 60 :
            sectionId === 'contact-us' ? 70 :
              sectionId === 'barangay-officials' ? 45 :
                sectionId === 'community-news' ? 65 :
                  sectionId === 'about' ? 50 :
                    80;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });

        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      sessionStorage.setItem('scrollToSection', sectionId);
      navigate('/');
    }
  };

  const handleFooterClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="text-white py-16 xl:py-20 px-6 xl:px-8 bg-foreground border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16">

        {/* Services */}
        <div className="ml-20">
          <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white">Services</h3>
          <ul className="space-y-3 text-sm xl:text-base">
            <li><button onClick={(e) => handleFooterClick(e, 'services')} className="text-white hover:text-gray-200">Barangay Clearance</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'services')} className="text-white hover:text-gray-200">Business Permit</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'services')} className="text-white hover:text-gray-200">Certificate of Indigency</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'services')} className="text-white hover:text-gray-200">Barangay ID</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'services')} className="text-white hover:text-gray-200">Resident Certificate</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'services')} className="text-white hover:text-gray-200">Building Permit</button></li>
          </ul>
        </div>

        {/* Links */}
        <div className="text-left ml-20">
          <h3 className="text-xl xl:text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm xl:text-base">
            <li><button onClick={(e) => handleFooterClick(e, 'home')} className="text-white hover:text-gray-200">Home</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'community-news')} className="text-white hover:text-gray-200">Latest News & Events</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'about')} className="text-white hover:text-gray-200">About us</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'barangay-officials')} className="text-white hover:text-gray-200">Barangay Officials</button></li>
            <li><button onClick={(e) => handleFooterClick(e, 'contact-us')} className="text-white hover:text-gray-200">Contact us</button></li>
            <li><Link to="/emergency-hotlines" className="text-white hover:text-gray-200">Emergency Hotlines</Link></li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="ml-10">
          <h3 className="text-xl xl:text-2xl font-bold mb-4">Contacts</h3>
          <ul className="space-y-3">
            <li><a href="mailto:stamonica@gmail.com" className="text-white hover:text-gray-200 flex items-center gap-2"><MdEmail size={16} /> <span>stamonica@gmail.com</span></a></li>
            <li><a href="tel:+16267464596" className="text-white hover:text-gray-200 flex items-center gap-2"><BiSolidContact size={16} /> <span>+1 6267464596</span></a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white mt-12 pt-6 text-center">
        <p className="text-sm xl:text-base">© 2025 Barangay Santa Monica of Quezon City. All rights reserved.</p>
      </div>
    </footer>
  );
}
