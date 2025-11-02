import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterAuth } from "../stores/register-store";
import { useNavigate } from "react-router-dom";

function OTPVerification() {
  const { generateOtp, verifyOtp, clear } = useRegisterAuth();
  const navigate = useNavigate();
  const email = sessionStorage.getItem("register_email") || "user@example.com";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 digits
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [timer, setTimer] = useState(5);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [showEmailCheckModal, setShowEmailCheckModal] = useState(false);

  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      alert("Please enter the full 6-digit OTP code.");
      return;
    }

    setVerifying(true);
    try {
      console.log("🔍 Verifying OTP for:", email);
      console.log("➡️ OTP entered:", otpString);
      console.log("🔐 otp_token:", sessionStorage.getItem("otp_token"));

      const response = await verifyOtp(otpString);

      console.log("✅ OTP Verification Response:", response);

      setShowSuccessModal(true);
    } catch (err) {
      console.error("❌ OTP Verification Error:", err);

      // Show error modal instead of immediate alert
      setErrorMessage(err.message || "Invalid OTP or token expired.");
      setShowErrorModal(true);
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) return alert("Missing email session.");

    setResending(true);
    try {
      console.log("📨 Requesting new OTP for:", email);
      const response = await generateOtp();
      console.log("✅ OTP Generation Response:", response);

      alert(`OTP re-sent to ${email}`);

      setTimer(5);
      setCanResend(false);
      setResendCount((prev) => prev + 1);
      if (resendCount >= 2) setShowEmailCheckModal(true);
    } catch (err) {
      console.error("❌ OTP Generation Error:", err);
      alert(err.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      <div className="w-full max-w-md p-4">
        <div className="bg-white rounded-2xl p-6 w-full shadow-2xl border border-gray-300">
          <h2 className="text-2xl font-serif text-foreground mb-2 text-center font-bold">
            Verification Code
          </h2>
          <p className="text-gray-600 text-sm text-center mb-4">
            Enter the 6-digit code sent to your email.
          </p>

          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-600 text-center">
              Verification code sent to:
            </p>
            <p className="text-base font-semibold text-foreground text-center mt-1">
              {email}
            </p>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={verifying}
              className={`w-full bg-secondary text-white py-2 rounded-lg font-semibold transition-colors duration-200 ${verifying
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-secondary-hover"
                }`}
            >
              {verifying ? "Verifying..." : "Verify"}
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
                disabled={resending}
                className={`text-secondary text-sm font-semibold underline ${resending
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:text-secondary-hover"
                  }`}
              >
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>

          <div className="text-center mt-6">
            <span className="text-black">Already have an account? </span>
            <Link
              to="/login"
              className="text-secondary hover:text-secondary-hover font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl border border-green-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Email Verified!
              </h3>
              <p className="text-gray-600 text-sm">
                Your email <span className="font-semibold">{email}</span> has been verified.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  clear();
                  navigate("/login");
                }}
                className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-hover transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl border border-red-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">
                Verification Failed
              </h3>
              <p className="text-gray-700 text-sm mb-4">{errorMessage}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OTPVerification;
