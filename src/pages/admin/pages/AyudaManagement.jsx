import { useState, useEffect, useRef } from 'react';
import { FaPlus, FaEdit, FaTrash, FaHandHoldingHeart, FaUsers, FaCalendarAlt, FaSearch, FaFilter, FaArrowUp, FaArrowDown, FaCheckCircle } from 'react-icons/fa';

function AyudaManagement() {
  // Generate 54 sample beneficiaries (50 new + 4 existing structure)
  const generateSampleBeneficiaries = () => {
    const firstNames = ['Maria', 'Juan', 'Jose', 'Ana', 'Pedro', 'Rosa', 'Carlos', 'Carmen', 'Miguel', 'Elena', 'Antonio', 'Luz', 'Francisco', 'Teresa', 'Manuel', 'Rosa', 'Ricardo', 'Patricia', 'Roberto', 'Gloria', 'Fernando', 'Lourdes', 'Eduardo', 'Mercedes', 'Alberto', 'Dolores', 'Ramon', 'Esperanza', 'Alfredo', 'Concepcion'];
    const lastNames = ['Dela Cruz', 'Santos', 'Garcia', 'Rodriguez', 'Reyes', 'Ramos', 'Mendoza', 'Villanueva', 'Torres', 'Fernandez', 'Cruz', 'Gonzales', 'Bautista', 'Aquino', 'Morales', 'Castro', 'Lopez', 'Martinez', 'Rivera', 'Ocampo', 'Diaz', 'Flores', 'Perez', 'Gutierrez', 'Vargas', 'Ramos', 'Navarro', 'Salazar', 'Medina', 'Herrera'];
    const streets = ['Main Street', 'Oak Avenue', 'Pine Road', 'Elm Street', 'Maple Drive', 'Cedar Lane', 'Birch Way', 'Willow Court', 'Cypress Circle', 'Magnolia Boulevard', 'Jasmine Street', 'Rose Avenue', 'Lily Road', 'Tulip Lane', 'Sunflower Drive'];
    const statuses = ['approved', 'pending', 'rejected'];
    const programs = [
      { id: 1, name: 'Pantawid Pamilyang Pilipino Program (4Ps)', minSalary: 0, maxSalary: 10000 },
      { id: 2, name: 'Social Amelioration Program (SAP)', minSalary: 0, maxSalary: 15000 },
      { id: 3, name: 'Tulong Panghanapbuhay sa Ating Disadvantaged/Displaced Workers (TUPAD)', minSalary: 0, maxSalary: 20000 },
      { id: 4, name: 'Assistance to Individuals in Crisis Situation (AICS)', minSalary: 0, maxSalary: 25000 }
    ];
    
    const beneficiaries = [];
    const startDate = new Date('2024-01-01');
    
    for (let i = 1; i <= 54; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      
      // Determine salary and program
      let salary, programId, programName;
      const programChoice = Math.floor(Math.random() * programs.length);
      const selectedProgram = programs[programChoice];
      
      if (selectedProgram.maxSalary === Infinity) {
        salary = Math.floor(Math.random() * 10000) + selectedProgram.minSalary;
      } else {
        salary = Math.floor(Math.random() * (selectedProgram.maxSalary - selectedProgram.minSalary + 1)) + selectedProgram.minSalary;
      }
      
      programId = selectedProgram.id;
      programName = selectedProgram.name;
      
      // Generate status
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Generate dates
      const daysAgo = Math.floor(Math.random() * 300);
      const applicationDate = new Date(startDate);
      applicationDate.setDate(applicationDate.getDate() + daysAgo);
      const claimDate = status === 'approved' && Math.random() > 0.3 
        ? new Date(applicationDate.getTime() + Math.random() * 20 * 24 * 60 * 60 * 1000)
        : null;
      
      // Generate contact number
      const contactNumber = `09${Math.floor(Math.random() * 900000000) + 100000000}`;
      
      // Generate address
      const streetNum = Math.floor(Math.random() * 999) + 1;
      const street = streets[Math.floor(Math.random() * streets.length)];
      const address = `${streetNum} ${street}, Barangay Santa Monica`;
      
      // Generate amount based on program
      const amounts = {
        1: [3000, 4000, 5000, 6000],
        2: [6000, 7000, 8000, 9000],
        3: [2000, 3000, 3500, 4000],
        4: [2000, 2500, 3000, 3500]
      };
      const amount = amounts[programId][Math.floor(Math.random() * amounts[programId].length)];
      
      beneficiaries.push({
        id: i,
        name,
        programId,
        programName,
        status,
        applicationDate: applicationDate.toISOString().split('T')[0],
        claimDate: claimDate ? claimDate.toISOString().split('T')[0] : null,
        amount,
        contactNumber,
        address,
        salaryPerMonth: salary
      });
    }
    
    return beneficiaries;
  };

  const initialBeneficiaries = generateSampleBeneficiaries();
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);

  // Update program beneficiary counts based on actual beneficiaries
  const updateProgramCounts = (beneficiariesList) => {
    const counts = beneficiariesList.reduce((acc, b) => {
      acc[b.programId] = (acc[b.programId] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const initialCounts = updateProgramCounts(initialBeneficiaries);
  
  // Update programs with correct beneficiary counts
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: 'Pantawid Pamilyang Pilipino Program (4Ps)',
      description: 'Conditional cash transfer program for the poorest of the poor families',
      beneficiaries: initialCounts[1] || 0,
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
      beneficiaries: initialCounts[2] || 0,
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
      beneficiaries: initialCounts[3] || 0,
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
      beneficiaries: initialCounts[4] || 0,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      type: 'Crisis Assistance',
      minSalary: 0,
      maxSalary: 25000
    }
  ]);

  const [activeTab, setActiveTab] = useState('programs');
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [showProgramBeneficiariesModal, setShowProgramBeneficiariesModal] = useState(false);
  const [selectedProgramForBeneficiaries, setSelectedProgramForBeneficiaries] = useState(null);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [selectedBeneficiariesMainTab, setSelectedBeneficiariesMainTab] = useState([]);
  const [editingProgram, setEditingProgram] = useState(null);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [bulkAmount, setBulkAmount] = useState('');
  const [sortColumn, setSortColumn] = useState(null); // 'name', 'program', 'applicationDate'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  // Program form state
  const [programForm, setProgramForm] = useState({
    title: '',
    description: '',
    type: 'Financial Assistance',
    startDate: '',
    endDate: '',
    status: 'active',
    minSalary: '',
    maxSalary: ''
  });

  // Beneficiary form state
  const [beneficiaryForm, setBeneficiaryForm] = useState({
    name: '',
    programId: '',
    contactNumber: '',
    address: '',
    amount: '',
    status: 'pending',
    salaryPerMonth: ''
  });

  // Function to find qualifying programs based on salary
  const findQualifyingPrograms = (salary) => {
    return programs.filter(program => 
      program.status === 'active' &&
      salary >= (program.minSalary || 0) && 
      salary <= (program.maxSalary || Infinity)
    );
  };

  const programTypes = [
    'Financial Assistance',
    'Employment Assistance',
    'Crisis Assistance',
    'Food Assistance',
    'Medical Assistance',
    'Educational Assistance'
  ];

  const handleAddProgram = () => {
    setEditingProgram(null);
    setProgramForm({
      title: '',
      description: '',
      type: 'Financial Assistance',
      startDate: '',
      endDate: '',
      status: 'active',
      minSalary: '',
      maxSalary: ''
    });
    setShowProgramModal(true);
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setProgramForm({
      title: program.title,
      description: program.description,
      type: program.type,
      startDate: program.startDate,
      endDate: program.endDate,
      status: program.status,
      minSalary: program.minSalary || '',
      maxSalary: program.maxSalary || ''
    });
    setShowProgramModal(true);
  };

  const handleSaveProgram = () => {
    if (editingProgram) {
      setPrograms(programs.map(p => 
        p.id === editingProgram.id 
          ? { 
              ...editingProgram, 
              ...programForm,
              minSalary: parseFloat(programForm.minSalary) || 0,
              maxSalary: parseFloat(programForm.maxSalary) || Infinity
            }
          : p
      ));
    } else {
      const newProgram = {
        id: programs.length + 1,
        ...programForm,
        beneficiaries: 0,
        minSalary: parseFloat(programForm.minSalary) || 0,
        maxSalary: parseFloat(programForm.maxSalary) || Infinity
      };
      setPrograms([...programs, newProgram]);
    }
    setShowProgramModal(false);
    setEditingProgram(null);
  };

  const handleDeleteProgram = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter(p => p.id !== id));
      setBeneficiaries(beneficiaries.filter(b => b.programId !== id));
    }
  };

  const handleAddBeneficiary = () => {
    setEditingBeneficiary(null);
    setBeneficiaryForm({
      name: '',
      programId: '',
      contactNumber: '',
      address: '',
      amount: '',
      status: 'pending',
      salaryPerMonth: ''
    });
    setShowBeneficiaryModal(true);
  };

  const handleEditBeneficiary = (beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setBeneficiaryForm({
      name: beneficiary.name,
      programId: beneficiary.programId,
      contactNumber: beneficiary.contactNumber,
      address: beneficiary.address,
      amount: beneficiary.amount,
      status: beneficiary.status,
      salaryPerMonth: beneficiary.salaryPerMonth || ''
    });
    setShowBeneficiaryModal(true);
  };

  const handleSaveBeneficiary = () => {
    const salary = parseFloat(beneficiaryForm.salaryPerMonth) || 0;
    
    // Auto-assign program based on salary if no program is selected
    let selectedProgramId = beneficiaryForm.programId;
    if (!selectedProgramId && salary > 0) {
      const qualifyingPrograms = findQualifyingPrograms(salary);
      if (qualifyingPrograms.length > 0) {
        // Assign to the first qualifying program
        selectedProgramId = qualifyingPrograms[0].id.toString();
      }
    }
    
    let finalProgramId = selectedProgramId;
    let selectedProgram = programs.find(p => p.id === parseInt(selectedProgramId));
    
    if (editingBeneficiary) {
      // Check if salary changed and if beneficiary should be reassigned
      const oldSalary = editingBeneficiary.salaryPerMonth || 0;
      
      if (salary !== oldSalary && salary > 0) {
        const qualifyingPrograms = findQualifyingPrograms(salary);
        if (qualifyingPrograms.length > 0) {
          finalProgramId = qualifyingPrograms[0].id.toString();
          selectedProgram = programs.find(p => p.id === parseInt(finalProgramId));
          
          // Update old program count
          if (editingBeneficiary.programId !== parseInt(finalProgramId)) {
            setPrograms(programs.map(p => 
              p.id === editingBeneficiary.programId
                ? { ...p, beneficiaries: Math.max(0, p.beneficiaries - 1) }
                : p
            ));
            
            // Update new program count
            setPrograms(programs.map(p => 
              p.id === parseInt(finalProgramId)
                ? { ...p, beneficiaries: p.beneficiaries + 1 }
                : p
            ));
          }
        }
      }
      
      const updatedBeneficiaries = beneficiaries.map(b => 
        b.id === editingBeneficiary.id 
          ? { 
              ...editingBeneficiary, 
              ...beneficiaryForm,
              programId: parseInt(finalProgramId),
              programName: selectedProgram?.title || '',
              amount: parseFloat(beneficiaryForm.amount) || 0,
              salaryPerMonth: salary,
              applicationDate: editingBeneficiary.applicationDate,
              claimDate: editingBeneficiary.claimDate || null
            }
          : b
      );
      setBeneficiaries(updatedBeneficiaries);
    } else {
      const newBeneficiary = {
        id: beneficiaries.length + 1,
        ...beneficiaryForm,
        programId: parseInt(finalProgramId),
        programName: selectedProgram?.title || '',
        amount: parseFloat(beneficiaryForm.amount) || 0,
        salaryPerMonth: salary,
        applicationDate: new Date().toISOString().split('T')[0],
        claimDate: null
      };
      setBeneficiaries([...beneficiaries, newBeneficiary]);
      
      // Update program beneficiary count
      if (finalProgramId) {
        setPrograms(programs.map(p => 
          p.id === parseInt(finalProgramId)
            ? { ...p, beneficiaries: p.beneficiaries + 1 }
            : p
        ));
      }
    }
    setShowBeneficiaryModal(false);
    setEditingBeneficiary(null);
  };

  const handleDeleteBeneficiary = (id) => {
    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      const beneficiary = beneficiaries.find(b => b.id === id);
      setBeneficiaries(beneficiaries.filter(b => b.id !== id));
      
      // Update program beneficiary count
      if (beneficiary) {
        setPrograms(programs.map(p => 
          p.id === beneficiary.programId
            ? { ...p, beneficiaries: Math.max(0, p.beneficiaries - 1) }
            : p
        ));
      }
    }
  };


  const handleMarkAsReceived = (beneficiaryId) => {
    if (window.confirm('Mark this beneficiary as having received the ayuda?')) {
      const today = new Date().toISOString().split('T')[0];
      setBeneficiaries(beneficiaries.map(b => 
        b.id === beneficiaryId 
          ? { ...b, claimDate: today }
          : b
      ));
    }
  };

  const handleToggleReceived = (beneficiaryId) => {
    const beneficiary = beneficiaries.find(b => b.id === beneficiaryId);
    if (beneficiary) {
      if (beneficiary.claimDate) {
        // Mark as not received
        setBeneficiaries(beneficiaries.map(b => 
          b.id === beneficiaryId 
            ? { ...b, claimDate: null }
            : b
        ));
      } else {
        // Mark as received
        const today = new Date().toISOString().split('T')[0];
        setBeneficiaries(beneficiaries.map(b => 
          b.id === beneficiaryId 
            ? { ...b, claimDate: today }
            : b
        ));
      }
    }
  };

  const handleViewProgramBeneficiaries = (program) => {
    setSelectedProgramForBeneficiaries(program);
    setShowProgramBeneficiariesModal(true);
  };

  const handleCloseProgramBeneficiariesModal = () => {
    setShowProgramBeneficiariesModal(false);
    setSelectedProgramForBeneficiaries(null);
    setSelectedBeneficiaries([]);
    setShowStatusDropdown(false);
  };

  const handleSelectBeneficiary = (beneficiaryId) => {
    setSelectedBeneficiaries(prev => 
      prev.includes(beneficiaryId)
        ? prev.filter(id => id !== beneficiaryId)
        : [...prev, beneficiaryId]
    );
  };

  const handleSelectAllBeneficiaries = () => {
    if (selectedProgramForBeneficiaries) {
      const programBeneficiaries = beneficiaries
        .filter(b => b.programId === selectedProgramForBeneficiaries.id)
        .map(b => b.id);
      
      if (selectedBeneficiaries.length === programBeneficiaries.length) {
        setSelectedBeneficiaries([]);
      } else {
        setSelectedBeneficiaries(programBeneficiaries);
      }
    }
  };

  const handleSelectBeneficiaryMainTab = (beneficiaryId) => {
    setSelectedBeneficiariesMainTab(prev => 
      prev.includes(beneficiaryId)
        ? prev.filter(id => id !== beneficiaryId)
        : [...prev, beneficiaryId]
    );
  };

  const handleSelectAllBeneficiariesMainTab = () => {
    if (sortedBeneficiaries.length > 0) {
      const allIds = sortedBeneficiaries.map(b => b.id);
      if (selectedBeneficiariesMainTab.length === allIds.length) {
        setSelectedBeneficiariesMainTab([]);
      } else {
        setSelectedBeneficiariesMainTab(allIds);
      }
    }
  };

  const handleBulkDeleteMainTab = () => {
    if (selectedBeneficiariesMainTab.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedBeneficiariesMainTab.length} beneficiary/beneficiaries?`)) {
      // Count beneficiaries per program before deletion
      const beneficiariesToDelete = beneficiaries.filter(b => selectedBeneficiariesMainTab.includes(b.id));
      const programCounts = beneficiariesToDelete.reduce((acc, b) => {
        acc[b.programId] = (acc[b.programId] || 0) + 1;
        return acc;
      }, {});
      
      // Update program counts
      setPrograms(programs.map(p => 
        programCounts[p.id]
          ? { ...p, beneficiaries: Math.max(0, p.beneficiaries - programCounts[p.id]) }
          : p
      ));
      
      // Delete beneficiaries
      setBeneficiaries(beneficiaries.filter(b => !selectedBeneficiariesMainTab.includes(b.id)));
      setSelectedBeneficiariesMainTab([]);
    }
  };


  const handleBulkAmountUpdate = () => {
    if (selectedBeneficiariesMainTab.length === 0 || !bulkAmount) return;
    
    const amount = parseFloat(bulkAmount);
    if (isNaN(amount) || amount < 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    setBeneficiaries(beneficiaries.map(b => 
      selectedBeneficiariesMainTab.includes(b.id)
        ? { ...b, amount: amount }
        : b
    ));
    setSelectedBeneficiariesMainTab([]);
    setBulkAmount('');
    setShowAmountModal(false);
  };

  const handleBulkDelete = () => {
    if (selectedBeneficiaries.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedBeneficiaries.length} beneficiary/beneficiaries?`)) {
      // Count beneficiaries per program before deletion
      const beneficiariesToDelete = beneficiaries.filter(b => selectedBeneficiaries.includes(b.id));
      const programCounts = beneficiariesToDelete.reduce((acc, b) => {
        acc[b.programId] = (acc[b.programId] || 0) + 1;
        return acc;
      }, {});
      
      // Update program counts
      setPrograms(programs.map(p => 
        programCounts[p.id]
          ? { ...p, beneficiaries: Math.max(0, p.beneficiaries - programCounts[p.id]) }
          : p
      ));
      
      // Delete beneficiaries
      setBeneficiaries(beneficiaries.filter(b => !selectedBeneficiaries.includes(b.id)));
      setSelectedBeneficiaries([]);
    }
  };


  const handleBulkMarkReceived = () => {
    if (selectedBeneficiaries.length === 0) return;
    
    const today = new Date().toISOString().split('T')[0];
    setBeneficiaries(beneficiaries.map(b => 
      selectedBeneficiaries.includes(b.id)
        ? { ...b, claimDate: today }
        : b
    ));
    setSelectedBeneficiaries([]);
  };

  const handleBulkMarkNotReceived = () => {
    if (selectedBeneficiaries.length === 0) return;
    
    setBeneficiaries(beneficiaries.map(b => 
      selectedBeneficiaries.includes(b.id)
        ? { ...b, claimDate: null }
        : b
    ));
    setSelectedBeneficiaries([]);
  };


  const filteredBeneficiaries = beneficiaries.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.programName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = filterProgram === 'all' || b.programId === parseInt(filterProgram);
    return matchesSearch && matchesProgram;
  });

  // Handle column header click for sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Sort the filtered beneficiaries
  const sortedBeneficiaries = [...filteredBeneficiaries].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue, bValue;

    switch (sortColumn) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'program':
        aValue = a.programName.toLowerCase();
        bValue = b.programName.toLowerCase();
        break;
      case 'applicationDate':
        aValue = new Date(a.applicationDate);
        bValue = new Date(b.applicationDate);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full space-y-6 mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Program</h1>
          <p className="text-sm text-gray-600 mt-1">Manage assistance programs and beneficiaries</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'programs' ? (
            <button
              onClick={handleAddProgram}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add Program
            </button>
          ) : (
            <button
              onClick={handleAddBeneficiary}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add Beneficiary
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab('programs');
            setSelectedBeneficiariesMainTab([]);
            setFilterProgram('all');
          }}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'programs'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Programs
        </button>
        <button
          onClick={() => {
            setActiveTab('beneficiaries');
            setSelectedBeneficiariesMainTab([]);
            setFilterProgram('all');
          }}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'beneficiaries'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Beneficiaries
        </button>
      </div>

      {/* Programs Tab */}
      {activeTab === 'programs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {program.type}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(program.status)}`}>
                  {program.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{program.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FaUsers className="text-gray-400 mr-2" />
                  <span>{program.beneficiaries} beneficiaries</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <span>{formatDate(program.startDate)} - {formatDate(program.endDate)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-gray-400 mr-2">₱</span>
                  <span>
                    {program.minSalary !== undefined && program.maxSalary !== undefined && program.maxSalary !== Infinity
                      ? `₱${program.minSalary.toLocaleString()} - ₱${program.maxSalary.toLocaleString()}/month`
                      : program.minSalary !== undefined
                      ? `₱${program.minSalary.toLocaleString()}+/month`
                      : 'No salary requirement'}
                  </span>
                </div>
              </div>
              
              {/* Spacer to push buttons to bottom */}
              <div className="flex-grow"></div>
              
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 mt-auto">
                <button
                  onClick={() => handleViewProgramBeneficiaries(program)}
                  className="w-full px-3 py-2 bg-green-50 text-green-600 rounded-lg font-semibold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FaUsers /> Beneficiaries
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProgram(program)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(program.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Beneficiaries Tab */}
      {activeTab === 'beneficiaries' && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={filterProgram}
                  onChange={(e) => setFilterProgram(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Programs</option>
                  {programs.map(program => (
                    <option key={program.id} value={program.id}>{program.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Bar - Shows when beneficiaries are selected */}
          {selectedBeneficiariesMainTab.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-blue-900">
                  {selectedBeneficiariesMainTab.length} beneficiary/beneficiaries selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAmountModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <FaHandHoldingHeart /> Amount
                </button>
                <button
                  onClick={handleBulkDeleteMainTab}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          )}

          {/* Beneficiaries Table */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          sortedBeneficiaries.length > 0 &&
                          selectedBeneficiariesMainTab.length === sortedBeneficiaries.length
                        }
                        onChange={handleSelectAllBeneficiariesMainTab}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        <span>Name</span>
                        {sortColumn === 'name' && (
                          sortDirection === 'asc' ? <FaArrowUp className="text-blue-600" /> : <FaArrowDown className="text-blue-600" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('program')}
                    >
                      <div className="flex items-center gap-2">
                        <span>Program</span>
                        {sortColumn === 'program' && (
                          sortDirection === 'asc' ? <FaArrowUp className="text-blue-600" /> : <FaArrowDown className="text-blue-600" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Salary/Month</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Received</th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('applicationDate')}
                    >
                      <div className="flex items-center gap-2">
                        <span>Application Date</span>
                        {sortColumn === 'applicationDate' && (
                          sortDirection === 'asc' ? <FaArrowUp className="text-blue-600" /> : <FaArrowDown className="text-blue-600" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedBeneficiaries.map((beneficiary) => (
                    <tr key={beneficiary.id} className={`hover:bg-gray-50 ${selectedBeneficiariesMainTab.includes(beneficiary.id) ? 'bg-blue-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedBeneficiariesMainTab.includes(beneficiary.id)}
                          onChange={() => handleSelectBeneficiaryMainTab(beneficiary.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{beneficiary.name}</div>
                          <div className="text-xs text-gray-500">{beneficiary.contactNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{beneficiary.programName}</div>
                        <div className="text-xs text-gray-500">{beneficiary.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {beneficiary.salaryPerMonth ? `₱${beneficiary.salaryPerMonth.toLocaleString()}` : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₱{beneficiary.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {beneficiary.claimDate ? (
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" />
                            <div>
                              <div className="text-sm font-medium text-green-600">Received</div>
                              <div className="text-xs text-gray-500">{formatDate(beneficiary.claimDate)}</div>
                            </div>
                          </div>
                        ) : (
                          beneficiary.status === 'approved' ? (
                            <button
                              onClick={() => handleMarkAsReceived(beneficiary.id)}
                              className="px-3 py-1 text-xs font-semibold bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                              title="Mark as received"
                            >
                              <FaCheckCircle /> Mark Received
                            </button>
                          ) : (
                            <span className="text-sm text-gray-400">Not received</span>
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(beneficiary.applicationDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditBeneficiary(beneficiary)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteBeneficiary(beneficiary.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {sortedBeneficiaries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No beneficiaries found
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Program Modal */}
      {showProgramModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProgram ? 'Edit Program' : 'Add New Program'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
                <input
                  type="text"
                  value={programForm.title}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter program title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter program description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={programForm.type}
                    onChange={(e) => setProgramForm({ ...programForm, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {programTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={programForm.status}
                    onChange={(e) => setProgramForm({ ...programForm, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={programForm.startDate}
                    onChange={(e) => setProgramForm({ ...programForm, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={programForm.endDate}
                    onChange={(e) => setProgramForm({ ...programForm, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Qualification Range (per month)</label>
                <p className="text-xs text-gray-500 mb-3">Set the minimum and maximum monthly salary for beneficiaries to qualify for this program. Leave max empty for no upper limit.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Minimum Salary (₱)</label>
                    <input
                      type="number"
                      value={programForm.minSalary}
                      onChange={(e) => setProgramForm({ ...programForm, minSalary: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Maximum Salary (₱)</label>
                    <input
                      type="number"
                      value={programForm.maxSalary}
                      onChange={(e) => setProgramForm({ ...programForm, maxSalary: e.target.value || '' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="No limit"
                      min="0"
                    />
                    <p className="text-xs text-gray-400 mt-1">Leave empty for no upper limit</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowProgramModal(false);
                  setEditingProgram(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProgram}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Beneficiary Modal */}
      {showBeneficiaryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBeneficiary ? 'Edit Beneficiary' : 'Add New Beneficiary'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={beneficiaryForm.name}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                  <select
                    value={beneficiaryForm.programId}
                    onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, programId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select program</option>
                    {programs.map(program => (
                      <option key={program.id} value={program.id}>{program.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  value={beneficiaryForm.contactNumber}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, contactNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="09XXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={beneficiaryForm.address}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Salary (₱)</label>
                <input
                  type="number"
                  value={beneficiaryForm.salaryPerMonth}
                  onChange={(e) => {
                    const salary = e.target.value;
                    const salaryNum = parseFloat(salary) || 0;
                    const updatedForm = { ...beneficiaryForm, salaryPerMonth: salary };
                    
                    // Auto-select program if salary is entered and no program is selected
                    if (salary && salaryNum > 0 && !beneficiaryForm.programId) {
                      const qualifyingPrograms = findQualifyingPrograms(salaryNum);
                      if (qualifyingPrograms.length > 0) {
                        updatedForm.programId = qualifyingPrograms[0].id.toString();
                      }
                    }
                    
                    setBeneficiaryForm(updatedForm);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter monthly salary"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {beneficiaryForm.salaryPerMonth && beneficiaryForm.programId ? (
                    <span className="text-green-600">
                      ✓ Automatically assigned to qualifying program
                    </span>
                  ) : beneficiaryForm.salaryPerMonth ? (
                    <span className="text-yellow-600">
                      No qualifying program found for this salary range
                    </span>
                  ) : (
                    'Enter salary to auto-assign to qualifying program'
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₱)</label>
                <input
                  type="number"
                  value={beneficiaryForm.amount}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowBeneficiaryModal(false);
                  setEditingBeneficiary(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBeneficiary}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Program Beneficiaries Modal */}
      {showProgramBeneficiariesModal && selectedProgramForBeneficiaries && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedProgramForBeneficiaries.title} - Beneficiaries
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage beneficiaries and mark received status
                </p>
              </div>
              <button
                onClick={handleCloseProgramBeneficiariesModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {/* Action Bar - Shows when beneficiaries are selected */}
              {selectedBeneficiaries.length > 0 && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-blue-900">
                      {selectedBeneficiaries.length} beneficiary/beneficiaries selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBulkMarkReceived}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <FaCheckCircle /> Mark as Received
                    </button>
                    <button
                      onClick={handleBulkMarkNotReceived}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FaCheckCircle /> Mark as Not Received
                    </button>
                  </div>
                </div>
              )}

              {/* Beneficiaries Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={
                              selectedProgramForBeneficiaries &&
                              beneficiaries.filter(b => b.programId === selectedProgramForBeneficiaries.id).length > 0 &&
                              selectedBeneficiaries.length === beneficiaries.filter(b => b.programId === selectedProgramForBeneficiaries.id).length
                            }
                            onChange={handleSelectAllBeneficiaries}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Received</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {beneficiaries
                        .filter(b => b.programId === selectedProgramForBeneficiaries.id)
                        .map((beneficiary, index) => (
                          <tr key={beneficiary.id} className={`hover:bg-gray-50 ${selectedBeneficiaries.includes(beneficiary.id) ? 'bg-blue-50' : ''}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedBeneficiaries.includes(beneficiary.id)}
                                onChange={() => handleSelectBeneficiary(beneficiary.id)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{beneficiary.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {beneficiary.contactNumber}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {beneficiary.address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ₱{beneficiary.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {beneficiary.claimDate ? (
                                <div className="flex items-center gap-2">
                                  <FaCheckCircle className="text-green-600" />
                                  <div>
                                    <div className="text-sm font-medium text-green-600">Received</div>
                                    <div className="text-xs text-gray-500">{formatDate(beneficiary.claimDate)}</div>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">Not received</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {beneficiaries.filter(b => b.programId === selectedProgramForBeneficiaries.id).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No beneficiaries found for this program
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleCloseProgramBeneficiariesModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Amount Modal */}
      {showAmountModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Update Amount
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Set amount for {selectedBeneficiariesMainTab.length} selected beneficiary/beneficiaries
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₱)</label>
                <input
                  type="number"
                  value={bulkAmount}
                  onChange={(e) => setBulkAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAmountModal(false);
                  setBulkAmount('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAmountUpdate}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Update Amount
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AyudaManagement;

