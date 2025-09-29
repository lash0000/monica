import React, { useState } from 'react';

const PRIMARY_COLOR = '#4B663B';
const ACCENT_COLOR = '#556B2F';

const ChangePassword = () => {

  const [showPassword, setShowPassword] = useState(false);

  // Function stub for a static form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Static form submission: Password change initiated.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      
      {/* Password*/}
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        style={{ borderColor: PRIMARY_COLOR, borderWidth: '1px' }}
      >
        
        {/* Header */}
        <h2 
          className="text-3xl font-serif mb-6 text-center font-bold"
          style={{ color: PRIMARY_COLOR }}
        >
          Change Password
        </h2>
        
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-black font-bold mb-2">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              style={{ focusRing: ACCENT_COLOR, borderColor: '#d1d5db' }}
              required
            />
          </div>
          
          <div>
            <label className="block text-black font-bold mb-2">
              Re-enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent pr-10"
                style={{ focusRing: ACCENT_COLOR, borderColor: '#d1d5db' }} // Simplified focus ring style
                required
              />
              {/* Show Password toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >

                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.77 0 8.35 3.31 9.4 7-1.4 5.25-5.94 9-11.4 9-3.7 0-6.73-1.09-9.15-2.92"/><path d="M2.2 2l20 20"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>
          
          
          <div>
            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors duration-200"
              style={{ backgroundColor: ACCENT_COLOR }} // Background color from original
            >
              Login
            </button>
          </div>
        </form>
        
      </div>
    </div>
  )
}

export default ChangePassword;
