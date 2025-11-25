import { useState } from 'react';

function ApplicationList() {
    // BACKEND: Replace with actual API data
    const [activeTab, setActiveTab] = useState('ongoing'); // 'ongoing' or 'approved'
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    // BACKEND: This should come from API
    const applications = [
        {
            id: 1,
            title: "Application for Indigency for Burial Assistance",
            lastUpdate: "Tues, Sept 30. (1 week ago)",
            status: "ongoing"
        }
        // Add more applications as needed
    ];

    const filteredApplications = applications.filter(app => app.status === activeTab);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Tab Navigation and Apply Button */}
                <div className="bg-white rounded-t-2xl shadow-sm px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setActiveTab('ongoing')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                                activeTab === 'ongoing'
                                    ? 'text-gray-900 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Ongoing
                        </button>
                        <button
                            onClick={() => setActiveTab('approved')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                                activeTab === 'approved'
                                    ? 'text-gray-900 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Approved
                        </button>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Apply Now
                    </button>
                </div>

                {/* Applications List */}
                <div className="bg-white rounded-b-2xl shadow-sm">
                    {/* Progress Bar */}
                    <div className="h-1 bg-indigo-600 rounded-t-sm"></div>

                    {/* Application Cards */}
                    <div className="p-6">
                        {filteredApplications.length > 0 ? (
                            <div className="space-y-4">
                                {filteredApplications.map((application) => (
                                    <div
                                        key={application.id}
                                        className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {application.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Last Update: {application.lastUpdate}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-sm">No applications found</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-center gap-2">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageClick(page)}
                                        className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                                            currentPage === page
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            <span className="px-2 text-gray-400">...</span>
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicationList;