import React, { useContext } from "react";
import classnames from "classnames";
import { FcInfo } from "react-icons/fc";
import ReactTooltip from "react-tooltip";
import { GlobalContext } from "../../context/GlobalState";

const Cell = ({
  letter,
  isSelected,
  correctness,
  onClick,
  hasInfo,
  hasPointer,
}) => {
  const { stage } = useContext(GlobalContext);
  const classes = classnames(
    "w-14 h-14 border-solid flex items-center justify-center mx-0.5 text-4xl font-bold rounded select-none relative transition-all dark:text-white",
    {
      "cursor-pointer": hasPointer,
      "border-4": isSelected,
      "border-2": !isSelected,
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

  return (
    <div className={classes} onClick={() => onClick()}>
      <div>{letter.toUpperCase()}</div>
      {stage === "firstPage" && hasInfo && (
        <>
          <ReactTooltip effect="solid" />
          <FcInfo
            data-tip="Unfortunately to minimise the load placed on the backend server, starting with the word 'tares' is imperative."
            className="text-2xl absolute -right-3 -top-3"
          />
        </>
      )}
    </div>
  );
};
export default Cell;
