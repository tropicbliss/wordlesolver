import React from "react";

export const Key = ({ children, width = 40, value, onClick }) => {
  const styles = {
    width: `${width}px`,
    height: "58px",
  };

  const handleClick = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <button
      style={styles}
      aria-label={value}
      className="flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400"
      onClick={handleClick}
    >
      {children || value}
    </button>
  );
};
