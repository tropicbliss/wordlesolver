import React from "react";
import SettingsToggle from "./SettingsToggle";

const HardModeSwitch = ({ toggleHardMode, hardMode }) => {
  return (
    <div className="flex justify-end mx-3 my-6 space-x-3 items-center dark:text-white">
      <div>Hard Mode</div>
      <SettingsToggle handleFlag={toggleHardMode} flag={hardMode} />
    </div>
  );
};

export default HardModeSwitch;
