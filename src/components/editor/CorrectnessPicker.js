import React from "react";
import Cell from "./Cell";

const CorrectnessPicker = ({ onClick }) => {
  return (
    <div className="flex justify-center mb-1">
      <Cell letter="" correctness={1} onClick={() => onClick(1)} />
      <Cell letter="" correctness={2} onClick={() => onClick(2)} />
      <Cell letter="" correctness={3} onClick={() => onClick(3)} />
    </div>
  );
};

export default CorrectnessPicker;
