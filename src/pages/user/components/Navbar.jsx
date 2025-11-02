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

{/* Footer */ }
export function Footer() {
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
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                Announcement
              </button>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                About us
              </button>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                Officials
              </button>
            </li>
            <li>
              <button
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
        <p className="text-sm xl:text-base text-white">© 2025 Barangay Santa Monica of Quezon City. All rights reserved.</p>
      </div>
    </footer>
  )
}

