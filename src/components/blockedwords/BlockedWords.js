import React from "react";
import AddWord from "./AddWord";
import Words from "./Words";

const BlockedWords = ({ blockedWords, setBlockedWords, word, setWord }) => {
  const addWord = (word) => {
    setBlockedWords([...blockedWords, word]);
  };

  const removeWord = (word) =>
    setBlockedWords(blockedWords.filter((w) => w !== word));

  return (
    <>
      <div className="px-6 py-3 mt-3 text-white rounded-t-2xl items-center bg-red-500">
        <header className="text-xl font-bold md:text-2xl">Blocked Words</header>
      </div>
      <AddWord
        onAdd={addWord}
        blockedWords={blockedWords}
        word={word}
        setWord={setWord}
      />
      {blockedWords.length > 0 ? (
        <Words words={blockedWords} onDelete={removeWord} />
      ) : (
        <div className="py-3 px-6 text-white bg-indigo-500 text-lg items-center md:text-xl">
          No words currently blocked
        </div>
      )}
    </>
  );
};

export default BlockedWords;
