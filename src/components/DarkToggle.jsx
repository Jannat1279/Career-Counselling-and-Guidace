import React from "react";

export default function DarkToggle({ dark, setDark }) {
  return (
    <div className="fixed top-4 right-6 z-50">
      <label className="relative inline-block w-14 h-8">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={dark}
          onChange={() => setDark(!dark)}
        />
        <span
          className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0
                     bg-gray-800 rounded-full before:absolute before:content-['']
                     before:h-6 before:w-6 before:left-1 before:bottom-1
                     before:bg-white before:rounded-full before:transition
                     transition duration-300"
        />
      </label>
    </div>
  );
}
