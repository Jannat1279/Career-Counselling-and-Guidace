import React, { useState, useEffect } from "react";

export default function MentalHealthSection() {
  const quotes = [
    "Your mind is stronger than your fears.",
    "You don’t need to be perfect to be amazing.",
    "Every day is a new beginning.",
    "You are capable of more than you believe.",
    "Small steps every day create big results.",
    "Peace begins with a deep breath."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  // Auto-slide quotes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div
      className="bg-gradient-to-tr from-[#2aa3ce] via-[#dfae53] to-[#2aa3ce]
                 max-w-6xl mx-auto my-10 p-10 rounded-xl shadow-2xl
                 transition duration-300 hover:shadow-[0_0_40px_rgba(42,163,206)]
                 hover:border-2 hover:border-white
                 hover:bg-gradient-to-tr hover:from-[#792ace] hover:via-[#53dfcc] hover:to-[#ed2ba9]"
    >

      {/* TITLE */}
      <h2 className="text-center text-white font-bold text-3xl mb-6">
        Mental Health & Well-Being
      </h2>

      {/* MAIN IMAGE */}
      <img
        src="https://cdn.pixabay.com/photo/2020/01/19/16/09/self-care-4778282_1280.jpg"
        alt="Mental Wellbeing"
        className="rounded-xl shadow-lg mb-6 w-full object-cover"
      />

      {/* CONTENT */}
      <p className="text-white text-lg leading-relaxed mb-6">
        Your mental health is as important as your studies and career. A calm,
        peaceful mind helps you stay confident, focused and emotionally strong.
        Remember — it’s okay to feel stressed or overwhelmed, but you are not
        alone. Support is available.
      </p>

      <p className="text-white text-lg leading-relaxed mb-6">
        You deserve care, peace and happiness. Healing starts with small steps —
        talking to someone, journaling, breathing deeply, or taking support from
        professional services.
      </p>

      {/* ✨ MOTIVATIONAL QUOTE SLIDER */}
      <h3 className="text-white font-bold text-2xl mb-4">
         Motivational Quote
      </h3>

      <div
        className="bg-white rounded-lg p-4 shadow-md text-center text-xl font-semibold
                   transition duration-500"
      >
        {quotes[currentQuote]}
      </div>

      {/* 🌬 BREATHING ANIMATION */}
      <h3 className="text-white font-bold text-2xl mt-10 mb-4">
         Guided Breathing Exercise
      </h3>

      <p className="text-white mb-2">Follow this simple 6-second breathing cycle:</p>

      <div className="flex justify-center my-6">
        <div
          className="breathing-circle"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.8)",
            animation: "breathing 6s infinite ease-in-out",
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes breathing {
            0% { transform: scale(1); }
            50% { transform: scale(1.35); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <p className="text-white text-lg text-center mb-6">
        Inhale… Hold… Exhale… Repeat slowly for calmness 🌿
      </p>

      {/* 🧘 HOW TO MANAGE STRESS SECTION */}
      <h3 className="text-white font-bold text-2xl mt-10 mb-4">
         How to Manage Stress
      </h3>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-900 font-semibold">
            ✔ Talk to someone you trust  
          </p>
          <p className="text-gray-700">
            Sharing your feelings reduces emotional burden.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-900 font-semibold">✔ Practice deep breathing</p>
          <p className="text-gray-700">
            Slow breathing reduces anxiety and stabilizes your heart rate.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-900 font-semibold">✔ Take short breaks</p>
          <p className="text-gray-700">
            Rest improves your productivity and mental clarity.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-900 font-semibold">✔ Reduce social comparison</p>
          <p className="text-gray-700">
            Focus on your own journey, not others’ achievements.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-900 font-semibold">✔ Stay active</p>
          <p className="text-gray-700">
            Even 10 minutes of walking can improve mood.
          </p>
        </div>
      </div>

      {/* GOVT LINKS TITLE */}
      <h3 className="text-white font-bold text-2xl mt-10 mb-4">
         Government Support & Helplines
      </h3>

      {/* GOVT CARDS */}
      <div className="space-y-4">

        {/* Each gov link card as before */}
        <div
          onClick={() => window.open("https://mindpeers.co", "_blank")}
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
        >
          <p className="text-lg font-semibold text-gray-900"> MindPeers (Mental Fitness Platform)</p>
          <p className="text-blue-600 underline">Tools, exercises, community</p>
        </div>

        <div
          onClick={() => window.open("https://rajras.in/mental-health-helpline-kiran-launched/", "_blank")}
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
        >
          <p className="text-lg font-semibold text-gray-900"> KIRAN Helpline</p>
          <p>A national toll-free helpline providing crisis support & counselling.</p>
          <p className="text-blue-600 underline">1800-599-0019</p>
        </div>

        <div
          onClick={() => window.open("https://www.mohfw.gov.in", "_blank")}
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
        >
          <p className="text-lg font-semibold text-gray-900"> Ministry of Health – Mental Health Resource Page</p>
          <p className="text-blue-600 underline">Official resources and programs</p>
        </div>

        <div
          onClick={() => window.open("https://nimhans.ac.in/", "_blank")}
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
        >
          <p className="text-lg font-semibold text-gray-900"> NIMHANS(India’s top mental health institute)</p>
          <p className="text-blue-600 underline">Top Mental Health Institute</p>
          <p>Emotional support, counselling, therapy</p>
        </div>

        <div
          onClick={() => window.open("https://www.fortishealthcare.com", "_blank")}
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
        >
          <p className="text-lg font-semibold text-gray-900"> Fortis Stress Helpline (Free for Students)</p>
          <p className="text-blue-600 underline">emotional support and counselling helpline</p>
          <p>+91 83768 04102</p>
        </div>

      </div>
    </div>
  );
}