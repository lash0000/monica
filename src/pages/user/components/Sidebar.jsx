import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTicketAlt, FaFileAlt } from 'react-icons/fa';

export function Sidebar({ onToggle }) {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();


  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onToggle) {
      onToggle(false); // Expand when hovered
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onToggle) {
      onToggle(true); // Collapse when not hovered
    }
  };

  const menuItems = [
    { path: '/ticket', icon: FaHome, label: 'Home', shortcut: 'H' },
    { path: '/file-ticket', icon: FaTicketAlt, label: 'Ticket', shortcut: 'T' },
    { path: '/e-application', icon: FaFileAlt, label: 'E-Application', shortcut: 'E' },
  ];

  const isActive = (path) => location.pathname === path;
  const isExpanded = isHovered || !isCollapsed;

  return (
    <div 
      className={`text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'} h-screen flex flex-col fixed left-0 top-0 z-40`}
      style={{ backgroundColor: '#4B663B' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header - Logo */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-gray-800 font-bold text-sm">SM</span>
          </div>
          {isExpanded && (
            <div className="ml-3">
              <h1 className="text-lg font-bold">Santa Monica</h1>
              <p className="text-xs text-white-400">Barangay System</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 group relative ${
                  !isExpanded ? 'justify-center' : 'justify-start'
                } ${
                  isActive(item.path) 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className={`font-medium transition-all duration-300 ${isExpanded ? 'ml-3 opacity-100' : 'ml-0 opacity-0 w-0 overflow-hidden'}`}>
                  {item.label}
                </span>
                {isExpanded && (
                  <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded transition-all duration-300">
                    {item.shortcut}
                  </span>
                )}
                {!isExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none" style={{ backgroundColor: '#3a5230' }}>
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
