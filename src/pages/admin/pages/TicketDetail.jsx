import React, { useMemo, useState } from "react";
import { FaRegCommentDots, FaCheck } from "react-icons/fa";
import { FaSliders, FaEyeSlash, FaTrash, FaXmark, FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function TicketDetail() {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [search, setSearch] = useState("");
  const [showResolved, setShowResolved] = useState(false);
  const [showUnresolved, setShowUnresolved] = useState(false);
  const [showUrgency, setShowUrgency] = useState(false);
  const admins = useMemo(() => ([
    { id: 1, name: 'Agustin, Angel Mae', email: 'agustin.angelmae@qcu.edu.ph', avatar: '🧑🏻‍🦰' },
    { id: 2, name: 'Rentillo, Mary Fiona Louise', email: 'rentillo.maryfionalouise@qcu.edu.ph', avatar: '👩🏻' },
    { id: 3, name: 'Gilo, Jhon Lloyd', email: 'gilo.johnlloyd@qcu.edu.ph', avatar: '🧑🏻‍💻' },
    { id: 4, name: 'Gamba, Richelle', email: 'gamba.richelle@qcu.edu.ph', avatar: '👩🏻‍🎓' },
    { id: 5, name: 'Avila, John Luigi M.', email: 'avila.johnluigi@qcu.edu.ph', avatar: '🧑🏻‍🎓' },
  ]), []);
  const [selectedIds, setSelectedIds] = useState([4,5]);
  const filteredAdmins = useMemo(() => admins.filter(a => a.name.toLowerCase().includes(search.toLowerCase())), [admins, search]);
  const toggleSelect = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x!==id) : [...prev, id]);
  // Static mock content matching the provided layout
  return (
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-4 relative">
          <button
            type="button"
            aria-label="Close"
            onClick={() => navigate('/admin/tickets')}
            className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 text-gray-700 cursor-pointer"
          >
            <FaXmark className="w-4 h-4" />
          </button>
          {/* chips */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-full bg-[#f3f5ff] text-[#293a99] font-medium">Social Services</span>
            <span className="px-2.5 py-1 rounded-full bg-[#f7ecff] text-[#7a3aa5] font-medium">Opened by Henson, Justine Eldrich V.</span>
          </div>
          {/* title + sub */}
          <h1 className="mt-3 text-[24px] font-extrabold text-gray-900">AICS pati TUPAD assistance</h1>
          <p className="text-[13px] text-gray-600 mt-1">Hindi pa po ako nakakatanggap ng tulong pinansyal, baka pwede po magpa-follow up.</p>

          {/* actions row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-gray-800">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-dashed border-gray-400" />
              <span className="font-medium">Replies (3)</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f5f7] text-gray-800 text-[12px]">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-dashed border-gray-400" />
                Share your thoughts
              </button>
              <button onClick={() => setShowOptions(true)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3e8ff] text-[#6f31a6] text-[12px]">
                <FaSliders className="w-3.5 h-3.5" />
                Options
              </button>
            </div>
          </div>
          {/* Thread meta pill */}
          <div className="mt-4 rounded-xl px-4 py-3 text-[12px] text-[#7b3bb0] bg-[#f5e9ff] border border-[#edd8ff]">
            Henson, Justine Eldrich V. opened this thread (12 hours ago)
          </div>

          {/* Messages inside the same card */}
          <div className="mt-6 space-y-6">
          {/* Bot block */}
          <div className="p-5 rounded-xl border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600" />
              <div className="text-sm text-gray-900 font-semibold">DeepSeek AI</div>
              <div className="text-sm text-gray-600">• 10h ago</div>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-lime-200/60 text-[#385000] text-[11px] font-semibold">Automated Bot</span>
            </div>
            <div className="mt-4 text-sm text-gray-800 leading-relaxed">
              <p><span className="font-semibold">Category:</span> Social Services</p>
              <p><span className="font-semibold">Status:</span> Recieved</p>
              <p className="mb-2"><span className="font-semibold">Urgency Level:</span> <span className="inline-block ml-1 px-2 py-0.5 rounded-md bg-[#eef3ff] text-[#1f3b8f] text-xs">Low</span></p>
              <p className="mb-4"><span className="font-semibold">Date and Time:</span> 13/10/25 as of 12:31 PM (GMT +8)</p>
              <p className="mb-4">Maraming salamat po sa inyong pag-submit ng service request sa Barangay Santa Monica. Natanggap na po namin ang inyong concern at ito ay aming ini-log para sa agarang aksyon.</p>
              <p className="font-semibold">Base sa inyong category, ito ang aming initial action:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Maintenance & Infrastructure: I-refer sa Engineering/Utility Team</li>
                <li>Healthcare: I-endorso sa Barangay Health Center/Medical Team</li>
                <li>Social Services & Assistance: Ipro-process sa Social Services Desk</li>
                <li>Community Programs: Iko-coordinate sa Community Affairs Unit</li>
                <li>Administrative & Governance: I-aaddress sa Barangay Secretary Office</li>
                <li>Others: I-evaluate ng General Services Team</li>
              </ul>
              <p className="font-semibold mt-4">Next Steps</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Maaaring makipag-ugnayan ang assigned staff para sa karagdagang detalye</li>
                <li>Maghintay ng update sa inyong contact details within 3 to 5 working days</li>
                <li>Maari pong mag-follow up sa Barangay Hall sabay ipakita yung Ticket</li>
              </ul>
              <p className="mt-4">Salamat po sa inyong pagtitiwala at pakikipagtulungan!</p>
            </div>
            {/* Actions under block */}
            <div className="mt-4 flex items-center gap-3 text-xs">
              <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaEyeSlash className="w-3.5 h-3.5"/> Hide</button>
              <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaTrash className="w-3.5 h-3.5"/> Delete</button>
            </div>
          </div>

          {/* Admin reply */}
          <div className="p-5 rounded-xl border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="text-sm text-gray-900 font-semibold">Admin 456565</div>
              <div className="text-sm text-gray-600">• 10h ago</div>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[11px]">Admin Staff</span>
            </div>
            <p className="mt-3 text-sm text-gray-800">Salamat po sa inyong follow-up. Ayon sa pinakahuling tala mula sa aming Social Services Office, ang listahan ng mga benepisyaryo para sa kasalukuyang batch ng AICS at TUPAD assistance ay kasalukuyang pang sinusuri ng DSWD at City Social Welfare and Development Department (CSWDD).</p>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaEyeSlash className="w-3.5 h-3.5"/> Hide</button>
              <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaTrash className="w-3.5 h-3.5"/> Delete</button>
            </div>
          </div>

          {/* User and admin replies */}
          <div className="p-5 rounded-xl border space-y-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="text-sm text-gray-900 font-semibold">Henson, Justine Eldrich V.</div>
                <div className="text-sm text-gray-600">• 10h ago</div>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[11px]">Bonafide</span>
              </div>
              <p className="mt-2 text-sm text-gray-800">When po uli ma kikiss?</p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaEyeSlash className="w-3.5 h-3.5"/> Hide</button>
                <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaTrash className="w-3.5 h-3.5"/> Delete</button>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="text-sm text-gray-900 font-semibold">Admin 456565</div>
                <div className="text-sm text-gray-600">• 9h ago</div>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[11px]">Admin Staff</span>
              </div>
              <p className="mt-2 text-sm text-gray-800">Wala pa po as of now. will update nalang po regarding here sooner.</p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaEyeSlash className="w-3.5 h-3.5"/> Hide</button>
                <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaTrash className="w-3.5 h-3.5"/> Delete</button>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="text-sm text-gray-900 font-semibold">Bose, John Lander G.</div>
                <div className="text-sm text-gray-600">• 8h ago</div>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[11px]">Bonafide</span>
              </div>
              <p className="mt-2 text-sm text-gray-800">Why naman wala pa huhu</p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaEyeSlash className="w-3.5 h-3.5"/> Hide</button>
                <button className="px-3 py-1.5 rounded-full border bg-white text-gray-700 flex items-center gap-2"><FaTrash className="w-3.5 h-3.5"/> Delete</button>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Options Modal */}
        {showOptions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowOptions(false)} />
            {/* Dialog */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-3">
              <div className="bg-white rounded-xl shadow-xl border p-5 md:p-6">
                {/* Close */}
                <button
                  type="button"
                  aria-label="Close options"
                  onClick={() => setShowOptions(false)}
                  className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 text-gray-700"
                >
                  <FaXmark className="w-4 h-4" />
                </button>

                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Ticket Options</h2>
                <p className="mt-3 text-sm md:text-base text-gray-500">For this Service Management related tickets here are following things that we can do</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                  {/* Card 1 */}
                  <button type="button" onClick={() => { setShowOptions(false); setShowAssign(true); }} className="rounded-xl border p-4 md:p-5 text-left hover:shadow-sm transition-shadow cursor-pointer w-full">
                    <h3 className="text-xl font-semibold text-gray-900">Staff Assign</h3>
                    <p className="mt-2 text-sm text-gray-500">You will need to search all of existing admin users by name</p>
                    <ul className="mt-4 space-y-2 text-gray-900 text-sm">
                      <li className="flex items-center gap-3"><FaCheck className="text-green-600"/> Assign</li>
                      <li className="flex items-center gap-3"><FaCheck className="text-green-600"/> Reassign</li>
                    </ul>
                  </button>
                  {/* Card 2 */}
                  <button type="button" onClick={() => { setShowOptions(false); setShowUrgency(true); }} className="rounded-xl border p-4 md:p-5 text-left hover:shadow-sm transition-shadow cursor-pointer w-full">
                    <h3 className="text-xl font-semibold text-gray-900">Urgency Level</h3>
                    <p className="mt-2 text-sm text-gray-500">AI automates but users provide more accuracy.</p>
                    <ul className="mt-4 space-y-2 text-gray-900 text-sm">
                      <li className="flex items-center gap-3"><FaCheck className="text-green-600"/> Priority trigger</li>
                      <li className="flex items-center gap-3"><FaCheck className="text-green-600"/> Organize</li>
                    </ul>
                  </button>
                  {/* Card 3 */}
                  <button type="button" onClick={() => { setShowOptions(false); setShowResolved(true); }} className="rounded-xl border p-4 md:p-5 text-left hover:shadow-sm transition-shadow cursor-pointer w-full">
                    <h3 className="text-xl font-semibold text-gray-900">Resolved</h3>
                    <p className="mt-2 text-sm text-gray-500">Marks issue as fixed and closed it will update other data.</p>
                    <ul className="mt-4 space-y-2 text-gray-900 text-sm">
                      <li className="flex items-center gap-3"><FaCheck className="text-green-600"/> Notifies user</li>
                      <li className="flex items-center gap-3"><FaCheck className="text-green-600"/> Case resolved</li>
                    </ul>
                  </button>
                  {/* Card 4 */}
                  <button type="button" onClick={() => { setShowOptions(false); setShowUnresolved(true); }} className="rounded-xl border p-4 md:p-5 text-left hover:shadow-sm transition-shadow cursor-pointer w-full">
                    <h3 className="text-xl font-semibold text-gray-900">Unresolved</h3>
                    <p className="mt-2 text-sm text-gray-500">Closes ticket with remarks logs issue for future review.</p>
                    <ul className="mt-4 space-y-2 text-gray-900 text-sm">
                      <li className="flex items-center gap-3"><FaCheck className="text-green-600"/> Notifies user</li>
                      <li className="flex items-center gap-3"><FaCheck className="text-green-600"/> Case unresolved</li>
                    </ul>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unresolved Modal */}
        {showUnresolved && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowUnresolved(false)} />
            <div className="relative z-10 w-full max-w-xl mx-auto px-3">
              <div className="bg-white rounded-xl shadow-xl border p-4 md:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Ticket Unresolved</h2>
                    <p className="mt-2 text-base md:text-lg text-gray-500">This closes the ticket but logs your remarks for future review.</p>
                  </div>
                  <button onClick={() => setShowUnresolved(false)} className="w-7 h-7 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 text-gray-700"><FaXmark className="w-3.5 h-3.5"/></button>
                </div>

                <div className="mt-5">
                  <label className="block text-lg font-semibold text-gray-900 mb-2">Remarks</label>
                  <textarea rows={4} placeholder="Provide some information." className="w-full rounded-2xl border bg-gray-50 p-3 text-gray-700 text-sm"></textarea>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button onClick={() => setShowUnresolved(false)} className="px-3 py-1.5 rounded-xl border bg-white text-sm">Close</button>
                  <button onClick={() => setShowUnresolved(false)} className="px-3 py-1.5 rounded-xl bg-[#0b2d4f] text-white text-sm">Proceed</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resolved Modal */}
        {showResolved && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowResolved(false)} />
            <div className="relative z-10 w-full max-w-xl mx-auto px-3">
              <div className="bg-white rounded-xl shadow-xl border p-4 md:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Ticket Resolved</h2>
                    <p className="mt-2 text-base md:text-lg text-gray-500">This action can be undone you may able to reopen this ticket.</p>
                  </div>
                  <button onClick={() => setShowResolved(false)} className="w-7 h-7 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 text-gray-700"><FaXmark className="w-3.5 h-3.5"/></button>
                </div>

                <div className="mt-5">
                  <label className="block text-lg font-semibold text-gray-900 mb-2">Remarks</label>
                  <textarea rows={4} placeholder="Provide some information." className="w-full rounded-2xl border bg-gray-50 p-3 text-gray-700 text-sm"></textarea>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button onClick={() => setShowResolved(false)} className="px-3 py-1.5 rounded-xl border bg-white text-sm">Close</button>
                  <button onClick={() => setShowResolved(false)} className="px-3 py-1.5 rounded-xl bg-[#0b2d4f] text-white text-sm">Proceed</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Urgency Level Modal */}
        {showUrgency && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowUrgency(false)} />
            <div className="relative z-10 w-full max-w-xl mx-auto px-3">
              <div className="bg-white rounded-xl shadow-xl border p-4 md:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Urgency Level</h2>
                    <p className="mt-1.5 text-sm text-gray-500">AI automates but people carry out accuracy.</p>
                  </div>
                  <button onClick={() => setShowUrgency(false)} className="w-7 h-7 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 text-gray-700"><FaXmark className="w-3.5 h-3.5"/></button>
                </div>

                <div className="mt-4 space-y-3">
                  {/* Low */}
                  <button className="w-full text-left rounded-xl border bg-gray-50 hover:bg-gray-100 transition-colors p-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-block w-3.5 h-3.5 rounded-full bg-green-500" />
                      <div>
                        <div className="text-base font-semibold text-gray-900">Low (Not urgent)</div>
                        <div className="text-gray-500 text-sm">This ticket will be on low priority level.</div>
                      </div>
                    </div>
                  </button>
                  {/* Medium */}
                  <button className="w-full text-left rounded-xl border bg-gray-50 hover:bg-gray-100 transition-colors p-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-block w-3.5 h-3.5 rounded-full bg-lime-400" />
                      <div>
                        <div className="text-base font-semibold text-gray-900">Medium (Action required)</div>
                        <div className="text-gray-500 text-sm">This ticket will impose that this ticket is something important.</div>
                      </div>
                    </div>
                  </button>
                  {/* High */}
                  <button className="w-full text-left rounded-xl border bg-gray-50 hover:bg-gray-100 transition-colors p-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-block w-3.5 h-3.5 rounded-full bg-rose-500" />
                      <div>
                        <div className="text-base font-semibold text-gray-900">High (Urgent action required)</div>
                        <div className="text-gray-500 text-sm">This ticket will impose that this ticket requires urgent action.</div>
                      </div>
                    </div>
                  </button>
                  {/* Critical */}
                  <button className="w-full text-left rounded-xl border bg-gray-50 hover:bg-gray-100 transition-colors p-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-block w-3.5 h-3.5 rounded-full bg-red-600" />
                      <div>
                        <div className="text-base font-semibold text-gray-900">Critical</div>
                        <div className="text-gray-500 text-sm">This ticket will impose that this ticket is critical urgency.</div>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button onClick={() => setShowUrgency(false)} className="px-3 py-1.5 rounded-xl border bg-white text-sm">Close</button>
                  <button onClick={() => setShowUrgency(false)} className="px-3 py-1.5 rounded-xl bg-[#0b2d4f] text-white text-sm">Proceed</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Staff Assign Modal */}
        {showAssign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowAssign(false)} />
            <div className="relative z-10 w-full max-w-2xl mx-auto px-3">
              <div className="bg-white rounded-2xl shadow-xl border p-5 md:p-6">
                {/* header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Staff Assign</h2>
                    <p className="mt-2 text-base md:text-lg text-gray-500">Search all of existing admin users by name.</p>
                  </div>
                  <button onClick={() => setShowAssign(false)} className="w-8 h-8 inline-flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 text-gray-700"><FaXmark className="w-4 h-4"/></button>
                </div>

                {/* search */}
                <div className="mt-4">
                  <div className="relative">
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-2xl border bg-gray-50 text-sm" placeholder="Search" />
                    <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* list */}
                <div className="mt-4 space-y-4 max-h-[38vh] overflow-y-auto pr-1">
                  {filteredAdmins.map(a => (
                    <button key={a.id} onClick={()=>toggleSelect(a.id)} className="w-full text-left flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-base">{a.avatar}</div>
                      <div className="flex-1 border-b pb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-semibold text-gray-900">{a.name}</div>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#e9d1ff] text-[#6f31a6] text-xs">Admin</span>
                        </div>
                        <div className="text-gray-500 text-sm">{a.email}</div>
                      </div>
                      <input type="checkbox" readOnly checked={selectedIds.includes(a.id)} className="mt-1" />
                    </button>
                  ))}
                </div>

                {/* selected chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {admins.filter(a => selectedIds.includes(a.id)).map(a => (
                    <span key={a.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b46ff] text-white text-sm">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">{a.avatar}</span>
                      {a.name}
                    </span>
                  ))}
                </div>

                {/* footer */}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button onClick={()=>setShowAssign(false)} className="px-4 py-2 rounded-xl border bg-white">Close</button>
                  <button onClick={()=>setShowAssign(false)} className="px-4 py-2 rounded-xl bg-[#0b2d4f] text-white">Proceed</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
  );
}


