import { useEffect, useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Temporary seed data for admin events table.
// Replace with API data when backend endpoint is ready.
const SEED_EVENTS = [
  {
    id: "EVT-20251201-01",
    title: "Barangay Fiesta Celebration",
    createdBy: "Admin – Brgy. Santa Monica",
    status: "Published",
    scheduledAt: "2025-12-01T09:00:00",
  },
  {
    id: "EVT-20251205-02",
    title: "Community Health Fair 2024",
    createdBy: "Health Committee",
    status: "Draft",
    scheduledAt: "2025-12-05T08:30:00",
  },
  {
    id: "EVT-20251207-03",
    title: "Telekonsulta Orientation for Residents",
    createdBy: "Telekonsulta Team",
    status: "Scheduled",
    scheduledAt: "2025-12-07T14:00:00",
  },
  {
    id: "EVT-20251210-04",
    title: "Clean-up Drive: Coastal Road",
    createdBy: "Youth Volunteers",
    status: "Published",
    scheduledAt: "2025-12-10T06:00:00",
  },
  {
    id: "EVT-20251212-05",
    title: "Senior Citizens Appreciation Day",
    createdBy: "Senior Citizens Council",
    status: "Archived",
    scheduledAt: "2025-12-12T15:00:00",
  },
];

const statusStyles = {
  Draft: "bg-gray-100 text-gray-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Published: "bg-emerald-100 text-emerald-700",
  Archived: "bg-slate-100 text-slate-700",
};

const itemsPerPage = 10;

function formatDateTime(date) {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function EventsPage() {
  const [events] = useState(SEED_EVENTS);
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch =
        !searchTerm ||
        evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === "all" || evt.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [events, searchTerm, filterStatus]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const aDate = new Date(a.scheduledAt).getTime();
      const bDate = new Date(b.scheduledAt).getTime();
      return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
    });
  }, [filteredEvents, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const pageSliceStart = (currentPage - 1) * itemsPerPage;
  const pageSliceEnd = pageSliceStart + itemsPerPage;
  const pageEvents = sortedEvents.slice(pageSliceStart, pageSliceEnd);

  return (
    <div className="space-y-6">
      {/* Header card (similar to Telekonsulta) */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 font-semibold tracking-wider uppercase">
              Events • Admin
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              View upcoming events, monitor status, and keep your barangay
              announcements organized in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Table card */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Controls row */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              All events
            </label>
            <select
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5"
              value="all"
              readOnly
            >
              <option value="all">Events (default)</option>
            </select>
          </div>

          <div className="flex-1 flex flex-wrap gap-3 justify-end">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchTerm(e.target.value);
              }}
              placeholder="Search events, admins, IDs"
              className="flex-1 min-w-[200px] text-sm border border-gray-300 rounded-lg px-3 py-1.5"
            />

            <select
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5"
              value={filterStatus}
              onChange={(e) => {
                setCurrentPage(1);
                setFilterStatus(e.target.value);
              }}
            >
              <option value="all">All status</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>

            <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
              <button
                onClick={() => setSortDirection("asc")}
                className={`px-3 py-1.5 text-sm flex items-center gap-1 ${
                  sortDirection === "asc"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                <FaArrowUp /> Asc
              </button>
              <button
                onClick={() => setSortDirection("desc")}
                className={`px-3 py-1.5 text-sm flex items-center gap-1 border-l border-gray-300 ${
                  sortDirection === "desc"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                <FaArrowDown /> Desc
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
              <tr>
                <th className="px-6 py-3">Events</th>
                <th className="px-6 py-3">Created by</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date scheduled</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {pageEvents.map((evt) => (
                <tr
                  key={evt.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{evt.title}</p>
                    <p className="text-xs text-gray-500">{evt.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {evt.createdBy}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={evt.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <FaCalendarAlt className="text-gray-400" />
                      {formatDateTime(evt.scheduledAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/events/${evt.id}`}
                      state={{ event: evt }}
                      className="inline-flex items-center px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {pageEvents.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No events match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-600">
          <p>
            Showing{" "}
            <span className="font-semibold">
              {sortedEvents.length === 0 ? 0 : pageSliceStart + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {Math.min(pageSliceEnd, sortedEvents.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold">{sortedEvents.length}</span> events
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 text-sm flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaChevronLeft /> Prev
            </button>
            <span className="text-gray-500">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 text-sm flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
