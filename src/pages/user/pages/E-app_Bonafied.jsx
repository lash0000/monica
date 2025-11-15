import React from 'react';

const E_app_Bonafied = () => {
  const timelineEvents = [
    {
      status: "Application Filed as of 02:40 PM (7 hours ago)",
      completed: true,
      isGray: true
    },
    {
      status: "Received Application",
      completed: true,
      isGray: true
    },
    {
      status: "Reviewed by Admin 4567899",
      completed: true,
      isGray: true
    },
    {
      status: "Application for Review was assigned to Admin 8675321",
      completed: true,
      isGray: true
    },
    {
      status: "Approved Application",
      completed: true,
      isGray: false
    }
  ];

  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 mb-6"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Application for Indigency for Burial Assistance
          </h1>
          <p className="text-gray-400 text-sm">
            Last Update: Tues, 06:38 PM (7 hours ago)
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex items-start mb-8 last:mb-0">
              <div className="flex flex-col items-center mr-6 mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                {index !== timelineEvents.length - 1 && (
                  <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <p className={`text-base ${event.isGray ? 'text-gray-400' : 'text-gray-900 font-medium'}`}>
                  {event.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default E_app_Bonafied;