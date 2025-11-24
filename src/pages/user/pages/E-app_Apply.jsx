import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFileAlt, FaDollarSign, FaInfoCircle } from "react-icons/fa";

// TODO: Make this page reliable for application_service VALUES
// Make ApplicationForm.jsx be accomplish.

export const services = [
  {
    id: "barangay-clearance",
    title: "Barangay Clearance",
    icon: <FaFileAlt className="w-8 h-8 text-white" />,
  },
];

const ServiceCard = ({ id, title, icon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const base_path = location.pathname;

  return (
    <button
      type="button"
      onClick={() => navigate(`${base_path}/${id}`)}
      className="bg-white rounded-lg p-8 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
    >
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-center text-gray-800 font-medium">{title}</h3>
    </button>
  );
};


export default function E_app_Apply() {

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[#50589C] text-white rounded-lg p-4 mb-8">
        <div className="flex items-center">
          <FaInfoCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">Reminder</span>
        </div>
        <p className="mt-2 text-sm">
          Before proceeding, please ensure that you have provided all required information in your profile.
        </p>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Available Barangay Services</h2>
        <span className="text-sm px-3 py-1 bg-gray-100 rounded">Bonafide</span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            icon={service.icon}
          />
        ))}
      </div>
    </main>

  );
}

