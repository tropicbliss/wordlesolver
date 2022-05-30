import React, { useContext } from "react";
import { FaHome, FaGithub, FaSun, FaMoon, FaArrowLeft } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { GlobalContext } from "../context/GlobalState";

const Header = ({ onToggleDarkMode, theme, home, previous }) => {
  const { stage } = useContext(GlobalContext);

  return (
    <header className="flex justify-between px-3 py-3 bg-slate-900 dark:border-b dark:border-gray-600 space-x-3 text-white">
      <div className="text-xl select-none md:text-2xl flex items-center space-x-3">
        <GiBrain className="text-orange-200" />
        <h3 className="font-bold">Wordle Solver</h3>
      </div>
      <div className="flex space-x-3 items-center text-2xl">
        <div className="flex space-x-3 items-center text-2xl">
          <button
            className={stage !== "midPages" ? "hidden" : ""}
            onClick={() => previous()}
          >
            <FaArrowLeft />
          </button>
          <button
            className={stage === "firstPage" ? "hidden" : ""}
            onClick={() => home()}
          >
            <FaHome />
          </button>
        </div>
        {theme === "dark" ? (
          <FaSun cursor="pointer" onClick={onToggleDarkMode} />
        ) : (
          <FaMoon cursor="pointer" onClick={onToggleDarkMode} />
        )}
        <a
          href="https://github.com/tropicbliss/wordlesolver"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </header>
  );
};

export default Header;
