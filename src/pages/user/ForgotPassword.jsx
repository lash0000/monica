import React, { useState } from 'react';
import './ForgotPassword.css';
import checkIcon from '../../assets/images/check.svg';

const ForgotPassword = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-container">
        <div className="welcome-text">WELCOME</div>
        
        <div className="forgot-password-form-container">
          <div className="success-icon">
            <img src={checkIcon} alt="Success" />
          </div>
          
          <h1 className="forgot-password-title">Check Your Email</h1>
          <p className="forgot-password-subtitle">
            We've sent a password reset link to <strong>{formData.email}</strong>
          </p>
          
          <div className="instructions">
            <p>Please check your email and follow the instructions to reset your password.</p>
            <p>If you don't see the email, check your spam folder.</p>
          </div>

          <div className="action-buttons">
            <button 
              onClick={handleResendEmail} 
              className="resend-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Resend Email'}
            </button>
            
            <button 
              onClick={() => onNavigateToLogin()} 
              className="back-to-login-button"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="welcome-text">WELCOME</div>
      
      <div className="forgot-password-form-container">
        <div className="back-button-container">
          <button 
            onClick={() => onNavigateToLogin()} 
            className="back-button"
            aria-label="Go back to login"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        </div>

        <h1 className="forgot-password-title">Forgot Password?</h1>
        <p className="forgot-password-subtitle">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button 
            type="submit" 
            className="reset-button"
            disabled={isLoading || !formData.email}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="help-text">
          <p>Remember your password?</p>
          <button 
            onClick={() => onNavigateToLogin()} 
            className="login-link-button"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
