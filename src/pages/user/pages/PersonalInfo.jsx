import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginLink from "../components/LoginLink";
import SuccessModal from "../components/SuccessModal";

function PersonalInfo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'contactNumber') {
      // Ensure +63 prefix is always present when user starts typing
      let newValue = value;
      if (value && !value.startsWith('+63')) {
        newValue = '+63' + value;
      }
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Password validation functions
  const validatePassword = (password) => {
    const hasMinLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
    
    return {
      hasMinLength,
      hasNumber,
      hasUppercase,
      hasLowercase,
      hasSpecialChar,
      isValid: hasMinLength && hasNumber && hasUppercase && hasLowercase && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - move to next step
    console.log('Form data:', formData);
  };

  const handleNext = () => {
    // Show success modal first
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-4">
      {/* Centered Personal Info Form */}
      <div className="w-full max-w-md">
        
        {/* Personal Info Card */}
        <div className="bg-white rounded-2xl p-6 w-full shadow-2xl border-1 border-[#4B663B]">
          
          {/* Header */}
          <h2 className="text-2xl font-serif text-[#4B663B] mb-2 text-center font-bold">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm text-center mb-6">
            Fill in your details below to create an account.
          </p>
          
         
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name Field */}
            <div>
              <label className="block text-black font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B663B] focus:border-transparent"
                required
              />
            </div>
            
            {/* Last Name Field */}
            <div>
              <label className="block text-black font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B663B] focus:border-transparent"
                required
              />
            </div>

            {/* Contact Number Field */}
            <div>
              <label className="block text-black font-bold mb-2">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="+63 9XXXXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B663B] focus:border-transparent"
                required
                onKeyDown={(e) => {
                  // Prevent deletion of +63 prefix when it exists
                  if (e.key === 'Backspace' && formData.contactNumber.startsWith('+63') && formData.contactNumber.length <= 3) {
                    e.preventDefault();
                  }
                }}
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
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B663B] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4 text-gray-400" />
                  ) : (
                    <FaEye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Password Requirements */}
              <div className="mt-2 text-xs">
                <p className="mb-1 text-gray-600">Password requirements:</p>
                <ul className="space-y-1">
                  <li className={`flex items-center ${passwordValidation.hasMinLength ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasMinLength ? '✓' : '✗'}</span>
                    Minimum 6 characters
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                    Include numbers
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                    Include uppercase letters
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasLowercase ? '✓' : '✗'}</span>
                    Include lowercase letters
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasSpecialChar ? '✓' : '✗'}</span>
                    Include special characters (! $ @ %)
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={handleNext}
                disabled={!passwordValidation.isValid}
                className={`w-full py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  passwordValidation.isValid 
                    ? 'bg-[#4B663B] text-white hover:bg-[#6B8E23]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </div>
          </form>
          
          {/* Login Link */}
          <LoginLink />
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="Successfully Registered!"
        message="Your account has been created successfully!"
        subMessage="You can now log in to access your account."
        actionText="Continue to Login"
        actionLink="/login"
      />
    </div>
  )
}

export default PersonalInfo;
