import { useEffect, useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppointmentStore } from "../../user/stores/Appointment.store";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  processed: "bg-blue-100 text-blue-700",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-rose-100 text-rose-700",
};

// fallback if backend sends capitalized or lowercase
function normalizeStatus(status) {
  if (!status) return "pending";
  const s = status.toLowerCase();
  return {
    pending: "Pending",
    confirmed: "Confirmed",
    processed: "Processed",
    completed: "Completed",
    cancelled: "Cancelled",
  }[s] || "Pending";
}

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
  const normalized = normalizeStatus(status);
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-600"
        }`}
    >
      {normalized}
    </span>
  );
}

function buildResidentName(userProfile) {
  if (!userProfile || !userProfile.name) return "Unknown";

  const { last = "", first = "", middle = "" } = userProfile.name;
  const middleInitial = middle ? middle.charAt(0).toUpperCase() + "." : "";

  return `${last}, ${first} ${middleInitial}`;
}

const itemsPerPage = 10;

function Telekonsulta() {
  const { allAppointments, fetchAllAppointments, loading } =
    useAppointmentStore();

  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchAllAppointments();
  }, [fetchAllAppointments]);

  // Transform backend data into what table expects
  const appointments = useMemo(() => {
    return (allAppointments || []).map((a) => ({
      id: a.id,
      appointmentType: a.category || "Teleconsult",
      userName: buildResidentName(a.AppointmentOwner?.UserProfile),
      phone: a.AppointmentOwner?.UserProfile?.phone_number || "",
      status: normalizeStatus(a.status),
      scheduledAt: a.date_scheduled,
      createdAt: a.createdAt,
      fullObject: a,
    }));
  }, [allAppointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const matchesSearch =
        !searchTerm ||
        appt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        appt.status.toLowerCase() === filterStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, filterStatus]);

  const sortedAppointments = useMemo(() => {
    return [...filteredAppointments].sort((a, b) => {
      const aDate = new Date(a.scheduledAt).getTime();
      const bDate = new Date(b.scheduledAt).getTime();
      return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
    });
  }, [filteredAppointments, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedAppointments.length / itemsPerPage)
  );

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const pageSliceStart = (currentPage - 1) * itemsPerPage;
  const pageSliceEnd = pageSliceStart + itemsPerPage;
  const pageAppointments = sortedAppointments.slice(
    pageSliceStart,
    pageSliceEnd
  );

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 font-semibold tracking-wider uppercase">
              Telekonsulta • Admin
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Monitor scheduled teleconsultations, review resident details, and
              coordinate follow-ups directly from this consolidated workspace.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
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
              <option value="all">Telekonsulta (default)</option>
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
              placeholder="Search residents, IDs, contact no."
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
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processed">Processed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
              <button
                onClick={() => setSortDirection("asc")}
                className={`px-3 py-1.5 text-sm flex items-center gap-1 ${sortDirection === "asc"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600"
                  }`}
              >
                <FaArrowUp /> Asc
              </button>
              <button
                onClick={() => setSortDirection("desc")}
                className={`px-3 py-1.5 text-sm flex items-center gap-1 border-l border-gray-300 ${sortDirection === "desc"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600"
                  }`}
              >
                <FaArrowDown /> Desc
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
              <tr>
                <th className="px-6 py-3">Appointment</th>
                <th className="px-6 py-3">Resident</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date Scheduled</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading appointments...
                  </td>
                </tr>
              )}

              {!loading &&
                pageAppointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {appt.appointmentType}
                      </p>
                      <p className="text-xs text-gray-500">{appt.id}</p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {appt.userName}
                      </p>
                      <p className="text-xs text-gray-500">{appt.phone}</p>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={appt.status} />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FaCalendarAlt className="text-gray-400" />
                        {formatDateTime(appt.scheduledAt)}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/telekonsulta/${appt.id}`}
                        state={{ appointment: appt.fullObject }}
                        className="inline-flex items-center px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}

              {!loading && pageAppointments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No appointments match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-600">
          <p>
            Showing{" "}
            <span className="font-semibold">
              {sortedAppointments.length === 0 ? 0 : pageSliceStart + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {Math.min(pageSliceEnd, sortedAppointments.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold">{sortedAppointments.length}</span>{" "}
            appointments
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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

export default Telekonsulta;
