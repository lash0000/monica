import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import SignUpLink from "../components/SignUpLink";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      {/* Centered Login Form */}
      <div className="w-full max-w-md p-4">
        
        {/* Login Card */}
        <div className="bg-white rounded-2xl p-6 w-full shadow-2xl border-1 border-[#4B663B]" >
        {/* Login Title */}
        <h2 className="text-3xl font-serif text-[#4B663B] mb-6 text-center font-bold">
          Login
        </h2>
        
        {/* Login Form */}
        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-black font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
            />
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-black font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-[#556B2F] focus:ring-[#556B2F]"
              />
              <span className="text-black">Remember Me</span>
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Forgot Password?
            </Link>
          </div>
          
          {/* Login Button */}
          <Link 
            to="/ticket" 
            
          >
          <button
            type="button"
            className="w-full bg-[#556B2F] text-white py-2 rounded-lg font-semibold hover:bg-[#6B8E23] transition-colors duration-200"
          >
            Login
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
        
        {/* Sign Up Link */}
        <SignUpLink />
        </div>
        </div>
    </div>
  )
}

export default Login; 
