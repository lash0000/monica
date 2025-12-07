import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaMapMarkerAlt, FaPaperPlane, FaTimes, FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../components/Breadcrumb';
import AppointmentSchedule from '../components/AppointmentCalendar';
import { useAppointmentStore } from '../stores/Appointment.store';

export default function FileAppointment() {
  const addMyAppointment = useAppointmentStore((state) => state.addMyAppointment);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    description: '',
  });

  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate?.datetime) {
      toast.error("Please choose a schedule date.");
      return;
    }

    const { date, time } = selectedDate;

    function convertTo24Hour(timeStr) {
      const [hourMin, modifier] = timeStr.split(" ");
      let [hour, minute] = hourMin.split(":");
      hour = parseInt(hour, 10);
      if (modifier === "PM" && hour !== 12) hour += 12;
      if (modifier === "AM" && hour === 12) hour = 0;
      return `${hour.toString().padStart(2, "0")}:${minute}`;
    }

    const time24 = convertTo24Hour(time);
    const timestamp = `${date}T${time24}:00+08:00`;

    const payload = {
      category: formData.category,
      date_scheduled: timestamp,
      details: formData.description
    };

    try {
      await addMyAppointment(payload);
      toast.success("Appointment successfully filed!");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to submit appointment.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4">
      <div className="container lg:mx-auto lg:max-w-2xl ">
        <Breadcrumb className="my-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/telekonsulta">Appoint</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Appointment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div
            className={`p-8 text-white transition-colors ${formData.category === "Complaint" || formData.category === "Incident-Report"
              ? "bg-red-500"
              : "bg-secondary"
              }`}
          >
            <h1 className="text-xl font-bold mb-1">Telekonsulta</h1>
            <p className="text-sm opacity-90">
              Para sa ating barangay health center online appointment.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
              >

                <option value="" disabled className="hidden">Select</option>
                <option value="General-Consultation">Consultation</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Internal-Medicine">Internal Medicine</option>
                <option value="OB-Gyne">OB-Gyne</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Dental">Dental</option>
                <option value="Mental-Health">Mental Health</option>
                <option value="Follow-Up">Follow-Up Consultation</option>
                <option value="Prescription-Request">Prescription Request</option>
                <option value="Laboratory-Review">Laboratory Result Review</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Concern Details */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Details *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ipahayag ang lahat ng mga detalye"
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-y"
              />
            </div>
            {/* Date Schedule */}
            <div className="">
              <AppointmentSchedule
                holidays={{ "2025-12-8": "Events: Ayuda" }}
                onSelect={(dateObj) => setSelectedDate(dateObj)}
              />
            </div>


            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button className="bg-secondary text-white border-none rounded-md px-4 py-2 text-sm font-semibold cursor-pointer inline-flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
                <FaPaperPlane />
                Proceed
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
