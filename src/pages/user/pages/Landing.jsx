

function Landing() {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="border border-gray-500 shadow-2xl rounded-lg p-8">
          <div className="text-center mb-12">
            <p className="text-black leading-loose mb-2 max-w-5xl mx-auto font-bold text-xl">
              Community Safety, Reimagined
            </p>
            <h1 className="text-4xl font-semibold text-black mb-4">
              Connecting Your Barangay, One Report at a Time
            </h1>
            <p className="text-black leading-tight mt-10 max-w-5xl mx-auto">
              Mata Taumbayan is a smart incident reporting system that empowers residents
              and equips barangay officials to build a safer, more responsive community
              through technology
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/assets/images/Flood.png"
                alt="Emergency Flood Response"
                className="w-full h-full object-cover transition duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:brightness-110"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/assets/images/Flood.png"
                alt="Drainage Infrastructure"
                className="w-full h-full object-cover transition duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:brightness-110"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/assets/images/Flood.png"
                alt="Community Assistance"
                className="w-full h-full object-cover transition duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:brightness-110"
              />
            </div>
          </div>

          <p className="text-black leading-tight mt-4 max-w-5xl mx-auto text-center mb-12 text-xl">
            Discover the features that make our platform the ideal solution
            <br />
            <span>for modern community incident management.</span>
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg border border-black transition-transform duration-150 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:ring-4 hover:ring-gray-400/30">
              <h3 className="text-xl font-semibold text-black mb-4">
                AI Powered <br /> Reporting
              </h3>
              <p className="text-gray-600 text-sm">
                Our system uses AI to validate and triage incident reports, ensuring urgent matters are prioritized and officials are notified instantly
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-black transition-transform duration-150 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:ring-4 hover:ring-gray-400/30">
              <h3 className="text-xl font-semibold text-black mb-4">
                Community Credit <br /> Score
              </h3>
              <p className="text-gray-600 text-sm">
                Build trust within your community. Earn points for reliable reporting and contribute to a safer barangay for everyone.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-black transition-transform duration-150 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:ring-4 hover:ring-gray-400/30">
              <h3 className="text-xl font-semibold text-black mb-4">
                Seamless Verification
              </h3>
              <p className="text-gray-600 text-sm mt-10">
                Admins can quickly confirm or reject reports, which automatically updates the incident status and user credit scores.
              </p>
            </div>
          </div>

          {/* Submit Report Section */}
          <div className="text-center mt-20 mb-8">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Visualize Your Community's Safety
            </h2>
            <p className="text-gray-600 mb-8 text-2xl">
              Our dashboard provides a clear overview of all incidents, helping you stay informed.
            </p>
            <button className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors shadow-lg">
              Submit Report
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Landing;
