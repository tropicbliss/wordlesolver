import React from "react";
import CorrectnessPicker from "./CorrectnessPicker";
import WordPad from "./WordPad";

const Editor = ({
  correctness,
  correctnessPickerClicked,
  word,
  currentSelection,
  setCurrentSelection,
  theme,
}) => {
  return (
    <div className="my-6">
      <div className="flex flex-col space-y-3 items-center">
        <WordPad
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          word={word}
          correctness={correctness}
          hasPointer={true}
          theme={theme}
        />
        <CorrectnessPicker onClick={correctnessPickerClicked} />
      </div>
    </div>
  );
};

export default Editor;
