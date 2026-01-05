// import React, { useEffect, useState } from "react";
// import DarkToggle from "./DarkToggle";

// export default function Quiz12() {
//   const [features, setFeatures] = useState([]);
//   const [dark, setDark] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [started, setStarted] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const [finished, setFinished] = useState(false);
//   const [careerLinks, setCareerLinks] = useState([]);
//   const [result, setResult] = useState(null);

//   // Fetch quiz features and degree-link data
//   useEffect(() => {
//     fetch("/quiz12Features.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setFeatures(data);
//         setSelected(Array(data.length).fill(0));
//       })
//       .catch((err) => console.error("Could not load quiz features:", err));

//     // coursesLinks.json contains degree -> link mapping for 12th quiz
//     fetch("/coursesLinks.json")
//       .then((res) => res.json())
//       .then((data) => setCareerLinks(data))
//       .catch(() => console.error("Could not load coursesLinks.json"));
//   }, []);

//   const toggleCard = (idx) => {
//     setSelected((prev) =>
//       prev.map((v, i) => (i === idx ? (v ? 0 : 1) : v))
//     );
//   };

//   const progress = selected.filter((v) => v === 1).length;
//   const progressPct = features.length ? (progress / features.length) * 100 : 0;

//   const startQuiz = () => {
//     if (!username.trim() || !email.trim()) {
//       alert("Please enter both name and email!");
//       return;
//     }
//     setStarted(true);
//   };

//   // Normalize text for matching
//   const normalize = (str) =>
//     str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

//   const submitQuiz = async (e) => {
//     e.preventDefault();
//     
//     // Ensure features are loaded and at least one is selected
//     if (features.length === 0) {
//         alert("Quiz features are still loading. Please wait a moment.");
//         return;
//     }
//     if (!selected.includes(1)) {
//       alert("Please select at least one interest!");
//       return;
//     }

//     try {
//       // Using 127.0.0.1 for better predictability than 'localhost'
//       const res = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // Data structure matches what Flask server (app.py) expects: 'answers'
//         body: JSON.stringify({ username, email, answers: selected }),
//       });

//       if (!res.ok) { // Handles 4xx and 5xx errors
//         const errorData = await res.json().catch(() => ({ error: 'Unknown server response format' }));
//         // Log detailed error and show a user-friendly alert
//         console.error("Server Error:", res.status, errorData.error);
//         alert(`Submission error (${res.status}): ${errorData.error || "The server returned an error."}`);
//         return;
//       }
//       
//       const data = await res.json();
//       if (!data.career) {
//         alert("Prediction error: " + (data.error || "Could not retrieve a career recommendation. Try again."));
//         return;
//       }

//       const normalizedCareer = normalize(data.career);

//       // Keyword-based mapping (This extensive map is retained as per your logic)
//       const keywordMap = {
//         computer: "B.Tech - Computer Science and Engineering",
//         software: "B.Tech - Computer Science and Engineering",
//         it: "B.Sc. - Information Technology",
//         civil: "B.Tech - Civil Engineering",
//         mechanical: "B.Tech - Mechanical Engineering",
//         electrical: "B.Tech - Electrical and Electronics Engineering",
//         electronics: "B.Tech - Electronics and Communication Engineering",
//         law: "Integrated Law Course - BA + LL.B",
//         journalism: "BJMC - Bachelor of Journalism and Mass Communication",
//         masscommunication: "BJMC - Bachelor of Journalism and Mass Communication",
//         fashion: "BFD - Bachelor of Fashion Designing",
//         design: "BVA - Bachelor of Visual Arts",
//         business: "BBA - Bachelor of Business Administration",
//         commerce: "B.Com - Bachelor of Commerce",
//         account: "CA - Chartered Accountancy",
//         companysecretary: "CS - Company Secretary",
//         architecture: "B.Arch - Bachelor of Architecture",
//         travel: "BTTM - Bachelor of Travel and Tourism Management",
//         history: "BA in History",
//         english: "BA in English",
//         hindi: "BA in Hindi",
//         economics: "BA in Economics",
//         education: "B.Ed.",
//         geology: "B.Sc - Applied Geology",
//         physics: "B.Sc - Physics",
//         chemistry: "B.Sc - Chemistry",
//         mathematics: "B.Sc - Mathematics",
//         pharma: "BPharma - Bachelor of Pharmacy",
//         dentist: "BDS - Bachelor of Dental Surgery",
//         doctor: "MBBS",
//         medical: "MBBS",
//         civilservice: "Civil Services",
//         event: "BEM - Bachelor of Event Management",
//         animation: "Animation, Graphics and Multimedia",
//       };

//       let matchedDegree = null;
//       for (const [keyword, degreeName] of Object.entries(keywordMap)) {
//         if (normalizedCareer.includes(keyword)) {
//           matchedDegree = degreeName;
//           break;
//         }
//       }

