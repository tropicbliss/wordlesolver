import { Key } from "./Key";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import React from "react";

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  advanceSelectionRight,
  advanceSelectionLeft,
  home,
}) => {
  const { stage } = useContext(GlobalContext);

  const onClick = (value) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" && stage !== "endPage") {
        onEnter();
      } else if (e.code === "Backspace" && stage === "firstPage") {
        onDelete();
      } else if (e.code === "ArrowRight" && stage !== "endPage") {
        advanceSelectionRight();
      } else if (e.code === "ArrowLeft" && stage !== "endPage") {
        advanceSelectionLeft();
      } else if (e.code === "Escape" && stage !== "firstPage") {
        home();
      } else if (stage !== "endPage") {
        const key = e.key;
        if (key.length === 1) {
          if (key >= "1" && key <= "3") {
            onChar(+key);
          }
          if (key >= "a" && key <= "z" && stage === "firstPage") {
            onChar(key);
          }
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [
    onEnter,
    onDelete,
    onChar,
    advanceSelectionLeft,
    advanceSelectionRight,
    stage,
    home,
  ]);

  if (stage === "firstPage") {
    return (
      <div className="mx-3 my-6">
        <div className="flex justify-center mb-1">
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
            <Key value={key} key={key} onClick={onClick} />
          ))}
        </div>
        <div className="flex justify-center mb-1">
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
            <Key value={key} key={key} onClick={onClick} />
          ))}
        </div>
        <div className="flex justify-center">
          <Key width={65.4} value="ENTER" onClick={onClick}>
            Enter
          </Key>
          {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
            <Key value={key} key={key} onClick={onClick} />
          ))}
          <Key width={65.4} value="DELETE" onClick={onClick}>
            Delete
          </Key>
        </div>
      </div>
    );
  }
};
