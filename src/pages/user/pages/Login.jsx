import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import SignUpLink from "../components/SignUpLink";
import { useAuth } from "../stores/store";
import { useNavigate } from "react-router-dom"

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)
    setLoading(false)

    if (result.success) {
      navigate("/dashboard")
    } else {
      setError(result.message || "Invalid credentials")
    }
  }

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      {/* Centered Login Form */}
      <div className="w-full max-w-md p-4">

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-6 w-full shadow-2xl border border-gray-300 transition-colors" >
          {/* Login Title */}
          <h2 className="text-3xl tracking-tighter text-foreground mb-6 text-center font-bold">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-black font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
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
                  className="w-full px-3 py-2 border-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                  className="mr-2 text-secondary focus:ring-secondary"
                />
                <span className="text-black">Remember Me</span>
              </label>
              <Link to="/forgot-password" className="text-secondary hover:text-secondary-hover">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Google Login Button */}
          <div className="hidden">
            {/* OR Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button className="w-full bg-white border-2 border-gray-300 text-foreground py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
              <img src="/assets/images/google.png" alt="Google" className="w-8 h-8 mr-3" />
              Continue with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <SignUpLink />
        </div>
      </div>
    </div>
  )
}

export default Login; 
