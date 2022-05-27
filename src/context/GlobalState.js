import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  stage: "firstPage",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function changePageTo(page) {
    dispatch({ type: "PAGE_CHANGE", payload: page });
  }

  return (
    <GlobalContext.Provider value={{ stage: state.stage, changePageTo }}>
      {children}
    </GlobalContext.Provider>
  );
};
