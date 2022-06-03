import React from "react";
import History from "../History";
import CorrectnessPicker from "./CorrectnessPicker";
import WordPad from "./WordPad";

const Editor = ({
  correctness,
  correctnessPickerClicked,
  word,
  currentSelection,
  setCurrentSelection,
  theme,
  state,
}) => {
  return (
    <div className="my-6">
      <div className="flex flex-col space-y-3 items-center">
        <div>
          <History state={state} />
          <WordPad
            currentSelection={currentSelection}
            setCurrentSelection={setCurrentSelection}
            word={word}
            correctness={correctness}
            theme={theme}
          />
        </div>
        <CorrectnessPicker onClick={correctnessPickerClicked} />
      </div>
    </div>
  );
};

export default Editor;
