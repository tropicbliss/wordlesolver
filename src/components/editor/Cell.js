import React from "react";
import classnames from "classnames";

const Cell = ({ letter, isSelected, correctness, onClick }) => {
  const classes = classnames(
    "w-14 h-14 border-solid flex items-center justify-center mx-0.5 text-4xl font-bold rounded select-none relative transition-color duration-150 ease-out border-2 dark:text-white",
    {
      "cursor-pointer": onClick,
      "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-600":
        !correctness && !isSelected,
      "bg-white border-indigo-500 dark:bg-slate-900":
        !correctness && isSelected,
      "border-black dark:border-slate-100":
        letter && !correctness && !isSelected,
      "border-indigo-500": letter && !correctness && isSelected,
      "absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700":
        correctness === 1 && !isSelected,
      "shadowed bg-slate-400 dark:bg-slate-700 text-white border-indigo-500":
        correctness === 1 && isSelected,
      "shadowed bg-green-500 text-white border-green-500":
        correctness === 3 && !isSelected,
      "shadowed bg-green-500 text-white border-indigo-500":
        correctness === 3 && isSelected,
      "shadowed bg-yellow-500 text-white border-yellow-500":
        correctness === 2 && !isSelected,
      "shadowed bg-yellow-500 text-white border-indigo-500":
        correctness === 2 && isSelected,
    }
  );

  if (onClick) {
    return (
      <div className={classes} onClick={() => onClick()}>
        <div>{letter === undefined ? "" : letter.toUpperCase()}</div>
      </div>
    );
  } else {
    return (
      <div className={classes}>
        <div>{letter === undefined ? "" : letter.toUpperCase()}</div>
      </div>
    );
  }
};
export default Cell;
