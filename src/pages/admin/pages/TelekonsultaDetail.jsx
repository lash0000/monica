import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaComments } from "react-icons/fa";
import { useAppointmentStore } from "../../user/stores/Appointment.store";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Processed: "bg-blue-100 text-blue-700",
  Completed: "bg-gray-100 text-gray-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

function normalizeStatus(status) {
  if (!status) return "Pending";
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

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-gray-500 tracking-wide">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-900">{value || "—"}</p>
    </div>
  );
}

function buildResidentName(profile) {
  if (!profile?.name) return "Unknown";
  const { last = "", first = "", middle = "" } = profile.name;
  const mi = middle ? middle.charAt(0).toUpperCase() + "." : "";
  return `${last}, ${first} ${mi}`;
}

function TelekonsultaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchAppointmentById } = useAppointmentStore();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Request appointment from API
  useEffect(() => {
    const load = async () => {
      const data = await fetchAppointmentById(id);

      if (!data) {
        setAppointment(null);
        setLoading(false);
        return;
      }

      // Transform backend structure → UI structure expected
      const owner = data.AppointmentOwner?.UserProfile;

      setAppointment({
        id: data.id,
        userName: buildResidentName(owner),
        status: normalizeStatus(data.status),
        scheduledAt: data.date_scheduled,
        createdAt: data.createdAt,

        // patient details
        patient: {
          firstName: owner?.name?.first || "",
          middleName: owner?.name?.middle || "",
          lastName: owner?.name?.last || "",
          suffix: owner?.name?.suffix || "",
          gender: owner?.gender || "",
          birthDate: owner?.birthdate || "",
          phone: owner?.phone_number || "",
          email: data.AppointmentOwner?.email || "",
        },

        // You can expand later if backend provides doctor/nurse fields
        provider: data.AppointmentAction?.UserProfile
          ? buildResidentName(data.AppointmentAction?.UserProfile)
          : "Staff",

        reason: data.details || "—",
        notes: data.remarks || "—",
      });

      setLoading(false);
    };

    load();
  }, [id, fetchAppointmentById]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading appointment details...
      </div>
    );
  }

  // ---------- NOT FOUND ----------
  if (!appointment) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Appointment Details
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        <div
          className="rounded-2xl border p-10 text-center"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#EFEFEF" }}
        >
          <p className="text-gray-600">
            Appointment not found. It may have been removed or the link is invalid.
          </p>

          <Link
            to="/admin/telekonsulta"
            className="inline-flex items-center px-4 py-2 mt-4 text-white rounded-lg text-sm font-semibold"
            style={{ backgroundColor: "#50589C" }}
          >
            Go back to list
          </Link>
        </div>
      </div>
    );
  }

  // ---------- SUCCESS RENDER ----------
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 my-6"
          >
            <FaArrowLeft /> Back to Telekonsulta
          </button>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {appointment.userName}
            </h1>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[appointment.status] ||
                "bg-gray-100 text-gray-700"
                }`}
            >
              {appointment.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Scheduled: {formatDateTime(appointment.scheduledAt)}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold transition"
            style={{
              backgroundColor: "#EFEFEF",
              borderColor: "#001E61",
              borderWidth: "1px",
              borderStyle: "solid",
              color: "#001E61",
            }}
          >
            Update Status
          </button>

          <button
            onClick={() =>
              navigate(`/admin/telekonsulta/${appointment.id}/chat`, {
                state: { appointment },
              })
            }
            className="px-4 py-2 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition"
            style={{ backgroundColor: "#50589C" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#001E61")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#50589C")}
          >
            <FaComments /> Chat
          </button>
        </div>
      </div>

      <section
        className="rounded-2xl border p-6 shadow-sm"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#EFEFEF" }}
      >
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div
              className="rounded-2xl p-5"
              style={{ borderColor: "#EFEFEF", borderWidth: "1px", borderStyle: "solid" }}
            >
              <p className="text-sm font-semibold mb-3" style={{ color: "#001E61" }}>
                Personal Details
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="First Name" value={appointment.patient.firstName} />
                <DetailItem label="Middle Name" value={appointment.patient.middleName} />
                <DetailItem label="Last Name" value={appointment.patient.lastName} />
                <DetailItem label="Suffix" value={appointment.patient.suffix} />
                <DetailItem label="Gender" value={appointment.patient.gender} />
                <DetailItem
                  label="Date of Birth"
                  value={appointment.patient.birthDate}
                />
                <DetailItem label="Phone Number" value={appointment.patient.phone} />
                <DetailItem label="Email" value={appointment.patient.email} />
              </div>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{ borderColor: "#EFEFEF", borderWidth: "1px", borderStyle: "solid" }}
            >
              <p className="text-sm font-semibold mb-3" style={{ color: "#001E61" }}>
                Appointment Details
              </p>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">Provider:</span>{" "}
                  {appointment.provider}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Details:</span>{" "}
                  {appointment.reason}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Remarks:</span>{" "}
                  {appointment.notes}
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              borderColor: "#EFEFEF",
              borderWidth: "1px",
              borderStyle: "solid",
              backgroundColor: "#EFEFEF",
            }}
          >
            <div className="text-center space-y-1">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                {appointment.patient.firstName.slice(0, 1)}
              </div>

              <p className="text-xs uppercase text-gray-500 tracking-wide">
                Resident
              </p>

              <p className="text-lg font-semibold text-gray-900">
                {appointment.userName}
              </p>

              <p className="text-sm text-gray-600">{appointment.patient.phone}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-semibold text-gray-900">Created:</span>{" "}
                {formatDateTime(appointment.createdAt)}
              </p>

              <p>
                <span className="font-semibold text-gray-900">Appointment ID:</span>{" "}
                {appointment.id}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TelekonsultaDetail;
