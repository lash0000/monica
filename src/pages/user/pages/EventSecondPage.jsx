import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import { useEventsStore } from "../../admin/stores/events.store";

export default function EventSecondPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleEvent, eventById, loading } = useEventsStore();

  // Load event by ID on mount
  useEffect(() => {
    if (id) eventById(id);
  }, [id]);

  // Helpers for readable output
  const formatDate = (iso) => {
    if (!iso) return "No date set";
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (iso) => {
    if (!iso) return "No time set";
    const date = new Date(iso);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading event...
      </div>
    );
  }

  if (!singleEvent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <p className="text-gray-700 mb-4">
            Event not found or the link is invalid.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    );
  }

  // Extract needed fields from backend result
  const event = {
    id: singleEvent.id,
    title: singleEvent.title,
    description: singleEvent.description,
    category: singleEvent.category,
    location: singleEvent.location,
    date: formatDate(singleEvent.date_scheduled),
    time: formatTime(singleEvent.date_scheduled),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
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
            Event Detail
          </span>

          <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
            {event.category}
          </span>
        </div>

        {/* Content card */}
        <div className="p-6 border-2 border-gray-200 rounded-lg bg-white shadow-sm space-y-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {event.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="inline-flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              <span>{event.date}</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <FaClock className="text-green-500" />
              <span>{event.time}</span>
            </div>

            {event.location && (
              <div className="inline-flex items-center gap-2">
                <span className="text-purple-500 text-lg">📍</span>
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">
            {event.description}
          </p>

          {/* Comment Section */}
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Comments</h2>

            <textarea
              rows="3"
              className="w-full rounded-lg border border-gray-300 bg-white text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comment here..."
            />

            <div className="flex justify-end">
              <button className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
                Reply
              </button>
            </div>

            {/* Sample comment */}
            <div className="mt-4 border border-gray-200 rounded-lg p-4 flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                {event.title.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-900">
                    Barangay Staff
                  </span>
                  <span className="text-gray-400 text-xs">yesterday</span>
                </div>

                <p className="text-sm text-gray-700 mt-1">
                  Thank you for your interest in this event.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
