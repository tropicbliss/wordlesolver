import React from "react";
import Cell from "./Cell";

const WordPad = ({
  word,
  currentSelection,
  correctness,
  setCurrentSelection,
  hasPointer,
}) => {
  return (
    <div className="flex justify-center mb-1">
      {[...Array(5).keys()].map((idx) => (
        <Cell
          key={idx}
          letter={word[idx]}
          isSelected={currentSelection === idx}
          correctness={correctness[idx]}
          onClick={() => setCurrentSelection(idx)}
          hasInfo={idx === 4}
          hasPointer={hasPointer}
        />
      ))}
    </div>
  );
};

export default WordPad;
