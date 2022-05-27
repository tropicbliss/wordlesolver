import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SettingsToggle = ({ flag, handleFlag }) => {
  const toggleHolder = classnames(
    "w-14 h-8 flex shrink-0 items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer",
    {
      "bg-green-400": flag,
    }
  );
  const toggleButton = classnames(
    "bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out cursor-pointer",
    {
      "translate-x-6": flag,
    }
  );
  return (
    <div className={toggleHolder} onClick={() => handleFlag(!flag)}>
      <div className={toggleButton} />
    </div>
  );
};

SettingsToggle.propTypes = {
  flag: PropTypes.bool,
  handleFlag: PropTypes.func,
};

export default SettingsToggle;
