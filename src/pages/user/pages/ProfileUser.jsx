import React from "react";

export default function ProfileUser() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#003161] text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Report history</span>
          <button className="text-white">≡</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Title */}
        <div className="bg-yellow-200 text-black px-4 py-2 rounded-lg mb-6 inline-block">
          <h2 className="text-xl font-bold">Profile</h2>
        </div>

        {/* User Info Card */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#003161] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Juan P. Dela Cruz</h3>
              <p className="text-gray-600 text-sm">Joined: January 2025</p>
            </div>
          </div>
        </section>

        {/* Credit Score Card */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Credit Score</h3>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="#90B77D"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={2 * Math.PI * 54 * (1 - 0.85)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#003161]">
                85%
              </span>
            </div>
            <p className="text-gray-600 text-sm text-center mb-4">
              Your score reflects the reliability of you report
            </p>
            <div className="w-full">
              <p className="text-sm text-gray-600 mb-2">How it works:</p>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                <li>5 points for each confirmed reports</li>
                <li>Reports are evaluated by tracking teams</li>
                <li>Starts at 95 and capped between 0 to 100</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Achievement Card */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Achievement</h3>
          <div className="flex justify-center">
            <div className="w-20 h-20">
              <img 
                src="/assets/images/badge.svg" 
                alt="Achievement Badge"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-gray-600 text-sm text-center mt-4">
            Badges you've earned through your contribution
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003161] text-white py-4 mt-auto">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div>
            <p>Incident Reporting System</p>
            <p className="text-xs">© 2025 Incident Reporting System. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <div>
              <p className="font-semibold">Quick links</p>
              <p>Incident</p>
            </div>
            <div>
              <p className="font-semibold">Contacts</p>
              <p>+1 626.764956</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
