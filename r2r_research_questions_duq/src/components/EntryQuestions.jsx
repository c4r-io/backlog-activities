"use client";
import React, { useEffect, useRef } from "react";
import TopCardUi from "./cards/TopCardUi.jsx";

import { api } from "../utils/apibase.js";
import {
  MyQuestionsContext,
  AllQuestionsContext,
} from "../contextapi/QuestionsDataProvider.jsx";
export default function EntryQuestions() {
  const { myQuestions, dispatchMyQuestions } =
    React.useContext(MyQuestionsContext);

  const { allQuestions, dispatchAllQuestions } =
    React.useContext(AllQuestionsContext);

  async function getUiData() {
    const config = {
      method: "get",
      url: "/api/pythonExecutorUi",
    };
    try {
      const response = await api.request(config);
      dispatchUiData({
        type: "getUiData",
        payload: response.data.pythonExecutorUis[0],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const getMyQuestions = (type) => {
    const ql = allQuestions.questions.filter((e) => e.questionType == type);
    const qlWithAnsOption = ql.map((e) => {
      const awn = { ...e, question1Answer: "", question2Answer: "" };
      return awn;
    });
    dispatchMyQuestions({ type: "setMyQuestions", payload: qlWithAnsOption });
  };
  const updateSelected = (type) => {
    getMyQuestions(type);
    dispatchMyQuestions({
      type: "SelectType",
      payload: type,
    });
  };
  return (
    <div className="overflow-hidden">
      <TopCardUi />
      <div className="ps-4 pe-14 widget">
        <div className="mx-3 p-1 pb-1 border-x-2 space-y-3 border-ui-violet rounded-xl bg-[#171819] text-white">
          <div className="p-3 pb-1 mt-3">
            <div className=" min-h-[150px] mx-auto flex items-center text-sm sm:text-base">
            
              <div className="w-full buttons">
                <div className="flex -m-1">
                  <div className="p-1 w-1/3">
                  <div className=" generative ">
                    <button
                      className="w-full py-2 unclicked !text-xs"
                      onClick={() => updateSelected("Public Health")}
                    >
                      Public Health
                    </button>
                  </div>
                  </div>
                  <div className="p-1 w-1/3">
                  <div className=" progressive ">
                    <button
                      className="w-full py-2 unclicked !text-white !text-xs"
                      onClick={() => updateSelected("Clinical Science")}
                    >
                      Clinical Science
                    </button>
                  </div>
                  </div>
                  <div className="p-1 w-1/3">

                  <div className=" passive ">
                    <button
                      className="w-full py-2 unclicked !text-xs"
                      onClick={() => updateSelected("General Science")}
                    >
                      General Science
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
