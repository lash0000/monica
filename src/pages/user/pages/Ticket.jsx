import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSearch, FaChevronDown, FaTimes, FaChartBar, FaClock, FaCheck, FaTimes as FaX } from 'react-icons/fa';
import { ticketsData } from '../stores/TicketData';

function Ticket() {
    // Import ticket data from TicketData store
    const [tickets] = useState(ticketsData);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [filters, setFilters] = useState({
        status: 'All',
        priority: 'All',
        category: 'All',
        priorityLevel: 'All'
    });
    
    const filterDropdownRef = useRef(null);

    // Handle click outside filter dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilterDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get unique values for filter options
    const getUniqueCategories = () => {
        const categories = [...new Set(tickets.map(ticket => ticket.category))];
        return ['All', ...categories.sort()];
    };

    const getUniquePriorityLevels = () => {
        const levels = [...new Set(tickets.map(ticket => ticket.priorityLevel.charAt(0)))];
        return ['All', ...levels.sort()];
    };

    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            status: 'All',
            priority: 'All',
            category: 'All',
            priorityLevel: 'All'
        });
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm('');
    };

    // Clear all filters and search
    const clearAll = () => {
        clearFilters();
        clearSearch();
    };

    // Apply filters and search to tickets
    const getFilteredTickets = () => {
        return tickets.filter(ticket => {
            // Apply dropdown filters
            if (filters.status !== 'All' && ticket.status !== filters.status) return false;
            if (filters.priority !== 'All' && ticket.priority !== filters.priority) return false;
            if (filters.category !== 'All' && ticket.category !== filters.category) return false;
            if (filters.priorityLevel !== 'All' && !ticket.priorityLevel.startsWith(filters.priorityLevel)) return false;
            
            // Apply search filter
            if (searchTerm.trim() !== '') {
                const search = searchTerm.toLowerCase().trim();
                const searchableFields = [
                    ticket.id.toLowerCase(),
                    ticket.subject.toLowerCase(),
                    ticket.category.toLowerCase(),
                    ticket.status.toLowerCase(),
                    ticket.reportedBy.toLowerCase(),
                    ticket.priority.toLowerCase(),
                    ticket.priorityLevel.toLowerCase(),
                    ticket.requestDate.toLowerCase()
                ];
                
                // Check if search term matches any field
                const matchesSearch = searchableFields.some(field => 
                    field.includes(search)
                );
                
                if (!matchesSearch) return false;
            }
            
            return true;
        });
    };

    // Get filtered tickets for display
    const filteredTickets = getFilteredTickets();
    
    // Calculate comprehensive statistics from original dataset (never changes)
    const totalTickets = tickets.length;
    const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resolved').length;
    const pendingTickets = tickets.filter(ticket => ticket.status === 'Pending').length;
    const rejectedTickets = 0; // No rejected status in current data
    
    // Calculate urgency level statistics
    const urgencyStats = {
        'Low': { 'Resolved': 0, 'Pending': 0 },
        'Medium': { 'Resolved': 0, 'Pending': 0 },
        'High': { 'Resolved': 0, 'Pending': 0 },
        'Critical': { 'Resolved': 0, 'Pending': 0 }
    };
    
    tickets.forEach(ticket => {
        const level = ticket.priorityLevel.charAt(0);
        let urgencyCategory = 'Low';
        
        if (level === 'D') urgencyCategory = 'Low';
        else if (level === 'C') urgencyCategory = 'Medium'; 
        else if (level === 'B') urgencyCategory = 'High';
        else if (level === 'A') urgencyCategory = 'Critical';
        
        if (urgencyStats[urgencyCategory]) {
            urgencyStats[urgencyCategory][ticket.status] = (urgencyStats[urgencyCategory][ticket.status] || 0) + 1;
        }
    });
    
    // Get current filtered results count for UI display
    const currentResultsCount = filteredTickets.length;

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Get sort icon
    const getSortIcon = (field) => {
        if (sortField !== field) return '▾';
        return sortDirection === 'asc' ? '▲' : '▼';
    };

    // Sort tickets
    const getSortedTickets = () => {
        if (!sortField) return filteredTickets;

        return [...filteredTickets].sort((a, b) => {
            let aValue, bValue;

            switch (sortField) {
                case 'ticketId':
                    // Extract number from ticket ID for proper sorting
                    aValue = parseInt(a.id.replace('#TC-', ''));
                    bValue = parseInt(b.id.replace('#TC-', ''));
                    break;
                case 'priority':
                    // Sort by priority level first, then by priority text
                    const priorityOrder = { 'B': 1, 'C': 2, 'D': 3 };
                    const aPriorityLevel = priorityOrder[a.priorityLevel.charAt(0)] || 4;
                    const bPriorityLevel = priorityOrder[b.priorityLevel.charAt(0)] || 4;
                    
                    if (aPriorityLevel !== bPriorityLevel) {
                        aValue = aPriorityLevel;
                        bValue = bPriorityLevel;
                    } else {
                        // If same priority level, sort by High/Low
                        aValue = a.priority === 'High' ? 1 : 2;
                        bValue = b.priority === 'High' ? 1 : 2;
                    }
                    break;
                case 'requestDate':
                    aValue = new Date(a.requestDate);
                    bValue = new Date(b.requestDate);
                    break;
                default:
                    aValue = a[sortField];
                    bValue = b[sortField];
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const sortedTickets = getSortedTickets();

    // Handle checkbox selection
    const handleTicketSelection = (ticketId, isChecked) => {
        if (isChecked) {
            setSelectedTickets([...selectedTickets, ticketId]);
        } else {
            setSelectedTickets(selectedTickets.filter(id => id !== ticketId));
        }
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedTickets(sortedTickets.map((_, index) => index));
        } else {
            setSelectedTickets([]);
        }
    };

    // Get priority badge color
    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-500 text-white';
            case 'Low':
                return 'bg-gray-400 text-white';
            default:
                return 'bg-gray-300 text-black';
        }
    };

    // Get status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Resolved':
                return 'bg-green-600 text-white';
            case 'Pending':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-gray-400 text-white';
        }
    };

    // Get priority level badge color
    const getPriorityLevelColor = (level) => {
        const firstChar = level.charAt(0);
        switch (firstChar) {
            case 'B':
                return 'bg-black text-white';
            case 'C':
                return 'bg-gray-500 text-white';
            case 'D':
                return 'bg-gray-400 text-white';
            default:
                return 'bg-gray-300 text-black';
        }
    };

    return (
        <div className="bg-gray min-h-screen overflow-y-auto mt-15 px-4 sm:px-6">

            {/* Search/Filter Results Info */}
            {(searchTerm || Object.values(filters).some(value => value !== 'All')) && (
                <div className="mb-3 p-2 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <p className="text-sm text-blue-700">
                        {searchTerm && (
                            <>Showing search results for: <span className="font-semibold">"{searchTerm}"</span></>
                        )}
                        {searchTerm && Object.values(filters).some(value => value !== 'All') && <span> with filters applied</span>}
                        {!searchTerm && Object.values(filters).some(value => value !== 'All') && <>Showing filtered results</>}
                        {currentResultsCount === 0 ? " (No results found)" : ` (${currentResultsCount} of ${totalTickets} tickets)`}
                    </p>
                </div>
            )}

            {/* Enhanced Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Total Reports */}
                <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm border relative overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600 font-bold mb-2">Total reports</div>
                            <div className="text-3xl font-bold text-gray-800">{totalTickets}</div>
                            <div className="text-xs text-gray-500 mt-1">All incidents you've submitted</div>
                        </div>
                        <div className="text-[#4B663B]">
                            <FaChartBar className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* Pending Review */}
                <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm border relative overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600 font-bold mb-2">Pending Review</div>
                            <div className="text-3xl font-bold text-gray-800">{pendingTickets}</div>
                            <div className="text-xs text-gray-500 mt-1">Reports awaiting confirmation</div>
                        </div>
                        <div className="text-yellow-500">
                            <FaClock className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* Confirmed Reports */}
                <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm border relative overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600 font-bold mb-2 ">Confirmed Reports</div>
                            <div className="text-3xl font-bold text-gray-800">{resolvedTickets}</div>
                            <div className="text-xs text-gray-500 mt-1">Incidents validated by officials</div>
                        </div>
                        <div className="text-[#4B663B]">
                            <FaCheck className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* Rejected Reports */}
                <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm border relative overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600 font-bold mb-2">Rejected Reports</div>
                            <div className="text-3xl font-bold text-gray-800">{rejectedTickets}</div>
                            <div className="text-xs text-gray-500 mt-1">Reports marked as invalid</div>
                        </div>
                        <div className="text-red-500">
                            <FaX className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Urgency vs. Outcome Chart */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">Urgency vs. Outcome</h3>
                    <div className="relative flex items-center">
                        {/* Y-axis label - positioned completely outside */}
                        <div className="flex items-center justify-center h-32 sm:h-40 w-6 sm:w-8">
                            <span className="text-xs font-medium text-gray-600 transform -rotate-90 whitespace-nowrap">Outcome</span>
                        </div>
                        
                        {/* Chart Container */}
                        <div className="flex-1">
                            <div className="flex items-end justify-between h-32 sm:h-40 px-2 sm:px-3 py-3 border border-gray-200 bg-gray-50 relative">
                                {/* Y-axis grid lines and labels */}
                                <div className="absolute left-0 top-0 h-full w-full">
                                    {[0, 5, 10, 15, 20].map((value) => (
                                        <div key={value} className="absolute w-full flex items-center" style={{ bottom: `${(value / 20) * 100}%` }}>
                                            <span className="text-xs text-gray-500 w-6 text-right mr-1">{value}</span>
                                            <div className="flex-1 border-t border-gray-300 opacity-50"></div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Bars */}
                                {Object.entries(urgencyStats).map(([urgency, outcomes]) => {
                                    const total = outcomes.Resolved + outcomes.Pending;
                                    const maxValue = Math.max(...Object.values(urgencyStats).map(stat => stat.Resolved + stat.Pending), 20);
                                    const barHeight = (total / 20) * 100;
                                    
                                    return (
                                        <div key={urgency} className="flex flex-col items-center flex-1 mx-0.5 sm:mx-1 relative z-10">
                                            {/* Bar */}
                                            <div 
                                                className="bg-[#4B663B] w-6 sm:w-8 rounded-t-sm transition-all duration-700 ease-out shadow-sm"
                                                style={{ height: `${barHeight}%`, minHeight: total > 0 ? '6px' : '0px' }}
                                            ></div>
                                            {/* Value label on top of bar */}
                                            {total > 0 && (
                                                <div className="absolute -top-5 text-xs font-medium text-gray-700">
                                                    {total}
                                                </div>
                                            )}
                                            {/* X-axis label */}
                                            <div className="mt-1 text-xs font-medium text-gray-700 text-center">
                                                {urgency}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {/* X-axis label */}
                            <div className="text-center mt-1">
                                <span className="text-xs font-medium text-gray-600">Urgency</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Report by Status Pie Chart */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">Report By Status</h3>
                    <div className="flex flex-col items-center">
                        {/* CSS Pie Chart */}
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-3" style={{
                            background: `conic-gradient(
                                #4B663B 0deg ${(resolvedTickets / totalTickets) * 360}deg,
                                #F3A811FF ${(resolvedTickets / totalTickets) * 360}deg ${((resolvedTickets + pendingTickets) / totalTickets) * 360}deg,
                                #dc2626 ${((resolvedTickets + pendingTickets) / totalTickets) * 360}deg 360deg
                            )`
                        }}>
                            <div className="absolute inset-2 sm:inset-3 bg-white rounded-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-sm sm:text-lg font-bold text-gray-800">{totalTickets}</div>
                                    <div className="text-xs text-gray-600">Total</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Legend */}
                        <div className="space-y-1 text-xs">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-[#4B663B] rounded mr-2"></div>
                                    <span>Confirmed</span>
                                </div>
                                <span className="font-semibold ml-3">{((resolvedTickets / totalTickets) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-[#F3A811FF] rounded mr-2"></div>
                                    <span>Pending</span>
                                </div>
                                <span className="font-semibold">{((pendingTickets / totalTickets) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-red-600 rounded mr-2"></div>
                                    <span>Rejected</span>
                                </div>
                                <span className="font-semibold">{((rejectedTickets / totalTickets) * 100).toFixed(1)}%</span>
                            </div>
                </div>
                </div>
                </div>
            </div>

            {/* Filter and Search */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative" ref={filterDropdownRef}>
                            <button 
                                className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            >
                                <FaFilter size={14} />
                                <span>Filter by</span>
                                <FaChevronDown size={12} />
                            </button>

                            {/* Filter Dropdown */}
                            {showFilterDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                    <div className="p-3">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-xs font-medium text-gray-700">Filters</h3>
                                            <button
                                                onClick={clearAll}
                                                className="text-xs text-blue-600 hover:text-blue-800"
                                            >
                                                Clear All
                                            </button>
                                        </div>

                                        {/* Status Filter */}
                                        <div className="mb-3">
                                            <label className="block text-xs text-gray-600 mb-1">Status</label>
                                            <select
                                                value={filters.status}
                                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            >
                                                <option value="All">All</option>
                                                <option value="Resolved">Resolved</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                        </div>

                                        {/* Priority Filter */}
                                        <div className="mb-3">
                                            <label className="block text-xs text-gray-600 mb-1">Priority</label>
                                            <select
                                                value={filters.priority}
                                                onChange={(e) => handleFilterChange('priority', e.target.value)}
                                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            >
                                                <option value="All">All</option>
                                                <option value="High">High</option>
                                                <option value="Low">Low</option>
                                            </select>
                                        </div>

                                        {/* Category Filter */}
                                        <div className="mb-3">
                                            <label className="block text-xs text-gray-600 mb-1">Category</label>
                                            <select
                                                value={filters.category}
                                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            >
                                                {getUniqueCategories().map(category => (
                                                    <option key={category} value={category}>
                                                        {category === 'All' ? 'All' : category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Priority Level Filter */}
                                        <div className="mb-3">
                                            <label className="block text-xs text-gray-600 mb-1">Level</label>
                                            <select
                                                value={filters.priorityLevel}
                                                onChange={(e) => handleFilterChange('priorityLevel', e.target.value)}
                                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            >
                                                {getUniquePriorityLevels().map(level => (
                                                    <option key={level} value={level}>
                                                        {level === 'All' ? 'All' : level}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Active Filters Display */}
                                        {Object.values(filters).some(value => value !== 'All') && (
                                            <div className="border-t pt-2">
                                                <div className="flex flex-wrap gap-1">
                                                    {Object.entries(filters).map(([key, value]) => {
                                                        if (value !== 'All') {
                                                            return (
                                                                <span key={key} className="inline-flex items-center px-1 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                                                                    {value}
                                                                    <button
                                                                        onClick={() => handleFilterChange(key, 'All')}
                                                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </span>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search incident, title, date, status, coordinates ..."
                            className="pl-10 pr-10 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <FaTimes size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Table Header with Results Count */}
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-medium">{currentResultsCount}</span> of <span className="font-medium">{totalTickets}</span> tickets
                    </div>
                    {(searchTerm || Object.values(filters).some(value => value !== 'All')) && (
                        <button
                            onClick={clearAll}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                            Show all tickets
                        </button>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="p-2 text-left">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        checked={selectedTickets.length === sortedTickets.length && sortedTickets.length > 0}
                                    />
                                </th>
                                <th 
                                    className="p-2 text-left font-medium text-gray-700 text-sm cursor-pointer hover:bg-gray-100 select-none"
                                    onClick={() => handleSort('ticketId')}
                                >
                                    Ticket ID {getSortIcon('ticketId')}
                                </th>
                                <th className="p-2 text-left font-medium text-gray-700 text-sm">Subject</th>
                                <th 
                                    className="p-2 text-left font-medium text-gray-700 text-sm cursor-pointer hover:bg-gray-100 select-none"
                                    onClick={() => handleSort('priority')}
                                >
                                    Priority/Urgency {getSortIcon('priority')}
                                </th>
                                <th className="p-2 text-left font-medium text-gray-700 text-sm hidden md:table-cell">Category</th>
                                <th className="p-2 text-left font-medium text-gray-700 text-sm hidden lg:table-cell">Reported by</th>
                                <th className="p-2 text-left font-medium text-gray-700 text-sm">Status</th>
                                <th 
                                    className="p-2 text-left font-medium text-gray-700 text-sm cursor-pointer hover:bg-gray-100 select-none hidden sm:table-cell"
                                    onClick={() => handleSort('requestDate')}
                                >
                                    Request Date {getSortIcon('requestDate')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentResultsCount === 0 ? (
                                <tr>
                                    <td colSpan="8" className="p-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <FaSearch className="text-gray-300 mb-3" size={48} />
                                            <p className="text-lg font-medium mb-2">No tickets found</p>
                                            <p className="text-sm">
                                                {searchTerm ? 
                                                    `No results match "${searchTerm}". Try different keywords or clear your search.` :
                                                    'No tickets match the current filters. Try adjusting your filters.'
                                                }
                                            </p>
                                            <button
                                                onClick={clearAll}
                                                className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                sortedTickets.map((ticket, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-2">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300"
                                            checked={selectedTickets.includes(index)}
                                            onChange={(e) => handleTicketSelection(index, e.target.checked)}
                                        />
                                    </td>
                                    <td className="p-2 text-blue-600 font-medium text-sm">{ticket.id}</td>
                                    <td className="p-2 text-gray-800 text-sm">{ticket.subject}</td>
                                    <td className="p-2">
                                        <div className="flex items-center space-x-1">
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityLevelColor(ticket.priorityLevel)}`}>
                                                {ticket.priorityLevel}
                                            </span>
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityBadgeColor(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-2 text-gray-700 text-sm hidden md:table-cell">{ticket.category}</td>
                                    <td className="p-2 text-gray-700 text-sm hidden lg:table-cell">{ticket.reportedBy}</td>
                                    <td className="p-2">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="p-2 text-gray-700 text-xs hidden sm:table-cell">{ticket.requestDate}</td>
                                </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Ticket;
