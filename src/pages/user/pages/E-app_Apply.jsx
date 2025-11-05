import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-white rounded-lg p-8 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
  >
    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-center text-gray-800 font-medium">{title}</h3>
  </button>
);

const DocumentIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const services = [
  {
    id: "barangay-clearance",
    title: "Barangay Clearance",
    icon: <DocumentIcon />,
  },
  {
    id: "business-permit",
    title: "Business Permit",
    icon: <DocumentIcon />,
  },
  {
    id: "cedula",
    title: "Cedula",
    icon: <DocumentIcon />,
  },
  {
    id: "certificate-residency",
    title: "Certificate of Residency",
    icon: <DocumentIcon />,
  },
  {
    id: "indigency",
    title: "Indigency",
    icon: <DocumentIcon />,
  },
];

export default function E_app_Apply() {
  const navigate = useNavigate();

  const handleSelectService = (serviceId) => {
    if (serviceId === "barangay-clearance") {
      navigate("/e-application/barangay-clearance");
      return;
    }
    // Placeholder for other services
    // You can route them similarly when pages are ready
  };

  return (
   
  

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reminder Box */}
        <div className="bg-[#50589C] text-white rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Reminder</span>
          </div>
          <p className="mt-2 text-sm">
            Before proceeding, please ensure that you have provided all required information in your profile.
          </p>
        </div>

        {/* Services Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Available Barangay Services</h2>
          <span className="text-sm px-3 py-1 bg-gray-100 rounded">Bonafide</span>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              icon={service.icon}
              onClick={() => handleSelectService(service.id)}
            />
          ))}
        </div>
      </main>
  
  );
}

