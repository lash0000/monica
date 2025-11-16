import React from "react";


export default function BlotterTicketUrgency() {
  const rows = [
    {
      title: "Low",
      subtitle: "Not urgent",
      color: "bg-green-500",
      description: "This ticket will be on low priority level.",
    },
    {
      title: "Medium",
      subtitle: "Action required",
      color: "bg-yellow-400",
      description: "This ticket will impose that this ticket is something important.",
    },
    {
      title: "High",
      subtitle: "Urgent action required",
      color: "bg-pink-400",
      description: "This ticket will impose that this ticket requires urgent action.",
    },
    {
      title: "Critical",
      subtitle: "",
      color: "bg-red-500",
      description: "This ticket will impose that this ticket is critical urgency.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200">
        <div className="px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Urgency Level</h1>
          <p className="mt-2 text-sm text-gray-600">AI automates but people carry out accuracy.</p>
        </div>
        
        <div className="px-6 pb-6 space-y-4 sm:px-8 sm:pb-8">
          {rows.map((r, idx) => (
            
            <div 
              key={idx} 
              className="flex items-start gap-4 p-4 border border-gray-200 bg-[#F6F6F6] rounded-lg transition duration-200 hover:shadow-md hover:border-indigo-400"
            >
             
              <div className={`w-4 h-4 mt-1.5 rounded-full flex-shrink-0 ${r.color}`} />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold text-gray-900">{r.title}</span>
                    {r.subtitle && (
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {r.subtitle}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{r.description}</p>
              </div>
            </div>
          ))}

          {/* Action buttons */}
          <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-end gap-3">
            <button 
              className="w-full sm:w-auto px-6 py-2 bg-white text-gray-700 font-semibold border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              Close
            </button>
            <button 
              className="w-full sm:w-auto px-6 py-2 bg-[#003161] text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}