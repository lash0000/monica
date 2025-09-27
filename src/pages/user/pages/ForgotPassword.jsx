function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="bg-[#4B663B] p-20 rounded-4xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Personal Information
        </h2>

        <div className="mb-4">
          <label className="font-bold block text-white mb-1">Fullname</label>
          <input
            type="text"
            className="bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your fullname"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold block text-white mb-1">ID Number</label>
          <input
            type="text"
            className="bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your ID number"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold block text-white mb-1">Mobile Number</label>
          <input
            type="tel"
            className="bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your mobile number"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold block text-white mb-1">Verification Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="bg-white flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:bg-white"
              placeholder="Enter code"
            />
            <button
              type="button"
              className="px-4 py-2 bg-white text-[#4B663B] font-bold rounded-md"
            >
              Get Code
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-white text-[#4B663B] font-semibold rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
