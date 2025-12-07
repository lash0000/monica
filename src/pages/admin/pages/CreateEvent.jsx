import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaMapMarkerAlt, FaPaperPlane, FaTimes, FaSearch } from 'react-icons/fa';
import { FaFileMedical } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEventsStore } from '../stores/events.store';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent } = useEventsStore();
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
  const [formData, setFormData] = useState({
    title: '',
    date_scheduled: '',
    subject: '',
    category: '',
    description: '',
    attachment: '',
    location: '',
    maintenanceType: '',
    personsInvolved: '',
    date_ended: ''
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
    const dateScheduledISO = formData.date_scheduled
      ? new Date(formData.date_scheduled).toISOString()
      : null;

    const dateEndedISO = formData.date_ended
      ? new Date(formData.date_ended).toISOString()
      : null;

    const user_id = localStorage.getItem("user_id");

    const payload = {
      title: formData.subject || formData.title,
      category: formData.category,
      description: formData.description,
      remarks: formData.remarks || "", // optional
      created_by: user_id,
      date_scheduled: dateScheduledISO,
      ...(dateEndedISO && { date_ended: dateEndedISO }),
    };

    const res = await createEvent(payload);

    if (res?.success) {
      navigate(-1);
    }
  };

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
          <h1 className="text-xl font-bold mb-1">Create New Event</h1>
          <p className="text-sm opacity-90">
            Para sa makabuluhang announcements na dapat makita ng bawat tao.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Subject */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              <option value="Community-Assembly">Community Assembly</option>
              <option value="Barangay-Meeting">Barangay Meeting</option>
              <option value="Health-Mission">Health Mission</option>
              <option value="Cleanup-Drive">Cleanup Drive</option>
              <option value="Livelihood-Training">Livelihood Training</option>
              <option value="Sports-Event">Sports Event</option>
              <option value="Disaster-Preparedness">Disaster Preparedness</option>
              <option value="Vaccination-Drive">Vaccination Drive</option>
              <option value="Tree-Planting">Tree Planting</option>
              <option value="Feeding-Program">Feeding Program</option>
              <option value="Senior-Citizen-Program">Senior Citizen Program</option>
              <option value="Youth-Program">Youth Program</option>
              <option value="Peace-and-Order">Peace and Order Meeting</option>
              <option value="Public-Consultation">Public Consultation</option>
              <option value="Fiesta-or-Religious">Fiesta / Religious Event</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Details *</label>
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

          {/* Date Scheduled */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date Scheduled *
            </label>
            <input
              type="datetime-local"
              name="date_scheduled"
              value={formData.date_scheduled}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
                 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          {/* Date Ended */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date Ended (Optional)
            </label>
            <input
              type="datetime-local"
              name="date_ended"
              value={formData.date_ended}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
                 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          {/* Attachment */}
          <div className="hidden mb-4">
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
            <button
              className="bg-secondary text-white border-none rounded-md px-4 py-2 text-sm font-semibold cursor-pointer inline-flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
              onClick={handleSubmit}
            >
              <FaPaperPlane />
              Proceed
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

