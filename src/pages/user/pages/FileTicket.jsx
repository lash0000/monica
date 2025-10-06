import React, { useEffect, useState } from 'react';
import { FaUpload, FaMapMarkerAlt, FaPaperPlane, FaTimes, FaSearch } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

function FileTicket() {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: '',
    attachment: '',
    location: '',
    maintenanceType: '',
    personsInvolved: ''
  });

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

  const handleMaintenanceSelect = (type) => {
    setSelectedMaintenance(type);
    setFormData(prev => ({
      ...prev,
      maintenanceType: type
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };


  const maintenanceTypes = [
    'Electrical', 'Plumbing', 'HVAC', 
    'Structural', 'Cleaning', 'Equipment Repair'
  ];

  const quickSelectLocations = [
    { name: 'Sta. Monica Barangay Hall, Commonwealth, QC', subtitle: 'Local government office' },
    { name: 'Sta. Monica Church, Commonwealth, QC', subtitle: 'Parish church' },
    { name: 'Sta. Monica Elementary School, Commonwealth, QC', subtitle: 'Public school' },
    { name: 'Sta. Monica Covered Court, Commonwealth, QC', subtitle: 'Community sports court' },
    { name: 'Sta. Monica Public Market, Commonwealth, QC', subtitle: 'Wet & dry market' },
    { name: 'Sta. Monica Health Center, Commonwealth, QC', subtitle: 'Community health center' },
    { name: 'Sta. Monica Tricycle Terminal, Commonwealth, QC', subtitle: 'Transport terminal' },
    { name: 'Sta. Monica Park, Commonwealth, QC', subtitle: 'Pocket park / plaza' }
  ];

  const handleLocationSelect = (location) => {
    // Center the map to the selected quick location and fill the input
    setMapCenter(location.coordinates || location.name);
    setFormData(prev => ({
      ...prev,
      location: location.name
    }));
    setShowLocationModal(false);
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
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#059669',
          padding: '2rem',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            margin: '0 0 0.5rem 0'
          }}>
            File Ticket
          </h1>
          <p style={{
            fontSize: '1rem',
            margin: '0',
            opacity: '0.9'
          }}>
            Submit an incident report
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          {/* Subject */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g. Streetlight Outage in (prefix-street)"
              required
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

          {/* Category */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: 'white',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select a category</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="safety">Safety</option>
              <option value="environmental">Environmental</option>
              <option value="maintenance">Maintenance</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Detailed Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Detailed Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a full description of your concern..."
              required
              rows="4"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Attachment */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Attachment (Optional)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                name="attachment"
                value={formData.attachment}
                onChange={handleInputChange}
                placeholder="Image URL"
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
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <FaUpload style={{ color: '#6b7280' }} />
              </button>
            </div>
          </div>

          {/* Location */}
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
                  border: '2px solid #059669',
                  borderRadius: '6px',
                  backgroundColor: '#f0fdf4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <FaMapMarkerAlt style={{ color: '#059669' }} />
              </button>
            </div>
          </div>

          {/* Maintenance Needed */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Maintenance Needed *
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem'
            }}>
              {maintenanceTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleMaintenanceSelect(type)}
                  style={{
                    padding: '0.75rem',
                    border: selectedMaintenance === type ? '2px solid #059669' : '1px solid #d1d5db',
                    borderRadius: '6px',
                    backgroundColor: selectedMaintenance === type ? '#f0fdf4' : 'white',
                    color: selectedMaintenance === type ? '#059669' : '#374151',
                    fontSize: '0.875rem',
                    fontWeight: selectedMaintenance === type ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

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
          <div style={{ textAlign: 'right' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#059669',
                color: 'white',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            >
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
              backgroundColor: '#059669',
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
                    backgroundColor: '#059669',
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
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
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
    </div>
  );
}

export default FileTicket;
