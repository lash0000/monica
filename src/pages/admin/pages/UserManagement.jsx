import { useState, useMemo, useEffect } from "react";
import {
  FaPlus, FaEdit, FaTrash, FaUsers, FaSearch, FaFilter,
  FaArrowUp, FaArrowDown, FaTimes, FaUser, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaUserShield, FaUserCircle
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserCredentialStore } from "../stores/UserCredentials.store";

// Utility
function toTitleCase(str = "") {
  return String(str)
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function SearchFilters({
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
  filterStatus,
  setFilterStatus,
  clearFilters,
  hasActiveFilters,
  currentPage,
  itemsPerPage,
  totalCount
}) {

  const [searchText, setSearchText] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-4 border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by keyword then hit ENTER..."
            value={searchText} // <- IMPORTANT
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(searchText); // this triggers the actual search
              }
            }}
            className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground"
          />

          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
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
            onChange={(e) => setFilterRole(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground appearance-none bg-white"
          >
            <option value="all">All Roles</option>
            <option value="System">System</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
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

      {/* Showing count */}
      <div className="mt-3 text-xs text-gray-600">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900">
          {Math.min(currentPage * itemsPerPage, totalCount)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900">{totalCount}</span>{" "}
        users
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color = "text-gray-600" }) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600">{label}</p>
          <p className={`text-xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`${color} text-lg`} />
      </div>
    </div>
  );
}


function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalCount,
  setCurrentPage
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex items-center justify-between">
      <div className="text-xs text-gray-600">
        Showing{" "}
        {totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
        {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} users
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 text-sm border rounded-lg ${currentPage === page
                ? "bg-foreground text-white border-foreground"
                : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}


function UserTable({
  users,
  handleSort,
  SortIcon,
  formatDate,
  base_path,
  handleDeleteUser,
}) {
  const navigate = useNavigate(); // REQUIRED inside this component

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name <SortIcon column="name" />
                </div>
              </th>

              <th
                className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  Email <SortIcon column="email" />
                </div>
              </th>

              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>

              <th
                className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center">
                  Role <SortIcon column="role" />
                </div>
              </th>

              <th
                className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("registeredDate")}
              >
                <div className="flex items-center">
                  Registered <SortIcon column="registeredDate" />
                </div>
              </th>

              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center mr-2">
                        <FaUser className="text-foreground text-xs" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {user.address}
                        </div>
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
                    <span className="px-1.5 py-0.5 text-xs font-semibold">
                      {String(user.role)}
                    </span>
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-600">
                    {formatDate(user.registeredDate)}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigate(`${base_path}/${user.id}`)}
                        className="text-blue-600 hover:text-blue-900 p-1.5 hover:bg-blue-50 rounded transition-colors"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      {/*
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-1.5 hover:bg-red-50 rounded transition-colors"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                  */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center">
                  <FaUsers className="text-gray-300 text-3xl mx-auto mb-3" />
                  <p className="text-gray-600 font-medium text-sm">No users found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const base_path = location.pathname;

  const {
    credentials,
    loading,
    error,
    GetAllCredentials,
  } = useUserCredentialStore();

  // Local component state
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // UI page size (server also receives this)

  const token = localStorage.getItem("access_token") || null;

  // Modal Form
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    role: "User",
    status: "active",
  });

  // =====================================================================
  // FETCH PAGE FROM SERVER
  // =====================================================================

  const fetchUsersPage = async (page = 1) => {
    if (!token) {
      console.warn("No access_token in localStorage.");
      return;
    }

    // Server expects these (your choice)
    const payload = {
      page,
      per_page: itemsPerPage,
      search: searchTerm || undefined,
      role: filterRole !== "all" ? filterRole : undefined,
      status: filterStatus !== "all" ? filterStatus === "active" : undefined,
      sort_column: sortColumn || undefined,
      sort_direction: sortDirection || undefined,
    };

    const res = await GetAllCredentials({
      token,
      data: payload,
    });

    if (!res) {
      setUsers([]);
      setTotalCount(0);
      return;
    }

    const pageData = res.data || [];
    const metaTotal = res.total ?? res.count ?? res.meta?.total ?? pageData.length;

    const mapped = pageData.map((row, idx) => {
      const profile = row?.UserProfile || {};

      const name =
        `${profile?.name?.first || ""} ${profile?.name?.last || ""}`.trim() ||
        row.email;

      const address =
        profile?.address?.street_address ||
        [
          profile?.address?.house_no,
          profile?.address?.street,
          profile?.address?.barangay,
        ]
          .filter(Boolean)
          .join(", ") ||
        "";

      return {
        id: row.user_id || `${page}-${idx}`,
        name,
        email: row.email,
        contactNumber: profile?.phone_number || "",
        address,
        role: row.acc_type ?? profile?.user_type ?? "Unknown",
        status: row.is_active ? "active" : "inactive",
        registeredDate: (row.createdAt || "").split("T")[0],
        lastLogin: (row.updatedAt || "").split("T")[0],
        raw: row,
      };
    });

    setUsers(mapped);
    setTotalCount(Number(metaTotal) || mapped.length);
  };

  // =====================================================================
  // REFRESH WHEN FILTER/PAGE/SORT CHANGES
  // =====================================================================

  useEffect(() => {
    fetchUsersPage(currentPage);
  }, [currentPage, searchTerm, filterRole, filterStatus, sortColumn, sortDirection]);

  // =====================================================================
  // LOCAL UI FILTERING & SORTING (DOES NOT HIT SERVER)
  // =====================================================================

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = [...users];

    filtered = filtered.filter((u) => {
      const matchesSearch =
        !searchTerm ||
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.contactNumber.includes(searchTerm);

      const matchesRole =
        filterRole === "all" || String(u.role).toLowerCase() === filterRole.toLowerCase();

      const matchesStatus =
        filterStatus === "all" || u.status === filterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });

    if (sortColumn) {
      filtered.sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];

        if (["registeredDate", "lastLogin"].includes(sortColumn)) {
          aVal = aVal ? new Date(aVal).getTime() : 0;
          bVal = bVal ? new Date(bVal).getTime() : 0;
        } else {
          aVal = typeof aVal === "string" ? aVal.toLowerCase() : aVal;
          bVal = typeof bVal === "string" ? bVal.toLowerCase() : bVal;
        }

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, filterRole, filterStatus, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const handleSort = (col) => {
    if (sortColumn === col) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterRole("all");
    setFilterStatus("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm !== "" || filterRole !== "all" || filterStatus !== "all";

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? (
      <FaArrowUp className="ml-1" />
    ) : (
      <FaArrowDown className="ml-1" />
    );
  };

  // =====================================================================
  // UI RENDER
  // =====================================================================

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name <SortIcon column="name" />
                  </div>
                </th>

                <th
                  className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center">
                    Email <SortIcon column="email" />
                  </div>
                </th>

                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>

                <th
                  className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center">
                    Role <SortIcon column="role" />
                  </div>
                </th>

                <th
                  className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("registeredDate")}
                >
                  <div className="flex items-center">
                    Registered <SortIcon column="registeredDate" />
                  </div>
                </th>

                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center h-[70vh]">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                      <p className="text-gray-600 text-sm">Loading...</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    );
  }

  return (
    <div className="w-full min-h-screen p-4">
      {/* HEADER */}
      {/* (Everything below is unchanged UI — only logic updated) */}

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
              <FaUsers className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="text-gray-600 text-sm mt-0.5">
                Manage system users and their permissions
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingUser(null);
              setShowUserModal(true);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-foreground text-white rounded-lg hover:bg-foreground/90"
          >
            <FaPlus /> Add User
          </button>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <StatCard label="Total Users" value={totalCount} icon={FaUsers} />
          <StatCard
            label="Admins"
            value={users.filter((u) =>
              String(u.role).toLowerCase().includes("admin")
            ).length}
            icon={FaUserShield}
            color="text-blue-600"
          />
          <StatCard
            label="Bonafide"
            value={users.filter((u) =>
              String(u.role).toLowerCase().includes("bonafide")
            ).length}
            icon={FaUserCircle}
          />
          <StatCard
            label="Non Residents"
            value={users.filter((u) =>
              String(u.role).toLowerCase().includes("non")
            ).length}
            icon={FaUserCircle}
          />
        </div>
      </div>

      {/* SEARCH & FILTER BOX */}
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalCount={totalCount}
      />

      {/* TABLE */}
      <UserTable
        users={filteredAndSortedUsers}
        handleSort={handleSort}
        SortIcon={SortIcon}
        formatDate={formatDate}
        base_path={base_path}
        handleDeleteUser={(id) =>
          setUsers((prev) => prev.filter((u) => u.id !== id))
        }
      />

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalCount={totalCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default UserManagement;

