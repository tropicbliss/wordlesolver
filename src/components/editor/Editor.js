import React from "react";
import CorrectnessPicker from "./CorrectnessPicker";
import WordPad from "./WordPad";

const Editor = ({
  correctness,
  setCorrectness,
  word,
  currentSelection,
  setCurrentSelection,
}) => {
  function correctnessPickerClicked(c) {
    let newCorrectness = JSON.parse(JSON.stringify(correctness)); // deep copy
    newCorrectness[currentSelection] = c;
    setCorrectness(newCorrectness);
    currentSelection !== 4 && setCurrentSelection(currentSelection + 1);
  }

  return (
    <div className="py-3">
      <div className="flex flex-col space-y-3 items-center">
        <WordPad
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          word={word}
          correctness={correctness}
          hasPointer={true}
        />
        <CorrectnessPicker onClick={correctnessPickerClicked} />
      </div>
    </div>
  );
};

export default Editor;
