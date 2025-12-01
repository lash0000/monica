import React from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApplicationRecords() {
  const navigate = useNavigate();
 
  // Mock Data matching the screenshot
  const applications = [
    {
      id: 1,
      name: "Flores, Clarence Kyle M.",
      status: "Non Resident",
      service: "Barangay Clearance",
      date: "October 14, 2025",
      avatar: "https://cdn.midjourney.com/60d92410-2e62-4747-b87d-9029e607247a/0_0.png"
    },
    {
      id: 2,
      name: "Bandibad, Mhel",
      status: "Bonafide",
      service: "Certificate of Residency",
      date: "October 14, 2025",
      avatar: "https://cdn.midjourney.com/60d92410-2e62-4747-b87d-9029e607247a/0_0.png"
    },
    {
      id: 3,
      name: "Gamba, Richelle",
      status: "Non Resident",
      service: "Cedula",
      date: "October 14, 2025",
      avatar: "https://cdn.midjourney.com/60d92410-2e62-4747-b87d-9029e607247a/0_0.png"
    },
    {
      id: 4,
      name: "Sembrano, Vincent Irah",
      status: "Bonafide",
      service: "Indigency for Burial Assistance",
      date: "October 14, 2025",
      avatar: "https://cdn.midjourney.com/60d92410-2e62-4747-b87d-9029e607247a/0_0.png"
    },
    {
      id: 5,
      name: "Salvador, Roel",
      status: "Bonafide",
      service: "Business Permit",
      date: "October 14, 2025",
      avatar: "https://cdn.midjourney.com/60d92410-2e62-4747-b87d-9029e607247a/0_0.png"
    },
    {
      id: 6,
      name: "Bose, John Lander G.",
      status: "Bonafide",
      service: "Business Permit",
      date: "October 14, 2025",
      avatar: "https://cdn.midjourney.com/60d92410-2e62-4747-b87d-9029e607247a/0_0.png"
    },
    {
      id: 7,
      name: "Gilo, John Lloyd",
      status: "Bonafide",
      service: "Business Permit",
      date: "October 14, 2025",
      avatar: "https://cdn.midjourney.com/60d92410-2e62-4747-b87d-9029e607247a/0_0.png"
    }
  ];

  const handleViewRecord = (app) => {
    // navigate to the admin ApplicationForReview route and pass the application data in state
    // Admin routes register this page at `/admin/applications/:id`
    navigate(`/admin/applications/${app.id}`, { state: { application: app } });
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-8 font-sans text-gray-800">
      
      {/* Header */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['E-Application', 'Barangay Services', 'Document'].map((tag) => (
          <span 
            key={tag} 
            className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">Application Records</h1>
        <p className="text-gray-500 text-sm md:text-base">All of the document service application goes here.</p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors w-full md:w-auto justify-center">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-[30%]">Applicants</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-[25%]">Barangay Service</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-[20%]">Issuance Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-[15%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={app.avatar} 
                        alt={app.name} 
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-bold text-gray-900 text-sm">{app.name}</span>
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">
                          {app.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-gray-900">{app.service}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-gray-900">{app.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleViewRecord(app)}
                      className="px-5 py-2.5 bg-[#172B70] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1A3485] transition-colors duration-200 active:scale-95"
                      aria-label={`View record for ${app.name}`}
                    >
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page number footer */}
      <div className="flex justify-end items-center mt-6 gap-2">
        <button className="flex items-center gap-1 px-3 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        
        <button className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-sm font-bold shadow-sm ring-1 ring-gray-200">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
          3
        </button>
        <div className="w-8 h-8 flex items-center justify-center text-gray-400">
          <MoreHorizontal className="w-4 h-4" />
        </div>
        
        <button className="flex items-center gap-1 px-3 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm">
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
