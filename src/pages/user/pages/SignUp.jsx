import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import LoginLink from "../components/LoginLink";
import Stamonicabg from "../components/stamonicabg";

function SignUp() {
  const [formData, setFormData] = useState({
    email: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <Stamonicabg />
      
      {/* Right Side - SignUp Form */}
      <div className="w-full lg:w-1/2 bg-[#ffffff] flex flex-col items-center justify-center p-4">
        
        {/* SignUp Card */}
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border-1 border-[#4B663B]">
        {/* SignUp Title */}
        <h2 className="text-2xl font-serif text-[#556B2F] mb-2 text-center font-bold">
          Create Account
        </h2>
        
        {/* Instructions */}
        <p className="text-gray-600 text-sm text-center mb-6">
          Fill your information below or register with your google account
        </p>
        
        {/* SignUp Form */}
        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-black font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Example@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
              required
            />
          </div>
          
      
          
          {/* Next Button */}
          <Link 
            to="/otp-verification" 
            state={{ email: formData.email }}
          >
            <button
              type="button"
              className="w-full bg-[#556B2F] text-white py-2 rounded-lg font-semibold hover:bg-[#6B8E23] transition-colors duration-200"
            >
              Next
            </button>
          </Link>
        </form>
        
        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        
        {/* Google Login Button */}
        <button className="w-full bg-white border-2 border-gray-300 text-black py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
          <img src="/assets/images/google.png" alt="Google" className="w-8 h-8 mr-3" />
          Continue with Google
        </button>
        
        {/* Login Link */}
        <LoginLink />  
        </div>
      </div>
    </div>
  )
}

export default SignUp;
