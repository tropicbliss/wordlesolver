import React from "react";
import RoundedButton from "./RoundedButton";

const BottomNavigation = ({ next, isLoading, completed, isJiggle }) => {
  return (
    <div className="flex justify-end pr-6 my-6 items-end space-x-3">
      <RoundedButton
        text="Completed"
        onClick={completed}
        isShake={false}
        disabled={isLoading}
      />
      <RoundedButton
        text="Next"
        onClick={next}
        isShake={isJiggle}
        disabled={isLoading}
      />
    </div>
  );
};

export default BottomNavigation;
