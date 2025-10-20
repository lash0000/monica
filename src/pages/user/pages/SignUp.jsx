import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginLink from "../components/LoginLink";
import { useRegisterAuth } from "../stores/register-store";

export default function SignUp() {
  const navigate = useNavigate();
  const { register, loading, message } = useRegisterAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acc_type: "System",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [verifyLoad, setVerifyLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setDialogOpen(true);
    } catch (err) {
      // choose how to present errors: alert, toast, inline UI, etc.
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      <div className="w-full max-w-md p-4">
        <div className="bg-white rounded-2xl p-6 w-full shadow-2xl border border-[#4B663B]">
          <h2 className="text-3xl font-serif tracking-tighter text-secondary mb-2 text-center font-bold">
            Create Account
          </h2>

          <p className="text-gray-600 text-sm text-center mb-6">
            Fill your information below
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-black font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Example@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-black font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                />
                <span
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center ${loading
                ? "bg-secondary/80 cursor-not-allowed"
                : "bg-secondary hover:bg-secondary-hover text-white"
                }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Proceeding
                </>
              ) : (
                "Proceed"
              )}
            </button>
          </form>
          <LoginLink />
        </div>
      </div>


      {/* Success Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4 text-secondary">
              {message || "User registered. Kindly verify your email to access other services."}
            </h3>

            <div className="space-y-2">
              <button
                onClick={async () => {
                  try {
                    setVerifyLoad(true);
                    const { generateOtp } = useRegisterAuth.getState();
                    await generateOtp();

                    navigate("/otp-verification");
                  } catch (err) {
                    alert(err.message || "Failed to generate OTP");
                  } finally {
                    setVerifyLoad(false);
                  }
                }}
                disabled={verifyLoad}
                className={`w-full bg-secondary text-white py-2 rounded-lg font-semibold flex items-center justify-center ${verifyLoad
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-secondary-hover"
                  }`}
              >
                {verifyLoad ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Generating OTP...
                  </>
                ) : (
                  "Proceed to Verification"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
