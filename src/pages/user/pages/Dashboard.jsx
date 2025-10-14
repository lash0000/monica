import { useState } from 'react';

function Dashboard() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        category: 'Healthcare',
        concernDetails: '',
        attachments: []
    });

    const dashboardStats = [
        { label: 'Resolved', count: 1 },
        { label: 'Pending', count: 1 },
        { label: 'Archived', count: 3 }
    ];

    const blotterStats = [
        { label: 'Resolved', count: 0 },
        { label: 'Unresolved', count: 1 },
        { label: 'Pending', count: 1 },
        { label: 'Archived', count: 2 }
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
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                            <p className="text-gray-500">Status overview of your ticket activities</p>
                        </div>
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            File a ticket
                        </button>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        {dashboardStats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-700 font-medium">{stat.label}</span>
                                    <button className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <span className="text-gray-400 text-sm">?</span>
                                    </button>
                                </div>
                                <div className="text-5xl font-bold text-gray-900">{stat.count}</div>
                            </div>
                        ))}
                    </div>

                    {/* Blotter Section */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Blotter</h2>
                        <p className="text-gray-500">Status overview of your ticket activities related to blotter report.</p>
                    </div>

                    {/* Blotter Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {blotterStats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-700 font-medium">{stat.label}</span>
                                    <button className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <span className="text-gray-400 text-sm">?</span>
                                    </button>
                                </div>
                                <div className="text-5xl font-bold text-gray-900">{stat.count}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-start z-50 p-4 pt-12 transition-all duration-300 ease-out">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slideDown">
                        {/* Header */}
                        <div className="bg-teal-600 text-white p-4 rounded-t-lg">
                            <h2 className="text-xl font-bold">Fill out required fields</h2>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 space-y-4">
                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Concern Details <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    placeholder="Enter your concern details here..."
                                    rows="4"
                                    value={formData.concernDetails}
                                    onChange={(e) => setFormData({ ...formData, concernDetails: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                />
                            </div>

                            {/* Attachment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Attachment
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-600">Upload files</p>
                                        <p className="text-xs text-gray-500 mt-1">Max size 25MB</p>
                                    </label>
                                </div>

                                {/* File List */}
                                {formData.attachments.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {formData.attachments.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAttachment(index)}
                                                    className="text-gray-400 hover:text-red-500 ml-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
                                >
                                    Clear All
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsPopupOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium"
                                >
                                    Submit
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
