import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Mock ticket data - replace with actual data fetching
const TICKETS = [
  { 
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
];

export default function TicketView() {
  const { id } = useParams();
  const ticket = TICKETS.find(t => t.id === parseInt(id));
  const [comment, setComment] = useState("");

  // if (!ticket) {
  //   return <div>Ticket not found</div>;
  // }

  const replyCount = ticket?.updates?.length || 2;

  return (
    <div className="flex justify-center w-full px-8 py-6 bg-gray">
      <div className="max-w-4xl w-full bg-white p-2 rounded-lg shadow-md py-6 px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
            Social Services
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
            Opened by Henson, Justine Eldrich V.
          </span>
        </div>

        {/* Title */}
       

        {/* Original Post */}
         <h2 className="text-2xl font-bold text-gray-900">
          {ticket?.title || "AICS pati TUPAD assistance"}
        </h2>
        <div className="bg-white-50 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-4">
            {ticket?.body || "Hindi pa po ako nakakatanggap ng tulong pinansyal, baka pwede po magpa-follow up."}
          </p>
          <div className="flex items-center gap-4 mb-0">
            <button className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Replies (3)
            </button>
            <button className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share your thoughts
            </button>
          </div>

        </div>

        {/* Thread Info */}
        <div className="bg-blue-100 border border-red-100 rounded-lg px-4 py-3 mb-6">
          <p className="text-sm text-blue-900">
            {ticket?.openedBy || "Henson, Justine Eldrich V."} opened this thread ({ticket?.openedTime || "12 hours ago"})
          </p>
        </div>
        {/* Comment Input */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Salamat po sa mga pagtutuod..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Post Comment
            </button>
          </div>
        </div>
        {/* Ticket Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              D
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <p className="font-medium text-gray-900">DeepSeek AI</p>
                <span className="text-gray-400">•</span>
                <p className="text-sm text-gray-500">10h ago</p>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                  System Generated
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Category:</p>
                  <p className="text-gray-900">{ticket?.category || "Social Services"}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">Status:</p>
                    <p className="text-gray-900">{ticket?.status || "Resolved"}</p>
                  
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">Urgency Level:</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Urgent</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Medium</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">High</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Critical</span>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">Date and Time:</p>
                  <p className="text-gray-900">{ticket?.dateTime || "13/10/25 at 12:31 PM GMT (+8)"}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">Description:</p>
                  <p className="text-gray-900">
                    {ticket?.description || "Matagong naghihintay nang matagal yung request sa Barangay Santa Monica."}
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">Basis sa kung anong office isasalo ung concern:</p>
                  <ul className="space-y-1.5 ml-8">
                    {(ticket?.basicServices || TICKETS[0].basicServices).map((service, index) => (
                      <li key={index} className="text-gray-700 list-disc">{service}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">Next Steps:</p>
                  <p className="text-gray-900">
                    {ticket?.nextSteps || "Makatitiyak pang makikipag-ugnayan ang assigned staff para sa karagdagang detalye"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Updates Section */}
        <div className="space-y-4">
          {(ticket?.updates || TICKETS[0].updates).map((update, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {update.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">{update.author}</p>
                    <span className="text-gray-400">•</span>
                    <p className="text-sm text-gray-500">{update.time}</p>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {update.tag}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{update.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}