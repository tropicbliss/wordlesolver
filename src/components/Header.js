import React, { useContext } from "react";
import { FaArrowLeft, FaHome, FaGithub, FaSun, FaMoon } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalState";

const clickability = { firstPage: [], midPages: [1, 2], endPage: [2] };

const Header = ({ onToggleDarkMode, theme, previous, home }) => {
  const { stage } = useContext(GlobalContext);
  const isClickable = clickability[stage];

  function hidden(id) {
    return isClickable.includes(id) ? "" : "invisible";
  }

  return (
    <header className="flex justify-between px-3 py-3 bg-slate-900 dark:border-b dark:border-gray-600 space-x-3 text-white">
      <div className="flex space-x-3 items-center text-2xl">
        <FaArrowLeft
          cursor="pointer"
          className={hidden(1)}
          onClick={() => previous()}
        />
        <FaHome cursor="pointer" className={hidden(2)} onClick={() => home()} />
      </div>
      <div className="text-xl font-bold select-none text-center md:text-2xl">
        Wordle Solver
      </div>
      <div className="flex space-x-3 items-center text-2xl">
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
