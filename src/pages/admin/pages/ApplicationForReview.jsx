import { User, Check, Copy } from 'lucide-react';

export default function ApplicationForReview() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold mb-1">Application for Review</h1>
          <p className="text-purple-100">We can provide feedback before you approve it</p>
        </div>

        {/* Application record title */}
        <div className="bg-white shadow-lg rounded-b-lg">
          {/* Tabs */}
          <div className="flex border-b">
            <button className="px-6 py-3 bg-green-100 text-green-800 font-medium border-b-2 border-green-600">
              For Review
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50">
              Application Record
            </button>
          </div>

          {/* Certificate of residency */}
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Certificate of Residency</h2>
                <p className="text-gray-500">Application Date: October 18, 2025</p>
              </div>
              <div className="bg-gray-100 rounded-full p-4">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <div className="text-sm">
                <span className="font-semibold">Status: </span>
                <span className="text-gray-700">Review required</span>
              </div>
              <button className="ml-auto bg-pink-500 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-600 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Approve
              </button>
              <button className="border border-gray-300 px-6 py-2 rounded-full font-medium hover:bg-gray-50">
                Feedback
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Email Address</span>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-gray-700">mhel.bandibad@qcu.edu.ph</p>
              </div>
              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>

          {/* Personal Details */}
          <div className="p-6">
            <h3 className="font-bold text-lg mb-4">Personal Details</h3>
            
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-gray-500 text-sm">First Name</label>
                <p className="font-semibold mt-1">Mhel</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Middle Name</label>
                <p className="font-semibold mt-1">N/A</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Last Name</label>
                <p className="font-semibold mt-1">Bandibad</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Suffix</label>
                <p className="font-semibold mt-1">N/A</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-500 text-sm">Date of Birth</label>
                <p className="font-semibold mt-1">October 10, 2025</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Gender</label>
                <p className="font-semibold mt-1">Female</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-500 text-sm">Nationality</label>
                <p className="font-semibold mt-1">Filipino</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Civil Status</label>
                <p className="font-semibold mt-1">Single</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-500 text-sm">Phone Number</label>
              <p className="font-semibold mt-1">09123082532</p>
            </div>

            <div className="mb-4">
              <label className="text-gray-500 text-sm">Permanent Address</label>
              <p className="font-semibold mt-1">206 Don Julio Gregorio St., Barangay Sauyo, Novaliches, Quezon City, 1116</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-sm">Type of Residency</span>
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div className="inline-block bg-gray-100 px-4 py-2 rounded">
                <p className="font-medium">Non-Resident</p>
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-sm">Emergency Contacts</label>
              <p className="font-semibold mt-1">Vista, Valentino - 09123456789 (Friend)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}