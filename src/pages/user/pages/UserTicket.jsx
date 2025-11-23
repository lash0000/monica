import React, { useMemo, useState, useEffect } from "react";
import {
  FaMagnifyingGlass,
  FaRotateRight,
  FaLock,
  FaChevronLeft,
  FaChevronRight,
  FaUsers
} from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import UserTicketStore from "../stores/Ticket.store";

function TicketCard({ ticket }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <div className="mb-2">
        <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
          {ticket.type}
        </span>
      </div>

      <h3 className="text-[16px] font-semibold text-gray-900 mb-1.5 leading-snug">
        {ticket.title}
      </h3>

      <p className="text-[13px] text-gray-600 mb-3 line-clamp-2">
        {ticket.body}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <FaRotateRight className="w-3.5 h-3.5" />
          <span>Last Updated: {ticket.updatedAt}</span>
        </div>
        {["Complaint", "Incident Report"].includes(ticket.type) ? (
          <FaLock className="w-3.5 h-3.5" />
        ) : (
          <FaUsers className="w-3.5 h-3.5" />
        )}
      </div>
    </div>
  );
}

export default function UserTicket() {
  const { myTickets, tickets, loading } = UserTicketStore();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const navigate = useNavigate();
  const location = useLocation();
  const base_path = location.pathname;

  // Load user's tickets from backend on mount
  useEffect(() => {
    myTickets();
  }, []);

  // Filtered tickets according to query
  const filtered = useMemo(() => {
    return tickets.filter(
      (t) =>
        t.subject?.toLowerCase().includes(query.toLowerCase()) ||
        t.concern_details?.toLowerCase().includes(query.toLowerCase())
    );
  }, [tickets, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  // 3-page sliding window logic
  const windowPages = useMemo(() => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const start = Math.max(1, Math.min(page - 1, totalPages - 2));
    return [start, start + 1, start + 2];
  }, [page, totalPages]);

  return (
    <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      {/* Header + Search */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Tickets</h1>
          <p className="text-sm text-gray-500">
            Explore all of your ticket activities
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full border bg-white text-sm"
              placeholder="Search"
            />
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
          </div>

          <button
            onClick={() => navigate(`${base_path}/add-new-ticket`)}
            className="bg-indigo-600 hover:indigo-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm font-medium w-48 hover:scale-105"
          >
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            File a ticket
          </button>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading && (
          <div className="text-center col-span-2 text-gray-500 py-10">
            Loading tickets...
          </div>
        )}

        {!loading && paged.length === 0 && (
          <div className="text-center col-span-2 text-gray-600 py-10">
            No tickets found.
          </div>
        )}

        {!loading &&
          paged.map((t) => (
            <TicketCard
              key={t.ticket_id}
              ticket={{
                type: (t.category || "N/A").charAt(0).toUpperCase() + (t.category || "N/A").slice(1),
                title: t.subject || "Untitled Ticket",
                body: t.concern_details || "",
                updatedAt: new Date(t.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })
              }}
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

        {windowPages.map((num) => {
          const isActive = num === page;
          return (
            <button
              key={num}
              className={`w-8 h-8 rounded-md border text-sm font-medium ${isActive ? "bg-gray-200 text-gray-800" : "bg-white"
                }`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          );
        })}

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
