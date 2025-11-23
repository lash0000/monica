import { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUsers, FaSearch, FaFilter, FaArrowUp, FaArrowDown, FaCheckCircle, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaUnlock, FaUserShield, FaUserCircle } from 'react-icons/fa';

function UserManagement() {
  // Generate sample users
  const generateSampleUsers = () => {
    const firstNames = ['John', 'Jane', 'Michael', 'Maria', 'David', 'Sarah', 'Robert', 'Lisa', 'James', 'Jennifer', 'William', 'Emily', 'Richard', 'Jessica', 'Joseph', 'Ashley', 'Thomas', 'Amanda', 'Charles', 'Melissa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const roles = ['admin', 'user'];
    const statuses = ['active', 'inactive'];

    const users = [];
    const startDate = new Date('2023-01-01');

    for (let i = 1; i <= 50; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
      const contactNumber = `09${Math.floor(Math.random() * 900000000) + 100000000}`;
      const role = roles[Math.floor(Math.random() * roles.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const daysAgo = Math.floor(Math.random() * 730);
      const registeredDate = new Date(startDate);
      registeredDate.setDate(registeredDate.getDate() + daysAgo);

      const streetNum = Math.floor(Math.random() * 999) + 1;
      const streets = ['Main Street', 'Oak Avenue', 'Pine Road', 'Elm Street', 'Maple Drive'];
      const street = streets[Math.floor(Math.random() * streets.length)];
      const address = `${streetNum} ${street}, Barangay Santa Monica`;

      users.push({
        id: i,
        name,
        email,
        contactNumber,
        address,
        role,
        status,
        registeredDate: registeredDate.toISOString().split('T')[0],
        lastLogin: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null
      });
    }

    return users;
  };

  const initialUsers = generateSampleUsers();
  const [users, setUsers] = useState(initialUsers);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    role: 'user',
    status: 'active'
  });

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contactNumber.includes(searchTerm);
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });

    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        if (sortColumn === 'registeredDate' || sortColumn === 'lastLogin') {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, filterRole, filterStatus, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({
      name: '',
      email: '',
      contactNumber: '',
      address: '',
      role: 'user',
      status: 'active'
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      address: user.address,
      role: user.role,
      status: user.status
    });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingUser) {
      setUsers(users.map(u =>
        u.id === editingUser.id
          ? { ...u, ...userForm }
          : u
      ));
    } else {
      const newUser = {
        id: users.length + 1,
        ...userForm,
        registeredDate: new Date().toISOString().split('T')[0],
        lastLogin: null
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      if (currentPage > 1 && paginatedUsers.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleToggleStatus = (user) => {
    setUsers(users.map(u =>
      u.id === user.id
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterRole('all');
    setFilterStatus('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <FaArrowUp className="ml-1" /> : <FaArrowDown className="ml-1" />;
  };

  // Statistics
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      admins: users.filter(u => u.role === 'admin').length,
      regularUsers: users.filter(u => u.role === 'user').length
    };
  }, [users]);

  return (
    <div className="w-full min-h-screen p-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
              <FaUsers className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 text-sm mt-0.5">Manage system users and their permissions</p>
            </div>
          </div>
          <button
            onClick={handleAddUser}
            className="flex items-center gap-2 px-3 py-1.5 bg-foreground text-white rounded-lg hover:bg-foreground/90 transition-colors font-medium text-sm"
          >
            <FaPlus /> Add User
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Users</p>
                <p className="text-xl font-bold text-gray-900">0</p>
              </div>
              <FaUsers className="text-foreground text-lg" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Admins</p>
                <p className="text-xl font-bold text-blue-600">0</p>
              </div>
              <FaUserShield className="text-blue-600 text-lg" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Bonafide</p>
                <p className="text-xl font-bold text-gray-600">0</p>
              </div>
              <FaUserCircle className="text-gray-600 text-lg" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Non Residents</p>
                <p className="text-xl font-bold text-gray-600">0</p>
              </div>
              <FaUserCircle className="text-gray-600 text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-4 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by name, email, or contact number..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>

          {/* Role Filter */}
          <div className="relative">
            <FaFilter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 text-sm" />
            <select
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground appearance-none bg-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
            >
              <FaTimes /> Clear
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-3 text-xs text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredAndSortedUsers.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{users.length}</span> users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}>
                  <div className="flex items-center">
                    Name
                    <SortIcon column="name" />
                  </div>
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('email')}>
                  <div className="flex items-center">
                    Email
                    <SortIcon column="email" />
                  </div>
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('role')}>
                  <div className="flex items-center">
                    Role
                    <SortIcon column="role" />
                  </div>
                </th>

                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('registeredDate')}>
                  <div className="flex items-center">
                    Registered
                    <SortIcon column="registeredDate" />
                  </div>
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center mr-2">
                          <FaUser className="text-foreground text-xs" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{user.address}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center text-xs text-gray-900">
                        <FaEnvelope className="text-gray-400 mr-1.5 text-xs" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs text-gray-900 flex items-center">
                        <FaPhone className="text-gray-400 mr-1.5 text-xs" />
                        {user.contactNumber}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-1.5 py-0.5 text-xs font-semibold ${user.role === 'admin'
                        }`}>
                        {user.role === 'admin' ? (
                          <span className="flex items-center gap-1">
                            <span className="text-blue-600">ADMIN</span>
                          </span>
                        ) : (
                          <span className="text-gray-600">USER</span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-600">
                      {formatDate(user.registeredDate)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900 p-1.5 hover:bg-blue-50 rounded transition-colors"
                          title="Edit user"
                        >
                          <FaEdit className="text-xs" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 p-1.5 hover:bg-red-50 rounded transition-colors"
                          title="Delete user"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center">
                    <FaUsers className="text-gray-300 text-3xl mx-auto mb-3" />
                    <p className="text-gray-600 font-medium text-sm">No users found</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {hasActiveFilters
                        ? 'Try adjusting your search or filter criteria'
                        : 'Get started by adding a new user'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} users
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 py-1 text-sm border rounded-lg transition-colors ${currentPage === page
                      ? 'bg-foreground text-white border-foreground'
                      : 'border-gray-300 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowUserModal(false)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-gray-200"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-foreground text-white p-4 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-white hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-white/20"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Contact Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="tel"
                    value={userForm.contactNumber}
                    onChange={(e) => setUserForm({ ...userForm, contactNumber: e.target.value })}
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground"
                    placeholder="09XXXXXXXXX"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-2.5 top-2.5 text-gray-400 text-sm" />
                  <textarea
                    value={userForm.address}
                    onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
                    rows="3"
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground resize-none"
                    placeholder="Enter address"
                  />
                </div>
              </div>

              {/* Role and Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Role
                  </label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground appearance-none bg-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={userForm.status}
                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground appearance-none bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="px-3 py-1.5 text-sm bg-foreground text-white rounded-lg hover:bg-foreground/90 transition-colors font-medium"
              >
                {editingUser ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;

