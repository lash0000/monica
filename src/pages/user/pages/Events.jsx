import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaArrowLeft, FaEye, FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import AOS from 'aos';

function Events() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // All events data (expanded from landing page)
  const allEvents = [
    {
      id: 1,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Community Ceremony",
      title: "Annual Community Recognition Ceremony",
      date: "December 15, 2024",
      time: "2:00 PM",
      location: "Barangay Hall, Santa Monica",
      category: "Ceremony",
      month: "December",
      shortDescription: "Barangay Santa Monica honored outstanding community members and volunteers who have made significant contributions.",
      fullDescription: "The Annual Community Recognition Ceremony is a special event where we celebrate the dedication and hard work of our community members. This year, we recognized volunteers, local leaders, and residents who have gone above and beyond in serving our barangay. The ceremony included award presentations, cultural performances, and a community feast."
    },
    {
      id: 2,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Strong Families Program",
      title: "Strong Families Program Launch",
      date: "November 28, 2024",
      time: "9:00 AM",
      location: "Community Center, Santa Monica",
      category: "Program",
      month: "November",
      shortDescription: "A comprehensive family development program launched to strengthen family bonds and support households in our barangay.",
      fullDescription: "The Strong Families Program is a comprehensive initiative designed to support families in our community. The program includes workshops on parenting, financial literacy, health and wellness, and family communication. This launch event introduced the program to residents and provided information on how to participate in upcoming sessions."
    },
    {
      id: 3,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3ekbqIHFqW15xQ07Tp3SLu9gblVknyem2AMB",
      alt: "General Assembly",
      title: "Quarterly General Assembly Meeting",
      date: "October 20, 2024",
      time: "7:00 PM",
      location: "Barangay Hall, Santa Monica",
      category: "Meeting",
      month: "October",
      shortDescription: "Residents gathered for the quarterly assembly to discuss community projects and budget allocations.",
      fullDescription: "The Quarterly General Assembly Meeting is an important gathering where barangay officials present updates on ongoing projects, budget allocations, and future plans. Residents had the opportunity to voice their concerns, ask questions, and participate in decision-making processes that affect the community."
    },
    {
      id: 4,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Health Fair",
      title: "Community Health Fair 2024",
      date: "September 10, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "Barangay Plaza, Santa Monica",
      category: "Health",
      month: "September",
      shortDescription: "Free health check-ups, vaccinations, and health education for all residents.",
      fullDescription: "The Community Health Fair provided free medical services including blood pressure checks, blood sugar tests, dental check-ups, and vaccinations. Health professionals from local clinics and hospitals volunteered their time to serve the community. Information booths were set up for health education on nutrition, exercise, and disease prevention."
    },
    {
      id: 5,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Clean-up Drive",
      title: "Barangay Clean-up Drive",
      date: "August 25, 2024",
      time: "6:00 AM - 10:00 AM",
      location: "Various Streets, Santa Monica",
      category: "Community Service",
      month: "August",
      shortDescription: "Community-wide clean-up initiative to maintain cleanliness and environmental awareness.",
      fullDescription: "Residents came together for a barangay-wide clean-up drive to maintain cleanliness and promote environmental awareness. Volunteers cleaned streets, parks, and public areas. The event also included a tree-planting activity and a workshop on proper waste segregation and recycling."
    },
    {
      id: 6,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3ekbqIHFqW15xQ07Tp3SLu9gblVknyem2AMB",
      alt: "Youth Sports Tournament",
      title: "Inter-Barangay Youth Sports Tournament",
      date: "July 15-17, 2024",
      time: "8:00 AM - 6:00 PM",
      location: "Barangay Sports Complex, Santa Monica",
      category: "Sports",
      month: "July",
      shortDescription: "Three-day sports tournament featuring basketball, volleyball, and badminton competitions.",
      fullDescription: "The Inter-Barangay Youth Sports Tournament brought together young athletes from neighboring barangays for friendly competition. The event featured basketball, volleyball, and badminton tournaments. It promoted sportsmanship, teamwork, and physical fitness among the youth while fostering camaraderie between communities."
    },
    {
      id: 7,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Senior Citizens Day",
      title: "Senior Citizens Appreciation Day",
      date: "June 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center, Santa Monica",
      category: "Celebration",
      month: "June",
      shortDescription: "Special celebration honoring our senior citizens with entertainment, gifts, and recognition.",
      fullDescription: "A heartwarming event dedicated to honoring our beloved senior citizens. The celebration included cultural performances, games, free health check-ups, and distribution of gift packages. Senior citizens were recognized for their contributions to the community and enjoyed a special afternoon of entertainment and fellowship."
    },
    {
      id: 8,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Skills Training",
      title: "Livelihood Skills Training Program",
      date: "May 5-12, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Barangay Training Center, Santa Monica",
      category: "Training",
      month: "May",
      shortDescription: "Week-long training program on various livelihood skills including cooking, handicrafts, and basic computer skills.",
      fullDescription: "A comprehensive week-long training program designed to equip residents with practical skills for income generation. The program covered various topics including food preparation and preservation, handicraft making, basic computer literacy, and small business management. Participants received certificates upon completion."
    },
    {
      id: 9,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3ekbqIHFqW15xQ07Tp3SLu9gblVknyem2AMB",
      alt: "Fiesta Celebration",
      title: "Barangay Fiesta Celebration",
      date: "April 20, 2024",
      time: "All Day",
      location: "Barangay Plaza, Santa Monica",
      category: "Celebration",
      month: "April",
      shortDescription: "Annual fiesta celebration with food stalls, games, cultural shows, and community gathering.",
      fullDescription: "The annual Barangay Fiesta is one of the most anticipated events of the year. The celebration featured food stalls offering local delicacies, traditional games, cultural performances, and a grand community gathering. It's a time for families to come together, celebrate our culture, and strengthen community bonds."
    },
    {
      id: 10,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Disaster Preparedness",
      title: "Disaster Preparedness Seminar",
      date: "March 18, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Barangay Hall, Santa Monica",
      category: "Seminar",
      month: "March",
      shortDescription: "Educational seminar on disaster preparedness, emergency response, and safety protocols.",
      fullDescription: "An important educational seminar focused on disaster preparedness and emergency response. The event covered topics such as earthquake safety, flood preparedness, fire prevention, and first aid. Residents learned about creating emergency kits, evacuation procedures, and how to respond during various emergency situations."
    },
    {
      id: 11,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Ayuda Distribution",
      title: "Ayuda Distribution Program",
      date: "Ongoing",
      time: "All Day",
      location: "Barangay Hall, Santa Monica",
      category: "Program",
      month: "Ongoing",
      shortDescription: "Government assistance programs available for qualified residents. Apply now for financial, employment, and crisis assistance.",
      fullDescription: "The Ayuda Distribution Program provides various government assistance programs for qualified residents of Barangay Santa Monica. This includes financial assistance, employment programs, and crisis assistance. Residents can apply for programs such as 4Ps, SAP, TUPAD, AICS, UCT, and Rice Subsidy Program based on their eligibility and needs.",
      isAyuda: true
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = 'unset';
  };

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeEventModal();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeEventModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Filter and search events
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.fullDescription.toLowerCase().includes(searchTerm.toLowerCase());

      // Month filter
      const matchesMonth = filterMonth === 'all' || event.month === filterMonth;

      // Category filter
      const matchesCategory = filterCategory === 'all' || event.category === filterCategory;

      return matchesSearch && matchesMonth && matchesCategory;
    });
  }, [searchTerm, filterMonth, filterCategory]);

  // Get unique categories and months for filter options
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allEvents.map(event => event.category))];
    return uniqueCategories.sort();
  }, []);

  const months = useMemo(() => {
    const uniqueMonths = [...new Set(allEvents.map(event => event.month))];
    return uniqueMonths.sort((a, b) => {
      const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterMonth('all');
    setFilterCategory('all');
  };

  const hasActiveFilters = searchTerm !== '' || filterMonth !== 'all' || filterCategory !== 'all';

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-foreground text-white py-8 xl:py-12">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors mb-4"
          >
            <FaArrowLeft /> Back to Home
          </button>
          <h1 className="text-3xl xl:text-4xl font-bold mb-2">All News & Events</h1>
          <p className="text-base xl:text-lg text-gray-200">
            Stay updated with all the latest happenings in Barangay Santa Monica
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="bg-white rounded-xl shadow-md p-4 xl:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm xl:text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Month Filter */}
              <div className="relative flex-1">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm xl:text-base"
                >
                  <option value="all">All Months</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative flex-1">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm xl:text-base"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm xl:text-base whitespace-nowrap"
                >
                  <FaTimes /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredEvents.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{allEvents.length}</span> events
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-2 text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 py-8 xl:py-12">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div 
                className="relative h-48 xl:h-56 overflow-hidden flex-shrink-0"
                onClick={() => {
                  if (event.isAyuda) {
                    navigate('/ayuda-programs');
                  } else {
                    openEventModal(event);
                  }
                }}
              >
                <img
                  src={event.src}
                  alt={event.alt}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg xl:text-xl mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                </div>
              </div>
              <div className="p-4 xl:p-6 flex flex-col flex-grow">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="text-gray-400 mr-2" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                  {event.shortDescription}
                </p>
                
                {/* Spacer to push button to bottom */}
                <div className="flex-grow"></div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (event.isAyuda) {
                      navigate('/ayuda-programs');
                    } else {
                      openEventModal(event);
                    }
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-auto"
                >
                  <FaEye /> View Details
                </button>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <FaSearch className="text-gray-300 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria to find more events.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-lg max-w-xl w-full max-h-[85vh] overflow-hidden shadow-lg border border-gray-200">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedEvent.src}
                alt={selectedEvent.alt}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={closeEventModal}
                className="absolute top-3 right-3 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 xl:p-5 overflow-y-auto max-h-[calc(85vh-200px)]">
              <h2 className="text-xl xl:text-2xl font-bold text-gray-900 mb-3">
                {selectedEvent.title}
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="text-blue-500 text-xs" />
                  <span className="font-medium">{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaClock className="text-green-500 text-xs" />
                  <span className="font-medium">{selectedEvent.time}</span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-purple-500">📍</span>
                    <span className="font-medium">{selectedEvent.location}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-base font-semibold text-gray-900 mb-2">About This Event</h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedEvent.fullDescription || selectedEvent.shortDescription}
                </p>
              </div>
            </div>

         
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;

