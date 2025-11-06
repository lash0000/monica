import React, { useMemo, useState, useEffect } from "react";
import { FaMagnifyingGlass, FaRotateRight, FaLock, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const MY_TICKETS = [
  { id: 1, type: "Incident Report", title: "Rambulan ng mga kabataan", body: "May mga binabato po rito na mahilig gawing playground ang aming bahay marami po sa kanila na...", updatedAt: "Sep 19, 2025" },
  { id: 2, type: "Complaint", title: "Titulo mismo sa lupa", body: "Priority Level: Medium (Status: Endorsement to LUPON Tagapamayapa)", updatedAt: "Sep 19, 2025" },
  { id: 3, type: "Complaint", title: "Inggay sa gabi", body: "Madaling araw na po ngunit malakas pa rin ang tugtog sa kapitbahay.", updatedAt: "Sep 18, 2025" },
  { id: 4, type: "Incident Report", title: "Nawalang motorsiklo", body: "Nawala ang motor sa may palengke kahapon ng hapon.", updatedAt: "Sep 18, 2025" },
  { id: 5, type: "Incident Report", title: "Basura sa kanal", body: "Tambak ng basura sa tapat ng Block 4, bumabara sa daloy ng tubig.", updatedAt: "Sep 17, 2025" },
  { id: 6, type: "Complaint", title: "Maingay na aso", body: "Halos buong magdamag tumatahol ang aso ng kapitbahay.", updatedAt: "Sep 17, 2025" },
  { id: 7, type: "Incident Report", title: "Sirang streetlight", body: "Poste sa Phase 2 wala pa ring ilaw tatlong araw na.", updatedAt: "Sep 16, 2025" },
  { id: 8, type: "Complaint", title: "Obstruction sa sidewalk", body: "May nakaharang na tricycle sa eskinita buong araw.", updatedAt: "Sep 16, 2025" },
  { id: 9, type: "Incident Report", title: "Nawalang wallet", body: "Naiwan ko ang wallet sa covered court, baka may nag-abot.", updatedAt: "Sep 15, 2025" },
  { id: 10, type: "Incident Report", title: "Pusang ligaw", body: "May pusang sugatan na gumagala sa daycare area.", updatedAt: "Sep 15, 2025" },
  { id: 11, type: "Complaint", title: "Matagal ang pila", body: "Sobrang tagal ng pila sa barangay clearance release, baka pwedeng dagdagan ang staff.", updatedAt: "Sep 14, 2025" },
  { id: 12, type: "Incident Report", title: "Leak sa gripo ng park", body: "Tumutulo ang public faucet buong araw, sayang ang tubig.", updatedAt: "Sep 14, 2025" },
  { id: 13, type: "Complaint", title: "Malakas na paputok", body: "May nagpa-paputok kahit hindi okasyon, maingay at delikado.", updatedAt: "Sep 13, 2025" },
  { id: 14, type: "Incident Report", title: "Banggaan sa kanto", body: "Minor collision sa kanto ng Luna at Rizal, walang nasaktan.", updatedAt: "Sep 13, 2025" },
  { id: 15, type: "Complaint", title: "Parking sa no-parking", body: "May mga sasakyan pa rin na nagpa-park sa harap ng gate namin.", updatedAt: "Sep 12, 2025" },
  { id: 16, type: "Incident Report", title: "Biyahe ng basura", body: "Hindi nakapag kolekta ang garbage truck kahapon, puno na ang bin.", updatedAt: "Sep 12, 2025" },
];

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
      <p className="text-[13px] text-gray-600 mb-3 line-clamp-2">{ticket.body}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <FaRotateRight className="w-3.5 h-3.5" />
          <span>Last Updated: {ticket.updatedAt}</span>
        </div>
        <FaLock className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

export default function UserTicket() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filtered = useMemo(() => {
    return MY_TICKETS.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.body.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  // Sliding window of 3 page numbers
  const windowPages = useMemo(() => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, Math.min(page - 1, totalPages - 2));
    return [start, start + 1, start + 2];
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        {/* Header + Search */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Tickets</h1>
            <p className="text-sm text-gray-500">Explore all of your ticket activities</p>
          </div>
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paged.map((t) => (
            <TicketCard key={t.id} ticket={t} />
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


