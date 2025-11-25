import { useState } from 'react';

function Dashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'traffic' or 'prevention'
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Healthcare',
    concernDetails: '',
    attachments: []
  });

  const dashboardStats = [
    { label: 'Resolved', count: 0, info: 'Tickets that have been successfully resolved and closed' },
    { label: 'Pending', count: 0, info: 'Tickets that are currently being reviewed and awaiting action' },
    { label: 'Archived', count: 0, info: 'Tickets that have been archived for record keeping' }
  ];

  const blotterStats = [
    { label: 'Resolved', count: 0, info: 'Blotter reports that have been resolved' },
    { label: 'Unresolved', count: 0, info: 'Blotter reports that are still pending resolution' },
    { label: 'Pending', count: 0, info: 'Blotter reports currently under review' },
    { label: 'Archived', count: 0, info: 'Blotter reports that have been archived' }
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
      <div className="max-w-7xl mx-auto mt-10">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          {/* Purple Card - Traffic Category */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg min-h-[220px] pb-16 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <div className="mb-2">
              <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">Traffic Advisory</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Narito ang ulat-trapiko para sa ating barangay</h3>
            <p className="text-sm text-purple-100 mb-4">Mula sa prediksyon ng Artificial Intelligence</p>
            <button
              onClick={() => setActiveModal('traffic')}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center gap-2 absolute left-6 bottom-6"
            >
              <span>→</span> Explore
            </button>
          </div>

          {/* Pink Card - Crime Category */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg min-h-[220px] pb-16 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <div className="mb-2">
              <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">Prevention</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Narito ang ulat kontra kriminalidad at paghahanda sa bawat sakuna.</h3>
            <p className="text-sm text-pink-100 mb-4">Ito ay batay sa mga nakukuhang data mula sa mga insident reports para sa ating barangay</p>
            <button
              onClick={() => setActiveModal('prevention')}
              className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-2 absolute left-6 bottom-6"
            >
              <span>→</span> Explore
            </button>
          </div>
        </div>

        {/* My Tickets Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">My Tickets</h2>
            <p className="text-gray-500 text-sm">Status overview of your ticket activities</p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="flex flex-wrap gap-4 mb-12">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative min-h-[140px] w-[280px] flex-shrink-0"
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
                      <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-95"></div>
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
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative min-h-[140px]"
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

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsPopupOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide" onClick={(e) => e.stopPropagation()}>
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

      {/* Traffic Advisory Modal */}
      {activeModal === 'traffic' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-4 flex items-center justify-between z-10 rounded-t-xl">
              <div>
                <h2 className="text-2xl font-bold">Traffic Advisory</h2>
                <p className="text-sm text-indigo-100 mt-1">AI-Powered Traffic Predictions</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-white/20"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Current Status */}
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Current Traffic Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Peak Hours</p>
                    <p className="text-xl font-bold text-gray-900">7-9 AM</p>
                    <p className="text-sm text-gray-500">3-6 PM</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Traffic Level</p>
                    <p className="text-xl font-bold text-orange-600">Moderate</p>
                    <p className="text-sm text-gray-500">Expected delays</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Best Time</p>
                    <p className="text-xl font-bold text-green-600">10 AM - 2 PM</p>
                    <p className="text-sm text-gray-500">Low traffic</p>
                  </div>
                </div>
              </div>

              {/* Predictions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  AI Predictions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Today's Forecast</p>
                      <p className="text-sm text-gray-600">Traffic is expected to be moderate throughout the day. Peak congestion predicted between 7-9 AM and 5-7 PM.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Weekend Alert</p>
                      <p className="text-sm text-gray-600">Increased traffic expected this weekend due to local events. Plan alternative routes if possible.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Recommendations
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Use public transportation during peak hours to avoid delays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Consider carpooling to reduce traffic congestion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Plan your route ahead using real-time traffic updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prevention Modal */}
      {activeModal === 'prevention' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 flex items-center justify-between z-10 rounded-t-xl">
              <div>
                <h2 className="text-2xl font-bold">Crime Prevention & Disaster Preparedness</h2>
                <p className="text-sm text-purple-100 mt-1">Data-Driven Safety Insights</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-white/20"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Safety Stats */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Safety Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Incident Reports</p>
                    <p className="text-xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-500">This month</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Response Time</p>
                    <p className="text-xl font-bold text-green-600">5 min</p>
                    <p className="text-sm text-gray-500">Average</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Safety Level</p>
                    <p className="text-xl font-bold text-blue-600">Good</p>
                    <p className="text-sm text-gray-500">Area secure</p>
                  </div>
                </div>
              </div>

              {/* Crime Prevention */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Crime Prevention Tips
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Home Security</p>
                      <p className="text-sm text-gray-600">Ensure doors and windows are locked. Install security cameras and motion sensor lights in vulnerable areas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Community Watch</p>
                      <p className="text-sm text-gray-600">Participate in neighborhood watch programs. Report suspicious activities to authorities immediately.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disaster Preparedness */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Disaster Preparedness
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Emergency Kit</p>
                      <p className="text-sm text-gray-600">Prepare an emergency kit with food, water, flashlight, first aid supplies, and important documents.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Evacuation Plan</p>
                      <p className="text-sm text-gray-600">Know your evacuation routes and assembly points. Practice your family emergency plan regularly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Emergency Contacts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-700">Emergency Hotline</span>
                    <span className="font-semibold text-red-600">911</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-700">Barangay Office</span>
                    <span className="font-semibold text-gray-900">(02) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
