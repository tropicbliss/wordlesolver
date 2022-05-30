import React, { useState } from "react";
import RoundedButton from "./RoundedButton";

const BottomNavigation = ({ correctness, next, isLoading, completed }) => {
  const [shake, setShake] = useState(false);

  const animate = () => {
    setShake(true);
    setTimeout(() => setShake(false), 250);
  };

  const onClick = () => {
    const isAllFilled = !correctness.includes(null);
    isAllFilled ? next() : animate();
  };

  return (
    <div className="flex justify-end pr-6 py-3 items-end space-x-3">
      <RoundedButton
        text="Completed"
        onClick={completed}
        isShake={false}
        disabled={isLoading}
      />
      <RoundedButton
        text="Next"
        onClick={onClick}
        isShake={shake}
        disabled={isLoading}
      />
    </div>
  );
};

export default BottomNavigation;
