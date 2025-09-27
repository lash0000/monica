import { Link } from "react-router-dom"

export function Navbar_Public() {
  return (
    <div id="nav-wrapper">
      <nav className="bg-green-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-end space-x-8">
          <Link to="/" className="text-white hover:text-gray-200">Dashboard</Link>
          <Link to="/new-page" className="text-white hover:text-gray-200">Map View</Link>
          <Link to="/new-page" className="text-white hover:text-gray-200">Notifications</Link>
          <Link to="/new-page" className="text-white hover:text-gray-200">Statistics</Link>
          <Link to="/new-page" className="text-white hover:text-gray-200">Profile</Link>
          <Link to="/login" className="text-white hover:text-gray-200">Sign In</Link>
        </div>
      </nav>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-green-700 text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">Barangay Santa Monica</h3>
          <p className="text-base">
            A system for reporting and tracking incidents in your barangay
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center">Quick Links</h3>
          <ul className="space-y-2 text-center">
            <li><Link to="/" className="text-white hover:text-gray-200">Dashboard</Link></li>
            <li><Link to="/new-page" className="text-white hover:text-gray-200">Report Incident</Link></li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-2xl font-bold mb-4 ml-40">Contacts</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:stamonica@gmail.com" className="text-white hover:text-gray-200 ml-40">
                ✉️ stamonica@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+18267464596" className="text-white hover:text-gray-200 ml-40">
                📞 +1 8267464596
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t-2 border-white mt-8 pt-8 text-center">
        <p>© 2025 Barangay Santa Monica. All rights reserved.</p>
      </div>
    </footer>
  )
}

