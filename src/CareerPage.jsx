import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function CareerPage() {
  const [searchParams] = useSearchParams();
  const stream = searchParams.get("stream");

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/careerLinks.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json[stream]);
      });
  }, [stream]);

  if (!data) {
    return <div className="text-center text-xl mt-10">Loading resources...</div>;
  }

  return (
    <div 
      className="bg-gradient-to-tr from-[#2aa3ce] via-[#dfae53] to-[#2aa3ce]
                 max-w-3xl mx-auto my-10 p-10 rounded-xl shadow-2xl
                 transition duration-300 hover:shadow-[0_0_40px_rgba(42,163,206)]
                 hover:border-2 hover:border-white
                 hover:bg-gradient-to-tr hover:from-[#792ace] hover:via-[#53dfcc] hover:to-[#ed2ba9]"
    >
      <h2 className="text-center text-white font-bold text-3xl mb-6">
        {data.title}
      </h2>

      <div className="space-y-4">
        {data.resources.map((item, index) => (
          <div
            key={index}
            onClick={() => window.open(item.url, "_blank")}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.02]
                       transition cursor-pointer"
          >
            <p className="text-lg font-semibold text-gray-900">{item.name}</p>
            <p className="text-blue-600 underline">{item.url}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 text-lg font-bold rounded 
                    border-2 border-black bg-gradient-to-r from-[#609eef] to-[#d4cccc]
                    hover:from-[#4599b0] hover:to-[#e6ce1a] hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
}
