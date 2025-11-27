import { useEffect, useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Local mock data used for UI only. Replace with API data when backend is ready.
const SEED_APPOINTMENTS = [
  {
    id: "APT-20251126-01",
    appointmentType: "Teleconsult",
    userName: "Obcestro, Kenneth A.",
    status: "Pending",
    scheduledAt: "2025-11-26T13:00:00",
    createdAt: "2025-11-24T09:10:00",
    provider: "Nurse Joanne Ramos",
    reason: "Follow-up for hypertension medication adjustment.",
    notes: "Patient reports mild dizziness every morning.",
    patient: {
      firstName: "Kenneth",
      middleName: "A.",
      lastName: "Obcestro",
      suffix: "",
      gender: "Male",
      birthDate: "1998-04-23",
      phone: "0995 321 8876",
      email: "kenneth.obcestro@email.com",
    },
  },
  {
    id: "APT-20251127-02",
    appointmentType: "Teleconsult",
    userName: "Velasco, Maria J.",
    status: "Confirmed",
    scheduledAt: "2025-11-27T09:30:00",
    createdAt: "2025-11-24T11:45:00",
    provider: "Dr. Savannah Cruz",
    reason: "New onset migraine with nausea.",
    notes: "Bring previous CT scan results.",
    patient: {
      firstName: "Maria",
      middleName: "Jimenez",
      lastName: "Velasco",
      suffix: "",
      gender: "Female",
      birthDate: "1992-02-11",
      phone: "0917 555 1022",
      email: "mj.velasco@email.com",
    },
  },
  {
    id: "APT-20251128-03",
    appointmentType: "Nutrition",
    userName: "De Guzman, Carlo P.",
    status: "Completed",
    scheduledAt: "2025-11-25T15:00:00",
    createdAt: "2025-11-20T14:50:00",
    provider: "Dietician Laarni Fontanilla",
    reason: "Weight management and diet planning.",
    notes: "Provide follow-up meal plan after session.",
    patient: {
      firstName: "Carlo",
      middleName: "Perez",
      lastName: "De Guzman",
      suffix: "",
      gender: "Male",
      birthDate: "1985-12-02",
      phone: "0938 204 1189",
      email: "carlo.dg@email.com",
    },
  },
  {
    id: "APT-20251201-04",
    appointmentType: "Teleconsult",
    userName: "Santiago, Liza Q.",
    status: "Pending",
    scheduledAt: "2025-12-01T10:15:00",
    createdAt: "2025-11-25T08:20:00",
    provider: "Dr. Juliana Ferrer",
    reason: "Chronic cough for more than 3 weeks.",
    notes: "Patient has history of asthma.",
    patient: {
      firstName: "Liza",
      middleName: "Quizon",
      lastName: "Santiago",
      suffix: "",
      gender: "Female",
      birthDate: "1996-07-15",
      phone: "0918 762 4433",
      email: "liza.santiago@email.com",
    },
  },
  {
    id: "APT-20251201-05",
    appointmentType: "Teleconsult",
    userName: "Lim, Justin E.",
    status: "Pending",
    scheduledAt: "2025-12-01T11:45:00",
    createdAt: "2025-11-26T16:00:00",
    provider: "Nurse Jayson Uy",
    reason: "Blood pressure monitoring (weekly).",
    notes: "Upload BP log before call.",
    patient: {
      firstName: "Justin",
      middleName: "Elias",
      lastName: "Lim",
      suffix: "",
      gender: "Male",
      birthDate: "1978-09-04",
      phone: "0997 882 1145",
      email: "justin.lim@email.com",
    },
  },
  {
    id: "APT-20251202-06",
    appointmentType: "Teleconsult",
    userName: "Pascual, Ana R.",
    status: "Confirmed",
    scheduledAt: "2025-12-02T14:00:00",
    createdAt: "2025-11-26T10:30:00",
    provider: "Dr. Marco Villanueva",
    reason: "Follow-up for gestational diabetes.",
    notes: "Check fasting blood sugar readings.",
    patient: {
      firstName: "Ana",
      middleName: "Rivera",
      lastName: "Pascual",
      suffix: "",
      gender: "Female",
      birthDate: "1990-01-19",
      phone: "0919 233 5501",
      email: "ana.pascual@email.com",
    },
  },
  {
    id: "APT-20251202-07",
    appointmentType: "Mental Health",
    userName: "Reyes, Daniel C.",
    status: "Pending",
    scheduledAt: "2025-12-02T16:30:00",
    createdAt: "2025-11-23T13:00:00",
    provider: "Psychologist Kaye Mendoza",
    reason: "Anxiety management session.",
    notes: "Has upcoming board exam.",
    patient: {
      firstName: "Daniel",
      middleName: "Cruz",
      lastName: "Reyes",
      suffix: "",
      gender: "Male",
      birthDate: "2000-05-30",
      phone: "0918 410 7802",
      email: "daniel.reyes@email.com",
    },
  },
  {
    id: "APT-20251203-08",
    appointmentType: "Teleconsult",
    userName: "Rosales, Bianca T.",
    status: "Pending",
    scheduledAt: "2025-12-03T08:45:00",
    createdAt: "2025-11-26T09:50:00",
    provider: "Dr. Harold Dizon",
    reason: "Recurring stomach cramps.",
    notes: "Patient suspects lactose intolerance.",
    patient: {
      firstName: "Bianca",
      middleName: "Torres",
      lastName: "Rosales",
      suffix: "",
      gender: "Female",
      birthDate: "1999-03-08",
      phone: "0916 880 5671",
      email: "bianca.rosales@email.com",
    },
  },
  {
    id: "APT-20251204-09",
    appointmentType: "Teleconsult",
    userName: "Garcia, Noel V.",
    status: "Completed",
    scheduledAt: "2025-11-22T10:00:00",
    createdAt: "2025-11-18T12:00:00",
    provider: "Dr. Miguel Santos",
    reason: "Skin rash follow-up.",
    notes: "Treatment completed, awaiting lab result.",
    patient: {
      firstName: "Noel",
      middleName: "Villanueva",
      lastName: "Garcia",
      suffix: "",
      gender: "Male",
      birthDate: "1980-10-09",
      phone: "0917 445 7611",
      email: "noel.garcia@email.com",
    },
  },
  {
    id: "APT-20251205-10",
    appointmentType: "Teleconsult",
    userName: "Manalo, Joyce F.",
    status: "Pending",
    scheduledAt: "2025-12-05T17:15:00",
    createdAt: "2025-11-25T15:25:00",
    provider: "Dr. Regina Bautista",
    reason: "Child wellness consult (age 3).",
    notes: "Mother requesting vaccine schedule.",
    patient: {
      firstName: "Joyce",
      middleName: "Ferrer",
      lastName: "Manalo",
      suffix: "",
      gender: "Female",
      birthDate: "1994-06-21",
      phone: "0927 110 9833",
      email: "joyce.manalo@email.com",
    },
  },
  {
    id: "APT-20251206-11",
    appointmentType: "Teleconsult",
    userName: "Domingo, Rafael B.",
    status: "Cancelled",
    scheduledAt: "2025-12-06T09:00:00",
    createdAt: "2025-11-22T07:55:00",
    provider: "Dr. Leslie Ramos",
    reason: "Cancelled by patient / conflict in schedule.",
    notes: "Needs rescheduling after work trip.",
    patient: {
      firstName: "Rafael",
      middleName: "Bautista",
      lastName: "Domingo",
      suffix: "",
      gender: "Male",
      birthDate: "1987-01-05",
      phone: "0915 202 4880",
      email: "rafael.domingo@email.com",
    },
  },
  {
    id: "APT-20251206-12",
    appointmentType: "Teleconsult",
    userName: "Bernardo, Ella S.",
    status: "Confirmed",
    scheduledAt: "2025-12-06T13:30:00",
    createdAt: "2025-11-26T10:05:00",
    provider: "Dr. Iris Tolentino",
    reason: "Prenatal visit (24 weeks).",
    notes: "Upload ultrasound before call.",
    patient: {
      firstName: "Ella",
      middleName: "Santos",
      lastName: "Bernardo",
      suffix: "",
      gender: "Female",
      birthDate: "1998-12-12",
      phone: "0916 333 1209",
      email: "ella.bernardo@email.com",
    },
  },
  {
    id: "APT-20251207-13",
    appointmentType: "Mental Health",
    userName: "Cruz, Patrick L.",
    status: "Pending",
    scheduledAt: "2025-12-07T18:00:00",
    createdAt: "2025-11-21T18:25:00",
    provider: "Psychologist Bea Locsin",
    reason: "Insomnia consultation.",
    notes: "Has tried OTC melatonin.",
    patient: {
      firstName: "Patrick",
      middleName: "Lopez",
      lastName: "Cruz",
      suffix: "",
      gender: "Male",
      birthDate: "1995-08-30",
      phone: "0928 700 4912",
      email: "patrick.cruz@email.com",
    },
  },
  {
    id: "APT-20251208-14",
    appointmentType: "Teleconsult",
    userName: "Villafuerte, Hannah D.",
    status: "Pending",
    scheduledAt: "2025-12-08T07:30:00",
    createdAt: "2025-11-23T09:00:00",
    provider: "Dr. Kaye Llamas",
    reason: "Review lab results for thyroid profile.",
    notes: "Patient experiencing palpitations.",
    patient: {
      firstName: "Hannah",
      middleName: "Diaz",
      lastName: "Villafuerte",
      suffix: "",
      gender: "Female",
      birthDate: "1989-10-01",
      phone: "0912 667 9033",
      email: "hannah.villafuerte@email.com",
    },
  },
  {
    id: "APT-20251209-15",
    appointmentType: "Teleconsult",
    userName: "Salcedo, Brian R.",
    status: "Completed",
    scheduledAt: "2025-11-21T16:15:00",
    createdAt: "2025-11-17T10:40:00",
    provider: "Dr. Roberto Chavez",
    reason: "Ear infection follow-up.",
    notes: "Completed antibiotics.",
    patient: {
      firstName: "Brian",
      middleName: "Rivero",
      lastName: "Salcedo",
      suffix: "",
      gender: "Male",
      birthDate: "1983-03-18",
      phone: "0906 811 4420",
      email: "brian.salcedo@email.com",
    },
  },
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Completed: "bg-gray-100 text-gray-700",
  Cancelled: "bg-rose-100 text-rose-700",
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
      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-600"
        }`}
    >
      {status}
    </span>
  );
}

function Telekonsulta() {
  const [appointments] = useState(SEED_APPOINTMENTS);
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const matchesSearch =
        !searchTerm ||
        appt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.patient.phone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || appt.status === filterStatus;
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
              {pageAppointments.map((appt) => {
                return (
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
                      <p className="text-xs text-gray-500">
                        {appt.patient.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={appt.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FaCalendarAlt className="text-gray-400" />
                        {formatDateTime(appt.scheduledAt)}
                      </div>
                      <p className="text-xs text-gray-500">
                        Provider: {appt.provider}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/telekonsulta/${appt.id}`}
                        state={{ appointment: appt }}
                        className="inline-flex items-center px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {pageAppointments.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-gray-500"
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
              {sortedAppointments.length === 0
                ? 0
                : pageSliceStart + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {Math.min(pageSliceEnd, sortedAppointments.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {sortedAppointments.length}
            </span>{" "}
            appointments
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

export default Telekonsulta;


