import React from "react";
import WordPad from "./editor/WordPad";

const History = ({ state }) => {
  return (
    <>
      {state.map((e, idx) => {
        const data = e.split(":");
        const correctness = data[1].split("").map((c) => +c);
        return (
          <WordPad
            key={idx}
            word={data[0]}
            correctness={correctness}
            currentSelection={null}
            setCurrentSelection={() => {}}
            hasPointer={false}
          />
        );
      })}
    </>
  );
};

export default History;
