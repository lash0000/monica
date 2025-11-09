import { useState } from 'react';

function TrafficAdvisory() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Icon components
    const ChevronLeft = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    );

    const ChevronRight = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );

    const trafficLocations = [
        {
            name: "Moses St. hanggang Jordan Plains Subdivision",
            status: "Heavy",
            time: "4 min"
        },
        {
            name: "Main Avenue Extension",
            status: "Moderate",
            time: "7 min"
        },
        {
            name: "Barangay Road Network",
            status: "Light",
            time: "2 min"
        }
    ];

    const predictions = [
        { time: "05:00 AM", text: "Asahan ang maluwag na trapiko!", active: true },
        { time: "06:00 AM", text: "Asahan ang maluwag na trapiko!", active: true },
        { time: "07:00 AM", text: "Asahan ang maluwag na trapiko!", active: true },
        { time: "08:00 AM", text: "Asahan ang maluwag na trapiko!", active: true },
        { time: "09:00 AM", text: "Asahan ang maluwag na trapiko!", active: true },
        { time: "10:00 AM", text: "Asahan ang maluwag na trapiko!", active: false },
        { time: "11:00 AM", text: "Asahan ang maluwag na trapiko!", active: false }
    ];

    const advisories = [
        {
            text: "Wala pang inaasahang abala sa kalsada. Manatiling mag-ingat at ugaliin na sundin ang speed limit.",
            color: "bg-indigo-100 border-indigo-200"
        },
        {
            text: "Tuloy-tuloy ang daloy ng sasakyan papunta sa Jordan Plains Subdivision.",
            color: "bg-indigo-100 border-indigo-200"
        },
        {
            text: "Ka-barangay, ingat sa byahe!",
            color: "bg-indigo-100 border-indigo-200"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % trafficLocations.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + trafficLocations.length) % trafficLocations.length);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Light': return 'bg-green-500';
            case 'Moderate': return 'bg-yellow-500';
            case 'Heavy': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        // Adjusted padding to 'py-8 px-8' to focus on horizontal space for wider cards
        <div className="min-h-screen bg-gray-100 py-8 px-8"> 
            {/* The inner div is now effectively full-width minus the outer padding */}
            <div className="mx-auto"> 
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">Ito ang ulat trapiko</h1>
                        <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                            Automated
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Alamin ang takbo ng trapiko sa bawat oras mula sa nasasakupan ng ating barangay.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                    {/* Traffic Status Card (Carousel) */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg border-4 border-indigo-400 relative transition-all duration-200 hover:shadow-xl hover:scale-[1.01] cursor-pointer">
                        <div className="bg-white rounded-lg p-3 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-700">Traffic Status</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-700">
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span>Light</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                    <span>Moderate</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span>Heavy</span>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-16 leading-tight">
                            {trafficLocations[currentSlide].name}
                        </h2>

                        {/* Button container - Carousel Controls */}
                        <div className="absolute bottom-6 right-6 flex items-center justify-end gap-2">
                            {/* PREV button with confirmed hover animation classes */}
                            <button 
                                onClick={prevSlide}
                                className="w-8 h-8 bg-white bg-opacity-90 text-indigo-600 rounded-lg flex items-center justify-center transition duration-300 shadow-md hover:bg-opacity-100 hover:scale-110"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {/* NEXT button with confirmed hover animation classes */}
                            <button 
                                onClick={nextSlide}
                                className="w-8 h-8 bg-white bg-opacity-90 text-indigo-600 rounded-lg flex items-center justify-center transition duration-300 shadow-md hover:bg-opacity-100 hover:scale-110"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Empty Card (Placeholder maintaining the original size h-80) */}
                    <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden relative h-80 lg:h-auto transition-all duration-200 hover:shadow-xl hover:scale-[1.01] cursor-pointer">
                        {/* This card is empty and maintains a height of h-80 */}
                    </div>
                </div>

                {/* Prediction Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer">
                    <span className="inline-block bg-white bg-opacity-20 text-indigo-700 text-xs px-3 py-1 rounded-full mb-4 font-medium">
                        Prediction
                    </span>
                    <h2 className="text-3xl font-bold mb-4">Asahan ang maluwag na trapiko!</h2>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                        As of 9:00 AM, inaasahan na magiging maluwag ang trapiko pagdaan mismo sa Moses St. hanggang sa labas ng Jordan Plains Subdivision dahil wala naman abiso na bibigat ang trapiko ngayon.
                    </p>
                </div>

                {/* Predictions and Advisory Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Predictions List */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.01] cursor-pointer">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Predictions</h3>
                        <div className="space-y-3">
                            {predictions.map((prediction, index) => (
                                <div 
                                    key={index}
                                    className={`flex items-start gap-3 ${prediction.active ? 'opacity-100' : 'opacity-40'}`}
                                >
                                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${prediction.active ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                                    <div className="flex-1">
                                        <span className="font-semibold text-gray-900 text-sm">{prediction.time}</span>
                                        <span className="text-gray-600 text-sm"> - {prediction.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advisory List */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.01] cursor-pointer">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Advisory</h3>
                        <div className="space-y-3">
                            {advisories.map((advisory, index) => (
                                <div 
                                    key={index}
                                    className={`${advisory.color} border rounded-xl p-4 text-sm text-gray-700 leading-relaxed`}
                                >
                                    {advisory.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrafficAdvisory;