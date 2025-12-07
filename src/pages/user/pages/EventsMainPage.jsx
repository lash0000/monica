import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaTimes, FaSearch, FaEye } from "react-icons/fa";
import { useEventsStore } from "../../admin/stores/events.store";

function EventsMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const base_path = location.pathname;

  const {
    publishedEvents,
    allPublishedEvents: fetchPublished,
    loading,
  } = useEventsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Load only published events on mount
  useEffect(() => {
    fetchPublished();
  }, []);

  // Convert ISO date to readable formats
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

  // Auto-generate categories & months
  const categories = useMemo(() => {
    const list = [...new Set(publishedEvents.map((e) => e.category))];
    return list.sort();
  }, [publishedEvents]);

  const months = useMemo(() => {
    const list = [
      ...new Set(
        publishedEvents.map((e) =>
          new Date(e.date_scheduled).toLocaleString("en-US", { month: "long" })
        )
      ),
    ];

    const order = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return list.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [publishedEvents]);

  // Search + Filter Logic
  const filteredEvents = useMemo(() => {
    return publishedEvents.filter((event) => {
      const monthName = new Date(event.date_scheduled).toLocaleString("en-US", {
        month: "long",
      });

      const matchesSearch =
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMonth = filterMonth === "all" || monthName === filterMonth;
      const matchesCategory =
        filterCategory === "all" || event.category === filterCategory;

      return matchesSearch && matchesMonth && matchesCategory;
    });
  }, [publishedEvents, searchTerm, filterMonth, filterCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterMonth("all");
    setFilterCategory("all");
  };

  const hasActiveFilters =
    searchTerm !== "" || filterMonth !== "all" || filterCategory !== "all";

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-foreground text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">All News & Events</h1>
          <p className="text-gray-200">Stay updated with all barangay events</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="bg-white rounded-xl shadow p-6">

          {/* Search */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Month Filter */}
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-4 py-3 border rounded-lg"
            >
              <option value="all">All Months</option>
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border rounded-lg"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-gray-100 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredEvents.length} of {publishedEvents.length} events
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-600 py-20">Loading events...</div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const monthName = new Date(event.date_scheduled).toLocaleString(
                "en-US",
                { month: "long" }
              );

              return (
                <div
                  key={event.id}
                  className="border bg-white rounded-xl shadow-md hover:shadow-lg p-5 cursor-pointer"
                  onClick={() => navigate(`${base_path}/${event.id}`)}
                >
                  <h3 className="font-bold text-lg mb-3">{event.title}</h3>

                  <div className="text-gray-700 text-sm space-y-1">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      {formatDate(event.date_scheduled)} ({monthName})
                    </div>

                    <div className="flex items-center">
                      <FaClock className="text-gray-400 mr-2" />
                      {formatTime(event.date_scheduled)}
                    </div>
                  </div>

                  <p className="text-gray-700 mt-3 line-clamp-3">
                    {event.description}
                  </p>

                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                    <FaEye /> View Details
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-600">
            No events found
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsMainPage;
