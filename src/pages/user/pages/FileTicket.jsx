import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaMapMarkerAlt, FaPaperPlane, FaTimes, FaSearch } from 'react-icons/fa';
import { FaFileMedical } from 'react-icons/fa6';
import UserTicketStore from '../stores/Ticket.store';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../components/Breadcrumb';

function FileTicket() {
  const navigate = useNavigate();
  const { addNewTicket, loading, error, success } = UserTicketStore();
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: '',
    attachment: '',
    location: '',
    maintenanceType: '',
    personsInvolved: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState(null);

  const [selectedMaintenance, setSelectedMaintenance] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Default center around Quezon City
  const [mapCenter, setMapCenter] = useState('14.6760,121.0437');
  const qcSuffix = ', Quezon City, Metro Manila, Philippines';
  const qcViewbox = { left: 121.00, right: 121.13, top: 14.78, bottom: 14.57 };
  const [suggestions, setSuggestions] = useState([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const validFiles = files.filter(f => f.size <= MAX_FILE_SIZE);
    const rejected = files.filter(f => f.size > MAX_FILE_SIZE);
    if (rejected.length > 0) {
      alert(`Some files exceed 10 MB and were skipped:\n${rejected.map(r => r.name).join('\n')}`);
    }

    const newFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(newFiles);

    // Update form data with file names
    const fileNames = newFiles.map(file => file.name).join(', ');
    setFormData(prev => ({ ...prev, attachment: fileNames }));

    // Create preview URLs for new files - batch processing
    const previewPromises = validFiles.map(file =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          id: Date.now() + Math.random(),
          url: e.target.result,
          name: file.name
        });
        reader.readAsDataURL(file);
      })
    );

    Promise.all(previewPromises).then(newPreviews => {
      setImagePreviews(prev => [...prev, ...newPreviews]);
    });
  }, [selectedFiles]);

  const removeImage = useCallback((id) => {
    const previewToRemove = imagePreviews.find(preview => preview.id === id);
    if (!previewToRemove) return;

    const updatedFiles = selectedFiles.filter(file => file.name !== previewToRemove.name);
    setSelectedFiles(updatedFiles);
    setImagePreviews(prev => prev.filter(preview => preview.id !== id));

    const fileNames = updatedFiles.map(file => file.name).join(', ');
    setFormData(prev => ({ ...prev, attachment: fileNames }));
  }, [imagePreviews, selectedFiles]);

  const clearAllImages = useCallback(() => {
    setSelectedFiles([]);
    setImagePreviews([]);
    setFormData(prev => ({ ...prev, attachment: '' }));
  }, []);

  const openImageModal = useCallback((preview) => {
    setSelectedImageForModal(preview);
    setShowImageModal(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setShowImageModal(false);
    setSelectedImageForModal(null);
  }, []);

  const handleMaintenanceSelect = useCallback((type) => {
    setSelectedMaintenance(type);
    setFormData(prev => ({ ...prev, maintenanceType: type }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Allowed file extensions
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'heif'];

    // Validate files
    if (selectedFiles && selectedFiles.length > 0) {
      for (const file of selectedFiles) {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(ext)) {
          alert('Only the following formats are allowed: jpg, jpeg, png, gif, heif.');
          return;
        }
      }
    }

    const user_id = localStorage.getItem("user_id");
    const payload = {
      user_id,
      subject: formData.subject,
      category: formData.category,
      concern_details: formData.description,
      files: selectedFiles // MUST be "files" no []
    };
    const res = await addNewTicket(payload);
    if (res) {
      toast.success('Ticket submitted successfully!');
      navigate(-1);
    } else {
      toast.error("Something went wrong submitting your ticket.");
    }
  };



  const maintenanceTypes = useMemo(() => [
    'Electrical', 'Plumbing', 'HVAC',
    'Structural', 'Cleaning', 'Equipment Repair'
  ], []);

  const quickSelectLocations = useMemo(() => [
    {
      name: 'Sta. Monica Barangay Hall, Commonwealth, QC',
      subtitle: 'Local government office',
      coordinates: '14.7255,121.0434'
    },
    {
      name: 'Sta. Monica Church, Commonwealth, QC',
      subtitle: 'Parish church',
      coordinates: '14.7221,121.0414'
    },
    {
      name: 'Sta. Monica Elementary School, Commonwealth, QC',
      subtitle: 'Public school',
      coordinates: '14.7255,121.0434'
    },
    {
      name: 'Sta. Monica Covered Court, Commonwealth, QC',
      subtitle: 'Community sports court',
      coordinates: '14.6762,121.0440'
    },
    {
      name: 'Sta. Monica Public Market, Commonwealth, QC',
      subtitle: 'Wet & dry market',
      coordinates: '14.6750,121.0435'
    },
    {
      name: 'Sta. Monica Health Center, Commonwealth, QC',
      subtitle: 'Community health center',
      coordinates: '14.6753,121.0438'
    },
    {
      name: 'Sta. Monica Tricycle Terminal, Commonwealth, QC',
      subtitle: 'Transport terminal',
      coordinates: '14.6756,121.0432'
    },
    {
      name: 'Sta. Monica Park, Commonwealth, QC',
      subtitle: 'Pocket park / plaza',
      coordinates: '14.6765,121.0430'
    }
  ], []);

  const handleLocationSelect = useCallback((location) => {
    console.log('Location selected:', location.name);
    setMapCenter(location.coordinates || location.name);
    setFormData(prev => ({ ...prev, location: location.name }));
    // Modal stays open so user can see the map navigate to the location
  }, []);

  const handleSearchLocation = () => {
    if (searchQuery.trim()) {
      // Update map center to the searched location
      setMapCenter(searchQuery);
      setFormData(prev => ({
        ...prev,
        location: searchQuery
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchLocation();
    }
  };

  // Autocomplete suggestions using OpenStreetMap Nominatim (no API key required)
  useEffect(() => {
    const controller = new AbortController();
    const fetchSuggestions = async () => {
      const trimmed = searchQuery.trim();
      if (trimmed.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        setIsFetchingSuggestions(true);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmed)}&limit=6&addressdetails=1`;
        const res = await fetch(url, {
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        if (!res.ok) return;
        const data = await res.json();
        const parsed = (data || []).map(item => ({
          label: item.display_name,
          lat: item.lat,
          lon: item.lon
        }));
        setSuggestions(parsed);
        setShowSuggestions(true);
      } catch (_) {
        // ignore network errors
      } finally {
        setIsFetchingSuggestions(false);
      }
    };

    const id = setTimeout(fetchSuggestions, 300); // debounce
    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [searchQuery]);

  const handleSuggestionClick = (sugg) => {
    const coords = `${sugg.lat},${sugg.lon}`;
    setMapCenter(coords);
    setFormData(prev => ({ ...prev, location: sugg.label }));
    setSearchQuery(sugg.label);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4">
      <div className="container lg:mx-auto lg:max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div
          className={`p-8 text-white transition-colors ${formData.category === "Complaint" || formData.category === "Incident-Report"
            ? "bg-red-500"
            : "bg-secondary"
            }`}
        >
          <h1 className="text-xl font-bold mb-1">File a Ticket</h1>
          <p className="text-sm opacity-90">
            {formData.category === "Complaint"
              ? "Para sa pormal na pagsasampa ng inyong reklamo o hinaing."
              : formData.category === "Incident-Report"
                ? "Para sa pormal na pag-uulat ng isang naganap na insidente."
                : "Para sa makabuluhang usapan para sa ating mga sinasakupan."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Subject */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Subject"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
            >
              <option value="" disabled className="hidden">Select</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Safety">Safety</option>
              <option value="Environmental">Environmental</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Complaint">Complaint</option>
              <option value="Incident-Report">Incident Report</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Concern Details */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Concern Details *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Ipahayag ang lahat ng mga detalye"
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-y"
            />
          </div>

          {/* Attachment */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Attachment (Optional)</label>
            {/* Drop/Upload box */}
            <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="text-2xl mb-1 inline-flex items-center justify-center">
                <FaFileMedical />
              </div>
              <div className="font-semibold text-sm">Upload files</div>
              <div className="text-xs">Drag and drop or click to browse</div>
              <div className="text-xs text-gray-400 mt-1">Maximum of 10MB</div>
              <label htmlFor="file-upload" className="inline-block mt-2 px-3 py-1 bg-secondary text-white rounded-md cursor-pointer text-xs font-semibold hover:opacity-90 transition-opacity">Browse files</label>
            </div>

            {/* File list */}
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                {selectedFiles.slice(0, 3).map((file, idx) => (
                  <div
                    key={`${file.name}-${idx}`}
                    className="flex items-center justify-between p-2 border border-gray-200 rounded-md mb-1 bg-white"
                  >
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap max-w-md">
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeImage(imagePreviews[idx]?.id)}
                      className="border-none bg-transparent text-gray-900 cursor-pointer p-0 text-sm hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* +N MORE INDICATOR */}
                {selectedFiles.length > 4 && (
                  <div className="flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md bg-gray-50 text-gray-600 text-sm font-semibold">
                    +{selectedFiles.length - 4} more file{selectedFiles.length - 4 > 1 ? "s" : ""}
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Persons Involved — Only for Complaint or Incident Report */}
          {(formData.category === "Complaint" || formData.category === "Incident Report") && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Persons Involved (Optional)
              </label>
              <input
                type="text"
                name="personsInvolved"
                value={formData.personsInvolved}
                onChange={handleInputChange}
                placeholder="List names if applicable.."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={clearAllImages}
              className="bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <button className="bg-secondary text-white border-none rounded-md px-4 py-2 text-sm font-semibold cursor-pointer inline-flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
              <FaPaperPlane />
              Proceed
            </button>
          </div>
        </form>
      </div>

      {/* Location Selection Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl max-h-[95vh] overflow-auto shadow-2xl">
            {/* Modal Header */}
            <div className="bg-secondary p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <h2 className="m-0 text-xl font-bold">
                  Select Location
                </h2>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="bg-none border-none text-white text-xl cursor-pointer p-1 hover:opacity-80"
              >
                <FaTimes />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for a location (e.g., Times Square, New York)"
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-13 left-0 right-34 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-64 overflow-y-auto">
                    {suggestions.map((s, idx) => (
                      <div
                        key={idx}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSuggestionClick(s)}
                        className="p-3 cursor-pointer text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50"
                      >
                        {s.label}
                      </div>
                    ))}
                    {isFetchingSuggestions && (
                      <div className="p-3 text-sm text-gray-500">
                        Searching...
                      </div>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleSearchLocation}
                  className="bg-secondary text-white border-none rounded-md px-4 py-3 text-sm font-semibold cursor-pointer flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <FaSearch />
                  Search
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[65vh]">
              {/* Map Section */}
              <div className="flex-1 relative">
                <div className="w-full h-full relative overflow-hidden">
                  {/* Google Maps Embed */}
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapCenter)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    className="border-0 rounded-none"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - Location Search"
                    key={mapCenter} // This forces the iframe to reload when mapCenter changes
                  ></iframe>

                  {/* View Larger Map Link */}
                  <div className="absolute top-4 left-4 bg-white rounded-md p-3 shadow-sm z-10">
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(mapCenter)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 text-sm no-underline font-medium hover:text-emerald-700"
                    >
                      View larger map
                    </a>
                  </div>

                  {/* Fullscreen Button */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(mapCenter)}`, '_blank')}
                      className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                      title="Open in fullscreen"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Select Locations */}
              <div className="w-80 border-l border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="m-0 text-base font-semibold text-gray-700">
                    Quick Select Locations
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {quickSelectLocations.map((location, index) => (
                    <div
                      key={index}
                      onClick={() => handleLocationSelect(location)}
                      className="p-3 mb-2 bg-white rounded-lg border border-gray-200 cursor-pointer transition-all duration-200 flex items-center gap-3 hover:bg-green-50 hover:border-emerald-500"
                    >
                      <FaMapMarkerAlt className="text-emerald-600 text-sm" />
                      <div>
                        <div className="font-semibold text-gray-700 text-sm">
                          {location.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {location.coordinates}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image View Modal */}
      {showImageModal && selectedImageForModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-secondary p-4 px-6 text-white flex items-center justify-between">
              <h3 className="m-0 text-lg font-semibold">
                {selectedImageForModal.name}
              </h3>
              <button
                onClick={closeImageModal}
                className="bg-none border-none text-white text-2xl cursor-pointer p-1 rounded hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            {/* Image Content */}
            <div className="p-4 flex justify-center items-center max-h-[calc(90vh-80px)] overflow-auto">
              <img
                src={selectedImageForModal.url}
                alt={selectedImageForModal.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileTicket;
