import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import home from "../assets/images/home.jpg"; // your image

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();

      if (res.ok) {
        // Optional: show message once
        alert(text || "User registered successfully!");

        // ✅ Redirect to login page after successful register
        navigate("/login");
      } else {
        setMessage(text || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <>
      {/* Background Image */}
      <div className="relative min-h-screen flex justify-center items-center">
        {/* Blurred background image */}
        <img
          src={home}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-90 z-0"
        />

        {/* Transparent overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>

        {/* Register Card */}
        <div className="relative z-10 bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Register
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>

          {/* Message from backend */}
          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">
              {message}
            </p>
          )}

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
