import React, { useState } from "react";

export default function BlotterTicketUnresolved() {
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    console.log("Remarks submitted:", remarks);
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900">Ticket Unresolved</h1>
          <p className="mt-2 text-sm text-gray-600">
            This action can be undone you may able to reopen this ticket.
          </p>
        </div>

        {/* Remarks Section */}
        <div className="px-6">
        <h2 className="text-sm font-medium text-gray-900 mb-3">Remarks</h2>
        <textarea
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        placeholder="Provide some information."
        className="w-full h-32 px-3 py-2 text-sm text-gray-700 bg-[#F6F6F6] border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <div className="flex items-center justify-end gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Close
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-[#003161] rounded-md hover:bg-[#002349] transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}