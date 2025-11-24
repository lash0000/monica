import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProfileStore from "../stores/user-profile.store";

// Small reusable
function DetailItem({ label, value }) {
  return (
    <div className="p-3">
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className="text-sm font-medium">{value ?? "N/A"}</div>
    </div>
  );
}

export default function UpdateUser() {
  const navigate = useNavigate();
  const { id: routeUserId } = useParams();

  const {
    profile,
    fetchUserProfile,
    updateUserProfile,
    loading
  } = UserProfileStore();

  const token = localStorage.getItem("access_token");

  const [formData, setFormData] = useState(null);
  const [isAdminRole, setIsAdminRole] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [delayDone, setDelayDone] = useState(false);

  // Delay loading for smoother UX
  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  // Load profile
  useEffect(() => {
    if (!routeUserId || !token) return;
    fetchUserProfile(routeUserId, token);
  }, [routeUserId, token]);

  // When profile loads → map into form
  useEffect(() => {
    if (!profile?.userProfile) return;

    const up = profile.userProfile;
    setEmail(profile.account?.email || "");

    // Admin role logic
    setIsAdminRole(!!up.admin_role && up.admin_role.trim() !== "");
    setRoleText(up.admin_role || "");

    setFormData({
      name: {
        first: up?.name?.first || "",
        middle: up?.name?.middle || "",
        last: up?.name?.last || "",
        suffix: up?.name?.suffix || "",
      },
      birthdate: up?.birthdate || "",
      phone_number: up?.phone_number || "",

      gender: up?.gender || "",
      nationality: up?.nationality || "",
      civil_status: up?.civil_status || "",
      type_of_residency: up?.type_of_residency || "",

      address: {
        street_address: up?.address?.street_address || "",
        house_no: up?.address?.house_no || "",
        street: up?.address?.street || "",
        subdivision: up?.address?.subdivision || "",
        barangay: up?.address?.barangay || "",
        city: up?.address?.city || "",
        province: up?.address?.province || "",
        zip_code: up?.address?.zip_code || "",
      },

      contact_person: {
        number: up?.contact_person?.number || "",
        name: up?.contact_person?.name || "",
      },

      admin_role: up?.admin_role || "",
    });
  }, [profile]);

  // Show loading UI
  if (!delayDone || loading || !formData) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-600 text-sm">Loading user information...</p>
        </div>
      </div>
    );
  }

  // Helpers
  const handleName = (field, value) =>
    setFormData(prev => ({ ...prev, name: { ...prev.name, [field]: value } }));

  const handleAddress = (field, value) =>
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));

  const handleContact = (field, value) =>
    setFormData(prev => ({
      ...prev,
      contact_person: { ...prev.contact_person, [field]: value }
    }));

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      admin_role: isAdminRole ? roleText : "",
    };

    const result = await updateUserProfile(payload, token);

    setIsSubmitting(false);

    if (result?.success) {
      navigate(-1);
    } else {
      alert("Failed to save changes.");
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
      <div className="bg-white rounded-lg shadow-md border">

        {/* Header */}
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Update Profile</h1>
          <p className="text-sm text-gray-600 mt-1">
            Update user information and account details
          </p>
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">

          {/* Account Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                className="border rounded-md px-3 py-2 w-full disabled:text-gray-400"
                placeholder="Enter role (e.g., Super Admin)"
                value={email}
                disabled
                onChange={(e) => setRoleText(e.target.value)}
              />
            </div>

            {/* Admin role switch */}
            <div className="flex items-center justify-between border rounded-md p-3">
              <label className="text-sm font-medium text-gray-700">Admin Role</label>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isAdminRole}
                  onChange={() => setIsAdminRole(!isAdminRole)}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>

            {/* Role input */}
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                className="border rounded-md px-3 py-2 w-full disabled:text-gray-400"
                placeholder="Enter role (e.g., Super Admin)"
                value={roleText}
                disabled={!isAdminRole}
                onChange={(e) => setRoleText(e.target.value)}
              />
            </div>
          </div>

          {/* Name Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Name Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.name.first}
                  onChange={(e) => handleName("first", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  type="text"
                  value={formData.name.middle}
                  onChange={(e) => handleName("middle", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.name.last}
                  onChange={(e) => handleName("last", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                <input
                  type="text"
                  value={formData.name.suffix}
                  onChange={(e) => handleName("suffix", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleMainChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleMainChange}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Residency</label>
                <select
                  name="type_of_residency"
                  value={formData.type_of_residency}
                  onChange={handleMainChange}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="bonafide">Bonafide</option>
                  <option value="non-resident">Non-Resident</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleMainChange}
                  className={inputClass}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer_not_to_say">I prefer not to say</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleMainChange}
                  className={inputClass}
                >
                  <option value="">Select Nationality</option>
                  <option value="filipino">Filipino</option>
                  <option value="foreigner">Foreigner</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
                <select
                  name="civil_status"
                  value={formData.civil_status}
                  onChange={handleMainChange}
                  className={inputClass}
                >
                  <option value="">Select Civil Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                  <option value="divorced">Divorced</option>
                  <option value="annulled">Annulled</option>
                </select>
              </div>

            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h2>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={formData.address.street_address}
                  onChange={(e) => handleAddress("street_address", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">House No.</label>
                  <input
                    type="text"
                    value={formData.address.house_no}
                    onChange={(e) => handleAddress("house_no", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => handleAddress("street", e.target.value)}
                    className={inputClass}
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subdivision / Building
                </label>
                <input
                  type="text"
                  value={formData.address.subdivision}
                  onChange={(e) => handleAddress("subdivision", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
                  <input
                    type="text"
                    value={formData.address.barangay}
                    onChange={(e) => handleAddress("barangay", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => handleAddress("city", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <input
                    type="text"
                    value={formData.address.province}
                    onChange={(e) => handleAddress("province", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={formData.address.zip_code}
                    onChange={(e) => handleAddress("zip_code", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h2>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={formData.contact_person.number}
                  onChange={(e) => handleContact("number", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person (Name)
                </label>
                <input
                  type="text"
                  value={formData.contact_person.name}
                  onChange={(e) => handleContact("name", e.target.value)}
                  className={inputClass}
                />
              </div>

            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
