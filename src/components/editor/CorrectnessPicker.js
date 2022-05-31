import React from "react";
import Cell from "./Cell";

const CorrectnessPicker = ({ onClick }) => {
  return (
    <div className="flex justify-center mb-1">
      {[...Array(3).keys()].map((i) => {
        const idx = i + 1;
        return (
          <Cell
            key={i}
            letter={undefined}
            correctness={idx}
            onClick={() => onClick(idx)}
          />
        );
      })}
    </div>
  );
};

export default CorrectnessPicker;
