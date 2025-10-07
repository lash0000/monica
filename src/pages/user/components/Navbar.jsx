import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"
import { MdEmail } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';

{/* Navbar */ }
export function Navbar_Public() {
  return (
    <div id="nav-wrapper" className="sticky top-0 z-50 w-full">
      <nav className="p-3 lg:p-4 shadow-2xs w-full" style={{ backgroundColor: '#4B663B' }}>
        <div className="max-w-7xl lg:max-w-[1200px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" >          
              <img src="/assets/images/mata.svg" alt="Logo" className="h-10 w-10 mr-2" />
            </Link>

          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-12">
            <Link to="/" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Home</Link>
            <Link to="/about" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">About</Link>
            <Link to="/services" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Services</Link>
            <Link to="/emergency-hotlines" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Contact</Link>
            <Link to="/login" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl mr-5 font-bold bg-white/20 px-4 py-2 rounded-md hover:bg-white/30">Login</Link>

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
    <footer className="text-white py-16 xl:py-20 px-6 xl:px-8 bg-[#4B663B]" >
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
        <p className="text-sm xl:text-base text-white">© 2025 Incident Reporting System. All rights reserved.</p>
      </div>
    </footer>
  )
}

