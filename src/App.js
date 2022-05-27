import { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { GlobalContext } from "./context/GlobalState";
import HardModeSwitch from "./components/hardmode/HardModeSwitch";
import Editor from "./components/editor/Editor";
import BottomNavigation from "./components/navigation/BottomNavigation";
import BlockedWords from "./components/blockedwords/BlockedWords";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EndScreenGrid from "./components/EndScreenGrid";

function App() {
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

  const toggleHardMode = (flag) => {
    setMode(flag);
  };

  useEffect(() => {
    localStorage.theme = theme;
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  });

  useEffect(() => {
    localStorage.isHardMode = isHardMode;
  });

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const [correctness, setCorrectness] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [blockedWords, setBlockedWords] = useState([]);

  const [result, setResult] = useState("tares");

  const [state, setState] = useState([]);

  const { stage, changePageTo } = useContext(GlobalContext);

  const [currentSelection, setCurrentSelection] = useState(0);

  const [loading, setLoading] = useState(false);

  const executeRequest = async (payload) => {
    if (correctness.filter((c) => c === "correct").length === 5) {
      changePageTo("endPage");
      return;
    }
    const res = await fetch("https://retrun.tropicbliss.net/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: payload,
        blocked: blockedWords,
        hardMode: isHardMode,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(`An error occurred: HTTP ${response.status}`);
        }
        return response;
      })
      .catch((error) => {
        throw Error(error);
      });
    const data = await res.json();
    return data;
  };

  const next = async () => {
    if (correctness.filter((c) => c === 3).length === 5) {
      changePageTo("endPage");
      toast.success(
        "Successfully solved Wordle! Give this project a star on GitHub if you've enjoyed it",
        {
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        }
      );
      return;
    }
    if (state.length === 14) {
      toast.update(id, {
        render: "Unfortunately, only a maximum of 14 guesses are allowed",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      setLoading(false);
      return;
    }
    const id = toast.loading("Processing...");
    setLoading(true);
    const currentPayloadUnit = result + ":" + correctness.join("");
    const currentPayload = [...state, currentPayloadUnit].join(",");
    let res = null;
    try {
      res = await executeRequest(currentPayload);
    } catch (e) {
      toast.update(id, {
        render: e.toString(),
        type: "error",
        isLoading: false,
      });
      setLoading(false);
      return;
    }
    if (res === null) {
      toast.update(id, {
        render: "Unable to find any words",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      setLoading(false);
      setCurrentSelection(0);
      return;
    }
    setResult(res.guess);
    setState([...state, currentPayloadUnit]);
    setCorrectness([null, null, null, null, null]);
    setCurrentSelection(0);
    if (stage === "firstPage") {
      changePageTo("midPages");
    }
    if (res.count === 1) {
      toast.update(id, {
        render: "You should get this on your next one",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    } else {
      toast.update(id, {
        render: `${res.count} words left`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    setLoading(false);
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

  const home = () => {
    setResult("tares");
    if (stage === "endPage") {
      setCorrectness([null, null, null, null, null]);
    } else {
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

  return (
    <>
      <Header
        onToggleDarkMode={toggleTheme}
        theme={theme}
        previous={previous}
        home={home}
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
        />
      )}
      {stage !== "endPage" && (
        <BottomNavigation
          correctness={correctness}
          next={next}
          isLoading={loading}
        />
      )}
      {stage === "firstPage" && (
        <BlockedWords
          blockedWords={blockedWords}
          setBlockedWords={setBlockedWords}
        />
      )}
      {stage === "endPage" && <EndScreenGrid finalWord={result} />}
      <ToastContainer theme={theme} hideProgressBar transition={Slide} />
    </>
  );
}

export default App;
