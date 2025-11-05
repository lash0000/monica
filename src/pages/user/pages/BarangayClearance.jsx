import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BarangayClearance() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    lengthOfStay: "",
    purpose: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      lengthOfStay: "",
      purpose: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic goes here
    // For now, just log the payload
    console.log("Barangay Clearance application:", form);
    setSubmitted(true);
  };

  return (
   
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Application for Barangay Clearance</h1>
          <p className="text-sm text-gray-500 mb-6">Fill out all required fields</p>

          {submitted ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-secondary text-secondary-foreground p-5">
                <p className="font-semibold">Step 1: Completed</p>
                <p className="text-xs opacity-90">This process is more on fill out all requirements for your application form to available barangay service.</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Step 2: For Review</h3>
                  <p className="text-sm text-gray-500">This process will be carefully reviewed by our administrative staff responsible for managing this website portal.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Step 3: Approval</h3>
                  <p className="text-sm text-gray-500">Once your application has been reviewed, our administrators will proceed to the approval process.</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" onClick={() => navigate('/e-application')} className="mt-2 px-4 py-2 text-sm rounded-md border">Back</button>
              </div>
            </div>
          ) : (<>
          {/* Autofill Notice */}
          <div className="mb-6 rounded-lg border border-secondary bg-secondary/10 text-secondary p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0v5a1 1 0 11-2 0V9zm1-6a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">Autofill</p>
                <p className="text-sm">For this service, we retrieved all of information you provided in your profile.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200 disabled:text-black" placeholder="First name" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name *</label>
                <input name="middleName" value={form.middleName} onChange={handleChange} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200 disabled:text-black" placeholder="Middle name" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200 disabled:text-black" placeholder="Last name" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suffix *</label>
                <input name="suffix"  value={form.suffix} onChange={handleChange} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200 disabled:text-black" placeholder="N/A" disabled />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length of Stay in Barangay</label>
              <select name="lengthOfStay" value={form.lengthOfStay} onChange={handleChange} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Length of stay</option>
                <option value="< 6 months">Less than 6 months</option>
                <option value=">= 6 months">6 months or more</option>
                <option value=">= 1 year">1 year or more</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Application *</label>
              <input name="purpose" value={form.purpose} onChange={handleChange} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="N/A" />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={handleClear} className="px-3 py-2 text-sm rounded-md border">Clear All</button>
              <button type="submit" className="px-4 py-2 text-sm rounded-md bg-primary text-white">Submit</button>
            </div>
          </form>
          </>)}
        </div>
      </main>
    
  );
}


