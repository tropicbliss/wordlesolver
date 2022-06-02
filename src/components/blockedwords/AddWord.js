import React from "react";
import { toast } from "react-toastify";

const AddWord = ({ onAdd, blockedWords, word, setWord }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const lowercaseWord = word.toLowerCase();
    const isValid =
      /^^[a-z]{5}$/.test(lowercaseWord);
    if (!isValid) {
      toast.warn("Please submit a valid word");
      setWord("");
      return;
    }
    if (blockedWords.includes(word)) {
      toast.warn("The word you are adding is already in the list");
      setWord("");
      return;
    }
    setWord("");
    onAdd(lowercaseWord);
  };

  return (
    <form
      className="text-white py-3 pl-3 pr-6 text-lg md:text-xl flex justify-between space-x-3 items-center"
      onSubmit={onSubmit}
    >
      <input
        className="min-w-0 rounded-md border border-gray-300 px-3 py-2 text-gray-900 dark:text-white dark:bg-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        id="word"
        type="text"
        placeholder="Add new word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <input
        className="px-3 py-1 font-semibold bg-indigo-500 text-white rounded-md shadow-sm md:text-2xl"
        type="submit"
        value="Save"
      />
    </form>
  );
};

export default AddWord;
