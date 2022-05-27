import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const RoundedButton = ({ text, onClick, isShake, disabled }) => {
  const classes = classnames(
    "px-3 py-1 font-semibold text-xl bg-indigo-500 text-white rounded-md shadow-sm md:text-2xl md:px-6 md:py-3",
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

RoundedButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default RoundedButton;
