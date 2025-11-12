import React from "react";

export default function Profile() {
  return (
      <main className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          {/* Banner */}
          <div className="relative bg-slate-100 h-28">
            <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-20 h-20 rounded-md ring-4 ring-white overflow-hidden shadow-lg">
              <img src="/assets/images/officials/chaewon.jpg" alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="pt-12 px-4 sm:px-5 pb-6">
            <div className="flex justify-end mb-3 -mt-6">
              <button className="px-3 py-1.5 text-xs rounded-md border bg-white shadow-sm flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-sm bg-[#20326e]"></span>
                Update your Profile
              </button>
            </div>

            {/* Email */}
            <div className="border rounded-lg overflow-hidden">
              <div className="px-4 py-3 text-sm flex items-center justify-between bg-white">
                <div className="space-y-1">
                  <div className="text-gray-800 font-medium flex items-center gap-2">
                    <span>Email Address</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="text-gray-700">flores.clarencekyle.manrique@gmail.com</div>
                </div>
                <button className="px-3 py-1.5 text-xs rounded-md border text-[#20326e] flex items-center gap-2 bg-[#eef2ff]">
                  <span className="inline-block w-3 h-3 rounded-sm bg-[#20326e]"></span>
                  Change Email
                </button>
              </div>
            </div>

            {/* Personal Details grid */}
            <div className="mt-4">
              <div className="text-sm font-semibold text-gray-800 mb-2">Personal Details</div>
              <div className="border rounded-lg overflow-hidden">
                {/* Row 1 */}
                <div className="grid grid-cols-4 divide-x">
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">First Name</div>
                    <div className="text-sm font-medium">Clarence Kyle</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">Middle Name</div>
                    <div className="text-sm font-medium">Manrique</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">Last Name</div>
                    <div className="text-sm font-medium">Flores</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">Suffix</div>
                    <div className="text-sm font-medium">N/A</div>
                  </div>
                </div>
                {/* Row 2: Date of Birth | Gender */}
                <div className="grid grid-cols-2 divide-x border-t">
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">Date of Birth</div>
                    <div className="text-sm">October 10, 2025</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">Gender</div>
                    <div className="text-sm">Male</div>
                  </div>
                </div>
                {/* Row 3: Nationality | Civil Status */}
                <div className="grid grid-cols-2 divide-x border-t">
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">Nationality</div>
                    <div className="text-sm">Filipino</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">Civil Status</div>
                    <div className="text-sm">Single</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x border-t">
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500">Phone Number</div>
                    <div className="text-sm">09123082532</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] text-gray-500 flex items-center gap-2">Type of Residency <span className="text-green-600">✓</span></div>
                    <div className="inline-block text-[11px] mt-1 px-2 py-1 rounded bg-gray-100 border">Non-Resident</div>
                  </div>
                </div>
                <div className="border-t p-3">
                  <div className="text-[11px] text-gray-500">Permanent Address</div>
                  <div className="text-sm">206 Don Julio Gregorio St., Barangay Sauyo, Novaliches, Quezon City, 1116</div>
                </div>
                <div className="border-t p-3">
                  <div className="text-[11px] text-gray-500">Emergency Contacts</div>
                  <div className="text-sm">Obsequio, Kenneth A. - 09123456789 (Friend)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
