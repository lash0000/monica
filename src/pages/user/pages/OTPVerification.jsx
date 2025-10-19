import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function OTPVerification() {
  const location = useLocation();
  const email = location.state?.email || 'user@example.com';
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timer, setTimer] = useState(5);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [showEmailCheckModal, setShowEmailCheckModal] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 5) {
      console.log('OTP submitted:', otpString);
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', email);
    setTimer(5);
    setCanResend(false);
    setResendCount(prev => prev + 1);
    
    // Check if resend count reaches 3
    if (resendCount >= 2) { // 0-indexed, so 2 means 3rd attempt
      setShowEmailCheckModal(true);
    }
    // Here you would typically call your API to resend the OTP
  };

  const handleEmailCorrect = () => {
    setShowEmailCheckModal(false);
    setResendCount(0);
    setTimer(5);
    setCanResend(false);
  };

  const handleEmailIncorrect = () => {
    setShowEmailCheckModal(false);
    // Navigate back to email verification
    window.location.href = '/email-verification';
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      {/* Centered OTP Verification Form */}
      <div className="w-full max-w-md p-4">
        
        {/* OTP Verification Card */}
        <div className="bg-white rounded-2xl p-6 w-full shadow-2xl border-1 border-gray-300">
          
          {/* Header */}
          <h2 className="text-2xl font-serif text-foreground mb-2 text-center font-bold">
            Verification Code
          </h2>
          <p className="text-gray-600 text-sm text-center mb-4">
            Enter the 5-digit code sent to your email.
          </p>
          
          {/* Display Email */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-600 text-center">
              Verification code will be sent to:
            </p>
            <p className="text-1g font-semibold  text-foreground text-center mt-1">
              {email}
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                />
              ))}
            </div>
            
            {/* Verify Button */}
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded-lg font-semibold hover:bg-secondary-hover transition-colors duration-200"
            >
              Verify
            </button>
          </form>
          
          {/* Resend OTP Section */}
          <div className="mt-6 text-center">
            {!canResend ? (
              <p className="text-gray-600 text-sm">
                Resend OTP in {timer} seconds
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                className="text-secondary text-sm font-semibold hover:text-secondary-hover transition-colors duration-200 underline"
              >
                Resend OTP
              </button>
            )}
          </div>
          
          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-black">Already have an account? </span>
            <Link to="/login" className="text-secondary hover:text-secondary-hover font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl p-8 max-w-md mx-4 shadow-2xl border border-white border-opacity-20">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Email Verified!</h3>
            </div>
            
            {/* Message Content */}
            <div className="text-center mb-8">
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Your email has been successfully verified.
              </p>
              <p className="text-gray-600 text-sm">
                You can now continue with your registration process.
              </p>
            </div>
            
            {/* Action Button */}
            <div className="flex justify-center">
              <Link to="/personal-info">
                <button
                  onClick={handleCloseModal}
                  className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-hover transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Email Check Modal */}
      {showEmailCheckModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-lg p-6 max-w-sm mx-4 shadow-2xl border border-white border-opacity-20">
            <h3 className="text-lg font-bold text-black mb-2">Email Verification</h3>
            <p className="text-gray-600 text-sm mb-4">
              You've tried resending 3 times. Is your email address correct?
            </p>
            <p className="text-1g font-bold  text-foreground mb-4 text-center">
              {email}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleEmailIncorrect}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200"
              >
                No, Change Email
              </button>
              <button
                onClick={handleEmailCorrect}
                className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary-hover transition-colors duration-200"
              >
                Yes, Resend
              </button>
            </div>
          </div>
        </div>
      )}
     
      </div>
    )
  }

export default OTPVerification;
