import { useEffect } from "react";
import { Link } from "react-router-dom";
import Stamonicabg from "../components/stamonicabg";

function ForgotPassword() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <Stamonicabg />

      {/* Right Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 bg-[#ffffff] flex flex-col items-center justify-center p-4">
        
        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border-1 border-[#4B663B]">
          
          {/* Title */}
          <h2 className="text-3xl font-serif text-[#4B663B] mb-6 text-center font-bold">
            Personal Information
          </h2>

          {/* Form */}
          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-black font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#556B2F] 
                           focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-black font-bold mb-2">
                ID Number
              </label>
              <input
                type="email"
                placeholder="Enter your ID number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#556B2F] 
                           focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-black font-bold mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#556B2F] 
                           focus:border-transparent"
              />
            </div>

            {/* Verification Code Field */}
            <div>
              <label className="block text-black font-bold mb-2">
                Verification Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#556B2F] 
                             focus:border-transparent"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-[#556B2F] text-white font-semibold 
                             rounded-lg hover:bg-[#6B8E23] transition-colors duration-200"
                >
                  Get Code
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#556B2F] text-white py-2 rounded-lg font-semibold 
                         hover:bg-[#6B8E23] transition-colors duration-200"
            >
              Submit
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">Remembered your password? </span>
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
