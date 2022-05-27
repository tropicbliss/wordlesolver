import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import WordPad from "./editor/WordPad";

const EndScreenGrid = ({ finalWord }) => {
  const { width, height } = useWindowSize();

  return (
    <div className="py-3">
      <WordPad
        word={finalWord}
        correctness={[3, 3, 3, 3, 3]}
        currentSelection={null}
        setCurrentSelection={() => {}}
        hasPointer={false}
      />
      <Confetti width={width} height={height} recycle={false} />
    </div>
  );
};

export default EndScreenGrid;
