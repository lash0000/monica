import { useState } from 'react';

function Dashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Healthcare',
    concernDetails: '',
    attachments: []
  });

  const dashboardStats = [
    { label: 'Resolved', count: 1, info: 'Tickets that have been successfully resolved and closed' },
    { label: 'Pending', count: 1, info: 'Tickets that are currently being reviewed and awaiting action' },
    { label: 'Archived', count: 3, info: 'Tickets that have been archived for record keeping' }
  ];

  const blotterStats = [
    { label: 'Resolved', count: 0, info: 'Blotter reports that have been resolved' },
    { label: 'Unresolved', count: 1, info: 'Blotter reports that are still pending resolution' },
    { label: 'Pending', count: 1, info: 'Blotter reports currently under review' },
    { label: 'Archived', count: 2, info: 'Blotter reports that have been archived' }
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.subject || !formData.concernDetails) {
      alert('Please fill out all required fields');
      return;
    }
    console.log('Form submitted:', formData);
    setIsPopupOpen(false);
    setFormData({
      subject: '',
      category: 'Healthcare',
      concernDetails: '',
      attachments: []
    });
  };

  const clearAll = () => {
    setFormData({
      subject: '',
      category: 'Healthcare',
      concernDetails: '',
      attachments: []
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-500">Status overview of your ticket activities</p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Purple Card - Traffic Category (Added hover effects) */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg min-h-[280px] flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              <span className="inline-block bg-opacity-30 text-white text-xs px-3 py-1 rounded-full mb-4 self-start border border-white border-opacity-40 font-medium">
                Traffic Advisory
              </span>
              <h3 className="text-2xl font-bold mb-3 leading-tight">
                Narito ang ulat-trapiko para sa ating barangay
              </h3>
              <p className="text-purple-100 text-sm mb-6">
                Mula sa prediskyon ng Artificial Intelligence.
              </p>
              <button className="bg-white text-purple-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors inline-flex items-center gap-2 self-start">
                <span>→</span> Explore
              </button>
              <div className="absolute bottom-0 right-0 w-48 h-48 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                  <g>
                    <path d="M80 60L100 80L80 100L60 80Z" fill="white" opacity="0.5" />
                    <path d="M120 40L140 60L120 80L100 60Z" fill="white" opacity="0.6" />
                    <path d="M120 80L140 100L120 120L100 100Z" fill="white" opacity="0.4" />
                    <path d="M80 100L100 120L80 140L60 120Z" fill="white" opacity="0.5" />
                    <path d="M40 80L60 100L40 120L20 100Z" fill="white" opacity="0.3" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Pink Card - Crime Category (Added hover effects) */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg min-h-[280px] flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              <span className="inline-block bg-opacity-30 text-white text-xs px-3 py-1 rounded-full mb-4 self-start border border-white border-opacity-40 font-medium">
                Prevention
              </span>
              <h3 className="text-2xl font-bold mb-3 leading-tight">
                Narito ang ulat kontra kriminalidad at paghahanda sa bawat sakuna.
              </h3>
              <p className="text-pink-100 text-sm mb-6">
                Ito ay base sa mga nakukuhang data mula sa mga naka filed na reklamo at maging sa mga incident reports para sa ating barangay.
              </p>
              <button className="bg-white text-pink-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-2 self-start">
                <span>→</span> Explore
              </button>
            </div>
          </div>

          {/* My Tickets Section */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">My Tickets</h2>
              <p className="text-gray-500 text-sm">Status overview of your ticket activities</p>
            </div>
            <button
              onClick={() => setIsPopupOpen(true)}
              // Added hover:scale-105 and duration-200
              className="bg-indigo-600 hover:indigo-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              File a ticket
            </button>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {dashboardStats.map((stat, index) => (
              <div
                key={index}
                // Added hover:scale-[1.03], hover:shadow-md and transition-all duration-200
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium text-base">{stat.label}</span>
                  <div className="relative">
                    <button
                      onClick={() => setActiveTooltip(activeTooltip === `dashboard-${index}` ? null : `dashboard-${index}`)}
                      onMouseEnter={() => setActiveTooltip(`dashboard-${index}`)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-400 text-xs">?</span>
                    </button>
                    {activeTooltip === `dashboard-${index}` && (
                      <div className="absolute right-0 top-8 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 shadow-lg z-10">
                        {stat.info}
                        <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-5xl font-bold text-gray-900">{stat.count}</div>
              </div>
            ))}
          </div>

          {/* Blotter Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Blotter</h2>
            <p className="text-gray-500 text-sm">Status overview of your ticket activities related to blotter report.</p>
          </div>

          {/* Blotter Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {blotterStats.map((stat, index) => (
              <div
                key={index}
                // Added hover:scale-[1.03], hover:shadow-md and transition-all duration-200
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium text-base">{stat.label}</span>
                  <div className="relative">
                    <button
                      onClick={() => setActiveTooltip(activeTooltip === `blotter-${index}` ? null : `blotter-${index}`)}
                      onMouseEnter={() => setActiveTooltip(`blotter-${index}`)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-400 text-xs">?</span>
                    </button>
                    {activeTooltip === `blotter-${index}` && (
                      <div className="absolute right-0 top-8 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 shadow-lg z-10">
                        {stat.info}
                        <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-5xl font-bold text-gray-900">{stat.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsPopupOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-semibold text-gray-900">File a Ticket</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white transition-all"
                >
                  <option value="Healthcare">Healthcare</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Public Safety">Public Safety</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Concern Details */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Concern Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe your concern in detail..."
                  rows="5"
                  value={formData.concernDetails}
                  onChange={(e) => setFormData({ ...formData, concernDetails: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                />
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Attachment <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors bg-gray-50">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <svg className="mx-auto h-10 w-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">Max size: 25MB per file</p>
                  </label>
                </div>

                {/* File List */}
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
