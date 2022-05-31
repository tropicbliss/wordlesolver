import React, { Key } from "./Key";
import { useEffect } from "react";

export const Keyboard = ({ onChar, onDelete, onEnter }) => {
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
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key;
        if (key.length === 1 && key >= "a" && key <= "z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

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
};
