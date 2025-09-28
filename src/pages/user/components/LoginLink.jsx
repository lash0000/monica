import { Link } from "react-router-dom";

function LoginLink() {
  return (
    <div className="text-center mt-6">
      <span className="text-black">Already have an account? </span>
      <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
        Login
      </Link>
    </div>
  );
}

export default LoginLink;
