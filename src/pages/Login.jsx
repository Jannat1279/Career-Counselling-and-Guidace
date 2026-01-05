// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // ✅ Now works correctly

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const text = await res.text(); // backend returns text, not JSON

//       if (res.ok) {
//         setMessage(text); // e.g., "Login successful!"
//         navigate("/home"); // ✅ Redirect to home after login
//       } else {
//         setMessage(text || "Invalid credentials");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Server error. Please try again later.");
//     }
//   };

    
//     return (
//     <>
//       {/* Background wrapper */}
//       <div className="relative min-h-screen flex justify-center items-center">

//         {/* Blurred background image */}
//         <img
//           src={home}
//           alt="Background"
//           className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-90 z-0"
//         />

//         {/* Soft overlay */}
//         <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>

//         {/* Login Card */}
//         <div className="relative z-10 bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md">
//           <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//             Login
//           </h2>

//           <form className="space-y-4">
//             <div>
//               <label className="block mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="enter your email"
//                 name="email"
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//               />
//             </div>

//             <div>
//               <label className="block mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="enter password"
//                 name="password"
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
//             >
//               Login
//             </button>

//             <div className="flex justify-between text-sm mt-2">
//               <Link to="/reset" className="text-indigo-600 hover:underline">
//                 Forgot Password?
//               </Link>
//               <Link to="/register" className="text-indigo-600 hover:underline">
//                 Register
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );}


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import home from "../assets/images/home.jpg"; // ✅ make sure this path is correct

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text(); // backend returns text, not JSON

      if (res.ok) {
        setMessage(text || "Login successful!");
        navigate("/home"); // redirect
      } else {
        setMessage(text || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <>
      {/* Background wrapper */}
      <div className="relative min-h-screen flex justify-center items-center">
        {/* Blurred background image */}
        <img
          src={home}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-90 z-0"
        />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>

        {/* Login Card */}
        <div className="relative z-10 bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                placeholder="Enter password"
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
              Login
            </button>

            <div className="flex justify-between text-sm mt-2">
              {/* <Link to="/reset" className="text-indigo-600 hover:underline">
                Forgot Password?
              </Link> */}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </div>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
