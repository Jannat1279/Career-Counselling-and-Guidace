import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <>
      
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Reset Password</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Email Address</label>
              <input type="email"  name="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="Enter your email"/>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">Send Reset Link</button>
            <p className="text-sm text-center mt-4">
              Back to <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
      
    </>
  );
}
