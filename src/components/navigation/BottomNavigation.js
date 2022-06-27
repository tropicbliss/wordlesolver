import React from "react";
import RoundedButton from "./RoundedButton";

const BottomNavigation = ({ next, isLoading, completed, isJiggle }) => {
  return (
    <div className="flex justify-end mx-3 my-3 items-end space-x-3">
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
