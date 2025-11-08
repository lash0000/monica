import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaImage, FaNewspaper, FaUsers, FaSearch } from 'react-icons/fa';

function LandingManagement() {
  const [activeTab, setActiveTab] = useState('welcome');

  // Headline Images
  const [welcomeImages, setWelcomeImages] = useState([
    { id: 1, src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SKekMFa6yVRKHcg29ijZBfrsW1qYATFJEwdG4", alt: "Barangay Santa Monica" },
    { id: 2, src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SkFuTOKMjR9Sum2irp60Ffowqc8EhXZTDyQPB", alt: "Santa Monica Community" },
    { id: 3, src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3jdkG8HFqW15xQ07Tp3SLu9gblVknyem2AMB", alt: "Santa Monica Events" },
    { id: 4, src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SBC4WZKz7AcQv5CEP0wS83WnVOmgMrzK2GJLI", alt: "Santa Monica Facilities" },
    { id: 5, src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SEmNNJK4XFf6uphiTmYtD8vUajRlgIHQ4Zn1o", alt: "Santa Monica Activities" },
    { id: 6, src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S9Y24Q8yOr5v8aLJlxY7BX9sNGkoWV3Cm2O4t", alt: "Santa Monica Officials" },
  ]);

  // News & Events data
  const [newsEvents, setNewsEvents] = useState([
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
      fullDescription: "The Annual Community Recognition Ceremony is a special event where we celebrate the dedication and hard work of our community members. This year, we recognized volunteers, local leaders, and residents who have gone above and beyond in serving our barangay. The ceremony included award presentations, cultural performances, and a community feast.",
      isAyuda: false
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
      fullDescription: "The Strong Families Program is a comprehensive initiative designed to support families in our community. The program includes workshops on parenting, financial literacy, health and wellness, and family communication. This launch event introduced the program to residents and provided information on how to participate in upcoming sessions.",
      isAyuda: false
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
      fullDescription: "The Quarterly General Assembly Meeting provides an opportunity for residents to voice their concerns, learn about ongoing projects, and participate in decision-making processes. This meeting covered budget allocations, infrastructure projects, and community programs.",
      isAyuda: false
    },
    {
      id: 4,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Health Fair",
      title: "Community Health Fair 2024",
      date: "September 10, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "Community Center, Santa Monica",
      category: "Health",
      month: "September",
      shortDescription: "Free health check-ups, vaccinations, and health education for all residents.",
      fullDescription: "The Community Health Fair offers free medical services including blood pressure checks, blood sugar tests, vaccinations, and consultations with healthcare professionals. Health education sessions were also conducted on various topics.",
      isAyuda: false
    },
    {
      id: 5,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Clean-up Drive",
      title: "Barangay Clean-up Drive",
      date: "August 25, 2024",
      time: "6:00 AM - 10:00 AM",
      location: "Various locations, Santa Monica",
      category: "Environment",
      month: "August",
      shortDescription: "Community-wide clean-up initiative to maintain cleanliness and environmental awareness.",
      fullDescription: "Residents came together to clean streets, parks, and public areas. The event promoted environmental awareness and community cooperation.",
      isAyuda: false
    },
    {
      id: 6,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3ekbqIHFqW15xQ07Tp3SLu9gblVknyem2AMB",
      alt: "Youth Sports Tournament",
      title: "Inter-Barangay Youth Sports Tournament",
      date: "July 15-17, 2024",
      time: "8:00 AM - 6:00 PM",
      location: "Sports Complex, Santa Monica",
      category: "Sports",
      month: "July",
      shortDescription: "Three-day sports tournament featuring basketball, volleyball, and badminton competitions.",
      fullDescription: "Youth from different barangays competed in various sports. The tournament promoted physical fitness, teamwork, and sportsmanship among young residents.",
      isAyuda: false
    },
    {
      id: 7,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Senior Citizens Day",
      title: "Senior Citizens Appreciation Day",
      date: "June 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center, Santa Monica",
      category: "Social",
      month: "June",
      shortDescription: "Special celebration honoring our senior citizens with entertainment, gifts, and recognition.",
      fullDescription: "A special event dedicated to honoring our senior citizens. The celebration included entertainment, gift-giving, health check-ups, and recognition of outstanding senior community members.",
      isAyuda: false
    },
    {
      id: 8,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Skills Training",
      title: "Livelihood Skills Training Program",
      date: "May 5-12, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Training Center, Santa Monica",
      category: "Training",
      month: "May",
      shortDescription: "Week-long training program on various livelihood skills including cooking, handicrafts, and basic computer skills.",
      fullDescription: "A comprehensive training program designed to equip residents with practical skills for livelihood opportunities. Topics included cooking, handicrafts, basic computer skills, and entrepreneurship.",
      isAyuda: false
    },
    {
      id: 9,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3ekbqIHFqW15xQ07Tp3SLu9gblVknyem2AMB",
      alt: "Fiesta Celebration",
      title: "Barangay Fiesta Celebration",
      date: "April 20, 2024",
      time: "All Day",
      location: "Barangay Plaza, Santa Monica",
      category: "Festival",
      month: "April",
      shortDescription: "Annual fiesta celebration with food stalls, games, cultural shows, and community gathering.",
      fullDescription: "The annual barangay fiesta brought the community together with food stalls, games, cultural performances, and various activities for all ages.",
      isAyuda: false
    },
    {
      id: 10,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Disaster Preparedness",
      title: "Disaster Preparedness Seminar",
      date: "March 18, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Barangay Hall, Santa Monica",
      category: "Education",
      month: "March",
      shortDescription: "Educational seminar on disaster preparedness and emergency response for community safety.",
      fullDescription: "A comprehensive seminar covering disaster preparedness, emergency response procedures, and safety protocols. Residents learned about evacuation plans, emergency kits, and how to respond to various disaster scenarios.",
      isAyuda: false
    },
    {
      id: 11,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Ayuda Distribution Program",
      title: "Ayuda Distribution Program",
      date: "Ongoing",
      time: "All Day",
      location: "Barangay Hall, Santa Monica",
      category: "Program",
      month: "All Year",
      shortDescription: "Government assistance programs available for qualified residents of Barangay Santa Monica. Apply now and get the support you need.",
      fullDescription: "Various government assistance programs are available for qualified residents. These programs provide financial support, food assistance, and other forms of aid to help families in need.",
      isAyuda: true
    }
  ]);

  // Barangay Officials
  const [officials, setOfficials] = useState([
    { id: 1, name: "Chaewon Batumbakal", position: "Punong Barangay", image: "/assets/images/officials/chaewon.jpg" },
    { id: 2, name: "Na uy Sc Buenaventura", position: "Secretary", image: "/assets/images/officials/" },
    { id: 3, name: "Nelson Alcantara", position: "Kagawad", image: "/assets/images/officials/" },
    { id: 4, name: "Ogie S. Francisco", position: "Kagawad", image: "/assets/images/officials/" },
    { id: 5, name: "Ramil Borre", position: "Kagawad", image: "/assets/images/officials/" },
    { id: 6, name: "Roger A. Ternida", position: "Kagawad", image: "/assets/images/officials/" },
    { id: 7, name: "Alfie Manluctao", position: "Kagawad", image: "/assets/images/officials/" },
    { id: 8, name: "Hon. blab bla bla", position: "Punong Barangay", image: "/assets/images/" }
  ]);

  // Modal states
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showOfficialModal, setShowOfficialModal] = useState(false);
  const [editingWelcome, setEditingWelcome] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingOfficial, setEditingOfficial] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Headline Form
  const [welcomeForm, setWelcomeForm] = useState({
    src: '',
    alt: ''
  });

  // News & Events Form
  const [newsForm, setNewsForm] = useState({
    src: '',
    alt: '',
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    month: '',
    shortDescription: '',
    fullDescription: '',
    isAyuda: false
  });

  // Official Form
  const [officialForm, setOfficialForm] = useState({
    name: '',
    position: '',
    image: ''
  });

  const categories = ['Ceremony', 'Program', 'Meeting', 'Health', 'Environment', 'Sports', 'Social', 'Training', 'Festival', 'Education'];

  const filteredNewsEvents = newsEvents.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Headline Handlers
  const handleAddWelcome = () => {
    setEditingWelcome(null);
    setWelcomeForm({ src: '', alt: '' });
    setShowWelcomeModal(true);
  };

  const handleEditWelcome = (item) => {
    setEditingWelcome(item);
    setWelcomeForm({ ...item });
    setShowWelcomeModal(true);
  };

  const handleDeleteWelcome = (id) => {
    if (window.confirm('Are you sure you want to delete this headline image?')) {
      setWelcomeImages(welcomeImages.filter(item => item.id !== id));
    }
  };

  const handleSaveWelcome = () => {
    if (!welcomeForm.src) {
      alert('Please enter an image URL');
      return;
    }

    if (editingWelcome) {
      setWelcomeImages(welcomeImages.map(item =>
        item.id === editingWelcome.id ? { ...welcomeForm, id: editingWelcome.id } : item
      ));
    } else {
      const newId = Math.max(...welcomeImages.map(item => item.id), 0) + 1;
      setWelcomeImages([...welcomeImages, { ...welcomeForm, id: newId }]);
    }

    setShowWelcomeModal(false);
    setEditingWelcome(null);
  };

  // News & Events Handlers
  const handleAddNews = () => {
    setEditingNews(null);
    setNewsForm({
      src: '',
      alt: '',
      title: '',
      date: '',
      time: '',
      location: '',
      category: '',
      month: '',
      shortDescription: '',
      fullDescription: '',
      isAyuda: false
    });
    setShowNewsModal(true);
  };

  const handleEditNews = (item) => {
    setEditingNews(item);
    setNewsForm({ ...item });
    setShowNewsModal(true);
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Are you sure you want to delete this news/event?')) {
      setNewsEvents(newsEvents.filter(item => item.id !== id));
    }
  };

  const handleSaveNews = () => {
    if (!newsForm.title || !newsForm.date || !newsForm.shortDescription) {
      alert('Please fill in all required fields (Title, Date, Short Description)');
      return;
    }

    if (editingNews) {
      setNewsEvents(newsEvents.map(item =>
        item.id === editingNews.id ? { ...newsForm, id: editingNews.id } : item
      ));
    } else {
      const newId = Math.max(...newsEvents.map(item => item.id), 0) + 1;
      setNewsEvents([...newsEvents, { ...newsForm, id: newId }]);
    }

    setShowNewsModal(false);
    setEditingNews(null);
  };

  // Officials Handlers
  const handleAddOfficial = () => {
    setEditingOfficial(null);
    setOfficialForm({ name: '', position: '', image: '' });
    setShowOfficialModal(true);
  };

  const handleEditOfficial = (item) => {
    setEditingOfficial(item);
    setOfficialForm({ ...item });
    setShowOfficialModal(true);
  };

  const handleDeleteOfficial = (id) => {
    if (window.confirm('Are you sure you want to delete this official?')) {
      setOfficials(officials.filter(item => item.id !== id));
    }
  };

  const handleSaveOfficial = () => {
    if (!officialForm.name || !officialForm.position) {
      alert('Please fill in all required fields (Name, Position)');
      return;
    }

    if (editingOfficial) {
      setOfficials(officials.map(item =>
        item.id === editingOfficial.id ? { ...officialForm, id: editingOfficial.id } : item
      ));
    } else {
      const newId = Math.max(...officials.map(item => item.id), 0) + 1;
      setOfficials([...officials, { ...officialForm, id: newId }]);
    }

    setShowOfficialModal(false);
    setEditingOfficial(null);
  };

  return (
    <div className="w-full space-y-6 mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Landing Page Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage content displayed on the landing page</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('welcome')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'welcome'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaImage className="inline mr-2" /> Headline
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'news'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaNewspaper className="inline mr-2" /> News & Events
        </button>
        <button
          onClick={() => setActiveTab('officials')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'officials'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaUsers className="inline mr-2" /> Barangay Officials
        </button>
      </div>

      {/* Headline Tab */}
      {activeTab === 'welcome' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleAddWelcome}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add Image
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {welcomeImages.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-gray-600 mb-3">{item.alt}</p>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEditWelcome(item)}
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWelcome(item.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News & Events Tab */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 relative max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                onClick={handleAddNews}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaPlus /> Add News/Event
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNewsEvents.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  {item.isAyuda && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      Ayuda
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">{item.shortDescription}</p>
                  {item.category && (
                    <div className="mb-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2 pt-3 border-t border-gray-100 mt-auto">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNewsEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FaNewspaper className="mx-auto text-4xl mb-4 text-gray-400" />
              <p>No news/events found</p>
            </div>
          )}
        </div>
      )}

      {/* Barangay Officials Tab */}
      {activeTab === 'officials' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleAddOfficial}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add Official
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {officials.map((official) => (
              <div key={official.id} className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-200 flex flex-col h-full">
                <div className="w-20 h-20 border rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden bg-gray-100">
                  <img
                    src={official.image}
                    alt={official.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <span className="text-gray-400 text-2xl" style={{ display: 'none' }}>👤</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">{official.name}</h3>
                <p className="text-xs text-gray-600 mb-3 flex-grow">{official.position}</p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEditOfficial(official)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOfficial(official.id)}
                    className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-semibold hover:bg-red-100 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Headline Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingWelcome ? 'Edit Headline Image' : 'Add Headline Image'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input
                  type="text"
                  value={welcomeForm.src}
                  onChange={(e) => setWelcomeForm({ ...welcomeForm, src: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={welcomeForm.alt}
                  onChange={(e) => setWelcomeForm({ ...welcomeForm, alt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Image description"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowWelcomeModal(false);
                  setEditingWelcome(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWelcome}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News & Events Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingNews ? 'Edit News/Event' : 'Add New News/Event'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                  <input
                    type="text"
                    value={newsForm.src}
                    onChange={(e) => setNewsForm({ ...newsForm, src: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={newsForm.alt}
                    onChange={(e) => setNewsForm({ ...newsForm, alt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Image description"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="text"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="December 15, 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={newsForm.time}
                    onChange={(e) => setNewsForm({ ...newsForm, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2:00 PM"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newsForm.location}
                  onChange={(e) => setNewsForm({ ...newsForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Barangay Hall, Santa Monica"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <input
                    type="text"
                    value={newsForm.month}
                    onChange={(e) => setNewsForm({ ...newsForm, month: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="December"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                <textarea
                  value={newsForm.shortDescription}
                  onChange={(e) => setNewsForm({ ...newsForm, shortDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Brief description displayed in cards"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                <textarea
                  value={newsForm.fullDescription}
                  onChange={(e) => setNewsForm({ ...newsForm, fullDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Detailed description for event details page"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAyuda"
                  checked={newsForm.isAyuda}
                  onChange={(e) => setNewsForm({ ...newsForm, isAyuda: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isAyuda" className="text-sm font-medium text-gray-700">
                  Mark as Ayuda Program (will navigate to Ayuda Programs page)
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowNewsModal(false);
                  setEditingNews(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNews}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Officials Modal */}
      {showOfficialModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingOfficial ? 'Edit Official' : 'Add Official'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={officialForm.name}
                  onChange={(e) => setOfficialForm({ ...officialForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter official name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                <input
                  type="text"
                  value={officialForm.position}
                  onChange={(e) => setOfficialForm({ ...officialForm, position: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Punong Barangay, Kagawad, Secretary, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={officialForm.image}
                  onChange={(e) => setOfficialForm({ ...officialForm, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/assets/images/officials/official.jpg"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowOfficialModal(false);
                  setEditingOfficial(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOfficial}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingManagement;

