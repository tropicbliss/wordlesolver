import React from "react";
import Cell from "./Cell";

const WordPad = ({
  word,
  currentSelection,
  correctness,
  setCurrentSelection,
  theme,
}) => {
  return (
    <div className="flex justify-center mb-1">
      {correctness.map((c, idx) => (
        <Cell
          key={idx}
          letter={word[idx]}
          isSelected={currentSelection === idx}
          correctness={c}
          onClick={() => setCurrentSelection(idx)}
          hasInfo={idx === 4}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default WordPad;
