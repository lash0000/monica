import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { myApplication } from '../stores/Application.store';

const MyApplications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [currentPage, setCurrentPage] = useState(1);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 5;

  const userId = localStorage.getItem("user_id");

  // Fetch user applications
  useEffect(() => {
    const fetchApps = async () => {
      if (!userId) return;

      setLoading(true);
      const res = await myApplication(userId);

      if (res.success) {
        setApplications(res.applications || []);
      }

      setLoading(false);
    };

    fetchApps();
  }, [userId]);

  // -----------------------------
  // FORMAT DATE
  // -----------------------------
  const formatLastUpdate = (date) => {
    const now = new Date();
    const d = new Date(date);
    const diff = now - d;

    const seconds = Math.floor(diff / 1000);
    const mins = Math.floor(seconds / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let rel = '';
    if (seconds < 60) rel = 'just now';
    else if (mins < 60) rel = `${mins} minutes ago`;
    else if (hours < 24) rel = `${hours} hours ago`;
    else if (days < 7) rel = `${days} days ago`;
    else if (weeks < 4) rel = `${weeks} weeks ago`;
    else if (months < 12) rel = `${months} months ago`;
    else rel = `${years} years ago`;

    const isToday = d.toDateString() === now.toDateString();

    if (isToday) {
      const h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hh = h % 12 || 12;
      return `${hh}:${m} ${ampm} (${rel})`;
    } else {
      const daysMap = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      const monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      return `${daysMap[d.getDay()]}, ${monthsMap[d.getMonth()]} ${d.getDate()}. (${rel})`;
    }
  };

  // -----------------------------
  // SEPARATE APPLICATIONS BY STATUS
  // -----------------------------
  const ongoingStatuses = ['for-review', 'withdrawn', 'rejected'];
  const approvedStatuses = ['approved'];

  const ongoingApps = applications.filter(app => ongoingStatuses.includes(app.status));
  const approvedApps = applications.filter(app => approvedStatuses.includes(app.status));

  const displayedApplications =
    activeTab === 'ongoing' ? ongoingApps : approvedApps;

  // -----------------------------
  // PAGINATION
  // -----------------------------
  const totalPages = Math.ceil(displayedApplications.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedApplications = displayedApplications.slice(startIndex, endIndex);

  // Reset page when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="flex items-center justify-center min-h-screen py-8 pb-20"
      style={{ fontFamily: 'var(--font-geist), Geist, sans-serif' }}>
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">

            {/* Reminder */}
            <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: '#E8EAF6' }}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#50589C' }}>
                  <FiInfo className="size-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Reminder</p>
                  <p className="text-sm text-gray-600">
                    This is still in development phase.
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('ongoing')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${activeTab === 'ongoing' ? 'shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                  style={activeTab === 'ongoing' ? { backgroundColor: '#F4F4F4', color: '#000' } : {}}
                >
                  Ongoing
                </button>

                <button
                  onClick={() => setActiveTab('approved')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all 
                  ${activeTab === 'approved' ? 'shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                  style={activeTab === 'approved' ? { backgroundColor: '#F4F4F4', color: '#000' } : {}}
                >
                  Approved
                </button>
              </div>

              <button
                onClick={() => navigate('/e-application')}
                className="text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                style={{ backgroundColor: '#50589C' }}
              >
                <FaPlus className="w-3.5 h-3.5" />
                Apply Now
              </button>
            </div>

            {/* App List */}
            <div className="space-y-4 min-h-[400px]">
              {loading ? (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  Loading applications...
                </div>
              ) : paginatedApplications.length > 0 ? (
                paginatedApplications.map(app => (
                  <div
                    key={app.id}
                    onClick={() => navigate(`/my-applications/${app.id}`)}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white cursor-pointer"
                  >
                    <div className="h-3 w-full" style={{ backgroundColor: '#50589C' }}></div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Application for {app.application_service}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Last Update: {formatLastUpdate(app.updatedAt)}
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
            {totalPages > 1 && (
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-end gap-3">

                {/* Previous */}
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  &lt; Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`px-3 py-1.5 text-sm rounded transition-colors font-bold
                      ${currentPage === num ? '' : 'text-gray-700 hover:bg-gray-100'}`}
                      style={currentPage === num ? { backgroundColor: '#F4F4F4', color: '#000' } : {}}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Next &gt;
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
