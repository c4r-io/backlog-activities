import { createContext, useReducer, useState } from "react";
import {  } from "../utils/apibase";
export const UiDataContext = createContext();

export const UiDataProvider = ({ children }) => {
 
   function reducer(state, action) {
    switch (action.type) {
      case "getUiData": {
        return {
          ...state,
          uiContents: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  }
  const [uiData, dispatchUiData] = useReducer(reducer, {
    uiContents: {
      headerTitle:"What research area interests you most?",
      content:"r2r_research_questions_duq",
      footer:"r2r_research_questions_duq",
    }
  });
  return (
    <UiDataContext.Provider value={{ uiData, dispatchUiData }}>
      {children}
    </UiDataContext.Provider>
  );
};
