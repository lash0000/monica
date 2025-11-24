import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProfileStore from "../stores/user-profile.store";
import { createApplication } from "../stores/Application.store";
import { services } from "./E-app_Apply";
import { FaInfoCircle } from "react-icons/fa";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Zustand for profile only
  const { profile, fetchUserProfile } = UserProfileStore();

  // Local loading (no more Zustand loading)
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  const service = services.find((s) => s.id === id);

  const [form, setForm] = useState({
    lengthOfStay: "",
    purpose: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (userId && token && !profile) {
      fetchUserProfile(userId, token);
    }
  }, [userId, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit using manual Axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      application_by: userId,
      application_service: service?.title,
      application_details: {
        lengthOfStay: form.lengthOfStay,
        purpose: form.purpose,
      },
    };

    setLoading(true);

    const res = await createApplication(payload);

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      navigate("/my-applications");
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading your profile...
      </div>
    );
  }

  const user = profile.userProfile;
  const name = user?.name || {};

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Application for {service?.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">Fill out all required fields</p>

        {/* Autofill Notice */}
        <div className="mb-6 rounded-lg border border-secondary bg-secondary/10 text-secondary p-4">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="size-5" />
            <div>
              <p className="font-medium">Automated</p>
              <p className="text-sm">
                Every application automatically loads details from your profile.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                disabled
                value={name.first || ""}
                className="w-full border rounded-md px-3 py-2 disabled:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name *
              </label>
              <input
                disabled
                value={name.middle || ""}
                className="w-full border rounded-md px-3 py-2 disabled:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                disabled
                value={name.last || ""}
                className="w-full border rounded-md px-3 py-2 disabled:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suffix *
              </label>
              <input
                disabled
                value={name.suffix || "N/A"}
                className="w-full border rounded-md px-3 py-2 disabled:bg-gray-200"
              />
            </div>

          </div>

          {/* LENGTH OF STAY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Length of Stay in Barangay
            </label>
            <select
              name="lengthOfStay"
              value={form.lengthOfStay}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Length of stay</option>
              <option value="< 6 months">Less than 6 months</option>
              <option value=">= 6 months">6 months or more</option>
              <option value=">= 1 year">1 year or more</option>
            </select>
          </div>

          {/* PURPOSE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose of Application *
            </label>
            <input
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="State the purpose"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                setForm({ lengthOfStay: "", purpose: "" })
              }
              className="px-3 py-2 text-sm rounded-md border"
            >
              Clear All
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-primary text-white"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
