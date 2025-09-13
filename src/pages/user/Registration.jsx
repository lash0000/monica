import React, { useState } from 'react';
import './Registration.css';
import checkIcon from '../../assets/images/check.svg';

const Registration = ({ onNavigateToLogin }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    houseNumber: '',
    streetName: '',
    subdivision: '',
    contactNumber: '',
    email: '',
    verificationCode: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Validation functions
  const validateName = (name, fieldName) => {
    if (!name.trim()) {
      return `${fieldName} is required`;
    }
    if (name.trim().length < 2) {
      return `${fieldName} must be at least 2 characters`;
    }
    if (!/^[A-Za-z\s'-]+$/.test(name.trim())) {
      return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
    }
    return '';
  };

  const validateHouseNumber = (houseNumber) => {
    if (!houseNumber.trim()) {
      return 'House number is required';
    }
    if (!/^[A-Za-z0-9\s-]+$/.test(houseNumber.trim())) {
      return 'House number can only contain letters, numbers, spaces, and hyphens';
    }
    return '';
  };

  const validateStreetName = (streetName) => {
    if (!streetName.trim()) {
      return 'Street name is required';
    }
    if (streetName.trim().length < 3) {
      return 'Street name must be at least 3 characters';
    }
    if (!/^[A-Za-z0-9\s.-]+$/.test(streetName.trim())) {
      return 'Street name can only contain letters, numbers, spaces, dots, and hyphens';
    }
    return '';
  };

  const validateContactNumber = (contactNumber) => {
    if (!contactNumber.trim()) {
      return 'Contact number is required';
    }
    // Philippine phone number format
    const phoneRegex = /^(09|\+639)[0-9]{9}$/;
    if (!phoneRegex.test(contactNumber.replace(/\s/g, ''))) {
      return 'Please enter a valid Philippine phone number (e.g., 09123456789)';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email address is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateVerificationCode = (code) => {
    if (!code.trim()) {
      return 'Verification code is required';
    }
    if (code.trim().length !== 6) {
      return 'Verification code must be 6 digits';
    }
    if (!/^\d{6}$/.test(code.trim())) {
      return 'Verification code must contain only numbers';
    }
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'lastName':
        return validateName(value, 'Last name');
      case 'firstName':
        return validateName(value, 'First name');
      case 'middleName':
        return value.trim() ? validateName(value, 'Middle name') : '';
      case 'houseNumber':
        return validateHouseNumber(value);
      case 'streetName':
        return validateStreetName(value);
      case 'subdivision':
        return value.trim() ? validateStreetName(value) : '';
      case 'contactNumber':
        return validateContactNumber(value);
      case 'email':
        return validateEmail(value);
      case 'verificationCode':
        return validateVerificationCode(value);
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only - no actual registration logic
    console.log('Registration form submitted:', formData);
    // Show success screen
    setIsSuccess(true);
  };

  const handleGetCode = () => {
    if (countdown > 0) return; // Prevent clicking during countdown
    
    // UI only - no actual verification code logic
    console.log('Get verification code clicked');
    setCodeSent(true);
    setCountdown(60); // 60 seconds countdown
    
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate progress based on current step
  const calculateProgress = () => {
    return Math.round((currentStep / 4) * 100);
  };

  // Validate current step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return !validateName(formData.lastName, 'Last name') && 
               !validateName(formData.firstName, 'First name');
      case 2:
        return !validateHouseNumber(formData.houseNumber) && 
               !validateStreetName(formData.streetName);
      case 3:
        return !validateContactNumber(formData.contactNumber) && 
               !validateEmail(formData.email);
      case 4:
        return !validateVerificationCode(formData.verificationCode);
      default:
        return false;
    }
  };

  // Show success screen after submission
  if (isSuccess) {
    return (
      <div className="registration-container">
        <div className="logo-text">LOGO</div>
        
        <div className="success-container">
          <div className="success-icon">
            <img src={checkIcon} alt="Success" />
          </div>
          <h1 className="success-title">Successfully Registered!</h1>
          <p className="success-message">
            Your account has been created successfully. You can now log in with your credentials.
          </p>
          <button 
            onClick={onNavigateToLogin}
            className="login-button"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="logo-text">LOGO</div>
      
      <div className="registration-form-container">
        <h1 className="registration-title">Create Account</h1>
        <p className="registration-subtitle">Fill in your details below to create an account.</p>
        
        {/* Progress Indicator */}
        <div className="progress-container">
          <div className="step-indicator">
            <div className={`step-item ${currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming'}`}>
              <div className={`step ${currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming'}`}>
                {currentStep > 1 ? '' : '1'}
              </div>
              <div className="step-label">Personal Info</div>
            </div>
            <div className={`step-item ${currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming'}`}>
              <div className={`step ${currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming'}`}>
                {currentStep > 2 ? '' : '2'}
              </div>
              <div className="step-label">Address</div>
            </div>
            <div className={`step-item ${currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming'}`}>
              <div className={`step ${currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming'}`}>
                {currentStep > 3 ? '' : '3'}
              </div>
              <div className="step-label">Contact</div>
            </div>
            <div className={`step-item ${currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'upcoming'}`}>
              <div className={`step ${currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'upcoming'}`}>
                {currentStep > 4 ? '' : '4'}
              </div>
              <div className="step-label">Verify</div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="registration-form">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="step-content">
              <h3 className="step-title">Personal Information</h3>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.lastName && errors.lastName ? 'error' : ''}`}
                  placeholder="Enter your last name"
                  required
                />
                {touched.lastName && errors.lastName && (
                  <div className="error-message">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.firstName && errors.firstName ? 'error' : ''}`}
                  placeholder="Enter your first name"
                  required
                />
                {touched.firstName && errors.firstName && (
                  <div className="error-message">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="middleName" className="form-label">Middle Name</label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.middleName && errors.middleName ? 'error' : ''}`}
                  placeholder="Enter your middle name"
                />
                {touched.middleName && errors.middleName && (
                  <div className="error-message">{errors.middleName}</div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <div className="step-content">
              <h3 className="step-title">Address Information</h3>
              <p className="step-subtitle">Barangay Sta. Monica, Quezon City, Philippines</p>
              
              <div className="form-group">
                <label htmlFor="houseNumber" className="form-label">House Number</label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.houseNumber && errors.houseNumber ? 'error' : ''}`}
                  placeholder="e.g., 123"
                  required
                />
                {touched.houseNumber && errors.houseNumber && (
                  <div className="error-message">{errors.houseNumber}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="streetName" className="form-label">Street Name</label>
                <input
                  type="text"
                  id="streetName"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.streetName && errors.streetName ? 'error' : ''}`}
                  placeholder="e.g., Main Street"
                  required
                />
                {touched.streetName && errors.streetName && (
                  <div className="error-message">{errors.streetName}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subdivision" className="form-label">Subdivision/Village (Optional)</label>
                <input
                  type="text"
                  id="subdivision"
                  name="subdivision"
                  value={formData.subdivision}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.subdivision && errors.subdivision ? 'error' : ''}`}
                  placeholder="e.g., Green Meadows Subdivision"
                />
                {touched.subdivision && errors.subdivision && (
                  <div className="error-message">{errors.subdivision}</div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="step-content">
              <h3 className="step-title">Contact Information</h3>
              
              <div className="form-group">
                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.contactNumber && errors.contactNumber ? 'error' : ''}`}
                  placeholder="e.g., 09123456789"
                  required
                />
                {touched.contactNumber && errors.contactNumber && (
                  <div className="error-message">{errors.contactNumber}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                  placeholder="e.g., yourname@email.com"
                  required
                />
                {touched.email && errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Verification */}
          {currentStep === 4 && (
            <div className="step-content">
              <h3 className="step-title">Verification</h3>
              <p className="step-subtitle">Enter the verification code sent to your email address</p>
              
              {/* Email Display */}
              <div className="email-display">
                <div className="email-label">Verification will be sent to:</div>
                <div className="email-address">{formData.email || 'your-email@example.com'}</div>
              </div>
              
              <div className="verification-group">
                <div className="verification-input-group">
                  <label htmlFor="verificationCode" className="form-label">Verification Code</label>
                  <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`form-input verification-input ${touched.verificationCode && errors.verificationCode ? 'error' : ''}`}
                    placeholder="Enter verification code"
                    required
                  />
                  {touched.verificationCode && errors.verificationCode && (
                    <div className="error-message">{errors.verificationCode}</div>
                  )}
                </div>
                <button 
                  type="button" 
                  onClick={handleGetCode}
                  className="get-code-button"
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : codeSent ? 'Resend Code' : 'Get Code'}
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="step-navigation">
            <div className="nav-left">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="prev-button"
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="nav-right">
              {currentStep < 4 ? (
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="next-button"
                  disabled={!validateStep(currentStep)}
                >
                  Next
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={!validateStep(currentStep)}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="login-link">
          <span>Already have an account? </span>
          <button onClick={onNavigateToLogin} className="login-text">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
