import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaMagnifyingGlass, FaRotateRight, FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TAGS = [
  "Maintenance",
  "Healthcare",
  "Social Services",
  "Community Programs",
  "Administrative",
  "Others",
];

const TICKETS = [
  { id: 1, tag: "Social Services", title: "AICS pati TUPAD assistance", body: "Hindi pa po ako nakakatanggap ng tulong pinansyal, baka pwede po magpa-follow up.", updatedAt: "Sep 19, 2025" },
  { id: 2, type: "Complaint", title: "Titulo mismo sa lupa", body: "Priority Level: Medium (Status: Endorsement to LUPON Tagapamayapa)", updatedAt: "Sep 19, 2025" },
  { id: 3, tag: "Healthcare", title: "Vaccination", body: "Hello po need po ba magpa-reschedule kung absent ako noong nakaraang bakuna?", updatedAt: "Sep 19, 2025" },
  { id: 4, tag: "Ayuda", title: "Verification Requirements Reminder", body: "All beneficiaries are required to update their information every 6 months to maintain their enrollment status...", updatedAt: "Sep 19, 2025" },
  { id: 5, tag: "Maintenance", title: "Streetlight not working", body: "May poste sa kanto ng Phase 3 na hindi umiilaw simula pa kagabi.", updatedAt: "Sep 18, 2025" },
  { id: 6, tag: "Community Programs", title: "Clean-up drive volunteers", body: "Pwede po bang sumali sa next weekend clean-up? Saan ang assembly?", updatedAt: "Sep 18, 2025" },
  { id: 7, tag: "Administrative", title: "Barangay ID schedule", body: "Kailan po ulit open ang pagkuha ng Barangay ID? Ano ang requirements?", updatedAt: "Sep 17, 2025" },
  { id: 8, tag: "Maintenance", title: "Clogged drainage", body: "Barado ang kanal sa may Purok 2, bumabaha kapag umuulan.", updatedAt: "Sep 17, 2025" },
  { id: 9, tag: "Healthcare", title: "Blood pressure check", body: "Libre po ba ang BP check sa health center? Anong oras po open?", updatedAt: "Sep 16, 2025" },
  { id: 10, tag: "Social Services", title: "Scholarship inquiry", body: "May available po bang scholarship para sa senior high?", updatedAt: "Sep 16, 2025" },
  { id: 11, tag: "Administrative", title: "Cedula fee", body: "Magkano na po ang latest fee para sa cedula ngayong taon?", updatedAt: "Sep 15, 2025" },
  { id: 12, tag: "Others", title: "Lost and found pet", body: "May nakita pong tuta sa covered court. Kanino po kaya ito?", updatedAt: "Sep 15, 2025" },
  { id: 13, tag: "Community Programs", title: "Sports clinic sign-up", body: "Open pa po ba ang registration para sa youth basketball clinic?", updatedAt: "Sep 14, 2025" },
  { id: 14, tag: "Maintenance", title: "Road pothole repair", body: "Malalim ang lubak sa tapat ng barangay hall. Baka pwedeng maayos.", updatedAt: "Sep 14, 2025" },
  { id: 15, tag: "Healthcare", title: "Dental check-up schedule", body: "Kelan po ang susunod na dental mission sa barangay?", updatedAt: "Sep 13, 2025" },
  { id: 16, tag: "Social Services", title: "Senior citizen allowance follow-up", body: "Na-delay daw ang allowance, kailan po ang release?", updatedAt: "Sep 13, 2025" },
];

function Tag({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-full border ${
        active
          ? "bg-[#e9ebff] text-[#20326e] border-[#c9d0ff]"
          : "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

function Card({ ticket }) {
  return (
    <Link to={`/ticket/1`} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="mb-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{ticket.tag}</span>
      </div>
      <h3 className="text-[16px] font-semibold text-gray-900 mb-1.5 leading-snug">{ticket.title}</h3>
      <p className="text-[13px] text-gray-600 mb-3 line-clamp-2">{ticket.body}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <FaRotateRight className="w-3.5 h-3.5" />
          <span>Last Updated: {ticket.updatedAt}</span>
        </div>
        <FaUsers className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

export default function Ticket() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 4; // show 4 cards per page like the mock
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return TICKETS.filter((t) =>
      (active === "All" || t.tag === active) &&
      (t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.body.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, active]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Sliding window pagination (3 pages visible)
  const windowPages = useMemo(() => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, Math.min(page - 1, totalPages - 2));
    return [start, start + 1, start + 2];
  }, [page, totalPages]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [query, active]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        {/* Header + Search aligned */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Browse</h1>
            <p className="text-sm text-gray-500">Explore all of visible tickets</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate('/my-tickets')} className="px-3 py-1.5 w-28 rounded-md border bg-white shadow-sm text-sm text-center">My ticket</button>
            <div className="relative w-full max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full border bg-white text-sm"
              placeholder="Search"
            />
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="text-xs text-gray-700 mb-2">Tags:</div>
          <div className="flex flex-wrap gap-2">
            <Tag label="All" active={active === "All"} onClick={() => setActive("All")} />
            {TAGS.map((t) => (
              <Tag key={t} label={t} active={active === t} onClick={() => setActive(t)} />
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paged.map((ticket) => (
            <Card key={ticket.id} ticket={ticket} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <button
            className={`px-3 py-1.5 rounded-md border bg-white shadow-sm flex items-center gap-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                className={`w-8 h-8 rounded-md border text-sm font-medium ${isActive ? 'bg-gray-200 text-gray-800' : 'bg-white'}`}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            )
          })}
          {windowPages[2] < totalPages && <span className="text-gray-600">…</span>}
          <button
            className={`px-3 py-1.5 rounded-md border bg-white shadow-sm flex items-center gap-2 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
            <FaChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
}


