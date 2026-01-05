import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is this platform about?",
      answer:
        "The system helps users identify suitable career paths based on their interests and skills.",
    },
    {
      question: "How does the system help users choose a career path?",
      answer:
        "It analyzes quiz responses to recommend careers aligning with user skills, interests, and strengths.",
    },
    {
      question: "How does the quiz feature work in career counseling?",
      answer:
        "Users answer questions about their interests, and the system suggests careers accordingly.",
    },
     {
      question: "Does the system require user registration to access features?",
      answer:
        "Yes, users need to register to save quiz results and access personalized recommendations.",
    },
     {
      question: "What makes this system different from other career counseling platforms?",
      answer:
        "It offers a user-friendly interface, quiz-based recommendations, and a history-tracking feature for career guidance.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" bg-white py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-10">
        Frequently Asked Questions
      </h1>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
