import { createContext, useReducer, useState } from "react";
import {  } from "../utils/apibase";
export const UiDataContext = createContext();

export const UiDataProvider = ({ children }) => {
 
   function reducer(state, action) {
    switch (action.type) {
      case "getUiData": {
        return {
          ...state,
          uiContentss: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  }
  const [uiData, dispatchUiData] = useReducer(reducer, {
    uiContentss: null,
  });
  return (
    <UiDataContext.Provider value={{ uiData, dispatchUiData }}>
      {children}
    </UiDataContext.Provider>
  );
};
