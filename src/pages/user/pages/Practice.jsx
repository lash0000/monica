import { Link } from "react-router-dom";

function Practice() {
    return (
        <div className="w-full min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Practice Page</h1>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-4 rounded-lg shadow-md border">
                    <h3 className="text-lg font-semibold mb-2">Practice Component</h3>
                    <div className="space-x-4">
                        <Link to="/login" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 inline-block">
                            Go to Login Form
                        </Link>
                        <Link to="/register" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 inline-block">
                            Go to SignUp Form
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Practice;

