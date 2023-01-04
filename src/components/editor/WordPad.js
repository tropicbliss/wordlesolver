import React from "react";
import Cell from "./Cell";

const WordPad = ({
  word,
  currentSelection,
  correctness,
  setCurrentSelection,
}) => {
  return (
    <div className="flex justify-center mb-1">
      {correctness.map((c, idx) => (
        <Cell
          key={idx}
          letter={word[idx]}
          isSelected={currentSelection === idx}
          correctness={c}
          onClick={
            setCurrentSelection === null ? null : () => setCurrentSelection(idx)
          }
        />
      ))}
    </div>
  );
};

export default WordPad;
