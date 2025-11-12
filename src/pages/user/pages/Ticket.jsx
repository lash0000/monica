import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass, FaRotateRight, FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TAGS = [
  "Maintenance",
  "Healthcare",
  "Social Services",
  "Community Programs",
  "Administrative",
  "Others",
];

// Extended ticket data with full details
const TICKET_DETAILS = {
  1: {
    id: 1,
    tag: "Social Services",
    title: "AICS pati TUPAD assistance",
    body: "Hindi pa po ako nakakatanggap ng tulong pinansyal, baka pwede po magpa-follow up.",
    openedBy: "Henson, Justine Eldrich V.",
    openedTime: "12 hours ago",
    status: "Resolved",
    urgencyLevel: "Urgent",
    category: "Social Services",
    dateTime: "13/10/25 at 12:31 PM GMT (+8)",
    description: "Matagong naghihintay nang matagal yung request sa Barangay Santa Monica. Natatanggap na po namin ang niyong concern at lahat ay ariling nila na para sa agapang abuyon.",
    basicServices: [
      "Maintenance & Infrastructure: I-refer sa Engineering/Utility Team",
      "Healthcare: I-appoint sa Barangay Health Center/Health Personnel",
      "Social Services: Ipa-handle sa Social Services Office",
      "Community Programs: Ko-coordinate sa Community Affairs Unit",
      "Administrative & Governance: I-address ng Barangay Administrative Office",
      "Others: I-review ng assigned staff"
    ],
    nextSteps: "Makatitiyak pang makikipag-ugnayan ang assigned staff para sa karagdagang detalye",
    updates: [
      {
        author: "Admin 456565",
        time: "10h ago",
        tag: "Admin Staff",
        content: "Salamat po sa inyong follow-up. Ayon sa pinakahuling tala mula sa aming Social Services Office, ang libralidad ng schedule para sa AICS at TUPAD batch ay sinasamantalahan nitong sinasinang ng DSWD at City Social Welfare and Development Department (CSWDD). Kung nais ninyong makakupo ng nasasalat list, makakadiskubre po kayo ng latest list bawat Putas ang social welfare staff para sa iskandarya (kung mawawala) sa reference number (kung mayroon)."
      },
      {
        author: "Henson, Justine Eldrich V.",
        time: "10h ago",
        tag: "Bonafide",
        content: "When po uli ang bagan?"
      },
      {
        author: "Admin 456565",
        time: "6h ago",
        tag: "Admin Staff",
        content: "Wala po as of now, we will update nalang po requesting here sooner."
      },
      {
        author: "Bose, John Lander G.",
        time: "6h ago",
        tag: "Bonafide",
        content: "Why naman wala pa huhu"
      }
    ]
  }
};

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

function Card({ ticket, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow text-left w-full cursor-pointer"
    >
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
    </button>
  );
}

