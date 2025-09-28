import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"



{/* Navbar */ }
export function Navbar_Public() {
  return (
    <div id="nav-wrapper" className="sticky top-0 z-50 w-full">
      <nav className="p-3 lg:p-4 shadow-2xs w-full" style={{ backgroundColor: '#4B663B' }}>
        <div className="max-w-7xl lg:max-w-[1200px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <img src="/assets/images/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-12">
            <Link to="/dashboard" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Dashboard</Link>
            <Link to="/new-page" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Map View</Link>
            <Link to="/new-page" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Statistics</Link>
            <Link to="/ticket" className="text-white hover:text-gray-200 transition-colors text-sm lg:text-base xl:text-lg 2xl:text-xl">Ticket</Link>


            <Link to="/login" className="text-white hover:text-gray-200 transition-colors">
              <FaUserCircle size={20} className="lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
            </Link>
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
      const navbarHeight = 35; // Account for navbar height
      let elementPosition = element.offsetTop - navbarHeight;

      // Special handling for announcements section
      if (sectionId === 'announcements') {
        elementPosition = elementPosition - -100; // Add extra offset for announcements
      }

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className=" text-white p-6 lg:p-8 xl:p-12" style={{ backgroundColor: '#4B663B' }}>
      <div className="max-w-7xl lg:max-w-[1200px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
        {/* About */}
        <div>
          <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-3 lg:mb-4">Barangay Santa Monica</h3>
          <p className="text-sm lg:text-base xl:text-lg">
            A system for reporting and tracking incidents in your barangay
          </p>
        </div>

        {/* Quick Links */}
        <div className="ml-4 lg:ml-6 xl:ml-8 2xl:ml-12">
          <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-3 lg:mb-4 text-center">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2 text-xs lg:text-sm xl:text-base ml-20">
            <button
              onClick={() => scrollToSection('incident-report')}
              className="text-white hover:text-gray-200 cursor-pointer text-left"
            >
              Report Incident
            </button>
            <button
              onClick={() => scrollToSection('announcements')}
              className="text-white hover:text-gray-200 cursor-pointer text-left"
            >
              Announcements
            </button>
            <button
              onClick={() => scrollToSection('about-barangay')}
              className="text-white hover:text-gray-200 cursor-pointer text-left"
            >
              About Barangay
            </button>
            <button
              onClick={() => scrollToSection('barangay-officials')}
              className="text-white hover:text-gray-200 cursor-pointer text-left"
            >
              Officials
            </button>
            <button
              onClick={() => scrollToSection('contact-us')}
              className="text-white hover:text-gray-200 cursor-pointer text-left"
            >
              Contact Us
            </button>
            <Link to="/" className="text-white hover:text-gray-200 text-left">Dashboard</Link>
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-3 lg:mb-4 lg:ml-20 xl:ml-32 2xl:ml-40">Contacts</h3>
          <ul className="space-y-2 lg:space-y-3">
            <li>
              <a href="mailto:stamonica@gmail.com" className="text-white hover:text-gray-200 lg:ml-20 xl:ml-32 2xl:ml-40 text-xs lg:text-sm xl:text-base 2xl:text-lg">
                ✉️ stamonica@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+18267464596" className="text-white hover:text-gray-200 lg:ml-20 xl:ml-32 2xl:ml-40 text-xs lg:text-sm xl:text-base 2xl:text-lg">
                📞 +1 8267464596
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl lg:max-w-[1200px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto border-t-2 border-white mt-6 lg:mt-8 pt-6 lg:pt-8 text-center">
        <p className="text-sm lg:text-base xl:text-lg">© 2025 Barangay Santa Monica. All rights reserved.</p>
      </div>
    </footer>
  )
}

