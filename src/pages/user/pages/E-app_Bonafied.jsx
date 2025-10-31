import React from "react";
// Removed dependency on 'react-router-dom' to prevent environment context errors.
// import { Link } from "react-router-dom";

const BackButton = () => (
  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// Changed color to white for better contrast with colored circles
const CheckIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Changed color to white for better contrast with colored circles
const ClockIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TimelineStep = ({ status, title, description }) => {
  const statusClasses = {
    completed: "bg-green-500",
    current: "bg-blue-500",
    upcoming: "bg-gray-300",
  };

  const StatusIcon = {
    completed: <CheckIcon />,
    current: <ClockIcon />,
    upcoming: null,
  };

  return (
    <div className="flex items-start mb-8 last:mb-0">
      <div className="relative flex-none pt-1"> {/* Added pt-1 to vertically align the circle with text */}
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${statusClasses[status]}`}>
          {StatusIcon[status]}
        </div>
        {/* Adjusted vertical line height to cover the space between steps */}
        <div className={`absolute left-4 top-10 w-px h-full -translate-x-1/2 bg-gray-300 ${status === 'upcoming' ? 'hidden' : ''}`}></div>
      </div>
      <div className="ml-4 pt-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

// Renamed the component to App and made it the default export to fix ReferenceError.
const App = () => {
  const timeline = [
    {
      title: "Application Filed",
      description: "Today at 02:40 PM",
      status: "completed"
    },
    {
      title: "Received Application",
      description: "Under review by administrator",
      status: "current"
    },
    {
      title: "Application Review",
      description: "Pending review by assigned administrator",
      status: "upcoming"
    },
    {
      title: "Final Approval",
      description: "Awaiting final approval",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto p-6 lg:py-12">
        <div className="mb-8">
          {/* Replaced Link with <a> to avoid router context error */}
          <a
            href="#"
            className="group inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
          >
            <BackButton />
            <span className="ml-2 font-medium">Back to Dashboard</span>
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-10 border-b border-gray-100">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">Bonafied Certificate Application</h1>
            <p className="text-gray-500">Track your application status below and see the next steps.</p>
          </div>
          
          <div className="p-6 md:p-10">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Application Timeline</h2>
            <div className="relative">
              {timeline.map((step, index) => (
                <TimelineStep
                  key={index}
                  title={step.title}
                  description={step.description}
                  status={step.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default E_app_Bonafied;
