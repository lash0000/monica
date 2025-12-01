import React, { useState } from "react";

export default function App() {
  const [topTab, setTopTab] = useState("E-Application");
  const [subTab, setSubTab] = useState("For Review");
  const [selectedApproved, setSelectedApproved] = useState(null);

  const cards = new Array(4).fill({
    title: "Barangay Clearance",
    status: "Waitlist",
    date: "October 19, 2025",
    name: "Flores, Clarence Kyle M.",
    tag: "Non-Resident",
  });

  const approvedCards = [
    {
      id: 1,
      title: "Business Permit",
      status: "Ready to Claim",
      date: "October 18, 2025",
      name: "Flores, Clarence Kyle M.",
      tag: "Non-Resident",
    },
    {
      id: 2,
      title: "Barangay Clearance",
      status: "Processed",
      date: "October 19, 2025",
      name: "Flores, Clarence Kyle M.",
      tag: "Non-Resident",
    },
    {
      id: 3,
      title: "Barangay Clearance",
      status: "Processed",
      date: "October 19, 2025",
      name: "Flores, Clarence Kyle M.",
      tag: "Non-Resident",
    },
    {
      id: 4,
      title: "Barangay Clearance",
      status: "Processed",
      date: "October 19, 2025",
      name: "Flores, Clarence Kyle M.",
      tag: "Non-Resident",
    },
  ];

  const statusColor = (s) => {
    if (s === "Ready to Claim") return "bg-green-100 text-green-800 border-green-200";
    if (s === "Processed") return "bg-indigo-100 text-indigo-800 border-indigo-200";
    if (s === "Waitlist") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 relative overflow-hidden">
        {/* Top tabs */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-6">
          {["E-Application", "Barangay Services", "Documents"].map((t) => (
            <button
              key={t}
              onClick={() => setTopTab(t)}
              className={
                "text-sm font-medium py-2 px-3 rounded-md " +
                (topTab === t ? "bg-indigo-600 text-white shadow" : "text-gray-600 hover:bg-gray-100")
              }
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {/* Section Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">All Applications</h2>
            <p className="mt-1 text-sm text-gray-500">
              This section provides For Review and Approved applications.
            </p>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center justify-start gap-3 mb-6">
            {["For Review", "Approved"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSubTab(t);
                  setSelectedApproved(null);
                }}
                className={
                  "text-sm font-medium px-4 py-2 rounded-md " +
                  (subTab === t
                    ? "bg-white text-indigo-600 border border-indigo-600 shadow-sm"
                    : "text-gray-600 bg-gray-100 hover:bg-gray-200")
                }
              >
                {t}
              </button>
            ))}
          </div>


          {subTab === "For Review" && (
            <>
              <div className="grid grid-cols-1 gap-4">
                {cards.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-md shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </div>

                      {/* Card body */}
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{c.title}</h3>
                        <div className="mt-1 text-sm text-gray-500">{c.date}</div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="text-sm text-gray-800 font-medium">{c.name}</div>
                          <div className="text-xs text-gray-600 px-2 py-0.5 border border-gray-200 rounded">
                            {c.tag}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 border-t pt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">Showing 1-4 of 12</div>

                <nav className="inline-flex items-center gap-2">
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 border border-gray-200">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 border border-gray-200">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 border border-gray-200">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 border border-gray-200">
                    Next
                  </button>
                </nav>
              </div>
            </>
          )}

          {/* Approved content*/}
          {subTab === "Approved" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approvedCards.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedApproved(c)}
                    className="text-left flex items-center justify-between p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md focus:outline-none"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor(c.status)}`}>
                        {c.status}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{c.title}</h3>
                        <div className="mt-1 text-sm text-gray-500">{c.date}</div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="text-sm text-gray-800 font-medium">{c.name}</div>
                          <div className="text-xs text-gray-600 px-2 py-0.5 border border-gray-200 rounded">{c.tag}</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 border-t pt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">Showing 1-4 of 12</div>

                <nav className="inline-flex items-center gap-2">
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 border border-gray-200">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 border border-gray-200">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 border border-gray-200">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 border border-gray-200">
                    Next
                  </button>
                </nav>
              </div>
            </>
          )}
        </div>
        <aside
          className={`absolute top-0 right-0 h-full w-full md:w-96 bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-200 ${
            selectedApproved ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!selectedApproved}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Application Details</h3>
                <p className="mt-1 text-sm text-gray-500">Approved applications details and actions</p>
              </div>
              <button
                onClick={() => setSelectedApproved(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded"
                aria-label="Close panel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 8.586L15.657 3 17 4.343 11.414 10 17 15.657 15.657 17 10 11.414 4.343 17 3 15.657 8.586 10 3 4.343 4.343 3 10 8.586z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Type</h4>
                  <div className="mt-1 text-base font-semibold text-gray-900">{selectedApproved?.title}</div>
                </div>
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${selectedApproved ? statusColor(selectedApproved.status) : "bg-gray-100 text-gray-800 border-gray-200"}`}>
                    {selectedApproved?.status}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700">Application Date</h4>
                <div className="mt-1 text-sm text-gray-600">{selectedApproved?.date}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700">Applicant</h4>
                <div className="mt-1 flex items-center gap-3">
                  <div className="text-sm font-medium text-gray-900">{selectedApproved?.name}</div>
                  <div className="text-xs text-gray-600 px-2 py-0.5 border border-gray-200 rounded">{selectedApproved?.tag}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700">Notes</h4>
                <textarea
                  className="mt-1 w-full border border-gray-200 rounded p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  rows={4}
                  placeholder="Internal notes or remarks (optional)"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="mt-auto pt-6 flex items-center justify-between gap-4">
              <div className="text-sm text-gray-600">Status: <span className="font-medium text-gray-800">{selectedApproved?.status}</span></div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert("Print action (placeholder)")}
                  className="px-4 py-2 bg-white border border-gray-200 text-sm rounded-md hover:bg-gray-50"
                >
                  Print
                </button>
                <button
                  onClick={() => {
                    alert("Marked as complete (placeholder)");
                    setSelectedApproved(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
