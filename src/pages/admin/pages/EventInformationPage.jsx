import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import { useEventsStore } from "../stores/events.store";
import { FaShare } from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

export default function EventInformationPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { eventById, singleEvent, loading, updateEvent } = useEventsStore();

  useEffect(() => {
    if (id) eventById(id);
  }, [id, eventById]);

  const event = singleEvent;

  /**
   * Helpers
   */
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };


  const handlePublish = async () => {
    if (!id) return;

    await updateEvent(id, { is_published: true });

    // Fetch updated data again (optional but recommended)
    eventById(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-4xl space-y-4">

        {/* Top bar */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <FaArrowLeft className="text-xs" />
            Back to Events
          </button>

          <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
            Event
          </span>

          {event?.category && (
            <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
              {event.category}
            </span>
          )}
        </div>

        {/* Content card */}
        <div className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm space-y-5">

          {/* LOADING STATE */}
          {loading && (
            <h1 className="text-xl font-bold text-center text-gray-600 dark:text-gray-300">
              Loading event...
            </h1>
          )}

          {/* NOT FOUND */}
          {!loading && !event && (
            <h1 className="text-xl font-bold text-center text-red-600">
              Event not found.
            </h1>
          )}

          {/* EVENT DATA */}
          {event && (
            <>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                {event.title || "Untitled Event"}
              </h1>

              {/* META INFO */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="inline-flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  <span>{formatDate(event.date_scheduled)}</span>
                </div>

                <div className="inline-flex items-center gap-2">
                  <FaClock className="text-green-500" />
                  <span>{formatTime(event.date_scheduled)}</span>
                </div>

                {event.location && (
                  <div className="inline-flex items-center gap-2">
                    <span className="text-purple-500 text-lg">📍</span>
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
              {/* DESCRIPTION */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {event.description || "No description provided."}
              </p>

              {/* REMARKS (optional) */}
              {event.remarks && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">
                    Remarks:
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {event.remarks}
                  </p>
                </div>
              )}

              <div className="flex w-full justify-between items-center">
                <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f5f7] text-gray-800 text-[12px]">
                  <FaShare className="size-5" />
                  Share your thoughts
                </button>
                <div className="flex gap-2">
                  {!event?.is_published ? (
                    <button
                      onClick={handlePublish}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500 text-white text-[12px]"
                    >
                      <IoSend className="w-3.5 h-3.5" />
                      Publish
                    </button>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[12px]">
                      Published
                    </span>
                  )}
                  <button
                    onClick={""}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3e8ff] text-[#6f31a6] text-[12px]"
                  >
                    <FaSliders className="w-3.5 h-3.5" />
                    Options
                  </button>
                </div>

              </div>



              {/* COMMENTS SECTION */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Comments
                </h2>

                <textarea
                  rows="3"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Comment here..."
                />

                <div className="flex justify-end">
                  <button className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
                    Reply
                  </button>
                </div>

                {/* Example Comment */}
                <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    BS
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Barangay Staff
                      </span>
                      <span className="text-gray-400 text-xs">yesterday</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Thank you for your interest in this event.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
