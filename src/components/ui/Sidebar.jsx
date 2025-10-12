import { Home, LogOut, CreditCard } from "lucide-react"

function Sidebar({ isCollapsed, setIsCollapsed }) {
  return (
    <aside
      className={`${isCollapsed ? "w-14" : "w-64"} h-screen bg-gray-200 flex flex-col transition-all duration-300`}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-gray-300">
        <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && <span className="ml-3 text-teal-700 font-semibold text-lg">monica.</span>}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        <button
          className="w-full flex items-center justify-center px-4 py-3 hover:bg-gray-300 transition-colors"
          aria-label="Home"
        >
          <Home className="w-5 h-5 text-gray-700 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3 text-gray-700 font-medium flex-1 text-left">Home</span>}
        </button>
      </nav>

      {/* Logout Section */}
      <div className="border-t border-gray-300">
        <button className="w-full flex items-center justify-center px-4 py-3 hover:bg-gray-300 transition-colors">
          <LogOut className="w-5 h-5 text-gray-700 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3 text-gray-700 font-medium flex-1 text-left">Log out</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar;
