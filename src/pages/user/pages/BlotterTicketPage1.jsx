import { useState } from 'react';

function IncidentReportThread() {
    // BACKEND: Replace with actual API data
    const reportData = {
        id: 1,
        type: "Incident Report",
        status: "Opened",
        openedBy: "Floras, Clarence Kyle M.",
        title: "Rambutan ng mga kabataan",
        description: "May mga binabato po nito na mailliis, pumipunta ang aming bahay marami po sis kami'd may mga anises matarami ang kanunod sa aming bahay namin.",
        location: "Dito sana sa may Jordan plains phase 4",
        images: [
            { id: 1, url: null, alt: "Incident photo 1" },
            { id: 2, url: null, alt: "Incident photo 2" },
            { id: 3, url: null, alt: "Incident photo 3" },
            { id: 4, url: null, alt: "Incident photo 4" }
        ],
        currentImageIndex: 0,
        replies: 3,
        createdAt: "3 hours ago",
        threadStartedBy: "Floras, Clarence Kyle M.",
        threadStartedAt: "3 hours ago"
    };

    // BACKEND: Replace with actual API data
    const comments = [
        {
            id: 1,
            author: {
                id: 1,
                name: "Admin 342108",
                avatar: null,
                role: "Admin Staff",
                isStaff: true
            },
            content: "Salamat po sa inyong follow-up. Nakapagpasala na po tayo ng mga tanod at pulis dyan mimo sa lugar.",
            priority: "Normal",
            createdAt: "3h ago"
        },
        {
            id: 2,
            author: {
                id: 2,
                name: "Sembrano, Vincenti Irah B.",
                avatar: null,
                role: "Non-Resident",
                isStaff: false
            },
            content: "Diba, may pababa dyan? Stay safe!",
            createdAt: "3h ago"
        },
        {
            id: 3,
            author: {
                id: 1,
                name: "Admin 342108",
                avatar: null,
                role: "Admin Staff",
                isStaff: true
            },
            content: "Pa-inform nalang din kung wala pa dumating na mga pulis!!!",
            tag: "Floras, Clarence Kyle M.",
            createdAt: "3h ago"
        }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showThoughtsInput, setShowThoughtsInput] = useState(false);
    const [newComment, setNewComment] = useState("");

    // Handle image navigation
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % reportData.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + reportData.images.length) % reportData.images.length);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    // BACKEND: API call to submit comment
    const handleSubmitComment = () => {
        // TODO: Call API endpoint: POST /api/reports/{reportId}/comments
        console.log("Submitting comment:", newComment);
        setNewComment("");
        setShowThoughtsInput(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* INCREASED MAX WIDTH from max-w-2xl to max-w-5xl */}
            <div className="max-w-5xl mx-auto">
                {/* Main Card */}
                <div className="bg-white border-4 border-blue-400 rounded-lg shadow-lg">
                    {/* Header */}
                    <div className="border-b border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded font-medium">
                                Incident Report
                            </span>
                            <span className="text-xs text-gray-600">
                                Opened by {reportData.openedBy}
                            </span>
                        </div>
                        
                        <h1 className="text-xl font-bold text-gray-900 mb-2">
                            {reportData.title}
                        </h1>
                        
                        <p className="text-sm text-gray-700 mb-2">
                            {reportData.description}
                        </p>
                        
                        <p className="text-sm text-gray-600">
                            Location: {reportData.location}
                        </p>
                    </div>

                    {/* Image Carousel */}
                    <div className="relative bg-gray-900">
                        {/* Main Image Display */}
                        <div className="aspect-video flex items-center justify-center bg-gray-800 relative">
                            {/* Previous Button */}
                            <button 
                                onClick={prevImage}
                                className="absolute left-4 z-10 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                            >
                                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Image Placeholder */}
                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Next Button */}
                            <button 
                                onClick={nextImage}
                                className="absolute right-4 z-10 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                            >
                                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Image Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
                            {reportData.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        index === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="border-t border-gray-200 p-4 flex items-center justify-between">
                        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="font-medium">Replies ({reportData.replies})</span>
                        </button>
                        <button 
                            onClick={() => setShowThoughtsInput(!showThoughtsInput)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            Share your thoughts
                        </button>
                    </div>

                    {/* Thread Info */}
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                        <p className="text-sm text-blue-700 mb-2">
                            {reportData.threadStartedBy} opened this thread {reportData.threadStartedAt}
                        </p>
                        <p className="text-sm text-blue-700">
                            Admin 342108 marked this thread with Priority Level: {comments[0].priority} ({comments[0].createdAt})!
                        </p>
                    </div>

                    {/* Comments Section */}
                    <div className="border-t border-gray-200">
                        {comments.map((comment, index) => (
                            <div 
                                key={comment.id} 
                                className={`p-4 ${index !== comments.length - 1 ? 'border-b border-gray-200' : ''} ${comment.author.isStaff ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg">👤</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className="font-semibold text-gray-900">{comment.author.name}</span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-sm text-gray-500">{comment.createdAt}</span>
                                            <span className={`${
                                                comment.author.isStaff 
                                                    ? 'bg-blue-600 text-white' 
                                                    : 'bg-gray-200 text-gray-700'
                                                } text-xs px-2 py-0.5 rounded font-medium`}>
                                                {comment.author.role}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-900">
                                            {comment.content}
                                            {comment.tag && (
                                                <span className="ml-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                                    @{comment.tag}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Comment Input (Conditional) */}
                    {showThoughtsInput && (
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your response..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                                rows="3"
                            />
                            <div className="flex items-center justify-end gap-2 mt-3">
                                <button 
                                    onClick={() => setShowThoughtsInput(false)}
                                    className="px-4 py-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSubmitComment}
                                    disabled={!newComment.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                                >
                                    Post Comment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default IncidentReportThread;