import { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { GlobalContext } from "./context/GlobalState";
import HardModeSwitch from "./components/hardmode/HardModeSwitch";
import Editor from "./components/editor/Editor";
import BottomNavigation from "./components/navigation/BottomNavigation";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EndScreenGrid from "./components/EndScreenGrid";
import { Keyboard } from "./components/editor/Keyboard";

function App() {
  const [result, setResult] = useState("");
  const [state, setState] = useState([]);
  const { stage, changePageTo } = useContext(GlobalContext);
  const [currentSelection, setCurrentSelection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [worker, setWorker] = useState(null);
  const [isNextJiggle, setNextJiggle] = useState(false);
  const [correctness, setCorrectness] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [theme, setTheme] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light"
  );
  const [isHardMode, setMode] = useState(
    localStorage.isHardMode === "true" || false
  );

  useEffect(() => {
    const worker = new Worker(new URL("./workers/solver.js", import.meta.url));
    setWorker(worker);
  }, []);

  useEffect(() => {
    localStorage.theme = theme;
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    localStorage.isHardMode = isHardMode;
  }, [isHardMode]);

  const toggleHardMode = (flag) => {
    setMode(flag);
  };

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const next = () => {
    const isValid = !correctness.includes(null) && result.length === 5;
    if (!isValid) {
      setNextJiggle(true);
      setTimeout(() => setNextJiggle(false), 250);
      return;
    }
    if (!worker) {
      toast.warn("The web worker has not started yet, please try again");
      return;
    }
    if (correctness.filter((c) => c === "correct").length === 5) {
      changePageTo("endPage");
      return;
    }
    if (correctness.filter((c) => c === 3).length === 5) {
      changePageTo("endPage");
      toast.success(
        "Successfully solved Wordle! Give this project a star on GitHub if you've enjoyed it",
        {
          autoClose: 1000,
          closeOnClick: true,
        }
      );
      return;
    }
    const id = toast.loading("Processing...");
    setLoading(true);
    const currentPayloadUnit = result + ":" + correctness.join("");
    const currentPayload = [...state, currentPayloadUnit].join(",");
    worker.postMessage({
      state: currentPayload,
      isHardMode,
    });
    worker.onmessage = (e) => {
      const data = e.data;
      if (data === null) {
        toast.update(id, {
          render: "Unable to find any words",
          type: "warning",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
        setLoading(false);
        setCurrentSelection(0);
        return;
      }
      setResult(data);
      setState([...state, currentPayloadUnit]);
      setCorrectness([null, null, null, null, null]);
      setCurrentSelection(0);
      if (stage === "firstPage") {
        changePageTo("midPages");
      }
      toast.update(id, {
        render: "Success!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      setLoading(false);
    };
  };

  const home = () => {
    if (stage === "endPage") {
      setResult("");
      setCorrectness([null, null, null, null, null]);
    } else {
      setResult(state[0].split(":")[0]);
      setCorrectness(
        state[0]
          .split(":")[1]
          .split("")
          .map((e) => +e)
      );
    }
    setState([]);
    setCurrentSelection(0);
    changePageTo("firstPage");
  };

  const completed = () => {
    setCorrectness([3, 3, 3, 3, 3]);
    setCurrentSelection(4);
  };

  const onChar = (key) => {
    if (typeof key == "number") {
      correctnessPickerClicked(key);
    } else if (result.length < 5) {
      setResult(result + key.toLowerCase());
    }
  };

  const onEnter = () => {
    next();
  };

  const onDelete = () => {
    setResult(result.slice(0, -1));
  };

  const previous = () => {
    const previousUnit = state.pop();
    const previousResult = previousUnit.split(":");
    setResult(previousResult[0]);
    setState(state);
    setCurrentSelection(0);
    setCorrectness(previousResult[1].split("").map((e) => +e));
    if (state.length === 0) {
      changePageTo("firstPage");
    }
  };

  const correctnessPickerClicked = (c) => {
    let newCorrectness = JSON.parse(JSON.stringify(correctness)); // deep copy
    newCorrectness[currentSelection] = c;
    setCorrectness(newCorrectness);
    advanceSelectionRight();
  };

  const advanceSelectionRight = () => {
    currentSelection !== 4 && setCurrentSelection(currentSelection + 1);
  };

  const advanceSelectionLeft = () => {
    currentSelection !== 0 && setCurrentSelection(currentSelection - 1);
  };

  return (
    <div className="dark:bg-slate-900">
      <Header
        onToggleDarkMode={toggleTheme}
        theme={theme}
        home={home}
        previous={previous}
        isLoading={loading}
      />
      {stage === "firstPage" && (
        <HardModeSwitch toggleHardMode={toggleHardMode} hardMode={isHardMode} />
      )}
      {stage !== "endPage" && (
        <Editor
          correctness={correctness}
          setCorrectness={setCorrectness}
          word={result}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          theme={theme}
          correctnessPickerClicked={correctnessPickerClicked}
          state={state}
        />
      )}
      {stage !== "endPage" && (
        <BottomNavigation
          next={next}
          isLoading={loading}
          completed={completed}
          isJiggle={isNextJiggle}
        />
      )}
      <Keyboard
        onChar={onChar}
        onEnter={onEnter}
        onDelete={onDelete}
        advanceSelectionLeft={advanceSelectionLeft}
        advanceSelectionRight={advanceSelectionRight}
        home={home}
      />
      {stage === "endPage" && (
        <EndScreenGrid finalWord={result} state={state} />
      )}
      <ToastContainer theme={theme} hideProgressBar transition={Slide} />
    </div>
  );
}

export default App;

// The code is spaghetti and meatballs :P
