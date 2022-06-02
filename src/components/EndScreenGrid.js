import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import WordPad from "./editor/WordPad";
import History from "./History";

const EndScreenGrid = ({ finalWord, state }) => {
  const { width, height } = useWindowSize();

  return (
    <div className="my-6">
      <History state={state} />
      <WordPad
        word={finalWord}
        correctness={[3, 3, 3, 3, 3]}
        currentSelection={null}
        setCurrentSelection={null}
      />
      <Confetti width={width} height={height} recycle={false} />
    </div>
  );
};

export default EndScreenGrid;
