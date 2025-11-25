import React, { useEffect, useMemo, useState, useRef } from "react";
import socket from "../../../lib/socket";
import { useNavigate } from "react-router-dom";

import {
  FaMagnifyingGlass,
  FaRotateRight,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaGhost
} from "react-icons/fa6";

import UserTicketStore from "../stores/Ticket.store";
import UserProfileStore from "../stores/user-profile.store";

// -------------------------------------------------------
// Constants
// -------------------------------------------------------
const TAGS = [
  "maintenance",
  "healthcare",
  "social services",
  "community programs",
  "administrative",
  "others"
];

const CATEGORY_TO_TAG = {
  maintenance: "maintenance",
  healthcare: "healthcare",
  infrastructure: "administrative",
  environmental: "community programs",
  safety: "social services",
  other: "others"
};

const TAG_TO_CATEGORIES = Object.entries(CATEGORY_TO_TAG).reduce((acc, [cat, tag]) => {
  acc[tag] = acc[tag] || [];
  acc[tag].push(cat);
  return acc;
}, {});

// -------------------------------------------------------
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

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// -------------------------------------------------------
function Tag({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-full ${active ? "bg-primary text-white" : "border bg-white text-gray-700 border-gray-200"
        }`}
    >
      {label}
    </button>
  );
}

// -------------------------------------------------------
function TicketCard({ ticket, onClick }) {
  const category = (ticket.category || ticket.tag || "").toLowerCase();
  const mappedTag =
    CATEGORY_TO_TAG[category] ||
    ticket.mappedTag ||
    ticket.tag ||
    "others";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow w-full cursor-pointer h-fit"
    >
      <div className="mb-3">
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {mappedTag.charAt(0).toUpperCase() + mappedTag.slice(1)}
        </span>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-1.5 leading-snug">
          {ticket.subject || ticket.title || "untitled ticket"}
        </h3>
        <p className="text-[13px] text-gray-600 mb-3 line-clamp-2">
          {ticket.concern_details || ticket.body || ""}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <FaRotateRight className="size-4" />
          <span>
            last updated:{" "}
            {ticket.updatedAt
              ? new Date(ticket.updatedAt).toLocaleString()
              : "n/a"}
          </span>
        </div>
        <FaUsers className="w-4" />
      </div>
    </div>
  );
}

// -------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------
export default function Ticket() {
  const navigate = useNavigate();

  const {
    tickets,
    singleTicket,
    comments,
    loading,

    // REST
    fetchAllTickets,
    fetchTicket,
    fetchComments,
    postComment,

    // SOCKET
    joinRoom,
    leaveRoom,
    initializeSocketListeners
  } = UserTicketStore();

  const { profile } = UserProfileStore();

  // UI states
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  // typing indicator (plain text "Someone is typing...")
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const localTypingRef = useRef(false); // if local user is currently typing (to avoid double emit)

  // initialize once
  useEffect(() => {
    initializeSocketListeners();
    fetchAllTickets();
    // cleanup on unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Listen for typing events while modal open (remote indicators)
  useEffect(() => {
    if (!isModalOpen || !selectedTicket) return;

    const onIncoming = ({ ticketId, user }) => {
      // ensure event is for current ticket
      if (!selectedTicket?.id || String(ticketId) !== String(selectedTicket.id)) return;
      // show the simple text requested
      setIsTyping(true);
    };

    const onClear = ({ ticketId }) => {
      if (!selectedTicket?.id || String(ticketId) !== String(selectedTicket.id)) return;
      setIsTyping(false);
    };

    socket.on("typing:incoming", onIncoming);
    socket.on("typing:clear", onClear);

    return () => {
      socket.off("typing:incoming", onIncoming);
      socket.off("typing:clear", onClear);
    };
  }, [isModalOpen, selectedTicket]);

  // Sync modal with updated ticket/comments — dedupe updates by id
  useEffect(() => {
    if (!isModalOpen || !selectedTicket) return;

    if (singleTicket && singleTicket.id === selectedTicket.id) {
      // comments array comes from store (comments variable)
      const incoming = comments || [];

      // Build combined updates: prefer singleTicket.updates (if exists) + incoming
      // then dedupe by id preserving order newest-last as provided by backend
      const merged = Array.isArray(singleTicket.updates) ? [...singleTicket.updates] : [];
      // append incoming that aren't already included
      incoming.forEach((c) => {
        if (!merged.some((m) => String(m.id) === String(c.id))) {
          merged.push(c);
        }
      });

      // dedupe just in case, preserve first occurrence
      const seen = new Set();
      const deduped = merged.filter((c) => {
        const id = String(c.id || c?.id || `${c.parent_id}-${c.comment}`); // fallback id
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });

      setSelectedTicket((prev) => ({
        ...singleTicket,
        openedTime: prev?.openedTime ?? singleTicket.openedTime,
        mappedTag: prev?.mappedTag ?? singleTicket.mappedTag,
        updates: deduped
      }));
    }
  }, [singleTicket, comments, isModalOpen, selectedTicket]);

  // handle clicking a ticket: join room, fetch ticket + comments, open modal
  const handleTicketClick = (ticket) => {
    const id = ticket.id || ticket.ticket_id || ticket._id;
    if (!id) return;

    joinRoom(id);
    fetchTicket(id);
    fetchComments(id);

    const openedTime = ticket.createdAt
      ? new Date(ticket.createdAt).toLocaleString("en-US", { timeZone: "Asia/Manila", hour12: true })
      : ticket.updatedAt
        ? new Date(ticket.updatedAt).toLocaleString("en-US", { timeZone: "Asia/Manila", hour12: true })
        : "n/a";

    const mappedTag = CATEGORY_TO_TAG[(ticket.category || "").toLowerCase()] || ticket.tag || "others";

    setSelectedTicket({
      ...ticket,
      id,
      title: ticket.subject || ticket.title,
      body: ticket.concern_details || ticket.body,
      openedByName: ticket.openedByName || "User",
      openedTime,
      mappedTag,
      updates: comments || []
    });

    setIsModalOpen(true);
  };

  // close modal and leave room, clear typing if needed
  const closeModal = () => {
    if (selectedTicket?.id) {
      leaveRoom(selectedTicket.id);
      // ensure we notify server that typing stopped
      try {
        socket.emit("typing:stop", selectedTicket.id);
      } catch (_) { }
    }
    setIsModalOpen(false);
    setSelectedTicket(null);
    setCommentInput("");
    setIsTyping(false);
    localTypingRef.current = false;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  // send comment (REST wrapper in store handles server+broadcast)
  const handleSendComment = async () => {
    if (!commentInput.trim() || !selectedTicket?.id) return;
    try {
      await postComment(selectedTicket.id, {
        commented_by: profile?.id || localStorage.getItem("user_id"),
        comment: commentInput.trim()
      });
      // after posting, ensure typing stop emitted
      try {
        socket.emit("typing:stop", selectedTicket.id);
      } catch (_) { }
    } catch (err) {
      // keep error handling simple — store sets error; you can show toast here if desired
      console.error("Failed to post comment:", err);
    } finally {
      setCommentInput("");
      localTypingRef.current = false;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      setIsTyping(false);
    }
  };

  // local typing handler — emit typing:start and typing:stop (debounced)
  const onCommentInputChange = (e) => {
    const val = e.target.value;
    setCommentInput(val);

    // if no selected ticket, nothing to emit
    if (!selectedTicket?.id) return;

    // emit typing:start immediately if not already typing locally
    if (!localTypingRef.current) {
      try {
        socket.emit("typing:start", selectedTicket.id);
      } catch (_) { }
      localTypingRef.current = true;
    }

    // reset debounce timer to emit typing:stop after idle
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      // emit typing:stop if we were typing locally
      if (localTypingRef.current) {
        try {
          socket.emit("typing:stop", selectedTicket.id);
        } catch (_) { }
        localTypingRef.current = false;
      }
      setIsTyping(false); // clear local visible indicator
      typingTimeoutRef.current = null;
    }, 1800); // 1.8s idle -> stop
  };

  // list filtering + pagination logic (unchanged)
  const safeTickets = Array.isArray(tickets) ? tickets : [];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return safeTickets
      .map(t => {
        const cat = (t.category || t.tag || "").toLowerCase();
        const mappedTag = CATEGORY_TO_TAG[cat] || t.tag || "others";

        return {
          ...t,
          mappedTag,
          title: t.subject || t.title || "",
          body: t.concern_details || t.body || "",
          updatedAt: t.updatedAt || "n/a",
          category: cat
        };
      })
      .filter(t => {
        if (q) {
          const matches =
            t.title.toLowerCase().includes(q) ||
            t.body.toLowerCase().includes(q) ||
            t.mappedTag.toLowerCase().includes(q);
          if (!matches) return false;
        }

        if (active !== "all") {
          const allowedCats = TAG_TO_CATEGORIES[active] || [];
          return (
            allowedCats.includes(t.category) ||
            t.mappedTag.toLowerCase() === active.toLowerCase()
          );
        }

        return true;
      });
  }, [safeTickets, query, active]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [query, active]);

  return (
    <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Browse</h1>
          <p className="text-sm text-gray-500">Explore all visible tickets</p>
        </div>

        <div className="relative w-full max-w-sm">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search"
            className="w-full pl-8 pr-3 py-1.5 rounded-full border bg-white text-sm"
          />
          <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="text-xs text-gray-700 mb-2">tags:</div>
        <div className="flex flex-wrap gap-2">
          <Tag label="All" active={active === "all"} onClick={() => setActive("all")} />
          {TAGS.map(t => (
            <Tag
              key={t}
              label={t.replace(/\b\w/g, l => l.toUpperCase())}
              active={active === t}
              onClick={() => setActive(t)}
            />
          ))}
        </div>
      </div>

      {/* Ticket Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading && (
          <div className="text-center col-span-2 text-gray-500 py-10">
            loading tickets...
          </div>
        )}

        {!loading && paged.length === 0 && (
          <div className="text-center col-span-2 text-gray-600 py-10">
            No data found.
          </div>
        )}

        {!loading &&
          paged.map(ticket => (
            <TicketCard
              key={ticket.id || ticket._id}
              ticket={ticket}
              onClick={() => handleTicketClick(ticket)}
            />
          ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3 text-sm">
        <button
          disabled={page === 1}
          onClick={() => page > 1 && setPage(page - 1)}
          className={`px-3 py-1.5 rounded-md border bg-white shadow-sm flex items-center gap-2 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(0, 5)
          .map(num => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`w-8 h-8 rounded-md border text-sm font-medium ${num === page ? "bg-gray-200" : "bg-white"
                }`}
            >
              {num}
            </button>
          ))}

        <button
          disabled={page === totalPages}
          onClick={() => page < totalPages && setPage(page + 1)}
          className={`px-3 py-1.5 rounded-md border bg-white shadow-sm flex items-center gap-2 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Next
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTicket && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedTicket.openedByName}'s post
                </h2>
                <div
                  className="bg-primary cursor-pointer hover:bg-blue-500 transition-colors rounded-sm text-sm text-white flex items-center px-4 py-2"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent closing modal
                    navigate(`/ticket/${selectedTicket.id}`);
                    closeModal();
                  }}
                >
                  View post
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Ticket Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left Column */}
                  <div className="lg:col-span-2 flex flex-col" style={{ maxHeight: "calc(90vh - 8rem)" }}>
                    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col flex-1 overflow-hidden">
                      <div className="flex items-center gap-2 text-xs mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {selectedTicket.mappedTag?.charAt(0).toUpperCase() + selectedTicket.mappedTag?.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold text-gray-900">
                          {selectedTicket.title}
                        </h2>
                        <span className="text-xs text-gray-500">
                          {selectedTicket.openedTime}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg mb-3 p-3">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedTicket.body}
                        </p>
                      </div>

                      <div className="bg-slate-200 border border-gray-200 rounded-lg p-3 h-[400px]">
                        <div className="flex items-center justify-center h-full flex-col gap-4 text-slate-500">
                          <FaGhost className="size-12" />
                          <div className="text-center">
                            <h1>ai report will see here.</h1>
                            <p>it will generate soon.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Comments */}
                  <div className="lg:col-span-1">
                    <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col" style={{ maxHeight: "calc(90vh - 8rem)" }}>
                      <h3 className="text-base font-semibold text-gray-900 mb-3">Comments</h3>

                      <div className="space-y-3 flex-1 overflow-y-auto mb-4">
                        {selectedTicket.updates?.length ? (
                          selectedTicket.updates.map(c => {
                            const first = c?.UserProfile?.name?.first || "";
                            const last = c?.UserProfile?.name?.last || "";
                            const middle = c?.UserProfile?.name?.middle?.[0] || "";

                            const display =
                              last && first
                                ? `${last}, ${first} ${middle}.`
                                : c?.UserCredential?.email || "Unknown user";

                            const role = c?.UserCredential?.acc_type || "User";

                            const time =
                              c?.createdAt ||
                              c?.updatedAt ||
                              c?.created_at ||
                              c?.updated_at;

                            const initial = last
                              ? last.charAt(0).toUpperCase()
                              : display.charAt(0).toUpperCase();

                            return (
                              <div key={c.id} className="bg-gray-50 border rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                  <div className="size-6 rounded-full flex items-center justify-center bg-indigo-500 text-white text-xs">
                                    {initial}
                                  </div>

                                  <div className="flex-1 min-w-0 max-w-lg">
                                    <div className="flex items-center gap-1 mb-1 flex-wrap">
                                      <p className="font-medium text-gray-900 text-xs">
                                        {display}
                                      </p>
                                      <span className="text-gray-400 text-xs">•</span>
                                      <p className="text-xs text-gray-500">{timeAgo(time)}</p>
                                    </div>


                                    <p className="text-gray-700 text-xs leading-relaxed break-words whitespace-pre-wrap">
                                      {c.comment}
                                    </p>

                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center text-gray-500 text-xs py-4">
                            no comments yet
                          </div>
                        )}
                      </div>

                      {/* Typing indicator (plain text) */}
                      {isTyping && (
                        <div className="text-xs text-gray-500 mb-2">
                          Someone is typing...
                        </div>
                      )}

                      {/* Input */}
                      <div className="flex-shrink-0 border-t pt-4">
                        <div className="flex items-start gap-2">
                          <div className="size-9 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                            {(profile?.UserProfile?.name?.first || profile?.name?.first || "U").charAt(0).toUpperCase()}
                          </div>

                          <div className="flex-1 bg-gray-100 rounded-xl border p-2.5 flex flex-col">
                            <textarea
                              value={commentInput}
                              onChange={onCommentInputChange}
                              placeholder={`Comment here`}
                              className="w-full bg-transparent text-gray-900 text-xs resize-none focus:outline-none"
                              rows={2}
                            />

                            <div className="flex justify-end mt-1">
                              <button
                                onClick={handleSendComment}
                                disabled={!commentInput.trim()}
                                className={`p-1 ${commentInput.trim()
                                  ? "text-gray-700 hover:text-gray-900"
                                  : "text-gray-400 cursor-not-allowed"
                                  }`}
                              >
                                <svg
                                  className="size-4 rotate-[90deg]"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m12 19 9 2-9-18-9 18 9-2zm0 0v-8"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Input */}

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
