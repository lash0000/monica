import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserProfileStore from "../stores/user-profile.store"

export default function UpdateProfile() {
  const navigate = useNavigate()

  const {
    profile,
    fetchUserProfile,
    updateUserProfile,
    loading
  } = UserProfileStore()

  const token = localStorage.getItem("access_token")
  const userId = localStorage.getItem("user_id")

  const [formData, setFormData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [delayDone, setDelayDone] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

  useEffect(() => {
    if (userId && token) {
      fetchUserProfile(userId, token)
    }
  }, [userId, token])

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || {
          first: "",
          middle: "",
          last: "",
          suffix: "",
        },
        birthdate: profile.birthdate || "",
        phone_number: profile.phone_number || "",
        type_of_residency: profile.type_of_residency || "",
        civil_status: profile.civil_status || "",
        gender: profile.gender || "",
        nationality: profile.nationality || "",

        address: profile.address || {
          street_address: "",
          house_no: "",
          street: "",
          subdivision: "",
          barangay: "",
          city: "",
          province: "",
          zip_code: "",
        },
      })

    }
  }, [profile])

  // Show loading UI while store is loading OR during artificial delay
  if (!delayDone || loading || !formData) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-600 text-sm">Loading profile information...</p>
        </div>
      </div>
    )
  }

  const handleNameChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      name: {
        ...prev.name,
        [field]: value,
      },
    }))
  }

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    let result;

    // CASE 1 — No profile yet → CREATE
    if (!profile?.userProfile) {
      result = await UserProfileStore.getState().createUserProfile(
        { user_id: userId, ...formData },
        token
      );
    }

    // CASE 2 — Profile exists → UPDATE
    else {
      result = await updateUserProfile(formData, token);
    }

    setIsSubmitting(false)

    if (result?.success) {
      navigate(-1)
    } else {
      alert("Failed to save profile.")
    }
  }


  return (
    <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
      <div className="bg-white rounded-lg shadow-md border">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Update Profile</h1>
          <p className="text-sm text-gray-600 mt-1">
            Update your personal information and address details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">

          {/* Name Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Name Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.name.first}
                  onChange={(e) => handleNameChange("first", e.target.value)}
                  className={inputClass}
                  placeholder="First Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  type="text"
                  value={formData.name.middle}
                  onChange={(e) => handleNameChange("middle", e.target.value)}
                  className={inputClass}
                  placeholder="Middle Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.name.last}
                  onChange={(e) => handleNameChange("last", e.target.value)}
                  className={inputClass}
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                <input
                  type="text"
                  value={formData.name.suffix}
                  onChange={(e) => handleNameChange("suffix", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., Jr., Sr."
                />
              </div>

            </div>
          </div>

          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="09123456789"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Residency</label>
                <select
                  name="type_of_residency"
                  value={formData.type_of_residency}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="bonafide">Bonafide</option>
                  <option value="non-resident">Non-Resident</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="">Select Nationality</option>
                  <option value="filipino">Filipino</option>
                  <option value="foreigner">Foreigner</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Civil Status
                </label>
                <select
                  name="civil_status"
                  value={formData.civil_status}
                  onChange={handleInputChange}
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
                  onChange={(e) => handleAddressChange("street_address", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">House No.</label>
                  <input
                    type="text"
                    value={formData.address.house_no}
                    onChange={(e) => handleAddressChange("house_no", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => handleAddressChange("street", e.target.value)}
                    className={inputClass}
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subdivision / Building</label>
                <input
                  type="text"
                  value={formData.address.subdivision}
                  onChange={(e) => handleAddressChange("subdivision", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
                  <input
                    type="text"
                    value={formData.address.barangay}
                    onChange={(e) => handleAddressChange("barangay", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => handleAddressChange("city", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <input
                    type="text"
                    value={formData.address.province}
                    onChange={(e) => handleAddressChange("province", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={formData.address.zip_code}
                    onChange={(e) => handleAddressChange("zip_code", e.target.value)}
                    className={inputClass}
                  />
                </div>

              </div>

            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">

            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>
      </div>
    </main>
  )
}
