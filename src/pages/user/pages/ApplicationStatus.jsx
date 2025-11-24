import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { useApplicationStore } from '../stores/Application.store'; // adjust path

export default function ApplicationStatus() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { applications, myApplication } = useApplicationStore();

  const userId = localStorage.getItem("user_id");

  // Fetch applications if not yet loaded
  useEffect(() => {
    if (applications.length === 0 && userId) {
      myApplication(userId);
    }
  }, [applications.length, userId]);

  // Dynamically find the application by ID
  const selectedApp = useMemo(() => {
    return applications.find((a) => a.id === id);
  }, [applications, id]);

  // Timeline stays static as requested
  const staticTimeline = [
    {
      id: 1,
      status: 'Application Filed',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
      completed: true,
    },
    {
      id: 2,
      status: 'Received Application',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      completed: true,
    },
    {
      id: 3,
      status: 'Under Review',
      timestamp: null,
      completed: false,
    },
    {
      id: 4,
      status: 'Approved',
      timestamp: null,
      completed: false,
    },
  ];

  // If the page loads before data is ready
  if (!selectedApp) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading application...
      </div>
    );
  }

  // Helper formats from your original code
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

    let relativeTime = '';
    if (diffInSeconds < 60) relativeTime = 'just now';
    else if (diffInMinutes < 60) relativeTime = `${diffInMinutes} minutes ago`;
    else if (diffInHours < 24) relativeTime = `${diffInHours} hours ago`;
    else if (diffInDays < 7) relativeTime = `${diffInDays} days ago`;
    else if (diffInWeeks < 4) relativeTime = `${diffInWeeks} weeks ago`;
    else if (diffInMonths < 12) relativeTime = `${diffInMonths} months ago`;
    else relativeTime = `${diffInYears} years ago`;

    const isToday = updateDate.toDateString() === now.toDateString();

    if (isToday) {
      const hours = updateDate.getHours();
      const minutes = updateDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      return `${displayHours}:${displayMinutes} ${ampm} (${relativeTime})`;
    } else {
      const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      const dayName = days[updateDate.getDay()];
      const monthName = months[updateDate.getMonth()];
      const day = updateDate.getDate();
      return `${dayName}, ${monthName} ${day}. (${relativeTime})`;
    }
  };

  const formatTimelineTime = (date) => {
    const updateDate = new Date(date);
    const hours = updateDate.getHours();
    const minutes = updateDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    const timeString = `${displayHours}:${displayMinutes} ${ampm}`;

    const now = new Date();
    const diffInMs = now - updateDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return `${timeString} (${diffInHours} hours ago)`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8 pb-20" style={{ fontFamily: 'var(--font-geist), Geist, sans-serif' }}>
      <div className="max-w-4xl w-full mt-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 pb-24">
            <button
              onClick={() => navigate('/my-applications')}
              className="mb-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: '#50589C', color: '#fff' }}
            >
              <MdArrowBack className="w-4 h-4" />
              Back
            </button>

            {/* Dynamic Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Application for {selectedApp.application_service}
            </h1>

            {/* Dynamic Last Update */}
            <p className="text-sm text-gray-500 mb-6">
              Last Update: {formatLastUpdate(selectedApp.updatedAt)}
            </p>

            {/* Static Timeline */}
            <div className="relative">
              <div className="absolute left-1.5 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#E5E7EB' }}></div>

              <div className="space-y-8 pb-16">
                {staticTimeline.map((item) => (
                  <div key={item.id} className="relative flex items-start gap-4">
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full ${item.completed ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                      ></div>
                    </div>

                    <div className="flex-1 pt-1">
                      <p className="text-sm text-gray-600">
                        {item.status}
                        {item.timestamp && (
                          <span className="ml-2 text-gray-500">
                            as of {formatTimelineTime(item.timestamp)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
