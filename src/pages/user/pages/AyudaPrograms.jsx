import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHandHoldingHeart, FaUsers, FaCalendarAlt, FaCheckCircle, FaArrowLeft, FaUser, FaPhone, FaMapMarkerAlt, FaDollarSign, FaFileAlt, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import AOS from 'aos';
import SuccessModal from '../components/SuccessModal';

function AyudaPrograms() {
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showBeneficiariesModal, setShowBeneficiariesModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [beneficiarySearchTerm, setBeneficiarySearchTerm] = useState('');
  const [programSearchTerm, setProgramSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    contactNumber: '',
    email: '',
    address: '',
    monthlySalary: '',
    programType: '',
    reason: '',
    documents: ''
  });

  const [ayudaPrograms] = useState([
    {
      id: 1,
      title: 'Pantawid Pamilyang Pilipino Program (4Ps)',
      description: 'Conditional cash transfer program for the poorest of the poor families',
      beneficiaries: 1250,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      type: 'Financial Assistance',
      minSalary: 0,
      maxSalary: 10000
    },
    {
      id: 2,
      title: 'Social Amelioration Program (SAP)',
      description: 'Emergency subsidy program for low-income families affected by the pandemic',
      beneficiaries: 890,
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      type: 'Financial Assistance',
      minSalary: 0,
      maxSalary: 15000
    },
    {
      id: 3,
      title: 'Tulong Panghanapbuhay sa Ating Disadvantaged/Displaced Workers (TUPAD)',
      description: 'Emergency employment program for displaced, underemployed, and seasonal workers',
      beneficiaries: 450,
      status: 'active',
      startDate: '2024-02-10',
      endDate: '2024-11-30',
      type: 'Employment Assistance',
      minSalary: 0,
      maxSalary: 20000
    },
    {
      id: 4,
      title: 'Assistance to Individuals in Crisis Situation (AICS)',
      description: 'Medical, burial, transportation, educational, and food assistance',
      beneficiaries: 320,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      type: 'Crisis Assistance',
      minSalary: 0,
      maxSalary: Infinity
    },
    {
      id: 5,
      title: 'Unconditional Cash Transfer (UCT)',
      description: 'Direct cash assistance for senior citizens and persons with disabilities',
      beneficiaries: 680,
      status: 'active',
      startDate: '2024-01-20',
      endDate: '2024-12-31',
      type: 'Financial Assistance',
      minSalary: 0,
      maxSalary: 12000
    },
    {
      id: 6,
      title: 'Rice Subsidy Program',
      description: 'Monthly rice assistance for qualified families',
      beneficiaries: 1500,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      type: 'Food Assistance',
      minSalary: 0,
      maxSalary: 15000
    }
  ]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    console.log('Ayuda Application submitted:', formData);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowApplicationForm(false);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      contactNumber: '',
      email: '',
      address: '',
      monthlySalary: '',
      programType: '',
      reason: '',
      documents: ''
    });
  };

  const applicationProgramTypes = [
    'Pantawid Pamilyang Pilipino Program (4Ps)',
    'Social Amelioration Program (SAP)',
    'Tulong Panghanapbuhay sa Ating Disadvantaged/Displaced Workers (TUPAD)',
    'Assistance to Individuals in Crisis Situation (AICS)',
    'Unconditional Cash Transfer (UCT)',
    'Rice Subsidy Program'
  ];

  // Sample beneficiaries data for each program
  const generateSampleBeneficiaries = (programId) => {
    const firstNames = ['Maria', 'Juan', 'Ana', 'Jose', 'Carmen', 'Pedro', 'Rosa', 'Carlos', 'Elena', 'Miguel'];
    const lastNames = ['Santos', 'Reyes', 'Cruz', 'Garcia', 'Lopez', 'Martinez', 'Torres', 'Fernandez', 'Gonzalez', 'Rivera'];
    const addresses = [
      '123 Main Street, Barangay Santa Monica',
      '456 Oak Avenue, Barangay Santa Monica',
      '789 Pine Road, Barangay Santa Monica',
      '321 Elm Street, Barangay Santa Monica',
      '654 Maple Drive, Barangay Santa Monica'
    ];
    const statuses = ['approved', 'pending', 'disbursed'];
    
    const count = ayudaPrograms.find(p => p.id === programId)?.beneficiaries || 0;
    const sampleCount = Math.min(count, 20); // Show up to 20 sample beneficiaries
    
    return Array.from({ length: sampleCount }, (_, index) => {
      const firstName = firstNames[index % firstNames.length];
      const lastName = lastNames[index % lastNames.length];
      const program = ayudaPrograms.find(p => p.id === programId);
      const minSalary = program?.minSalary || 0;
      const maxSalary = program?.maxSalary === Infinity ? 20000 : (program?.maxSalary || 10000);
      const salary = Math.floor(Math.random() * (maxSalary - minSalary + 1)) + minSalary;
      
      return {
        id: index + 1,
        name: `${firstName} ${lastName}`,
        contactNumber: `09${Math.floor(Math.random() * 900000000) + 100000000}`,
        address: addresses[index % addresses.length],
        salaryPerMonth: salary,
        amount: Math.floor(Math.random() * 5000) + 1000,
        status: statuses[index % statuses.length],
        dateAdded: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
      };
    });
  };

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setShowBeneficiariesModal(true);
  };

  const handleCloseBeneficiariesModal = () => {
    setShowBeneficiariesModal(false);
    setSelectedProgram(null);
    setBeneficiarySearchTerm('');
  };

  // Filter beneficiaries by search term
  const filteredBeneficiaries = selectedProgram
    ? generateSampleBeneficiaries(selectedProgram.id).filter(beneficiary =>
        beneficiary.name.toLowerCase().includes(beneficiarySearchTerm.toLowerCase())
      )
    : [];

  // Filter programs by search term and filters
  const filteredPrograms = useMemo(() => {
    return ayudaPrograms.filter(program => {
      // Search filter
      const matchesSearch = programSearchTerm === '' || 
        program.title.toLowerCase().includes(programSearchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(programSearchTerm.toLowerCase()) ||
        program.type.toLowerCase().includes(programSearchTerm.toLowerCase());

      // Type filter
      const matchesType = filterType === 'all' || program.type === filterType;

      // Status filter
      const matchesStatus = filterStatus === 'all' || program.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [programSearchTerm, filterType, filterStatus, ayudaPrograms]);

  // Get unique program types for filter
  const programTypes = useMemo(() => {
    const uniqueTypes = [...new Set(ayudaPrograms.map(program => program.type))];
    return uniqueTypes.sort();
  }, [ayudaPrograms]);

  const clearProgramFilters = () => {
    setProgramSearchTerm('');
    setFilterType('all');
    setFilterStatus('all');
  };

  const hasActiveProgramFilters = programSearchTerm !== '' || filterType !== 'all' || filterStatus !== 'all';

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
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white/20 rounded-full flex items-center justify-center">
              <FaHandHoldingHeart className="text-white text-3xl xl:text-4xl" />
            </div>
            <div>
              <h1 className="text-3xl xl:text-4xl font-bold mb-2">Aids Assistance Programs</h1>
              <p className="text-base xl:text-lg text-gray-200">
                Government assistance programs available for qualified residents of Barangay Santa Monica
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 py-8 xl:py-12">
     

        {/* Programs Grid */}
        <div className="mb-8 xl:mb-12">
          <h2 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-6">Available Programs</h2>
          
          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-md p-4 xl:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search programs by title, description, or type..."
                  value={programSearchTerm}
                  onChange={(e) => setProgramSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground text-sm xl:text-base"
                />
                {programSearchTerm && (
                  <button
                    onClick={() => setProgramSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Type Filter */}
                <div className="relative flex-1">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground appearance-none bg-white text-sm xl:text-base"
                  >
                    <option value="all">All Types</option>
                    {programTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="relative flex-1">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground appearance-none bg-white text-sm xl:text-base"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
                {hasActiveProgramFilters && (
                  <button
                    onClick={clearProgramFilters}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm xl:text-base whitespace-nowrap"
                  >
                    <FaTimes /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredPrograms.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{ayudaPrograms.length}</span> programs
              {hasActiveProgramFilters && (
                <button
                  onClick={clearProgramFilters}
                  className="ml-2 text-foreground hover:text-foreground/80 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Programs Grid */}
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {filteredPrograms.map((program, index) => (
              <div
                key={program.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer flex flex-col h-full"
                data-aos="fade-up"
                data-aos-delay={100 * (index % 3)}
                onClick={() => handleProgramClick(program)}
              >
                {/* Program Type Badge - Top Left */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                    {program.type}
                  </span>
                </div>

                {/* Program Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {program.description}
                </p>

                {/* Program Details - Vertically Stacked */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <FaUsers className="text-gray-500 mr-2 text-xs" />
                    <span>{program.beneficiaries.toLocaleString()} beneficiaries</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <FaCalendarAlt className="text-gray-500 mr-2 text-xs" />
                    <span>{formatDate(program.startDate)} - {formatDate(program.endDate)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="text-gray-500 mr-2">₱</span>
                    <span>
                      {program.minSalary !== undefined && program.maxSalary !== undefined && program.maxSalary !== Infinity
                        ? `₱${program.minSalary.toLocaleString()} - ₱${program.maxSalary.toLocaleString()}/month`
                        : program.minSalary !== undefined
                        ? `₱${program.minSalary.toLocaleString()}+/month`
                        : 'No salary requirement'}
                    </span>
                  </div>
                </div>

                {/* Spacer to push bottom section down */}
                <div className="flex-grow"></div>

                {/* Separator */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Bottom Action/Status Bar */}
                <div className="flex items-center justify-between pt-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    program.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-700 font-semibold hover:text-foreground transition-colors">
                    View Beneficiaries →
                  </span>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="max-w-md mx-auto">
                <FaSearch className="text-gray-300 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria to find more programs.
                </p>
                {hasActiveProgramFilters && (
                  <button
                    onClick={clearProgramFilters}
                    className="px-6 py-3 bg-foreground text-white rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Application Section */}
        {!showApplicationForm ? (
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 text-center">
            <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4">
              Not in the List?
            </h3>
            <p className="text-base xl:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              If you are not included in the current list of beneficiaries, you can apply for Ayuda assistance programs.
              Fill out the application form below to be considered for eligibility.
            </p>
            <button
              onClick={() => setShowApplicationForm(true)}
              className="px-8 py-3 bg-foreground text-white rounded-lg font-semibold hover:bg-foreground/90 transition-colors text-base xl:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Apply for Ayuda
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 xl:p-8 shadow-md border border-gray-100">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center">
                  <FaHandHoldingHeart className="text-foreground text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl xl:text-3xl font-bold text-gray-900">Ayuda Application Form</h3>
                  <p className="text-sm text-gray-600 mt-1">Fill out the form below to apply for assistance</p>
                </div>
              </div>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaUser className="text-foreground" />
                    Personal Information
                  </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="Enter middle name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Suffix
                    </label>
                    <input
                      type="text"
                      name="suffix"
                      value={formData.suffix}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="Jr., Sr., III, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaPhone className="text-foreground" />
                    Contact Information
                  </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="09XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-foreground" />
                      Complete Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="House/Building No., Street, Barangay, City"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information Section */}
              <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaDollarSign className="text-foreground" />
                    Financial Information
                  </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Salary (₱) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="monthlySalary"
                      value={formData.monthlySalary}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="0.00"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This helps us determine which programs you qualify for
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Program Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="programType"
                      value={formData.programType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                    >
                        <option value="">Select a program</option>
                        {applicationProgramTypes.map((program, index) => (
                          <option key={index} value={program}>{program}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Application Details Section */}
              <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaFileAlt className="text-foreground" />
                    Application Details
                  </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Application <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="Please explain why you need assistance..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supporting Documents
                    </label>
                    <textarea
                      name="documents"
                      value={formData.documents}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-transparent"
                      placeholder="List any documents you have (e.g., Certificate of Indigency, ID, etc.)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You may be asked to submit these documents later
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-foreground text-white rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="Application Submitted Successfully!"
        message="Your Ayuda application has been submitted. Our barangay office will review your application and contact you soon."
        subMessage="We will notify you via email or phone once your application has been processed."
        actionText="Close"
        actionLink="/"
      />

      {/* Beneficiaries Modal */}
      {showBeneficiariesModal && selectedProgram && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseBeneficiariesModal}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-lg border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-foreground text-white p-6 relative">
              <div className="flex items-center justify-between pr-10">
                <div>
                  <h2 className="text-2xl xl:text-3xl font-bold mb-2">{selectedProgram.title}</h2>
                  <p className="text-gray-200 text-sm xl:text-base">
                    List of Beneficiaries ({selectedProgram.beneficiaries.toLocaleString()} total)
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseBeneficiariesModal}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={beneficiarySearchTerm}
                    onChange={(e) => setBeneficiarySearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground text-sm xl:text-base"
                  />
                  {beneficiarySearchTerm && (
                    <button
                      onClick={() => setBeneficiarySearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
                {beneficiarySearchTerm && (
                  <p className="mt-2 text-sm text-gray-600">
                    Found {filteredBeneficiaries.length} result{filteredBeneficiaries.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Table */}
              <div className="overflow-y-auto max-h-[calc(90vh-300px)]">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-gray-50">
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBeneficiaries.length > 0 ? (
                        filteredBeneficiaries.map((beneficiary, index) => (
                          <tr key={beneficiary.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{beneficiary.name}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-gray-600">{beneficiary.address}</div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                            {beneficiarySearchTerm ? 'No beneficiaries found matching your search.' : 'No beneficiaries available.'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {beneficiarySearchTerm ? (
                    <>Showing {filteredBeneficiaries.length} of {selectedProgram.beneficiaries.toLocaleString()} beneficiaries</>
                  ) : (
                    <>Showing {Math.min(selectedProgram.beneficiaries, 20)} of {selectedProgram.beneficiaries.toLocaleString()} beneficiaries</>
                  )}
                </p>
                <button
                  onClick={handleCloseBeneficiariesModal}
                  className="px-6 py-2 bg-foreground text-white rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AyudaPrograms;

