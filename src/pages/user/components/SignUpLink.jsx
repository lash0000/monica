import { Link } from "react-router-dom";

function SignUpLink() {
  return (
    <div className="text-center mt-4">
      <span className="text-black">Need an account? </span>
      <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
        Sign up
      </Link>
    </div>
  );
}

export default SignUpLink;
