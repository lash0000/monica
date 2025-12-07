import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaRegCommentDots, FaCheck } from "react-icons/fa";
import { FaSliders, FaEyeSlash, FaTrash, FaXmark, FaMagnifyingGlass, FaShare } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../../lib/socket";
import UserTicketStore from "../../user/stores/Ticket.store";
import UserProfileStore from "../stores/user-profile.store";
import Slider from "react-slick";
import { IoIosChatboxes } from "react-icons/io";
import { toast } from "sonner";

function TicketImageSlider({ files }) {
  if (!files || files.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="slider-container mt-4">
      <Slider {...settings}>
        {files.map((file) => (
          <div
            key={file.id}
            className="flex justify-center bg-white border rounded-lg"
          >
            <img
              src={file.file_url}
              alt={file.filename}
              className="max-h-[380px] object-cover mx-auto cursor-pointer"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function timeAgo(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (sec < 10) return "just now";
  if (sec < 60) return `${sec} seconds ago`;
  if (min === 1) return "a minute ago";
  if (min < 60) return `${min} minutes ago`;
  if (hr === 1) return "an hour ago";
  if (hr < 24) return `${hr} hours ago`;
  if (day === 1) return "yesterday";
  if (day < 7) return `${day} days ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const CATEGORY_TO_TAG = {
  maintenance: "maintenance",
  healthcare: "healthcare",
  infrastructure: "administrative",
  environmental: "community programs",
  safety: "social services",
  other: "others",
  general: "general",
};

export default function TicketDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    updateTicket,
    singleTicket,
    comments,
    loading,

    fetchTicket,
    fetchComments,
    postComment,

    joinRoom,
    leaveRoom,
    initializeSocketListeners,
  } = UserTicketStore();

  const { profile } = UserProfileStore();
  const [localTicket, setLocalTicket] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const localTypingRef = useRef(false);

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [showOptions, setShowOptions] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showResolved, setShowResolved] = useState(false);
  const [showUnresolved, setShowUnresolved] = useState(false);
  const [showUrgency, setShowUrgency] = useState(false);
  const [selectedUrgency, setSelectedUrgency] = useState(null);
  const urgencyOptions = [
    { key: "low", label: "Low", desc: "Not urgent", color: "bg-green-500" },
    { key: "medium", label: "Medium", desc: "Requires attention", color: "bg-lime-400" },
    { key: "high", label: "High", desc: "Urgent", color: "bg-rose-500" },
    { key: "critical", label: "Critical", desc: "Immediate action needed", color: "bg-red-600" },
  ];

  const handleUrgencyLevelSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!singleTicket?.id) {
      toast.error("No ticket selected.");
      return;
    }

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      toast.error("Missing user id.");
      return;
    }

    const payload = {
      urgency_level: selectedUrgency,
      user_id: userId
    };

    try {
      const data = await updateTicket(singleTicket.id, payload);
      if (data?.success) {
        toast.success("Urgency Level for this ticket is updated");
      } else {
        toast.success("Ticket updated");
      }
      setShowUrgency(false);
    } catch (err) {
      toast.error(err?.message || "Failed to update ticket");
    }
  };

  const handleResolvedSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!singleTicket?.id) {
      toast.error("No ticket selected.");
      return;
    }

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      toast.error("Missing user id.");
      return;
    }

    const payload = {
      status: "resolved",
      user_id: userId
    };

    try {
      const data = await updateTicket(singleTicket.id, payload);
      if (data?.success) {
        toast.success("Ticket updated successfully");
      } else {
        toast.success("Ticket updated");
      }
      setShowResolved(false);
    } catch (err) {
      toast.error(err?.message || "Failed to update ticket");
    }
  };

  const admins = useMemo(
    () => [
      { id: 1, name: "Agustin, Angel Mae", email: "agustin.angelmae@qcu.edu.ph", avatar: "🧑🏻‍🦰" },
      { id: 2, name: "Rentillo, Mary Fiona Louise", email: "rentillo.maryfionalouise@qcu.edu.ph", avatar: "👩🏻" },
      { id: 3, name: "Gilo, Jhon Lloyd", email: "gilo.johnlloyd@qcu.edu.ph", avatar: "🧑🏻‍💻" },
      { id: 4, name: "Gamba, Richelle", email: "gamba.richelle@qcu.edu.ph", avatar: "👩🏻‍🎓" },
      { id: 5, name: "Avila, John Luigi M.", email: "avila.johnluigi@qcu.edu.ph", avatar: "🧑🏻‍🎓" },
    ],
    []
  );

  const [selectedIds, setSelectedIds] = useState([4, 5]);
  const [search, setSearch] = useState("");

  const filteredAdmins = useMemo(
    () => admins.filter((a) => a.name.toLowerCase().includes(search.toLowerCase())),
    [admins, search]
  );

  const toggleSelect = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  useEffect(() => {
    initializeSocketListeners();
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    joinRoom(id);
    fetchTicket(id);
    fetchComments(id);

    return () => {
      leaveRoom(id);
      try {
        socket.emit("typing:stop", id);
      } catch (_) { }
    };
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const onIncoming = ({ ticketId }) => {
      if (String(ticketId) === String(id)) setIsTyping(true);
    };

    const onClear = ({ ticketId }) => {
      if (String(ticketId) === String(id)) setIsTyping(false);
    };

    socket.on("typing:incoming", onIncoming);
    socket.on("typing:clear", onClear);

    return () => {
      socket.off("typing:incoming", onIncoming);
      socket.off("typing:clear", onClear);
    };
  }, [id]);

  useEffect(() => {
    if (!singleTicket) return;
    const baseUpdates = Array.isArray(singleTicket.updates) ? [...singleTicket.updates] : [];
    const merged = [...baseUpdates, ...(comments || [])];

    const seen = new Set();
    const deduped = merged.filter((u) => {
      const key = String(u.id || `${u.parent_id}-${u.comment}`);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const newTicket = {
      ...singleTicket,
      Files: singleTicket.Files || [],
      updates: deduped,
    };

    setLocalTicket((prev) => {
      if (!prev) return newTicket;
      const same = JSON.stringify(prev) === JSON.stringify(newTicket);
      return same ? prev : newTicket;
    });
  }, [singleTicket, comments]);

  if (loading || !localTicket) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading ticket…
      </div>
    );
  }

  const {
    title,
    subject,
    concern_details,
    openedByName,
    category,
    Files = [],
    updates = [],
  } = localTicket;

  const selectedCategory = (() => {
    const lower = (category || "").toLowerCase();
    const raw = CATEGORY_TO_TAG[lower] || lower || "general";
    return raw
      .replace(/[^a-z0-9]+/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  })();

  const totalPages = Math.max(1, Math.ceil(updates.length / pageSize));
  const currentComments = updates.slice((page - 1) * pageSize, page * pageSize);
  const handleTypingChange = (e) => {
    const v = e.target.value;
    setCommentInput(v);

    if (!localTicket?.id) return;

    if (!localTypingRef.current) {
      try {
        socket.emit("typing:start", localTicket.id);
      } catch (_) { }
      localTypingRef.current = true;
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      try {
        socket.emit("typing:stop", localTicket.id);
      } catch (_) { }
      localTypingRef.current = false;
      setIsTyping(false);
      typingTimeoutRef.current = null;
    }, 1800);
  };

  const handleSendComment = async () => {
    const text = commentInput.trim();
    if (!text || !localTicket?.id) return;

    try {
      await postComment(localTicket.id, {
        commented_by: profile?.id || localStorage.getItem("user_id"),
        comment: text,
      });

      socket.emit("typing:stop", localTicket.id);
    } catch (err) {
      console.error(err);
    }

    setCommentInput("");
    localTypingRef.current = false;
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsTyping(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-4 relative">
        <button
          type="button"
          aria-label="Close"
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 text-gray-700 cursor-pointer"
        >
          <FaXmark className="size-4" />
        </button>

        {/* CHIPS (DYNAMIC) */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 rounded-full bg-[#f3f5ff] text-[#293a99] font-medium">
            {selectedCategory}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#f7ecff] text-[#7a3aa5] font-medium">
            Opened by {openedByName}
          </span>
        </div>

        {/* TITLE + DETAILS (DYNAMIC) */}
        <h1 className="mt-3 text-[24px] font-extrabold text-gray-900">
          {title || subject}
        </h1>
        <p className="text-[13px] text-gray-600 mt-1">{concern_details}</p>

        {/* ACTIONS ROW */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] text-gray-800">
            <IoIosChatboxes className="size-5" />
            <span className="font-medium">Replies ({updates.length})</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f5f7] text-gray-800 text-[12px]">
              <FaShare className="size-5" />
              Share your thoughts
            </button>

            <button
              onClick={() => setShowOptions(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3e8ff] text-[#6f31a6] text-[12px]"
            >
              <FaSliders className="w-3.5 h-3.5" />
              Options
            </button>
          </div>
        </div>

        {/* THREAD META */}
        <div className="mt-4 rounded-xl px-4 py-3 text-[12px] text-[#7b3bb0] bg-[#f5e9ff] border border-[#edd8ff]">
          {openedByName} opened this thread ({timeAgo(localTicket.createdAt)})
        </div>

        {/* ATTACHED FILES */}
        <TicketImageSlider files={Files} />

        {/* MESSAGES SECTION */}
        <div className="mt-6 space-y-6">

          {/* RENDER BOT/USER/ADMIN COMMENTS USING EXISTING LAYOUT */}
          {currentComments.map((update) => (
            <div key={update.id} className="p-5 rounded-xl border space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                  {(update?.UserProfile?.name?.last ||
                    update?.UserProfile?.name?.first ||
                    update?.author ||
                    "U"
                  ).charAt(0).toUpperCase()}
                </div>

                <div className="text-sm font-semibold text-gray-900">
                  {update?.UserProfile
                    ? `${update.UserProfile.name.last}, ${update.UserProfile.name.first} ${update.UserProfile.name.middle.charAt(0)}.`
                    : update?.UserCredential?.email ||
                    update?.author ||
                    "Unknown User"}
                </div>

                <div className="text-sm text-gray-600">• {timeAgo(update.createdAt)}</div>
              </div>

              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {update.comment || update.content}
              </p>

              <div className="mt-3 flex items-center gap-3 text-xs">
                <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2">
                  <FaEyeSlash className="w-3.5 h-3.5" /> Mark as spam
                </button>
                <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2">
                  <FaTrash className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* TYPING INDICATOR */}
        {isTyping && (
          <p className="text-xs text-gray-500 mt-2">Someone is typing...</p>
        )}

        {/* COMMENT INPUT */}
        <div className="mt-6 bg-white rounded-lg mb-6">
          <textarea
            value={commentInput}
            onChange={handleTypingChange}
            placeholder="Comment here..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSendComment}
              disabled={!commentInput.trim()}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors ${!commentInput.trim()
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-blue-700"
                }`}
            >
              Reply
            </button>
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-6">
            <nav className="flex items-center gap-2 text-sm">
              <button
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-100 ${page === 1 && "opacity-50 cursor-not-allowed"
                  }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 border rounded-md ${num === page
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => page < totalPages && setPage(page + 1)}
                disabled={page === totalPages}
                className={`px-3 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-100 ${page === totalPages && "opacity-50 cursor-not-allowed"
                  }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}

      </div>

      {/* OPTIONS MODAL (UNCHANGED LAYOUT) */}
      {/* --------------------------------------- */}
      {/* I left all modals EXACTLY AS YOU DESIGNED THEM */}
      {/* Just reattached your original state handlers */}

      {showOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowOptions(false)} />
          <div className="relative z-10 w-full max-w-3xl mx-auto px-3">
            <div className="bg-white rounded-xl shadow-xl border p-5 md:p-6">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowOptions(false)}
                className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 text-gray-700"
              >
                <FaXmark className="w-4 h-4" />
              </button>

              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Ticket Options</h2>
              <p className="mt-3 text-sm md:text-base text-gray-500">
                For this Service Management related tickets here are following things that we can do
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

                {/* STAFF ASSIGN */}
                <button
                  onClick={() => {
                    setShowOptions(false);
                    setShowAssign(true);
                  }}
                  className="rounded-xl border p-4 md:p-5 text-left hover:shadow-sm transition-shadow cursor-pointer w-full"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Staff Assign</h3>
                  <p className="mt-2 text-sm text-gray-500">You will need to search all of existing admin users by name</p>
                  <ul className="mt-4 space-y-2 text-gray-900 text-sm">
                    <li className="flex items-center gap-3"><FaCheck className="text-green-600" /> Assign</li>
                    <li className="flex items-center gap-3"><FaCheck className="text-green-600" /> Reassign</li>
                  </ul>
                </button>

                {/* URGENCY */}
                <button
                  onClick={() => {
                    setShowOptions(false);
                    setShowUrgency(true);
                  }}
                  className="rounded-xl border p-4 md:p-5 text-left hover:shadow-sm transition-shadow cursor-pointer w-full"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Urgency Level</h3>
                  <p className="mt-2 text-sm text-gray-500">AI automates but users provide more accuracy.</p>
                  <ul className="mt-4 space-y-2 text-gray-900 text-sm">
                    <li className="flex items-center gap-3"><FaCheck className="text-green-600" /> Priority trigger</li>
                    <li className="flex items-center gap-3"><FaCheck className="text-green-600" /> Organize</li>
                  </ul>
                </button>

                {/* RESOLVED */}
                <button
                  onClick={() => {
                    setShowOptions(false);
                    setShowResolved(true);
                  }}
                  className="rounded-xl border p-4 md:p-5 text-left hover:shadow-sm transition-shadow cursor-pointer w-full"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Resolved</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Marks issue as fixed and closed it will update other data.
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-900 text-sm">
                    <li className="flex items-center gap-3"><FaCheck className="text-green-600" /> Notifies user</li>
                    <li className="flex items-center gap-3"><FaCheck className="text-green-600" /> Case resolved</li>
                  </ul>
                </button>

                {/* UNRESOLVED */}
                <button
                  onClick={() => {
                    setShowOptions(false);
                    setShowUnresolved(true);
                  }}
                  className="rounded-xl border p-4 md:p-5 text-left hover:shadow-sm transition-shadow cursor-pointer w-full"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Unresolved</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Closes ticket with remarks logs issue for future review.
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-900 text-sm">
                    <li className="flex items-center gap-3"><FaCheck className="text-green-600" /> Notifies user</li>
                    <li className="flex items-center gap-3"><FaCheck className="text-green-600" /> Case unresolved</li>
                  </ul>
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* UNRESOLVED, RESOLVED, URGENCY, STAFF ASSIGN MODALS */}
      {/* Your original modal code continues here unchanged */}
      {/* ----------------------------------------------- */}
      {/* I kept them exactly as your original layout */}

      {/* UNRESOLVED */}
      {showUnresolved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowUnresolved(false)} />
          <div className="relative z-10 w-full max-w-xl mx-auto px-3">
            <div className="bg-white rounded-xl shadow-xl border p-4 md:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Ticket Unresolved</h2>
                  <p className="mt-2 text-base md:text-lg text-gray-500">This closes the ticket but logs your remarks.</p>
                </div>
                <button onClick={() => setShowUnresolved(false)} className="w-7 h-7 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50">
                  <FaXmark className="w-3.5 h-3.5" />
                </button>
              </div>

              <textarea rows={4} placeholder="Provide some information." className="w-full rounded-2xl border bg-gray-50 p-3 text-gray-700 text-sm mt-5"></textarea>

              <div className="mt-5 flex items-center justify-end gap-2">
                <button onClick={() => setShowUnresolved(false)} className="px-3 py-1.5 rounded-xl border">Close</button>
                <button onClick={() => setShowUnresolved(false)} className="px-3 py-1.5 rounded-xl bg-[#0b2d4f] text-white">Proceed</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESOLVED */}
      {showResolved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowResolved(false)} />
          <div className="relative z-10 w-full max-w-xl mx-auto px-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleResolvedSubmit();
              }}
            >
              <div className="bg-white rounded-xl shadow-xl border p-4 md:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Ticket Resolved</h2>
                    <p className="mt-2 text-base md:text-lg text-gray-500">This action can be undone.</p>
                  </div>
                  <button onClick={() => setShowResolved(false)} className="w-7 h-7 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50">
                    <FaXmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button onClick={() => setShowResolved(false)} className="px-3 py-1.5 rounded-xl border">Close</button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-3 py-1.5 rounded-xl bg-[#0b2d4f] text-white ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Processing..." : "Proceed"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* URGENCY */}
      {showUrgency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowUrgency(false)}
          />

          <div className="relative z-10 w-full max-w-xl mx-auto px-3">
            <div className="bg-white rounded-xl shadow-xl border p-4 md:p-5">

              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold">Urgency Level</h2>
                  <p className="mt-1.5 text-sm text-gray-500">AI automates but users provide accuracy.</p>
                </div>

                <button
                  onClick={() => setShowUrgency(false)}
                  className="w-7 h-7 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50"
                >
                  <FaXmark className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* OPTIONS */}
              <div className="mt-4 space-y-3">
                {urgencyOptions.map((opt) => {
                  const selected = selectedUrgency === opt.key;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => setSelectedUrgency(opt.key)}
                      className={`w-full text-left rounded-xl border p-3 transition
                  ${selected ? "bg-blue-500 text-white" : "bg-gray-50 hover:bg-gray-100"}
                `}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 w-3.5 h-3.5 rounded-full 
                      ${selected ? "bg-white" : opt.color}
                    `}
                        />
                        <div>
                          <div className="font-semibold">{opt.label}</div>
                          <div className={`text-sm ${selected ? "text-white/80" : "text-gray-500"}`}>
                            {opt.desc}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* FOOTER BUTTONS */}
              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowUrgency(false)}
                  className="px-3 py-1.5 rounded-xl border bg-white text-sm"
                >
                  Close
                </button>


                <button
                  onClick={handleUrgencyLevelSubmit}
                  className="px-3 py-1.5 rounded-xl bg-[#0b2d4f] text-white text-sm"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAFF ASSIGN */}
      {showAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAssign(false)} />
          <div className="relative z-10 w-full max-w-2xl mx-auto px-3">
            <div className="bg-white rounded-2xl shadow-xl border p-5 md:p-6">

              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Staff Assign</h2>
                  <p className="mt-2 text-base text-gray-500">Search all existing admin users by name.</p>
                </div>
                <button onClick={() => setShowAssign(false)} className="w-8 h-8 inline-flex items-center justify-center rounded-full border bg-white">
                  <FaXmark className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-2xl border bg-gray-50 text-sm"
                  placeholder="Search"
                />
                <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              <div className="mt-4 space-y-4 max-h-[38vh] overflow-y-auto pr-1">
                {filteredAdmins.map((a) => (
                  <button key={a.id} onClick={() => toggleSelect(a.id)} className="w-full text-left flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">{a.avatar}</div>
                    <div className="flex-1 border-b pb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold">{a.name}</div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#e9d1ff] text-[#6f31a6] text-xs">Admin</span>
                      </div>
                      <div className="text-gray-500 text-sm">{a.email}</div>
                    </div>
                    <input type="checkbox" readOnly checked={selectedIds.includes(a.id)} className="mt-1" />
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {admins
                  .filter((a) => selectedIds.includes(a.id))
                  .map((a) => (
                    <span key={a.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b46ff] text-white text-sm">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">{a.avatar}</span>
                      {a.name}
                    </span>
                  ))}
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button onClick={() => setShowAssign(false)} className="px-4 py-2 rounded-xl border">Close</button>
                <button onClick={() => setShowAssign(false)} className="px-4 py-2 rounded-xl bg-[#0b2d4f] text-white">Proceed</button>
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}
