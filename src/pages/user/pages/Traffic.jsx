import { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function TrafficAdvisory() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    switch (status) {
      case 'Light': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'Heavy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
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
          {/* Traffic Status Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Traffic Status</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Light</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  <span>Heavy</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 leading-tight">
              {trafficLocations[currentSlide].name}
            </h2>

            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
              >
                <BiChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                {trafficLocations.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all ${index === currentSlide ? 'w-6 bg-white' : 'w-1 bg-white bg-opacity-40'
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
              >
                <BiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Map Card */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden relative h-80 lg:h-auto">
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button className="w-8 h-8 bg-white shadow-lg rounded flex items-center justify-center hover:bg-gray-50">
                <span className="text-xl font-bold text-gray-700">+</span>
              </button>
              <button className="w-8 h-8 bg-white shadow-lg rounded flex items-center justify-center hover:bg-gray-50">
                <span className="text-xl font-bold text-gray-700">−</span>
              </button>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">{trafficLocations[currentSlide].time}</span>
            </div>

            {/* Simplified Map Illustration */}
            <div className="w-full h-full bg-gray-100 relative">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Roads */}
                <path d="M 50 150 L 350 150" stroke="#d1d5db" strokeWidth="20" fill="none" />
                <path d="M 200 50 L 200 250" stroke="#d1d5db" strokeWidth="20" fill="none" />

                {/* Route with dots */}
                <path d="M 100 200 L 300 100" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />

                {/* Dots along route */}
                {[...Array(15)].map((_, i) => {
                  const x = 100 + (i * 200 / 14);
                  const y = 200 - (i * 100 / 14);
                  return <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />;
                })}

                {/* Location marker */}
                <circle cx="100" cy="200" r="6" fill="#f97316" stroke="white" strokeWidth="2" />
              </svg>

              <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow text-xs text-gray-600">
                Jordan plains Subd
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-6">
          <span className="inline-block bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full mb-4 font-medium">
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
          <div className="bg-white rounded-2xl p-6 shadow-lg">
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
          <div className="bg-white rounded-2xl p-6 shadow-lg">
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
