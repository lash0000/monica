import React, { useState } from "react";

export default function BlotterTicketStaffAssign() {
  const [query, setQuery] = useState("");
  const USERS = [
    { id: 1, name: "User 1", email: "user1@example.com", avatar: "" },
    { id: 2, name: "User 2", email: "user2@example.com", avatar: "" },
    { id: 3, name: "User 3", email: "user3@example.com", avatar: "" },
  ];

  const selectedBottom = ["User 4", "User 5"];

  const filtered = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  function initials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12">
      <div className="w-[820px] bg-white shadow-md rounded-md border border-gray-200">
        <div className="px-8 pt-8 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Staff Assign</h1>
          <p className="mt-2 text-sm text-gray-600">Search all of existing admin users by name</p>
        </div>

        <div className="px-8 pb-8">
          <div className="mb-4">
            <label className="sr-only">Search</label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all of existing admin users by name"
                className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-md bg-white"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar bubble */}
                  <div className="flex-shrink-0">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={`${u.name} avatar`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-600 text-white font-medium">
                        {initials(u.name)}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                    <div className="mt-1 text-xs text-gray-500">{u.email}</div>
                  </div>
                </div>

                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    Admin
                  </span>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-sm text-gray-500">No users found</div>
            )}
          </div>

          <div className="mt-6 border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0 flex flex-wrap gap-2">
              {selectedBottom.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-full shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#003161] text-white rounded-md hover:bg-[#003161]"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
