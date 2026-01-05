import React, { useState } from "react";

export default function Stories() {
  // ---------- REAL MICRO STORIES ----------
  const microStories = [
    {
      title: "From Failure to Full-Stack",
      story:
        "In 2021, he failed class 12 in Mathematics. He was depressed and wanted to quit studies. One day he watched a free coding class on YouTube. He started learning HTML on his old phone every night. Today, in 2024, he is working as a junior web developer while completing his graduation. His biggest lesson: Failure is not the end, it is just redirection."
    },
    {
      title: "Village Girl to Nurse",
      story:
        "She came from a small village where girls were not encouraged to study. Still, she used to walk 6 km every day to attend school. She studied from borrowed books and cracked her nursing entrance exam. Today she works in a government hospital and supports her entire family."
    },
    {
      title: "Arts Student to Content Writer",
      story:
        "Everyone said Arts has no future. But she loved writing. During lockdown she started learning blogging from free websites and practiced daily. She created her own blog and later started freelancing. Today she is a professional content writer earning from home."
    },
    {
      title: "Drop Year to Success",
      story:
        "He took a drop year because he couldn’t clear any entrance exam. Instead of giving up, he worked on his weak areas and followed a strict daily routine. Next year, he cracked CUET and got admission in his dream college."
    }
  ];

  // ---------- FUTURE ME FEATURE ----------
  const [career, setCareer] = useState("");
  const [letter, setLetter] = useState("");

  const futureLetters = {
    engineer: `Dear You,
Today I am a successful Engineer. I solve problems, create technology and build solutions for the world. I am proud of you because you didn’t quit when it was hard. Those late nights of study and practice changed our life forever. 
Keep going, your efforts are worth it.`,
    
    doctor: `Dear You,
I am now a Doctor, helping people and saving lives. I remember how difficult Biology and Chemistry felt, but your persistence made this possible. Your small sacrifices created someone’s big miracle.
Never stop believing in yourself.`,
    
    teacher: `Dear You,
Today I stand in front of a classroom as a Teacher, guiding young minds. You chose a path of knowledge and kindness. I am respected because you respected learning. Thank you for never giving up.`,
    
    designer: `Dear You,
I am a Designer now, creating art and visuals for the world. People said this was not a real career, but you trusted your passion. Your creativity became your profession. Believe in your art always.`
  };

  const generateLetter = () => {
    if (!career) {
      alert("Please select a career first!");
      return;
    }
    setLetter(futureLetters[career]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-blue-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-700">
            Inspirational Stories
          </h1>
          <p className="text-gray-600 mt-2">
            Real journeys that prove success is built, not given.
          </p>
        </div>

        {/* ===== MICRO STORIES SECTION ===== */}
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6">
           Real Micro Stories
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {microStories.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.story}
              </p>
            </div>
          ))}
        </div>

        {/* ===== FUTURE ME SECTION ===== */}
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
           A Letter From Your Future Self
        </h2>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-gray-700 mb-4">
            Select your dream career and read a message from your future self.
          </p>

          {/* Selection */}
          <select
            className="border p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
          >
            <option value="">-- Select Career --</option>
            <option value="engineer">Engineer</option>
            <option value="doctor">Doctor</option>
            <option value="teacher">Teacher</option>
            <option value="designer">Designer</option>
          </select>

          <button
            onClick={generateLetter}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Read My Future Letter
          </button>

          {/* LETTER RESULT */}
          {letter && (
            <div className="mt-6 p-6 border-l-4 border-indigo-600 bg-indigo-50 rounded">
              <p className="text-gray-800 whitespace-pre-line">
                {letter}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}