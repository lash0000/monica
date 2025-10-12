import { Bell, User, CreditCard, PanelLeft, PanelLeftClose } from "lucide-react"
import { useState, useRef, useEffect } from "react"

function Navbar({ onToggleSidebar, isCollapsed }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications])

  // Sample notification data
  const notifications = [
    { id: 1, title: "New message received", time: "5 minutes ago", unread: true },
    { id: 2, title: "System update completed", time: "1 hour ago", unread: true },
    { id: 3, title: "Your report is ready", time: "2 hours ago", unread: false },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Welcome Message with Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <PanelLeft className="w-5 h-5 text-gray-600" />
          ) : (
            <PanelLeftClose className="w-5 h-5 text-gray-600" />
          )}
        </button>

        <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-gray-800 font-normal text-sm">Welcome to Barangay Santa Monica Services</h1>
      </div>

      {/* Right Section - Notifications & User */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>

          {/* Notification Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread</p>}
              </div>

              {/* Notification List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${notification.unread ? "bg-blue-50" : ""
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p
                          className={`text-sm ${notification.unread ? "font-semibold text-gray-900" : "text-gray-700"}`}
                        >
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-200">
                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <button
          className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
          aria-label="User menu"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  )
}

export default Navbar;
