import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaMapMarkerAlt, FaPaperPlane, FaTimes, FaSearch } from 'react-icons/fa';
import { FaFileMedical } from 'react-icons/fa6';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Reusable style objects
const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '2rem 1rem'
  },
  formContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  header: {
    backgroundColor: '#4B663B',
    padding: '2rem',
    color: 'white'
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0'
  },
  headerSubtitle: {
    fontSize: '1rem',
    margin: '0',
    opacity: '0.9'
  },
  form: { padding: '2rem' },
  fieldContainer: { marginBottom: '1.5rem' },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#4B663B',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  iconButton: {
    width: '48px',
    height: '48px',
    border: '2px solid #4B663B',
    borderRadius: '6px',
    backgroundColor: '#f0fdf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  }
};

function FileTicket() {
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
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
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
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>File Ticket</h1>
          <p style={styles.headerSubtitle}>Submit an incident report</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Subject */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Subject"
              required
              style={styles.input}
            />
          </div>

          {/* Category */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              style={{ ...styles.input, backgroundColor: 'white', color: formData.category ? '#111827' : '#9ca3af' }}
            >
              <option value="" disabled style={{ display: 'none' }}>Select</option>
              <option value="Healthcare" style={{ color: '#111827' }}>Healthcare</option>
              <option value="infrastructure" style={{ color: '#111827' }}>Infrastructure</option>
              <option value="safety" style={{ color: '#111827' }}>Safety</option>
              <option value="environmental" style={{ color: '#111827' }}>Environmental</option>
              <option value="maintenance" style={{ color: '#111827' }}>Maintenance</option>
              <option value="other" style={{ color: '#111827' }}>Other</option>
            </select>
          </div>

          {/* Concern Details */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Concern Details *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Ipahayag ang lahat ng mga detalye"
              required
              rows="4"
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>

          {/* Attachment */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Attachment (Optional)</label>
            {/* Drop/Upload box */}
            <div style={{
              border: '2px dashed #e5e7eb',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaFileMedical />
              </div>
              <div style={{ fontWeight: 600 }}>Upload files</div>
              <div style={{ fontSize: '0.875rem' }}>Drag and drop or click to browse</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>Maximum of 10MB</div>
              <label htmlFor="file-upload" style={{ display: 'inline-block', marginTop: '0.75rem', padding: '0.5rem 0.9rem', backgroundColor: '#4B663B', color: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>Browse files</label>
            </div>

            {/* File list */}
            {selectedFiles.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                {selectedFiles.map((file, idx) => (
                  <div key={`${file.name}-${idx}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.9rem', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '0.5rem', backgroundColor: 'white' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '480px' }}>{file.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                    </div>
                    <button type="button" onClick={() => removeImage(imagePreviews[idx]?.id || Date.now())} style={{ border: 'none', background: 'transparent', color: '#111827', cursor: 'pointer', padding: 0 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location (commented out to hide from UI) */}
          {false && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Location *
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event location"
                  required
                  style={{
                    flex: '1',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowLocationModal(true)}
                  style={{
                    width: '48px',
                    height: '48px',
                    border: '2px solid #4B663B',
                    borderRadius: '6px',
                    backgroundColor: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <FaMapMarkerAlt style={{ color: '#4B663B' }} />
                </button>
              </div>
            </div>
          )}

          {/* Maintenance Needed - removed from UI as requested */}

          {/* Persons Involved */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Persons Involved (Optional)
            </label>
            <input
              type="text"
              name="personsInvolved"
              value={formData.personsInvolved}
              onChange={handleInputChange}
              placeholder="List names if applicable.."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={clearAllImages}
              style={{
                backgroundColor: 'white',
                color: '#111827',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '0.6rem 1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
            <button type="submit" style={styles.button}>
              <FaPaperPlane />
              Submit Ticket
            </button>
          </div>
        </form>
      </div>

      {/* Location Selection Modal */}
      {showLocationModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '1200px',
            maxHeight: '95vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Modal Header */}
            <div style={{
              backgroundColor: '#4B663B',
              padding: '1.5rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaMapMarkerAlt />
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
                  Select Location
                </h2>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Search Bar */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ position: 'relative', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for a location (e.g., Times Square, New York)"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '3.25rem',
                    left: 0,
                    right: '8.5rem',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    zIndex: 20,
                    maxHeight: '260px',
                    overflowY: 'auto'
                  }}>
                    {suggestions.map((s, idx) => (
                      <div
                        key={idx}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSuggestionClick(s)}
                        style={{
                          padding: '0.75rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          color: '#374151',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        {s.label}
                      </div>
                    ))}
                    {isFetchingSuggestions && (
                      <div style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        Searching...
                      </div>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleSearchLocation}
                  style={{
                    backgroundColor: '#4B663B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaSearch />
                  Search
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'flex', height: '65vh' }}>
              {/* Map Section */}
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Google Maps Embed */}
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapCenter)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      borderRadius: '0'
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - Location Search"
                    key={mapCenter} // This forces the iframe to reload when mapCenter changes
                  ></iframe>

                  {/* View Larger Map Link */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    zIndex: 10
                  }}>
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(mapCenter)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#059669',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}
                    >
                      View larger map
                    </a>
                  </div>

                  {/* Fullscreen Button */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    zIndex: 10
                  }}>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(mapCenter)}`, '_blank')}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
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
              <div style={{
                width: '350px',
                borderLeft: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb'
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Quick Select Locations
                  </h3>
                </div>
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '0.5rem'
                }}>
                  {quickSelectLocations.map((location, index) => (
                    <div
                      key={index}
                      onClick={() => handleLocationSelect(location)}
                      style={{
                        padding: '0.75rem',
                        marginBottom: '0.5rem',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f0fdf4';
                        e.target.style.borderColor = '#059669';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                    >
                      <FaMapMarkerAlt style={{ color: '#059669', fontSize: '0.875rem' }} />
                      <div>
                        <div style={{
                          fontWeight: '600',
                          color: '#374151',
                          fontSize: '0.875rem'
                        }}>
                          {location.name}
                        </div>
                        <div style={{
                          color: '#6b7280',
                          fontSize: '0.75rem'
                        }}>
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
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1rem'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              backgroundColor: '#4B663B',
              padding: '1rem 1.5rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                {selectedImageForModal.name}
              </h3>
              <button
                onClick={closeImageModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Image Content */}
            <div style={{
              padding: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: 'calc(90vh - 80px)',
              overflow: 'auto'
            }}>
              <img
                src={selectedImageForModal.url}
                alt={selectedImageForModal.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileTicket;
