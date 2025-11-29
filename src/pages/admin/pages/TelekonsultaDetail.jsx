import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaComments } from "react-icons/fa";


const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Completed: "bg-gray-100 text-gray-700",
  Cancelled: "bg-rose-100 text-rose-700",
};


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


function TelekonsultaDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment || null;
  // Chat system state (disabled / commented out)
  // const [showChat, setShowChat] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const [inputText, setInputText] = useState("");
  // const [attachments, setAttachments] = useState([]);
  // const [isPatientTyping, setIsPatientTyping] = useState(false);
  // const [previewAttachment, setPreviewAttachment] = useState(null);
  // const messagesEndRef = useRef(null);
  // const inputRef = useRef(null);
  // const imageInputRef = useRef(null);
  // const fileInputRef = useRef(null);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Chat system effects and handlers (disabled / commented out)
  // useEffect(() => {
  //   if (showChat && messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages, showChat, isPatientTyping]);
  //
  // const handleSendMessage = () => {
  //   if (!inputText.trim() && attachments.length === 0) return;
  //
  //   const adminMessage = {
  //     id: Date.now(),
  //     text: inputText,
  //     sender: "admin",
  //     timestamp: new Date(),
  //     attachments: attachments.map((att) => ({ ...att })),
  //   };
  //
  //   setMessages((prev) => [...prev, adminMessage]);
  //   setInputText("");
  //   if (inputRef.current) {
  //     inputRef.current.style.height = "auto";
  //   }
  //   setAttachments([]);
  // };
  //
  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSendMessage();
  //   }
  // };
  //
  // const handleInputChange = (e) => {
  //   setInputText(e.target.value);
  //   // Auto-resize textarea
  //   if (inputRef.current) {
  //     inputRef.current.style.height = "auto";
  //     inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
  //   }
  // };
  //
  // const handleAttachmentSelect = (event, type) => {
  //   const files = Array.from(event.target.files || []);
  //   if (!files.length) return;
  //
  //   const freshAttachments = files.map((file) => {
  //     const preview = type === "image" ? URL.createObjectURL(file) : null;
  //     return {
  //       id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  //       type,
  //       name: file.name,
  //       preview,
  //       file,
  //     };
  //   });
  //
  //   setAttachments((prev) => [...prev, ...freshAttachments]);
  //
  //   if (event.target) {
  //     event.target.value = "";
  //   }
  // };
  //
  // const removeAttachment = (id) => {
  //   setAttachments((prev) => {
  //     const updated = prev.filter((att) => att.id !== id);
  //     const removed = prev.find((att) => att.id === id);
  //     if (removed?.preview) {
  //       URL.revokeObjectURL(removed.preview);
  //     }
  //     return updated;
  //   });
  // };
  //
  // const handleDownloadAttachment = (attachment) => {
  //   if (!attachment) return;
  //   let url = attachment.preview;
  //   let shouldRevoke = false;
  //
  //   if (!url && attachment.file) {
  //     url = URL.createObjectURL(attachment.file);
  //     shouldRevoke = true;
  //   }
  //
  //   if (!url) return;
  //
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = attachment.name || "attachment";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //
  //   if (shouldRevoke) {
  //     URL.revokeObjectURL(url);
  //   }
  // };
  //
  // const openImagePreview = (attachment) => {
  //   if (!attachment?.preview) {
  //     handleDownloadAttachment(attachment);
  //     return;
  //   }
  //   setPreviewAttachment(attachment);
  // };
  //
  // const closeImagePreview = () => setPreviewAttachment(null);


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
        <div className="rounded-2xl border p-10 text-center" style={{ backgroundColor: "#FFFFFF", borderColor: "#EFEFEF" }}>
          <p className="text-gray-600">
            Appointment not found. It may have been removed or the link is
            invalid.
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


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-2"
          >
            <FaArrowLeft /> Back to Telekonsulta
          </button>
          <p className="text-xs font-semibold uppercase text-gray-500 tracking-wide">
            Status
          </p>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {appointment.userName}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[appointment.status] || "bg-gray-100 text-gray-700"
                }`}
            >
              {appointment.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Scheduled {formatDateTime(appointment.scheduledAt)}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold transition"
            style={{ backgroundColor: "#EFEFEF", borderColor: "#001E61", borderWidth: "1px", borderStyle: "solid", color: "#001E61" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d7d7d7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#EFEFEF";
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


      <section className="rounded-2xl border p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderColor: "#EFEFEF" }}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl p-5" style={{ borderColor: "#EFEFEF", borderWidth: "1px", borderStyle: "solid" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#001E61" }}>
                Personal Details
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem
                  label="First Name"
                  value={appointment.patient.firstName}
                />
                <DetailItem
                  label="Middle Name"
                  value={appointment.patient.middleName}
                />
                <DetailItem
                  label="Last Name"
                  value={appointment.patient.lastName}
                />
                <DetailItem label="Suffix" value={appointment.patient.suffix || "—"} />
                <DetailItem label="Gender" value={appointment.patient.gender} />
                <DetailItem
                  label="Date of Birth"
                  value={formatDateTime(appointment.patient.birthDate).split(",")[0]}
                />
                <DetailItem label="Phone Number" value={appointment.patient.phone} />
                <DetailItem label="Email" value={appointment.patient.email} />
              </div>
            </div>


            <div className="rounded-2xl p-5" style={{ borderColor: "#EFEFEF", borderWidth: "1px", borderStyle: "solid" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#001E61" }}>
                Appointment Details
              </p>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">Provider:</span>{" "}
                  {appointment.provider}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Reason:</span>{" "}
                  {appointment.reason}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Notes:</span>{" "}
                  {appointment.notes}
                </p>
              </div>
            </div>
          </div>


          <div className="rounded-2xl p-6 space-y-4" style={{ borderColor: "#EFEFEF", borderWidth: "1px", borderStyle: "solid", backgroundColor: "#EFEFEF" }}>
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
                <span className="font-semibold text-gray-900">
                  Appointment ID:
                </span>{" "}
                {appointment.id}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Chat system (modal + preview) has been removed/disabled in this detail page.
          Use the standalone Telekonsulta chat page instead. */}
    </div>
  );
}


export default TelekonsultaDetail;
