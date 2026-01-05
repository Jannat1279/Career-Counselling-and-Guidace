import React, { useState, useEffect } from "react";

export default function Resources() {
  // ---------- STUDY TIMER STATE ----------
  const FOCUS_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60;  // 5 minutes

  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // format seconds -> mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;

        // switch focus <-> break
        if (isBreak) {
          // break finished → back to focus session
          setIsBreak(false);
          return FOCUS_TIME;
        } else {
          // focus finished → start break
          setIsBreak(true);
          return BREAK_TIME;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(FOCUS_TIME);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* PAGE TITLE */}
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700">
            Resources & Tools
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Focus better, explore real opportunities, and grow your personality.
          </p>
        </div>

        {/* ---------- SECTION 1: STUDY FOCUS TIMER ---------- */}
        <section className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              ⏱ Study Focus Timer
            </h2>
            <p className="text-gray-600 mb-4">
              Use this simple Pomodoro timer:{" "}
              <span className="font-semibold">25 minutes focus</span> followed by{" "}
              <span className="font-semibold">5 minutes break</span>. Repeat this
              cycle to stay productive without burning out.
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>During focus time: keep phone away, no social media.</li>
              <li>During break: stretch, drink water, relax your eyes.</li>
            </ul>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border-8 border-indigo-500 flex items-center justify-center shadow-md mb-4">
              <span className="text-3xl font-bold text-indigo-700">
                {formatTime(timeLeft)}
              </span>
            </div>
            <p className="mb-3 text-sm font-medium text-gray-700">
              {isBreak ? "Break Time " : "Focus Session "}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleStartPause}
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* ---------- SECTION 2: GOVERNMENT SCHEMES & PORTALS ---------- */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
             Government Schemes & Official Portals for Students
          </h2>
          <p className="text-gray-600 mb-6">
            Explore trusted, official platforms that provide scholarships, skills
            training, digital learning and internships for Indian students.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* National Scholarship Portal */}
            <div
              className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() =>
                window.open("https://scholarships.gov.in", "_blank")
              }
            >
              <h3 className="font-semibold text-lg text-gray-900">
                 National Scholarship Portal (NSP)
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Centralised portal to apply for various government scholarships
                from different ministries and states.
              </p>
              <p className="text-indigo-600 text-sm mt-2 underline">
                scholarships.gov.in
              </p>
            </div>

            {/* Skill India Digital Hub */}
            <div
              className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() =>
                window.open("https://www.skillindiadigital.gov.in", "_blank")
              }
            >
              <h3 className="font-semibold text-lg text-gray-900">
                 Skill India Digital Hub
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Official Skill India platform offering free & paid courses to
                build job-ready skills.
              </p>
              <p className="text-indigo-600 text-sm mt-2 underline">
                skillindiadigital.gov.in
              </p>
            </div>

            {/* PM e-VIDYA */}
            <div
              className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() =>
                window.open("https://pmevidya.education.gov.in", "_blank")
              }
            >
              <h3 className="font-semibold text-lg text-gray-900">
                 PM e-VIDYA
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Multi-mode digital/online/on-air education initiative for school
                students across India.
              </p>
              <p className="text-indigo-600 text-sm mt-2 underline">
                pmevidya.education.gov.in
              </p>
            </div>

            {/* AICTE Internship Portal */}
            <div
              className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() =>
                window.open("https://internship.aicte-india.org", "_blank")
              }
            >
              <h3 className="font-semibold text-lg text-gray-900">
                 AICTE Internship Portal
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Official portal for technical students to find verified
                internships with organisations across India.
              </p>
              <p className="text-indigo-600 text-sm mt-2 underline">
                internship.aicte-india.org
              </p>
            </div>

            {/* Bharat Skills */}
            <div
              className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() =>
                window.open("https://bharatskills.gov.in", "_blank")
              }
            >
              <h3 className="font-semibold text-lg text-gray-900">
                 Bharat Skills – ITI Learning Portal
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Central repository with videos, mock tests and materials for ITI
                students & trainers.
              </p>
              <p className="text-indigo-600 text-sm mt-2 underline">
                bharatskills.gov.in
              </p>
            </div>

            {/* Apprenticeship India */}
            <div
              className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() =>
                window.open("https://www.apprenticeshipindia.gov.in", "_blank")
              }
            >
              <h3 className="font-semibold text-lg text-gray-900">
                 Apprenticeship India Portal
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Official apprenticeship portal connecting students with
                industry-based training & jobs.
              </p>
              <p className="text-indigo-600 text-sm mt-2 underline">
                apprenticeshipindia.gov.in
              </p>
            </div>
          </div>
        </section>

        {/* ---------- SECTION 3: PERSONALITY DEVELOPMENT HUB ---------- */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
             Personality Development Hub
          </h2>
          <p className="text-gray-600 mb-6">
            Strong skills + strong personality = powerful career. Use these
            practical tips to improve communication, confidence and interviews.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Communication */}
            <div className="border rounded-lg p-5 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                 Communication Skills
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Speak slowly and clearly, not fast.</li>
                <li>Practice English & Hindi conversations daily.</li>
                <li>Record yourself and listen to improve tone.</li>
                <li>Read aloud from books or articles 10 mins/day.</li>
              </ul>
            </div>

            {/* Confidence */}
            <div className="border rounded-lg p-5 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                 Confidence & Mindset
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Focus on progress, not perfection.</li>
                <li>Write 3 things you did well every day.</li>
                <li>Prepare well – confidence comes from clarity.</li>
                <li>Stay around people who support your growth.</li>
              </ul>
            </div>

            {/* Resume & Interview */}
            <div className="border rounded-lg p-5 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                 Resume & Interview Basics
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Keep resume 1 page, clean & simple.</li>
                <li>Highlight projects, internships & skills.</li>
                <li>Practice common HR questions in front of mirror.</li>
                <li>Dress neat & maintain eye contact in interviews.</li>
              </ul>
            </div>
          </div>
        </section>
        

      </div>
    </div>
  );
}