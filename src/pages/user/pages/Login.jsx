import React, { useState } from 'react';
import './Login.css';

const Login = ({ onNavigateToSignup, onNavigateToForgotPassword }) => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only - no actual login logic
    console.log('Login form submitted:', formData);
  };

  const handleGoogleLogin = () => {
    // UI only - no actual Google login logic
    console.log('Google login clicked');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="welcome-text">WELCOME</div>
      
      <div className="login-form-container">
        <h1 className="login-title">Login to MaTa</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="userId" className="form-label">User Id</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your user ID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input password-input"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                tabIndex="-1"
              >
                <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showPassword ? (
                    <>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </>
                  ) : (
                    <>
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line x1="2" x2="22" y1="2" y2="22"/>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="checkbox"
              />
              <label htmlFor="rememberMe" className="checkbox-label">Remember Me</label>
            </div>
            <button 
              type="button"
              onClick={onNavigateToForgotPassword} 
              className="forgot-password"
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">OR</span>
          <div className="divider-line"></div>
        </div>

        <button onClick={handleGoogleLogin} className="google-login-button">
          <div className="google-logo">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <span className="google-text">Continue with Google</span>
        </button>

        <div className="signup-link">
          <span>Need an account? </span>
          <button onClick={onNavigateToSignup} className="signup-text">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
