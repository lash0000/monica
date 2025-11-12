import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaDollarSign, FaInfoCircle } from "react-icons/fa";

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

const services = [
  {
    id: "barangay-clearance",
    title: "Barangay Clearance",
    icon: <FaFileAlt className="w-8 h-8 text-white" />,
  },
  {
    id: "business-permit",
    title: "Business Permit",
    icon: <FaFileAlt className="w-8 h-8 text-white" />,
  },
  {
    id: "cedula",
    title: "Cedula",
    icon: <FaFileAlt className="w-8 h-8 text-white" />,
  },
  {
    id: "certificate-residency",
    title: "Certificate of Residency",
    icon: <FaFileAlt className="w-8 h-8 text-white" />,
  },
  {
    id: "indigency",
    title: "Indigency",
    icon: <FaFileAlt className="w-8 h-8 text-white" />,
  },
  {
    id: "cash-assistance",
    title: "Cash Assistance Program",
    icon: <FaDollarSign className="w-8 h-8 text-white" />,
  },
];

export default function E_app_Apply() {
  const navigate = useNavigate();

  const handleSelectService = (serviceId) => {
    if (serviceId === "barangay-clearance") {
      navigate("/e-application/barangay-clearance");
      return;
    }
    if (serviceId === "cash-assistance") {
      navigate("/ayuda-programs");
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
            <FaInfoCircle className="w-5 h-5 mr-2" />
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

