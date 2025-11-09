import { useState } from 'react';

function ForumThread() {
    // BACKEND: Replace with actual API data
    const threadData = {
        id: 1,
        title: "AICS pati TUPAD assistance",
        description: "Hindi pa po ako nakakatanggap ng aming ayusasyon, bakit pumala po mapigil listahan sa system.",
        author: {
            id: 1,
            name: "Padua.ID",
            avatar: null,
            role: "resident"
        },
        category: "Social Services",
        status: "Resolved", // "Open", "Resolved", "Closed"
        urgency: ["Urgent", "Escalated", "Notice", "Solved"],
        dateTime: "11/10/25 as of 10:25 PM GMT +8",
        createdAt: "10h ago",
        upvotes: 3,
        isUpvotedByUser: false
    };

    // BACKEND: Replace with actual API data
    const aiResponse = {
        id: 1,
        author: {
            name: "AI",
            role: "AI ASSISTANT V3.5",
            isAI: true
        },
        content: {
            greeting: "Salamat po sa inyong pag-uulat ng service request sa Barangay Santa Monica. Naiintindihan namin kung gaano kahalaga ang tulong mula sa aming mga programa tulad ng AICS at TUPAD na tumutulong sa ating mga residente.",
            actionItems: [
                { category: "Maintenance & Infrastructure", action: "I-update sa Engineering/Utility Team" },
                { category: "Health & Medical Services", action: "I-forward sa Health Center" },
                { category: "Social Services & Assistance", action: "Ipro-process sa Social Services Desk" },
                { category: "Community Programs", action: "I-coordinate to Community Affairs Unit" },
                { category: "Security & Emergency Matters", action: "I-escalate sa Barangay Office" },
                { category: "Others", action: "I-evaluate ng General Services Team" }
            ],
            nextSteps: [
                "Magsisimula nang tumulong pagdaan ang laagdad, wala po silang 3 to 5 working days.",
                "Magsisimula niyo po saing lalo ng ating serbisyo office kung ano ang ma-apektingan sa yong case."
            ],
            closing: "Salamat po sa inyong pagtitiwal"
        },
        createdAt: "10h ago"
    };

    // BACKEND: Replace with actual API data (empty array if no comments yet)
    const comments = [
        {
            id: 1,
            author: {
                id: 2,
                name: "Admin: DSWS",
                avatar: null,
                role: "Supervisor"
            },
            content: "Salamat po sa inyong follow-up. Ayon sa pinakabagong data mula sa aming Social Services Office, ang listahan ng mga beneficiaryos para sa kakailabilang lamon na AICS at TUPAD assistance ay nasa proseso pa po ng final review.",
            createdAt: "2h ago"
        },
        {
            id: 2,
            author: {
                id: 3,
                name: "Mendok, Jazzelle Rose M.",
                avatar: null,
                role: "Resident"
            },
            content: "When po po ang bayaran?",
            createdAt: "10h ago"
        },
        {
            id: 3,
            author: {
                id: 4,
                name: "Admin: 045455",
                avatar: null,
                role: "Supervisor"
            },
            content: "Wala po so as of now, will update ninyo po regarding lang sooner.",
            createdAt: "9h ago"
        },
        {
            id: 4,
            author: {
                id: 5,
                name: "Baao, John Lander, C.",
                avatar: null,
                role: "Resident"
            },
            content: "Why naman wala po haha",
            createdAt: "10h ago"
        }
    ];

    // State management
    const [upvoteCount, setUpvoteCount] = useState(threadData.upvotes);
    const [isUpvoted, setIsUpvoted] = useState(threadData.isUpvotedByUser);
    const [newComment, setNewComment] = useState("");

    // BACKEND: API call to upvote thread
    const handleUpvote = () => {
        // TODO: Call API endpoint: POST /api/threads/{threadId}/upvote
        if (isUpvoted) {
            setUpvoteCount(upvoteCount - 1);
        } else {
            setUpvoteCount(upvoteCount + 1);
        }
        setIsUpvoted(!isUpvoted);
    };

    // BACKEND: API call to submit comment
    const handleSubmitComment = () => {
        // TODO: Call API endpoint: POST /api/threads/{threadId}/comments
        // Body: { content: newComment }
        console.log("Submitting comment:", newComment);
        setNewComment("");
    };

    // Helper function to get badge color
    const getBadgeColor = (badge) => {
        const colors = {
            "Urgent": "bg-blue-500",
            "Escalated": "bg-red-500",
            "Notice": "bg-pink-500",
            "Solved": "bg-green-500"
        };
        return colors[badge] || "bg-gray-500";
    };

    // Helper function to get role badge color
    const getRoleBadgeColor = (role) => {
        if (role.includes("AI ASSISTANT")) return "bg-purple-600 text-white";
        if (role === "Supervisor") return "bg-purple-100 text-purple-700";
        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-3xl mx-auto">
                {/* Navigation Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span className="bg-white px-3 py-1 rounded-full text-gray-700 cursor-pointer hover:bg-gray-100">All Communities</span>
                    <span>›</span>
                    <span className="bg-white px-3 py-1 rounded-full text-gray-700 cursor-pointer hover:bg-gray-100">Central Communities</span>
                </div>

                {/* Main Thread Card */}
                <div className="bg-white rounded-2xl shadow-sm mb-4">
                    <div className="p-6">
                        {/* Thread Title */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{threadData.title}</h1>
                        <p className="text-sm text-gray-600 mb-6">{threadData.description}</p>

                        {/* Original Author */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                                {threadData.author.avatar || "👤"}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-900">{threadData.author.name}</span>
                            </div>
                        </div>

                        {/* Helper Info Box */}
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-indigo-900">
                                <span className="font-semibold">Maaari, nandito kaming </span>
                                tulungan. For inquot kasi inward ito forum at namin.
                            </p>
                        </div>

                        {/* AI Response */}
                        <div className="border-l-4 border-indigo-600 pl-4 mb-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    {/* AI Author Info */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-gray-900">{aiResponse.author.name}</span>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-sm text-gray-500">{aiResponse.createdAt}</span>
                                        <span className={`${getRoleBadgeColor(aiResponse.author.role)} text-xs px-2 py-0.5 rounded-full font-medium`}>
                                            {aiResponse.author.role}
                                        </span>
                                    </div>

                                    {/* Thread Metadata */}
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-gray-900 mb-2">
                                            Category: {threadData.category}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 mb-3">
                                            Status: {threadData.status}
                                        </p>
                                        
                                        {/* Urgency Badges */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {threadData.urgency.map((badge, index) => (
                                                <span key={index} className={`${getBadgeColor(badge)} text-white text-xs px-2 py-1 rounded font-medium`}>
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-sm text-gray-700 mb-3">
                                            <span className="font-semibold">Date and Time:</span> {threadData.dateTime}
                                        </p>

                                        {/* AI Response Content */}
                                        <p className="text-sm text-gray-700 mb-4">{aiResponse.content.greeting}</p>

                                        <p className="text-sm text-gray-700 mb-3 font-semibold">
                                            Base sa inyong concerns, ito ang aming initial action:
                                        </p>

                                        <ul className="text-sm text-gray-700 space-y-2 mb-4 ml-4">
                                            {aiResponse.content.actionItems.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-indigo-600 mt-1">•</span>
                                                    <span>
                                                        <strong>{item.category}:</strong> {item.action}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <p className="text-sm font-semibold text-gray-900 mb-2">Next Steps</p>
                                        <ul className="text-sm text-gray-700 space-y-2 mb-4 ml-4">
                                            {aiResponse.content.nextSteps.map((step, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-indigo-600 mt-1">•</span>
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <p className="text-sm text-gray-700 mb-4">{aiResponse.content.closing}</p>
                                    </div>

                                    {/* Upvote and Share Actions */}
                                    <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                                        <button 
                                            onClick={handleUpvote}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                isUpvoted ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                            <span>{upvoteCount}</span>
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                                            💬 Share your thoughts
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        {comments.length > 0 ? (
                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="border-l-4 border-gray-200 pl-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                                {comment.author.avatar || "👤"}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-semibold text-gray-900">{comment.author.name}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-sm text-gray-500">{comment.createdAt}</span>
                                                    <span className={`${getRoleBadgeColor(comment.author.role)} text-xs px-2 py-0.5 rounded-full font-medium`}>
                                                        {comment.author.role}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700">{comment.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p className="text-sm">No comments yet. Be the first to respond!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add Comment Section */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your response..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        rows="4"
                    />
                    <div className="flex items-center justify-between mt-4">
                        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                            👍 Share this thread
                        </button>
                        <button 
                            onClick={handleSubmitComment}
                            disabled={!newComment.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForumThread;