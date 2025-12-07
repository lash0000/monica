import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass, FaRotateRight, FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa6";
import { useAppointmentStore } from "../stores/Appointment.store";

/* Keep this function name exactly */
function Tag({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-full border ${active ? "bg-[#e9ebff] text-[#20326e] border-[#c9d0ff]" : "bg-gray-100 text-gray-700 border-gray-200"
        }`}
    >
      {label}
    </button>
  );
}

/* Keep this function name exactly */
function Card({ appointment, onClick }) {
  const ownerProfile = appointment?.AppointmentOwner?.UserProfile || null;
  const ownerName = ownerProfile ? `${ownerProfile.name.first} ${ownerProfile.name.last}` : "Unknown";
  const ownerPhone = ownerProfile?.phone_number || "";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs border px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {appointment.category || "General"}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-md  bg-blue-500 text-white font-bold capitalize">
          {appointment.status || "unknown"}
        </span>
      </div>

      <h3 className="text-[16px] font-semibold text-gray-900 mb-1.5 leading-snug capitalize">
        {appointment.id}
      </h3>

      <p className="text-[13px] text-gray-600 mb-3 line-clamp-2">
        {appointment.details || "No details provided"}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <FaRotateRight className="w-3.5 h-3.5" />
          <span>
            Scheduled: {appointment.date_scheduled ? new Date(appointment.date_scheduled).toLocaleString() : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Keep this function name exactly */
export default function Telekonsulta() {
  const navigate = useNavigate();

  // Zustand store (assumes your Appointment.store provides these)
  const { appointments = [], fetchMyAppointments, loading, error } = useAppointmentStore();

  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  // derive categories for Tag buttons (keep "All" first)
  const derivedTags = useMemo(() => {
    const cats = Array.from(new Set(appointments.map((a) => a.category).filter(Boolean)));
    return ["All", ...cats];
  }, [appointments]);

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  // filter appointments by active category and search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return appointments.filter((a) => {
      const matchesCategory = active === "All" || a.category === active;
      if (!q) return matchesCategory;

      const details = (a.details || "").toLowerCase();
      const remarks = (a.remarks || "").toLowerCase();
      const category = (a.category || "").toLowerCase();

      const ownerName = a.AppointmentOwner?.UserProfile?.name
        ? `${a.AppointmentOwner.UserProfile.name.first} ${a.AppointmentOwner.UserProfile.name.last}`.toLowerCase()
        : "";
      const ownerPhone = (a.AppointmentOwner?.UserProfile?.phone_number || "").toLowerCase();

      return (
        matchesCategory &&
        (details.includes(q) ||
          remarks.includes(q) ||
          category.includes(q) ||
          ownerName.includes(q) ||
          ownerPhone.includes(q))
      );
    });
  }, [appointments, query, active]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // sliding window pagination (3)
  const windowPages = useMemo(() => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, Math.min(page - 1, totalPages - 2));
    return [start, start + 1, start + 2];
  }, [page, totalPages]);

  // reset page on filter/search change
  useEffect(() => {
    setPage(1);
  }, [query, active]);

  return (
    <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      {/* Header + Search */}
      <div className="mb-4 flex items-center justify-between w-full">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500">Your scheduled appointments</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full border bg-white text-sm"
              placeholder="Search"
            />
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
          </div>
          <div
            onClick={() => navigate('add')}
            className="rounded-md text-sm bg-blue-500 px-4 py-1.5 text-white font-medium flex gap-2 items-center hover:bg-blue-600 cursor-pointer">
            <FaPlus className="size-3" />
            <p className="select-none">Add</p>
          </div>
        </div>
      </div>

      {/* Tags / Categories */}
      <div className="mb-6">
        <div className="text-xs text-gray-700 mb-2">Categories:</div>
        <div className="flex flex-wrap gap-2">
          {derivedTags.map((t) => (
            <Tag key={t} label={t} active={active === t} onClick={() => setActive(t)} />
          ))}
        </div>
      </div>

      {/* Error / Loading */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-gray-500 mb-4">Loading appointments…</div>}

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!loading && paged.length === 0 && (
          <div className="col-span-2 text-center text-gray-500">No appointments found.</div>
        )}

        {!loading &&
          paged.map((a) => (
            <Card
              key={a.id}
              appointment={a}
              onClick={() => navigate(`/telekonsulta/${a.id}`)}
            />
          ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3 text-sm">
        <button
          className={`px-3 py-1.5 rounded-md border bg-white shadow-sm flex items-center gap-2 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
          Previous
        </button>

        {windowPages[0] > 1 && <span className="text-gray-600">…</span>}

        {windowPages.map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded-md border text-sm font-medium ${num === page ? "bg-gray-200 text-gray-800" : "bg-white"
              }`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}

        {windowPages[2] < totalPages && <span className="text-gray-600">…</span>}

        <button
          className={`px-3 py-1.5 rounded-md border bg-white shadow-sm flex items-center gap-2 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </main>
  );
}
