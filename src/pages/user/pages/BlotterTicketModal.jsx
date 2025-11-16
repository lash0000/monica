import React from "react";



export default function BlotterTicketModal() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12">
      <div className="w-[900px] bg-white shadow-md rounded-md border border-gray-200">
        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Ticket Options</h1>
          <p className="mt-2 text-sm text-gray-600">
            For this blotter based tickets here are following things that we can do
          </p>
        </div>

        <hr className="border-t border-gray-200" />

        {/* Content grid */}
        <div className="px-8 py-6 grid grid-cols-2 gap-6">
          {/* Staff Assign */}
          <div className="p-6 border rounded-sm">
            <h2 className="text-lg font-medium text-gray-900">Staff Assign</h2>
            <p className="mt-1 text-sm text-gray-600">You will need to search all of existing admin users by name</p>

            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Assign</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Reassign</span>
              </li>
            </ul>
          </div>

          {/* Urgency Level */}
          <div className="p-6 border rounded-sm">
            <h2 className="text-lg font-medium text-gray-900">Urgency Level</h2>
            <p className="mt-1 text-sm text-gray-600">AI automates but users provide accuracy.</p>

            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Priority trigger</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Organize</span>
              </li>
            </ul>
          </div>

          {/* Timeline */}
          <div className="p-6 border rounded-sm">
            <h2 className="text-lg font-medium text-gray-900">Timeline</h2>
            <p className="mt-1 text-sm text-gray-600">Provide latest ticket activity across all tickets.</p>

            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Notifies user</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Monitoring</span>
              </li>
            </ul>
          </div>

          {/* Resolved */}
          <div className="p-6 border rounded-sm">
            <h2 className="text-lg font-medium text-gray-900">Resolved</h2>
            <p className="mt-1 text-sm text-gray-600">Marks issue as fixed and closed it will update other data.</p>

            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Notifies user</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Case resolved</span>
              </li>
            </ul>
          </div>

          {/* Unresolved */}
          <div className="p-6 border rounded-sm">
            <h2 className="text-lg font-medium text-gray-900">Unresolved</h2>
            <p className="mt-1 text-sm text-gray-600">Ticket closed with remarks logs issue for future review.</p>

            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Notifies user</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-bold">✓</span>
                <span className="text-sm">Case unresolved</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border rounded-sm invisible"></div>
        </div>

        {/* Footer spacing */}
        <div className="h-6" />
      </div>
    </div>
  );
}
