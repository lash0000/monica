import { useEffect } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      {/* Centered Forgot Password Form */}
      <div className="w-full max-w-md p-4">
        <form className="bg-white rounded-2xl p-6 w-full shadow-2xl border-1 border-gray-300">
        <h2 className="text-2xl font-serif text-foreground mb-6 text-center font-bold">
          Forgot Password
        </h2>

        <div className="mb-4">
          <label className="font-bold block text-black mb-2">Fullname</label>
          <input
            type="text"
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Enter your fullname"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold block text-black mb-2">ID Number</label>
          <input
            type="text"
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Enter your ID number"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold block text-black mb-2">Mobile Number</label>
          <input
            type="tel"
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Enter your mobile number"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold block text-black mb-2">Verification Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="bg-white flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter code"
            />
            <button
              type="button"
              className="px-4 py-2 bg-white text-secondary font-bold rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              Get Code
            </button>
          </div>

       
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-hover transition-colors"
        >
          Submit
        </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;