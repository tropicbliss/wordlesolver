import React from "react";
import { FaTimes } from "react-icons/fa";

const Words = ({ words, onDelete }) => {
  return (
    <>
      {words.map((word) => (
        <div
          key={word}
          className="flex justify-between py-3 px-6 text-white bg-indigo-500 border-b border-gray-600 text-lg items-center md:text-xl"
        >
          <h3>{word}</h3>
          <FaTimes
            className="text-red-500 cursor-pointer"
            onClick={() => onDelete(word)}
          />
        </div>
      ))}
    </>
  );
};

export default Words;
