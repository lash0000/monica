import { MdEmail } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';

// Footer component
export function Footer() {
  return (
    <footer className="text-white py-16 xl:py-20 px-6 xl:px-8 bg-foreground border-t border-gray-300" >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16">

        {/* Services */}
        <div className=" ml-20">
          <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white ">Admin Panel</h3>
          <ul className="space-y-3 text-sm xl:text-base">
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Ticket Management
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                User Management
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="text-left ml-20">
          <h3 className="text-xl xl:text-2xl font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm xl:text-base">
            <li>
              <a href="/admin" className="text-white hover:text-gray-200 transition-colors">
                Admin Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/tickets" className="text-white hover:text-gray-200 transition-colors">
                Tickets
              </a>
            </li>
            <li>
              <a href="/admin/users" className="text-white hover:text-gray-200 transition-colors">
                Users
              </a>
            </li>
            <li>
              <a href="/admin/settings" className="text-white hover:text-gray-200 transition-colors">
                Settings
              </a>
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

