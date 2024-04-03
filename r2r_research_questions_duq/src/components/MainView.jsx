"use client";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  MyQuestionsContext,
  AllQuestionsContext,
} from "../contextapi/QuestionsDataProvider.jsx";
import EntryQuestions from "./EntryQuestions.jsx";

import MultipleQuestions from "./MultipleQuestions.jsx";
import { api } from "../utils/apibase.js";
import Alert1 from "./CustomAlert/Alert1.jsx";
export default function MainView() {
  const { myQuestions, dispatchMyQuestions } =
    React.useContext(MyQuestionsContext);
  const { allQuestions, dispatchAllQuestions } =
    React.useContext(AllQuestionsContext);

  const [listLoading, setListLoading] = React.useState(false);
  const getresearchQuestionsList = async (page) => {
    const config = {
      method: "GET",
      url: "api/researchQuestion",
      params: {
        pageNumber: page,
        pageSize: 1000,
      },
    };
    setListLoading(true);
    try {
      const response = await api.request(config);
      // setResearchQuestionList(response?.data?.researchQuestions);
      dispatchAllQuestions({
        type: "setAllQuestions",
        payload: response?.data?.researchQuestions,
      });
      console.log(response.data);
      setListLoading(false);
    } catch (error) {
      console.log(error);
      setListLoading(false);
    }
  };
  useEffect(() => {
    if (allQuestions.questions.length == 0) {
      getresearchQuestionsList(1);
    }
  }, []);
  const getSelectorText = async (pge) => {
    const config = {
      method: "GET",
      url: "api/resurch_question_status_selector",
      params: {
        pageSize: 1,
      },
    };
    setListLoading(true);
    try {
      const response = await api.request(config);
      dispatchAllQuestions({
        type: "setSelectorContent",
        payload: response?.data?.resurchQuestionStatusSelectors[0],
      });
      console.log(response.data);
      setListLoading(false);
    } catch (error) {
      console.log(error);
      setListLoading(false);
    }
  };
  useEffect(() => {
    if (allQuestions.questions.length == 0) {
      getSelectorText(1);
    }
  }, []);
  return (
    <div
      className={`flex justify-center ${listLoading ? "cursor-wait" : ""}`}
    >
      <div className={`annotation max-w-[750px] ${listLoading ? " pointer-events-none" : ""}`}>
        {!myQuestions.selectedType ? <EntryQuestions /> : <MultipleQuestions />}
      </div>
    </div>
  );
}
