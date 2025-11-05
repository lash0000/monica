import React from "react";
import { useNavigate } from "react-router-dom";
import { FaKitMedical, FaTooth } from "react-icons/fa6";

const Card = ({ title, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full max-w-md mx-auto border-2 border-secondary rounded-lg px-10 py-8 flex flex-col items-center gap-4 bg-white hover:shadow-md focus:outline-none"
  >
    <div className="text-black">{icon}</div>
    <div className="text-sm font-semibold text-secondary">{title}</div>
  </button>
);

const MedicalIcon = () => <FaKitMedical className="w-16 h-16" />;
const DentalIcon = () => <FaTooth className="w-14 h-14" />;

export default function E_Health() {
  const navigate = useNavigate();

  return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-10">
          <Card
            title="Medical Appointment"
            icon={<MedicalIcon />}
            onClick={() => navigate("/e-health/medical")}
          />

          <Card
            title="Dental Appointment"
            icon={<DentalIcon />}
            onClick={() => navigate("/e-health/dental")}
          />
        </div>
      </main>
  );
}


