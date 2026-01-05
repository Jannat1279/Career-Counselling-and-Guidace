import React from "react";
import { Link } from "react-router-dom";
import About from "./About";
import FAQ from "./FAQ";
import home from "../assets/images/home.jpg";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] w-full overflow-hidden">
        {/* Blurred background image */}
        <img
          src={home}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-90 z-0"
        />
        {/* Overlay content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
          <h1 className="text-5xl font-bold text-blue-700 mb-6 drop-shadow-lg text-center">
            Welcome to Our Platform
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 drop-shadow text-center">
            We provide solutions that help students and professionals connect with
            opportunities, events, and career guidance.
          </p>

          {/* ✅ Two buttons instead of one */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/quiz-10"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-center"
            >
              Take 10th Quiz
            </Link>
            <Link
              to="/quiz-12"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-semibold text-center"
            >
              Take 12th Quiz
            </Link>
          </div>
        </div>
        {/* Optional overlay for better contrast */}
        <div className="absolute inset-0 bg-white/30 z-0" />
      </section>

      <section className="bg-white">
        <About />
      </section>

      {/* Services Section */}
      <section className="bg-white">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-10">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Courses</h3>
            <p className="text-gray-600">
              Get courses as per the recommended career prediction.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Career Guidance
            </h3>
            <p className="text-gray-600">
              Get AI-powered career counseling and personalized suggestions.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Support</h3>
            <p className="text-gray-600">
              We are here to help you with your queries via our contact system.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <FAQ />
      </section>
    </div>
  );
};

export default Home;
