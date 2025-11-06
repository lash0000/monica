import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTicketAlt, FaFileAlt } from "react-icons/fa";

export function Sidebar({ onToggle, isMobileMenuOpen, onMobileMenuClose }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onToggle) onToggle(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onToggle) onToggle(true);
  };

  const handleMobileMenuItemClick = () => {
    if (onMobileMenuClose) onMobileMenuClose();
  };

  const menuItems = [
    { path: "/dashboard", icon: FaHome, label: "Home" },
    { path: "/ticket", icon: FaTicketAlt, label: "Ticket" },
    { path: "/e-application", icon: FaFileAlt, label: "E-Application" },
  ];

  const isExpanded = isHovered || !isCollapsed;
  const isMobileVisible = isMobileMenuOpen;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileVisible && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 md:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 h-screen flex flex-col 
          fixed left-0 top-0 z-40 bg-background border-r
          ${isMobileVisible ? "w-64" : "md:w-16 w-0 md:block hidden"}
          ${isExpanded && !isMobileVisible ? "md:w-64" : ""}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header - Logo */}
        <div className="p-4 border-b border-foreground/20">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                end
                onClick={handleMobileMenuItemClick}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-300 group relative ${!(isExpanded || isMobileVisible)
                    ? "justify-center"
                    : "justify-start"
                  } ${isActive ? "bg-white/20 text-foreground" : "text-black"
                  }`
                }
              >
                <Icon className="size-5 flex-shrink-0" />
                <span
                  className={`font-medium transition-all duration-300 ${isExpanded || isMobileVisible
                      ? "ml-3 opacity-100"
                      : "ml-0 opacity-0 w-0 overflow-hidden"
                    }`}
                >
                  {label}
                </span>

                {/* Tooltip when collapsed */}
                {!(isExpanded || isMobileVisible) && (
                  <div
                    className="absolute left-full ml-2 px-2 py-1 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none"
                    style={{ backgroundColor: "var(--foreground)" }}
                  >
                    {label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
