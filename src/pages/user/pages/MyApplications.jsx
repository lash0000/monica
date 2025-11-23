import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

const MyApplications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [currentPage, setCurrentPage] = useState(1);

  // Helper function to format date and calculate relative time
  const formatLastUpdate = (date) => {
    const now = new Date();
    const updateDate = new Date(date);
    const diffInMs = now - updateDate;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    // Calculate relative time string
    let relativeTime = '';
    if (diffInSeconds < 60) {
      relativeTime = 'just now';
    } else if (diffInMinutes < 60) {
      relativeTime = `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      relativeTime = `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 7) {
      relativeTime = `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffInWeeks < 4) {
      relativeTime = `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffInMonths < 12) {
      relativeTime = `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    } else {
      relativeTime = `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    }

    // Check if the date is today
    const isToday = updateDate.toDateString() === now.toDateString();

    if (isToday) {
      // Format time as "02:38 PM"
      const hours = updateDate.getHours();
      const minutes = updateDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      const timeString = `${displayHours}:${displayMinutes} ${ampm}`;
      return `${timeString} (${relativeTime})`;
    } else {
      // Format date as "Wed, Oct 1."
      const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      const dayName = days[updateDate.getDay()];
      const monthName = months[updateDate.getMonth()];
      const day = updateDate.getDate();
      return `${dayName}, ${monthName} ${day}. (${relativeTime})`;
    }
  };

  // Applications with actual timestamps
  const applications = [
    {
      id: 1,
      title: 'Application for Barangay Clearance',
      lastUpdateTimestamp: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
      status: 'ongoing',
    },
    {
      id: 2,
      title: 'Application for Business Permit',
      lastUpdateTimestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      status: 'ongoing',
    },
  ];

  const approvedApplications = [
    {
      id: 3,
      title: 'Application for Indigency for Burial Assistance',
      lastUpdateTimestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      status: 'approved',
    },
    {
      id: 4,
      title: 'Application for Ayuda Assistance',
      lastUpdateTimestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'approved',
    },
  ];

  const displayedApplications = activeTab === 'ongoing' ? applications : approvedApplications;

  return (
    <div className="flex items-center justify-center min-h-screen py-8 pb-20" style={{ fontFamily: 'var(--font-geist), Geist, sans-serif' }}>
      <div className="max-w-4xl w-full">
        {/* Main White Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            {/* Reminder Section - Inside the card content area, like autofill */}
            <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: '#E8EAF6' }}>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#50589C' }}>
                  <FiInfo className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Reminder</p>
                  <p className="text-sm text-gray-600">
                    For the non-residents of our barangay we will provide the applicable documents that you will inquire for available services.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('ongoing')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'ongoing'
                    ? 'shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                  style={activeTab === 'ongoing' ? { backgroundColor: '#F4F4F4', color: '#000' } : {}}
                >
                  Ongoing
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'approved'
                    ? 'shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                  style={activeTab === 'approved' ? { backgroundColor: '#F4F4F4', color: '#000' } : {}}
                >
                  Approved
                </button>
              </div>

              {/* Apply Now Button */}
              <button
                onClick={() => navigate('/e-application')}
                className="text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                style={{ backgroundColor: '#50589C' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3d4577'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#50589C'}
              >
                <FaPlus className="w-3.5 h-3.5" />
                Apply Now
              </button>
            </div>

            {/* Applications List */}
            <div className="space-y-4 min-h-[400px]">
              {displayedApplications.length > 0 ? (
                displayedApplications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => navigate(`/my-applications/${app.id}`)}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white cursor-pointer"
                  >
                    {/* Header Bar */}
                    <div className="h-3 w-full" style={{ backgroundColor: '#50589C' }}></div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {app.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Last Update: {formatLastUpdate(app.lastUpdateTimestamp)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <p>No {activeTab === 'ongoing' ? 'ongoing' : 'approved'} applications found.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                &lt; Previous
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors font-bold ${currentPage === 1 ? '' : 'text-gray-700 hover:bg-gray-100'}`}
                  style={currentPage === 1 ? { backgroundColor: '#F4F4F4', color: '#000' } : {}}
                >
                  1
                </button>
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors font-bold ${currentPage === 2 ? '' : 'text-gray-700 hover:bg-gray-100'}`}
                  style={currentPage === 2 ? { backgroundColor: '#F4F4F4', color: '#000' } : {}}
                >
                  2
                </button>
                <button
                  onClick={() => setCurrentPage(3)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors font-bold ${currentPage === 3 ? '' : 'text-gray-700 hover:bg-gray-100'}`}
                  style={currentPage === 3 ? { backgroundColor: '#F4F4F4', color: '#000' } : {}}
                >
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;