export default function Ticket() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const pageSize = 4; // show 4 cards per page like the mock
  const navigate = useNavigate();

  const handleTicketClick = (ticket) => {
    // Get full ticket details or use default data
    const ticketDetails = TICKET_DETAILS[ticket.id] || {
      ...ticket,
      openedBy: "User",
      openedTime: ticket.updatedAt,
      status: "Pending",
      urgencyLevel: "Medium",
      category: ticket.tag || "Others",
      dateTime: ticket.updatedAt,
      description: ticket.body,
      basicServices: [
        "Maintenance & Infrastructure: I-refer sa Engineering/Utility Team",
        "Healthcare: I-appoint sa Barangay Health Center/Health Personnel",
        "Social Services: Ipa-handle sa Social Services Office",
        "Community Programs: Ko-coordinate sa Community Affairs Unit",
        "Administrative & Governance: I-address ng Barangay Administrative Office",
        "Others: I-review ng assigned staff"
      ],
      nextSteps: "Makatitiyak pang makikipag-ugnayan ang assigned staff para sa karagdagang detalye",
      updates: []
    };
    setSelectedTicket(ticketDetails);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    setComment("");
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      // Save current overflow style
      const originalOverflow = document.body.style.overflow || '';
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scrolling when modal closes
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      // Ensure scrolling is enabled when modal is closed
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

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
            <Card key={ticket.id} ticket={ticket} onClick={() => handleTicketClick(ticket)} />
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

        {/* Ticket View Modal */}
        {isModalOpen && selectedTicket && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
            onClick={closeModal}
          >
            <div 
              className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
                <h2 className="text-xl font-semibold text-gray-900"> Justine Eldrich V. Henson's Post</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content - TicketView */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Side - Post Content */}
                    <div className="lg:col-span-2 flex flex-col" style={{ maxHeight: 'calc(90vh - 8rem)' }}>
                      {/* Original Post */}
                      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col flex-1 overflow-hidden">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs mb-3 flex-shrink-0">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium text-xs">
                            {selectedTicket.tag || selectedTicket.category}
                          </span>
                        </div>
                        
                        {/* Title with Time */}
                        <div className="flex items-center justify-between mb-3 flex-shrink-0">
                          <h2 className="text-xl font-bold text-gray-900">
                            {selectedTicket.title}
                          </h2>
                          <span className="text-xs text-gray-500">
                            {selectedTicket.openedTime}
                          </span>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3 mb-3 flex-shrink-0">
                          <p className="text-sm text-gray-700 mb-3">
                            {selectedTicket.body}
                          </p>
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1.5 text-gray-600 text-xs">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              Replies ({selectedTicket.updates?.length || 0})
                            </button>
                            <button className="flex items-center gap-1.5 text-gray-600 text-xs">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                              </svg>
                              Share your thoughts
                            </button>
                          </div>
                        </div>

                        {/* Ticket Details - Scrollable */}
                        <div className="bg-white border border-gray-200 rounded-lg p-3 flex-1 overflow-y-auto scrollbar-hide">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                              D
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <p className="font-medium text-gray-900 text-sm">DeepSeek AI</p>
                                <span className="text-gray-400">•</span>
                                <p className="text-xs text-gray-500">10h ago</p>
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                                  System Generated
                                </span>
                              </div>

                              <div className="space-y-3 text-xs">
                                <div>
                                  <p className="font-medium text-gray-700 mb-0.5 text-xs">Category:</p>
                                  <p className="text-gray-900 text-xs">{selectedTicket.category}</p>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700 mb-0.5 text-xs">Status:</p>
                                  <p className="text-gray-900 text-xs">{selectedTicket.status}</p>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700 mb-1 text-xs">Urgency Level:</p>
                                  <div className="flex gap-1.5 flex-wrap">
                                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">Urgent</span>
                                    <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">Medium</span>
                                    <span className="px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded">High</span>
                                    <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded">Critical</span>
                                  </div>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700 mb-0.5 text-xs">Date and Time:</p>
                                  <p className="text-gray-900 text-xs">{selectedTicket.dateTime}</p>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700 mb-0.5 text-xs">Description:</p>
                                  <p className="text-gray-900 text-xs">
                                    {selectedTicket.description}
                                  </p>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700 mb-1 text-xs">Basis sa kung anong office isasalo ung concern:</p>
                                  <ul className="space-y-1 ml-6">
                                    {selectedTicket.basicServices?.map((service, index) => (
                                      <li key={index} className="text-gray-700 list-disc text-xs">{service}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700 mb-0.5 text-xs">Next Steps:</p>
                                  <p className="text-gray-900 text-xs">
                                    {selectedTicket.nextSteps}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Comments Section */}
                    <div className="lg:col-span-1">
                      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4 flex flex-col" style={{ maxHeight: 'calc(90vh - 8rem)' }}>
                        <h3 className="text-base font-semibold text-gray-900 mb-3 flex-shrink-0">Comments</h3>
                        
                        {/* Comments List */}
                        <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide mb-4">
                          {selectedTicket.updates?.map((update, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                                  {update.author.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                    <p className="font-medium text-gray-900 text-xs">{update.author}</p>
                                    <span className="text-gray-400 text-xs">•</span>
                                    <p className="text-xs text-gray-500">{update.time}</p>
                                  </div>
                                  <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium mb-1.5">
                                    {update.tag}
                                  </span>
                                  <p className="text-gray-700 text-xs leading-relaxed">{update.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {(!selectedTicket.updates || selectedTicket.updates.length === 0) && (
                            <div className="text-center text-gray-500 text-xs py-4">No comments yet</div>
                          )}
                        </div>

                        {/* Comment Input - Sticky at Bottom */}
                        <div className="flex-shrink-0 border-t border-gray-200 pt-4">
                          <div className="flex items-start gap-2">
                            {/* Profile Picture */}
                            <div className="relative flex-shrink-0">
                              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                R
                              </div>
                
                            </div>
                            
                            {/* Comment Input Container */}
                            <div className="flex-1 bg-gray-100 rounded-xl p-2.5 min-h-[60px] flex flex-col border border-gray-200">
                              {/* Input Area */}
                              <div className="flex-1 min-h-[20px]">
                                <textarea
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Comment as Roel Salvador"
                                  className="w-full bg-transparent text-gray-900 text-xs resize-none focus:outline-none placeholder-gray-500 leading-relaxed"
                                  rows={1}
                                  style={{ 
                                    minHeight: comment ? 'auto' : '20px',
                                    maxHeight: '100px'
                                  }}
                                />
                              </div>
                              
                              {/* Icons Row */}
                              <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-gray-300">
                                <div className="flex items-center gap-2">
                                  {/* Sticker/Emoji Icon */}
                                  <button className="text-gray-500 hover:text-gray-700 transition-colors p-0.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </button>
                                  {/* Camera Icon */}
                                  <button className="text-gray-500 hover:text-gray-700 transition-colors p-0.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </button>
                                  {/* GIF Button */}
                                  <button className="text-gray-500 hover:text-gray-700 transition-colors font-semibold text-xs px-1">
                                    GIF
                                  </button>
                                </div>
                                
                                {/* Send Button */}
                                <button 
                                  onClick={() => {
                                    if (comment.trim()) {
                                      // Handle comment submission
                                      setComment('');
                                    }
                                  }}
                                  disabled={!comment.trim()}
                                  className={`transition-colors p-1 ${comment.trim() ? 'text-gray-700 hover:text-gray-900' : 'text-gray-400 cursor-not-allowed'}`}
                                >
                                  <svg className="w-4 h-4 transform rotate-[90deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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


