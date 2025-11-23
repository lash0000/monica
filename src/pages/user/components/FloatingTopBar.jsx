import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useAuth } from "../stores/store";
import UserProfileStore from "../stores/user-profile.store";

export function FloatingTopBar({ isSidebarCollapsed, onMobileMenuToggle }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const location = useLocation();
  const base_path = location.pathname;
  const navigate = useNavigate();

  const { user, accessToken, logout } = useAuth();
  const { profile, loading: profileLoading, fetchUserProfile } = UserProfileStore();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ---------------------------------------------------------
  // LOAD PROFILE ONCE — ONLY when dashboard is mounted
  // ---------------------------------------------------------
  useEffect(() => {
    if (!user?.user_id || !accessToken) return;
    fetchUserProfile(user.user_id, accessToken);
  }, [user?.user_id, accessToken, fetchUserProfile]);

  // ---------------------------------------------------------
  // HANDLE CLICK OUTSIDE
  // ---------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------------------------------------------------
  // LOGOUT HANDLER
  // ---------------------------------------------------------
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setTimeout(() => {
        setIsLoggingOut(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  // ---------------------------------------------------------
  // DISPLAY NAME HANDLER (Last First M.)
  // ---------------------------------------------------------

  const formatDisplayName = (p) => {
    if (!p || !p.userProfile || !p.userProfile.name) return null;

    const { first = "", middle = "", last = "" } = p.userProfile.name;
    const middleInitial = middle ? `${middle.charAt(0).toUpperCase()}.` : "";

    return `${last} ${first} ${middleInitial}`.trim();
  };

  const displayName =
    profileLoading
      ? "Loading..."
      : profile?.userProfile
        ? formatDisplayName(profile)
        : "User";


  return (
    <div
      className={`fixed top-0 z-50 flex items-center justify-between bg-white shadow-lg p-3 border-b border-gray-200 transition-all duration-300 ${isSidebarCollapsed ? "md:left-16" : "md:left-64"
        } left-0 right-0`}
    >
      {/* LEFT SECTION */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FaBars className="w-5 h-5" />
        </button>

        {location.pathname === "/Dashboard" && (
          <h1 className="text-3xl font-bold text-gray-800 ml-5">Home</h1>
        )}
        {location.pathname === "/Ticket" && (
          <h1 className="text-xl font-bold text-gray-800">Ticket</h1>
        )}
        {location.pathname === "/E-Application" && (
          <h1 className="text-xl font-bold text-gray-800">E-Application</h1>
        )}

        {profile && profile.userProfile === null && (
          <div className="px-4 py-2 bg-red-600 text-white rounded-full text-sm select-none ">
            Kindly provide your profile information first!
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* NOTIFICATION */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <FaBell className="size-5" />
            <div className="hidden">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                0
              </span>
            </div>

          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 shadow-xl rounded-xl py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
              </div>

              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                  <p className="text-sm font-medium">New ticket submitted successfully</p>
                  <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-gray-100">
                <Link to="/notifications" className="text-sm text-[#4B663B] hover:text-[#3a5230] font-medium">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <FaUser className="w-5 h-5" />
            <span className="text-sm font-medium">{displayName}</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 shadow-xl rounded-xl py-2 z-50">
              <Link
                to="/profile"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <FaUser className="w-4 h-4 mr-3 text-gray-500" />
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <FaSignOutAlt className="w-4 h-4 mr-3 text-gray-500" />
                Logout
              </button>
            </div>
          )}

          {/* LOGOUT MODAL */}
          {isLoggingOut && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
              <div className="bg-white px-8 py-6 rounded-xl shadow-lg flex flex-col items-center space-y-3 border">
                <svg className="animate-spin h-6 w-6 text-secondary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <p className="text-gray-700 font-medium">Logging out...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
