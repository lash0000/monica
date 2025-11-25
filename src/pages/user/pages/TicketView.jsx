import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../../lib/socket";
import UserTicketStore from "../stores/Ticket.store";
import UserProfileStore from "../stores/user-profile.store";
import Slider from "react-slick";

function TicketImageSlider({ files, onImageClick }) {
  if (!files || files.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="slider-container">
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
              onClick={() => onImageClick(file.file_url)}
            />
          </div>
        ))}
      </Slider>
    </div >
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

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

/* -------------------------------------------------------
   CATEGORY MAP
   ------------------------------------------------------- */
const CATEGORY_TO_TAG = {
  maintenance: "maintenance",
  healthcare: "healthcare",
  infrastructure: "administrative",
  environmental: "community programs",
  safety: "social services",
  other: "others",
  general: "general"
};

export default function TicketView() {
  const { id } = useParams();

  const {
    singleTicket,
    comments,
    loading,

    fetchTicket,
    fetchComments,
    postComment,

    joinRoom,
    leaveRoom,
    initializeSocketListeners
  } = UserTicketStore();

  const { profile } = UserProfileStore();
  const [localTicket, setLocalTicket] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const localTypingRef = useRef(false);

  const [page, setPage] = useState(1);
  const pageSize = 6;

  /* -------------------------------------------------------
     INIT SOCKET LISTENERS
     ------------------------------------------------------- */
  useEffect(() => {
    initializeSocketListeners();
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  /* -------------------------------------------------------
     JOIN ROOM + LOAD DATA
     ------------------------------------------------------- */
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

  /* -------------------------------------------------------
     OTHER USER TYPING INDICATOR
     ------------------------------------------------------- */
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

    console.log("Merging... singleTicket Files:", singleTicket.Files);

    const baseUpdates = Array.isArray(singleTicket.updates)
      ? [...singleTicket.updates]
      : [];

    const merged = [
      ...baseUpdates,
      ...(comments || [])
    ];

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
      updates: deduped
    };

    setLocalTicket((prev) => {
      if (!prev) return newTicket;
      const prevJSON = JSON.stringify(prev);
      const nextJSON = JSON.stringify(newTicket);
      if (prevJSON === nextJSON) return prev;
      return newTicket;
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
    updates = []
  } = localTicket;

  const selectedCategory = (() => {
    const lower = (category || "").toLowerCase();
    const raw = CATEGORY_TO_TAG[lower] || lower || "general";
    return raw
      .replace(/[^a-z0-9]+/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  })();


  const totalPages = Math.max(1, Math.ceil(updates.length / pageSize));

  const currentComments = updates.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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

  /* -------------------------------------------------------
     SEND COMMENT
     ------------------------------------------------------- */
  const handleSendComment = async () => {
    const text = commentInput.trim();
    if (!text || !localTicket?.id) return;

    try {
      await postComment(localTicket.id, {
        commented_by: profile?.id || localStorage.getItem("user_id"),
        comment: text
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
    <div className="flex justify-center w-full px-8 py-6 bg-gray">
      <div className="max-w-4xl w-full bg-white p-2 rounded-lg shadow-md py-6 px-8">

        <div className="flex items-center gap-2 text-sm mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
            {selectedCategory}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
            Opened by {openedByName}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {title || subject}
        </h2>

        <p className="text-gray-700 mb-4 whitespace-pre-wrap">
          {concern_details}
        </p>
        <div className="">
          <TicketImageSlider
            files={Files}
          />
        </div>

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

        <div className="space-y-4">
          {currentComments.map((update) => (
            <div key={update.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                  {(
                    update?.UserProfile?.name?.last ||
                    update?.UserProfile?.name?.first ||
                    update?.author ||
                    "U"
                  ).charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">
                      {update?.UserProfile
                        ? `${update.UserProfile.name.last}, ${update.UserProfile.name.first}${update.UserProfile.name.middle
                          ? ` ${update.UserProfile.name.middle.charAt(0)}.`
                          : ""
                        }`
                        : update?.UserCredential?.email ||
                        update?.author ||
                        "Unknown User"}
                    </p>

                    <span className="text-gray-400">•</span>

                    <p className="text-xs text-gray-500">
                      {timeAgo(
                        update?.createdAt ||
                        update?.updatedAt ||
                        update?.created_at ||
                        update?.updated_at
                      )}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm whitespace-pre-wrap">
                    {update?.comment || update?.content}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {isTyping && (
          <p className="text-xs text-gray-500 mt-2">Someone is typing...</p>
        )}

        {/* -------------------------------------------------------
           PAGINATION
           ------------------------------------------------------- */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-6">
            <nav className="flex items-center gap-2 text-sm">

              <button
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-100 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
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
                className={`px-3 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-100 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                Next
              </button>

            </nav>
          </div>
        )}

      </div>
    </div>
  );
}
