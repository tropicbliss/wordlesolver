import React from "react";
import classnames from "classnames";

const RoundedButton = ({ text, onClick, isShake, disabled }) => {
  const classes = classnames(
    "inline-flex justify-center items-center text-center mt-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none sm:text-sm",
    {
      jiggle: isShake,
    }
  );

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default RoundedButton;
