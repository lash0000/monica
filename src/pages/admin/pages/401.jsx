import { Link } from "react-router-dom";

const Unauthorized401 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-5xl font-bold mb-4">401</h1>
      <h2 className="text-2xl mb-2">Unauthorized Access</h2>
      <p className="text-gray-600 mb-6">
        You don't have permission to view this page.
      </p>

      <a href="/dashboard"
        className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
      >
        Go back home
      </a>
    </div>
  );
};

export default Unauthorized401;
