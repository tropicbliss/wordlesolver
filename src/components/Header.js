import React, { useContext } from "react";
import { FaHome, FaGithub, FaSun, FaMoon, FaArrowLeft } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { GlobalContext } from "../context/GlobalState";

const Header = ({ onToggleDarkMode, theme, home, previous, isLoading }) => {
  const { stage } = useContext(GlobalContext);

  return (
    <header className="flex justify-between px-3 py-3 text-white text-xl bg-slate-900 dark:border-b dark:border-gray-600 space-x-3 md:text-2xl">
      <div className="select-none flex items-center space-x-3">
        <GiBrain className="text-orange-200" />
        <h3 className="font-bold">Wordle Solver</h3>
      </div>
      <div className="flex space-x-3 items-center">
        <button
          disabled={isLoading}
          hidden={stage !== "midPages"}
          onClick={() => previous()}
        >
          <FaArrowLeft />
        </button>
        <button
          disabled={isLoading}
          hidden={stage === "firstPage"}
          onClick={() => home()}
        >
          <FaHome />
        </button>
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