//       // Find YouTube link
//       let match = null;
//       if (matchedDegree) {
//         match = careerLinks.find(
//           (item) => normalize(item.degree) === normalize(matchedDegree)
//         );
//       } else {
//         match = careerLinks.find((item) => {
//           const normalizedDegree = normalize(item.degree);
//           return (
//             normalizedCareer.includes(normalizedDegree) ||
//             normalizedDegree.includes(normalizedCareer)
//           );
//         });
//       }

//       const link = match?.link || 
//       "https://alison.com/?utm_source=bing&utm_medium=cpc&utm_campaign=530823303&utm_content=1358998875731562&utm_term=kwd-84938561416339:loc-90&msclkid=17ab24110150152f948d4d128d20c956";

//       // Save result
//       const attempts =
//         JSON.parse(localStorage.getItem("careerAttempts")) || [];
//       attempts.push({
//         username,
//         email,
//         career: data.career,
//         link,
//         date: new Date().toLocaleString(),
//       });
//       localStorage.setItem("careerAttempts", JSON.stringify(attempts));

//       // Show result card
//       setResult({
//         username,
//         career: data.career,
//         link,
//       });
//       setFinished(true);
//     } catch (error) {
//       console.error("Fetch or processing error:", error);
//       alert("A network or server processing error occurred. Please check console and try again.");
//     }
//   };

//   return (
//     <div className={dark ? "dark bg-gray-200" : ""}>
//       <DarkToggle dark={dark} setDark={setDark} />
//       <div className="relative min-h-screen flex items-center justify-center p-6">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20 blur-sm -z-10" />

// {/*         Name + Email Form */}
//         {!started && !finished && (
//           <div className="max-w-2xl w-full p-8 rounded-2xl shadow-2xl transition bg-gradient-to-br from-[#50e5ac] to-[#1158b0] hover:from-[#168bcf] hover:to-[#dc569e]">
//             <h1 className="text-3xl text-white font-semibold text-center mb-2">
//               🚀 Discover Your Future Career
//             </h1>
//             <p className="text-white text-center mb-4">
//               Choose your passions and we’ll guide your path!
//             </p>
//             <input
//               className="w-full p-3 rounded-md mb-4 outline-none"
//               placeholder="Enter Your Name"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               className="w-full p-3 rounded-md mb-4 outline-none"
//               placeholder="Enter Your Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button
//               onClick={startQuiz}
//               className="w-full py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-gray-700 to-purple-700 hover:from-blue-200 hover:to-blue-800 hover:text-black text-white"
//             >
//               Start Quiz
//             </button>
//           </div>
//         )}

//         {/* Quiz Section */}
//         {started && !finished && (
//           <div className="max-w-4xl w-full p-6 rounded-2xl shadow-2xl transition bg-gradient-to-br from-[#50e5ac] to-[#1158b0] hover:from-[#168bcf] hover:to-[#dc569e]">
//             <h2 className="text-center text-white text-xl font-bold mb-4">
//               Welcome <b>{username}</b>, Select what you love!
//             </h2>

//             <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
//               <div
//                 className="bg-gray-900 h-3 rounded-full transition-all"
//                 style={{ width: `${progressPct}%` }}
//               />
//             </div>

//             <form
//               onSubmit={submitQuiz}
//               className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4"
//             >
//               {features.map((feat, i) => (
//                 <div
//                   key={i}
//                   onClick={() => toggleCard(i)}
//                   className={`cursor-pointer p-3 text-center font-semibold border-2 rounded-lg transition ${
//                     selected[i]
//                       ? "bg-blue-500 text-white border-white"
//                       : "bg-white text-black border-pink-100 hover:bg-blue-100"
//                   }`}
//                 >
//                   {i + 1}. {feat}
//                 </div>
//               ))}
//               <button
//                 type="submit"
//                 className="col-span-full mt-6 py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-gray-700 to-purple-700 hover:from-blue-200 hover:to-blue-800 hover:text-black text-white"
//               >
//                 Submit Answers
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Result Screen */}
//         {finished && result && (
//           <div className="max-w-xl w-full p-8 text-center rounded-2xl shadow-2xl bg-gradient-to-br from-[#50e5ac] to-[#1158b0] hover:from-[#168bcf] hover:to-[#dc569e]">
//             <h1 className="text-3xl text-white font-bold mb-2">
//               🎉 Congratulations, {result.username}!
//             </h1>
//             <p className="text-white text-lg mb-4">
//               Recommended Career:{" "}
//               <b className="text-yellow-300">{result.career}</b>
//             </p>

//             <a
//               href={result.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block mt-2 py-2 px-6 rounded-md bg-white text-blue-700 font-semibold hover:bg-yellow-100 transition"
//             >
//               Courses Link
//             </a>

