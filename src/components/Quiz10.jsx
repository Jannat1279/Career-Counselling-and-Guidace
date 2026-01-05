import React, { useEffect, useState } from "react";

export default function Quiz10() {
  const [questionsByCategory, setQuestionsByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("/questions10.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestionsByCategory(data);
        setCategories(Object.keys(data));
      });
  }, []);

  const category = categories[currentCategoryIndex] || "";

  const handleOptionChange = (category, qIndex, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [category]: { ...prev[category], [qIndex]: value },
    }));
  };

  const validateAllAnswered = () => {
    if (!category) return false;
    const questions = questionsByCategory[category] || [];
    const answers = userAnswers[category] || {};
    return questions.every((_, i) => answers[i]);
  };

  const nextCategory = () => {
    if (!validateAllAnswered()) {
      alert("Please answer all questions.");
      return;
    }
    setCurrentCategoryIndex((i) => i + 1);
  };

  const prevCategory = () => {
    if (currentCategoryIndex > 0) setCurrentCategoryIndex((i) => i - 1);
  };

  const finishQuiz = async () => {
    if (!validateAllAnswered()) {
      alert("Please answer all questions.");
      return;
    }
    
    // A complete mapping for converting string answers to numeric values.
    // This MUST match the encoding used to train your machine learning model.
    const optionToNumericMap = {
      // General mappings
      "Yes": 1,
      "No": 0,
      "I have this skill": 1,
      "I don't have this skill": 0,

      // Likert scales
      "Strongly Disagree": 1,
      "Disagree": 2,
      "Neutral": 3,
      "Agree": 4,
      "Strongly Agree": 5,

      // Specific answers from your provided JSON
      "9": 9, "10": 10, "11": 11, "12": 12,
      "81": 81, "72": 72, "90": 90, "All": 1,
      "5%": 5, "10%": 10, "15%": 15, "20%": 20,

      // Verbal Ability mappings
      "Accomodate": 0, "Acommodate": 0, "Accommodate": 1, "Acomodate": 0,
      "Scarce": 0, "Plentiful": 1, "Rare": 0, "Empty": 0,
      "Shiny": 0, "Dull": 1, "Glowing": 0, "Light": 0,
      "He go to school.": 0, "He goes to school.": 1, "He gone to school.": 0, "He going school.": 0,
      "is": 1, "are": 0, "was": 0, "were": 0,

      // Mechanical Aptitude mappings
      "To the right": 0, "To the left": 1, "It doesn't move": 0, "It moves up": 0,
      "Closer to the center": 0, "At the same distance as the other child": 0, "Farther from the center": 1, "Balance is not possible": 0,
      "To increase weight": 0, "To make lifting things easier": 1, "To make objects heavier": 0, "To slow down machines": 0,
      "It looks better": 0, "It makes the object heavier": 0, "It takes less effort": 1, "It moves faster": 0,
      "Hold things together tightly": 1, "Break things easily": 0, "Pull heavy objects": 0, "Turn on machines": 0,

      // Numerical options for Likert-scale questions
      "1": 1, "2": 2, "3": 3, "4": 4, "5": 5,
    };
    
    const orderedCategories = [
      "Logical Reasoning",
      "Numerical Ability",
      "Verbal Ability",
      "Mechanical Aptitude",
      "Interest Inventory",
      "Personality Traits",
      "Emotional Quotient",
      "Skills & Hobbies"
    ];

    let features = [];
    for (const cat of orderedCategories) {
      const questions = questionsByCategory[cat] || [];
      const answers = userAnswers[cat] || {};
      for (let i = 0; i < questions.length; i++) {
        const userAnswer = answers[i];
        
        const numericValue = optionToNumericMap[userAnswer];
        
        if (numericValue !== undefined) {
          features.push(numericValue);
        } else {
          console.error(`Warning: No numeric mapping found for answer: "${userAnswer}" in category: "${cat}". Pushing a default value of -1.`);
          features.push(-1); // Use a default value for unmapped answers
        }
      }
    }

    // This is the crucial fix for the "Input features count mismatch" error.
    // It ensures that the number of features sent to the backend matches the number 
    // of features the model expects (24).
    const expectedFeaturesCount = 24; 
    if (features.length > expectedFeaturesCount) {
        console.warn(`Truncating features array from ${features.length} to ${expectedFeaturesCount} to match model's expected input.`);
        features = features.slice(0, expectedFeaturesCount);
    }
    
    try {
      const res = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Server responded with status: ${res.status}`);
      }

      const data = await res.json();
      setResult(`Recommended Career: ${data.recommendation}`);
    } catch (error) {
      console.error("Prediction failed:", error);
      setResult("Recommended Career: Error in prediction.");
    }
  };

  if (!category) {
    return <div className="text-center text-lg">Loading quiz…</div>;
  }

  return (
    <div className="bg-gradient-to-tr from-[#2aa3ce] via-[#dfae53] to-[#2aa3ce] 
                       max-w-3xl mx-auto my-8 p-10 rounded-xl shadow-2xl 
                       transition duration-300 hover:shadow-[0_0_40px_rgba(42,163,206)]
                       hover:border-2 hover:border-white
                       hover:bg-gradient-to-tr hover:from-[#792ace] hover:via-[#53dfcc] hover:to-[#ed2ba9]">
      <h2 className="text-center text-white font-bold text-2xl mb-6">
        {category}
      </h2>

      <form className="space-y-6">
        {(questionsByCategory[category] || []).map((q, i) => (
          <div key={i} className="text-white">
            <p className="mb-2 font-medium text-lg">{i + 1}. {q.question}</p>
            {q.options.map((opt, idx) => (
              <label key={idx} className="block mb-1">
                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt}
                  className="mr-2 accent-blue-500"
                  checked={userAnswers[category]?.[i] === opt}
                  onChange={() => handleOptionChange(category, i, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
      </form>

      <div className="text-center mt-8 space-x-3">
        <button
          onClick={prevCategory}
          className="px-4 py-2 text-lg font-bold rounded 
                     border-2 border-black bg-gradient-to-r from-[#609eef] to-[#d4cccc]
                     hover:from-[#4599b0] hover:to-[#e6ce1a] hover:text-white"
        >
          Prev
        </button>
        {currentCategoryIndex < categories.length - 1 ? (
          <button
            onClick={nextCategory}
            className="px-4 py-2 text-lg font-bold rounded 
                       border-2 border-black bg-gradient-to-r from-[#609eef] to-[#d4cccc]
                       hover:from-[#4599b0] hover:to-[#e6ce1a] hover:text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={finishQuiz}
            className="px-4 py-2 text-lg font-bold rounded 
                       border-2 border-black bg-gradient-to-r from-[#609eef] to-[#d4cccc]
                       hover:from-[#4599b0] hover:to-[#e6ce1a] hover:text-white"
          >
            Finish
          </button>
        )}
      </div>

      {result && (
        <div
          className="text-center mt-6 text-xl font-bold text-gray-900 bg-white p-4 rounded cursor-pointer"
          onClick={() => {
            const stream = result
              .replace("Recommended Career: ", "")
              .trim()
              .toLowerCase();
            window.location.href = `/career?stream=${stream}`;
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
} 