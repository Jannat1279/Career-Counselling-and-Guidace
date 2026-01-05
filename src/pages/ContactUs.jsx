import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setStatusMsg("");

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const text = await response.text();
        setStatus("success");
        setStatusMsg(text || "Message sent successfully!");
        setFormData({ username: "", email: "", message: "" });
      } else {
        const errorText = await response.text();
        setStatus("error");
        setStatusMsg(errorText || "Something went wrong. Try again!");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMsg("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        
        {/* Left Side */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-600 mb-4 text-justify">
            Let's get in touch
          </h3>
          <p className="text-gray-600 mb-6 text-justify">
            Have something on your mind? Drop us a message and we'll get back
            to you as soon as possible!
          </p>

          {/* contact info justified */}
          <div className="space-y-4 text-justify">
            <p>📍 Radaur, Haryana</p>
            <p>📧 careers4guidance@gmail.com</p>
          </div>
        </div>

        {/* Right Side */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-indigo-600 text-justify">Contact Us</h3>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-indigo-400 outline-none text-justify"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Send
          </button>

          {/* Status Message */}
          {status && (
            <p
              className={`text-sm mt-2 text-justify ${
                status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