// {/*             <button
//               onClick={() => (window.location.href = "/dashboard")}
//               className="w-full mt-6 py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-gray-700 to-purple-700 hover:from-blue-200 hover:to-blue-800 hover:text-black text-white"
//             >
//               Go to Dashboard
//             </button> */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import DarkToggle from "./DarkToggle";

export default function Quiz12() {
  const [features, setFeatures] = useState([]);
  const [dark, setDark] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // ✅ NEW
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState([]);
  const [finished, setFinished] = useState(false);
  const [careerLinks, setCareerLinks] = useState([]);
  const [result, setResult] = useState(null);

  // Fetch quiz features and degree-link data
  useEffect(() => {
    fetch("/quiz12Features.json")
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data);
        setSelected(Array(data.length).fill(0));
      })
      .catch((err) => console.error("Could not load quiz features:", err));

    // coursesLinks.json contains degree -> link mapping for 12th quiz
    fetch("/coursesLinks.json")
      .then((res) => res.json())
      .then((data) => setCareerLinks(data))
      .catch(() => console.error("Could not load coursesLinks.json"));
  }, []);

  const toggleCard = (idx) => {
    setSelected((prev) =>
      prev.map((v, i) => (i === idx ? (v ? 0 : 1) : v))
    );
  };

  const progress = selected.filter((v) => v === 1).length;
  const progressPct = features.length ? (progress / features.length) * 100 : 0;

  // ✅ Email validation: must contain "@" and end with ".com"
  const validateEmail = (value) => {
    const trimmed = value.trim();
    return trimmed.includes("@") && trimmed.toLowerCase().endsWith(".com");
  };

  const startQuiz = () => {
    if (!username.trim()) {
      alert("Please enter your name!");
      return;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email (must contain @ and end with .com).");
      return;
    }

    setEmailError("");
    setStarted(true);
  };

  // Normalize text for matching
  const normalize = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  const submitQuiz = async (e) => {
    e.preventDefault();

    // Ensure features are loaded and at least one is selected
    if (features.length === 0) {
      alert("Quiz features are still loading. Please wait a moment.");
      return;
    }
    if (!selected.includes(1)) {
      alert("Please select at least one interest!");
      return;
    }

    try {
      // Using 127.0.0.1 for better predictability than 'localhost'
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Data structure matches what Flask server (app.py) expects: 'answers'
        body: JSON.stringify({ username, email, answers: selected }),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: "Unknown server response format" }));
        console.error("Server Error:", res.status, errorData.error);
        alert(
          `Submission error (${res.status}): ${
            errorData.error || "The server returned an error."
          }`
        );
        return;
      }

      const data = await res.json();
      if (!data.career) {
        alert(
          "Prediction error: " +
            (data.error ||
              "Could not retrieve a career recommendation. Try again.")
        );
        return;
      }

      const normalizedCareer = normalize(data.career);

      // Keyword-based mapping
      const keywordMap = {
        computer: "B.Tech - Computer Science and Engineering",
        software: "B.Tech - Computer Science and Engineering",
        it: "B.Sc. - Information Technology",
        civil: "B.Tech - Civil Engineering",
        mechanical: "B.Tech - Mechanical Engineering",
        electrical: "B.Tech - Electrical and Electronics Engineering",
        electronics: "B.Tech - Electronics and Communication Engineering",
        law: "Integrated Law Course - BA + LL.B",
        journalism: "BJMC - Bachelor of Journalism and Mass Communication",
        masscommunication: "BJMC - Bachelor of Journalism and Mass Communication",
        fashion: "BFD - Bachelor of Fashion Designing",
        design: "BVA - Bachelor of Visual Arts",
        business: "BBA - Bachelor of Business Administration",
        commerce: "B.Com - Bachelor of Commerce",
        account: "CA - Chartered Accountancy",
        companysecretary: "CS - Company Secretary",
        architecture: "B.Arch - Bachelor of Architecture",
        travel: "BTTM - Bachelor of Travel and Tourism Management",
        history: "BA in History",
        english: "BA in English",
        hindi: "BA in Hindi",
        economics: "BA in Economics",
        education: "B.Ed.",
        geology: "B.Sc - Applied Geology",
        physics: "B.Sc - Physics",
        chemistry: "B.Sc - Chemistry",
        mathematics: "B.Sc - Mathematics",
        pharma: "BPharma - Bachelor of Pharmacy",
        dentist: "BDS - Bachelor of Dental Surgery",
        doctor: "MBBS",
        medical: "MBBS",
        civilservice: "Civil Services",
        event: "BEM - Bachelor of Event Management",
        animation: "Animation, Graphics and Multimedia",
      };

      let matchedDegree = null;
      for (const [keyword, degreeName] of Object.entries(keywordMap)) {
        if (normalizedCareer.includes(keyword)) {
          matchedDegree = degreeName;
          break;
        }
      }

      // Find YouTube link
      let match = null;
      if (matchedDegree) {
        match = careerLinks.find(
          (item) => normalize(item.degree) === normalize(matchedDegree)
        );
      } else {
        match = careerLinks.find((item) => {
          const normalizedDegree = normalize(item.degree);
          return (
            normalizedCareer.includes(normalizedDegree) ||
            normalizedDegree.includes(normalizedCareer)
          );
        });
      }

      const link =
        match?.link ||
        "https://alison.com/?utm_source=bing&utm_medium=cpc&utm_campaign=530823303&utm_content=1358998875731562&utm_term=kwd-84938561416339:loc-90&msclkid=17ab24110150152f948d4d128d20c956";

      // Save result
      const attempts =
        JSON.parse(localStorage.getItem("careerAttempts")) || [];
      attempts.push({
        username,
        email,
        career: data.career,
        link,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("careerAttempts", JSON.stringify(attempts));

      // Show result card
      setResult({
        username,
        career: data.career,
        link,
      });
      setFinished(true);
    } catch (error) {
      console.error("Fetch or processing error:", error);
      alert(
        "A network or server processing error occurred. Please check console and try again."
      );
    }
  };

  return (
    <div className={dark ? "dark bg-gray-200" : ""}>
      <DarkToggle dark={dark} setDark={setDark} />
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20 blur-sm -z-10" />

        {/* Name + Email Form */}
        {!started && !finished && (
          <div className="max-w-2xl w-full p-8 rounded-2xl shadow-2xl transition bg-gradient-to-br from-[#50e5ac] to-[#1158b0] hover:from-[#168bcf] hover:to-[#dc569e]">
            <h1 className="text-3xl text-white font-semibold text-center mb-2">
              🚀 Discover Your Future Career
            </h1>
            <p className="text-white text-center mb-4">
              Choose your passions and we’ll guide your path!
            </p>
            <input
              className="w-full p-3 rounded-md mb-4 outline-none"
              placeholder="Enter Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={`w-full p-3 rounded-md mb-1 outline-none ${
                emailError ? "border-2 border-red-500" : ""
              }`}
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(""); // clear error while typing
              }}
            />
            {emailError && (
              <p className="text-sm text-red-100 mb-3">{emailError}</p>
            )}
            <button
              onClick={startQuiz}
              className="w-full py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-gray-700 to-purple-700 hover:from-blue-200 hover:to-blue-800 hover:text-black text-white"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Quiz Section */}
        {started && !finished && (
          <div className="max-w-4xl w-full p-6 rounded-2xl shadow-2xl transition bg-gradient-to-br from-[#50e5ac] to-[#1158b0] hover:from-[#168bcf] hover:to-[#dc569e]">
            <h2 className="text-center text-white text-xl font-bold mb-4">
              Welcome <b>{username}</b>, Select what you love!
            </h2>

            <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
              <div
                className="bg-gray-900 h-3 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <form
              onSubmit={submitQuiz}
              className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4"
            >
              {features.map((feat, i) => (
                <div
                  key={i}
                  onClick={() => toggleCard(i)}
                  className={`cursor-pointer p-3 text-center font-semibold border-2 rounded-lg transition ${
                    selected[i]
                      ? "bg-blue-500 text-white border-white"
                      : "bg-white text-black border-pink-100 hover:bg-blue-100"
                  }`}
                >
                  {i + 1}. {feat}
                </div>
              ))}
              <button
                type="submit"
                className="col-span-full mt-6 py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-gray-700 to-purple-700 hover:from-blue-200 hover:to-blue-800 hover:text-black text-white"
              >
                Submit Answers
              </button>
            </form>
          </div>
        )}

        {/* Result Screen */}
        {finished && result && (
          <div className="max-w-xl w-full p-8 text-center rounded-2xl shadow-2xl bg-gradient-to-br from-[#50e5ac] to-[#1158b0] hover:from-[#168bcf] hover:to-[#dc569e]">
            <h1 className="text-3xl text-white font-bold mb-2">
              🎉 Congratulations, {result.username}!
            </h1>
            <p className="text-white text-lg mb-4">
              Recommended Career:{" "}
              <b className="text-yellow-300">{result.career}</b>
            </p>

            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 py-2 px-6 rounded-md bg-white text-blue-700 font-semibold hover:bg-yellow-100 transition"
            >
              Courses Link
            </a>

            {/* <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full mt-6 py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-gray-700 to-purple-700 hover:from-blue-200 hover:to-blue-800 hover:text-black text-white"
            >
              Go to Dashboard
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}
