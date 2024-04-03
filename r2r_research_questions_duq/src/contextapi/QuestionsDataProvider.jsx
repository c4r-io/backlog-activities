import { createContext, useReducer, useState } from "react";
import {} from "../utils/apibase";
export const AllQuestionsContext = createContext();
export const MyQuestionsContext = createContext();

export const QuestionsDataProvider = ({ children }) => {
  function allQuestionReducer(state, action) {
    switch (action.type) {
      case "setAllQuestions": {
        return {
          ...state,
          questions: action.payload,
        };
      }
      case "setSelectorContent": {
        return {
          ...state,
          selectorContent: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  }
  function myQuestionReducer(state, action) {
    switch (action.type) {
      case "setAnswerSubmitted": {
        return {
          ...state,
          answerSubmitted: action.payload,
        };
      }
      case "removeAnswered": {
        return {
          ...state,
          answered: false,
        };
      }
      case "setAnswered": {
        return {
          ...state,
          answered: true,
        };
      }
      case "setMyQuestions": {
        return {
          ...state,
          questions: action.payload,
        };
      }
      case "setCollectUserQuestion": {
        return {
          ...state,
          collectUserQuestion: true,
        };
      }
      case "removeCollectUserQuestion": {
        return {
          ...state,
          collectUserQuestion: false,
        };
      }
      case "setAnswer1": {
        const qlWithAnsOption = JSON.parse(JSON.stringify(state.questions)).map(
          (e, i) => {
            if (state.currentStep !== i) return e;
            const awn = { ...e, question1Answer: action.payload };
            return awn;
          }
        );
        return {
          ...state,
          questions: qlWithAnsOption,
        };
      }
      case "setAnswer2": {
        const qlWithAnsOption = JSON.parse(JSON.stringify(state.questions)).map(
          (e, i) => {
            if (state.currentStep !== i) return e;
            const awn = { ...e, question2Answer: action.payload };
            return awn;
          }
        );
        return {
          ...state,
          questions: qlWithAnsOption,
        };
      }

      case "SelectType": {
        return {
          ...state,
          selectedType: action.payload,
        };
      }
      case "next": {
        return {
          ...state,
          currentStep: Number(state.currentStep + 1),
        };
      }
      case "prev": {
        return {
          ...state,
          currentStep: Number(state.currentStep - 1),
        };
      }
      case "resetSteps": {
        return {
          ...state,
          currentStep: 0,
        };
      }

      default: {
        return state;
      }
    }
  }

  const [allQuestions, dispatchAllQuestions] = useReducer(allQuestionReducer, {
    questions: [],
    selectorContent: {},
  });
  const [myQuestions, dispatchMyQuestions] = useReducer(myQuestionReducer, {
    questions: [],
    selectedType: "",
    currentStep: 0,
    answered: false,
    collectUserQuestion: false,
  });

  return (
    <AllQuestionsContext.Provider
      value={{ allQuestions, dispatchAllQuestions }}
    >
      <MyQuestionsContext.Provider value={{ myQuestions, dispatchMyQuestions }}>
        {children}
      </MyQuestionsContext.Provider>
    </AllQuestionsContext.Provider>
  );
};
