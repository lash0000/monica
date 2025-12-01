import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTicketAlt, FaFileAlt, FaChevronDown } from "react-icons/fa";
import { MdEvent, MdHealthAndSafety } from "react-icons/md";

export function Sidebar({ onToggle, isMobileMenuOpen, onMobileMenuClose }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (label) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Your original array extended with expandable support
  const menuItems = [
    {
      path: "/dashboard",
      icon: FaHome,
      label: "Home",
      expandable: false
    },
    {
      icon: FaTicketAlt,
      label: "Ticket",
      expandable: true,
      list: ["Browse", "My Tickets"],
      listPath: ["/ticket", "/my-tickets"]
    },
    {
      icon: FaFileAlt,
      label: "Application",
      expandable: true,
      list: ["My Applications"],
      listPath: ["/my-applications"]
    },
    {
      icon: MdEvent,
      label: "Events",
      expandable: false,
      path: "/events",
    },
    {
      icon: MdHealthAndSafety,
      label: "Telekonsulta",
      expandable: true,
      list: ["My Appointments"],
      listPath: ["/dashboard"]
    },
  ];

  const isExpanded = isHovered || !isCollapsed;
  const isMobileVisible = isMobileMenuOpen;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onToggle) onToggle(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onToggle) onToggle(true);
  };

  const handleMobileClick = () => {
    if (onMobileMenuClose) onMobileMenuClose();
  };

  return (
    <>
      {isMobileVisible && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 md:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      <div
        className={`transition-all duration-300 h-screen flex flex-col fixed left-0 top-0 z-40 bg-background border-r
        ${isMobileVisible ? "w-64" : "md:w-16 w-0 md:block hidden"}
        ${isExpanded && !isMobileVisible ? "md:w-64" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className="p-4 border-b border-foreground/20">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 p-4 space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            // 1. If NOT expandable, render normal menu
            if (!item.expandable) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  onClick={handleMobileClick}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-all duration-300 group relative
                    ${!(isExpanded || isMobileVisible) ? "justify-center" : "justify-start"} 
                    ${isActive ? "bg-white/20 text-foreground" : "text-black"}`
                  }
                >
                  <Icon className="size-5 flex-shrink-0" />
                  <span
                    className={`font-medium transition-all duration-300 
                      ${isExpanded || isMobileVisible ? "ml-3 opacity-100" : "ml-0 opacity-0 w-0 overflow-hidden"}
                    `}
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            }

            // 2. If expandable, render group
            const isOpen = expandedItems.includes(item.label);

            return (
              <div key={item.label}>
                <div
                  onClick={() => toggleExpand(item.label)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all
                  ${isOpen ? "bg-white/20 text-foreground" : "text-black"}
                  ${!(isExpanded || isMobileVisible) ? "justify-center" : "justify-between"}`}
                >
                  <div className="flex items-center">
                    <Icon className="size-5 flex-shrink-0" />
                    {(isExpanded || isMobileVisible) && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </div>

                  {(isExpanded || isMobileVisible) && (
                    <FaChevronDown
                      size={18}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </div>

                {/* SUBMENU */}
                {isOpen && (
                  <div
                    className={`${isExpanded || isMobileVisible ? "block" : "hidden"} 
                    pl-2 mt-1 space-y-1`}
                  >
                    {item.list.map((text, idx) => (
                      <NavLink
                        key={idx}
                        to={item.listPath[idx]}
                        onClick={handleMobileClick}
                        className="block py-2 pl-4 text-sm hover:bg-black/10 rounded"
                      >
                        {text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
