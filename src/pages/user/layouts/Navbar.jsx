 import { Outlet } from "react-router-dom";
 
function Navbar() {
  return (
    <nav className="bg-primary p-4">
      <div className="max-w-7xl mx-auto flex justify-end space-x-8">
        <a href="#" className="text-white hover:text-gray-200">Dashboard</a>
        <a href="#" className="text-white hover:text-gray-200">Map View</a>
        <a href="#" className="text-white hover:text-gray-200">Notifications</a>
        <a href="#" className="text-white hover:text-gray-200">Statistics</a>
        <a href="#" className="text-white hover:text-gray-200">Profile</a>
      </div>
    </nav>
  )
}

export default Navbar;