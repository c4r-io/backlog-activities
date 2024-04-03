"use client";
import React, { useEffect, useRef, useState } from "react";
import TopCardUi from "./cards/TopCardUi.jsx";

import { api } from "../utils/apibase.js";
import TopCardStudentsThink from "./cards/TopCardStudentsThink.jsx";

import {
  AllQuestionsContext,
  MyQuestionsContext,
} from "../contextapi/QuestionsDataProvider.jsx";

import AnswerResultsCard from "./AnswerResultsCard.jsx";
export default function EntryQuestions() {
  const { allQuestions } =
    React.useContext(AllQuestionsContext);
  const studentAnswersListCallCount = useRef(0);
  const [plottedData, setPlottedData] = useState([]);
  const { myQuestions, dispatchMyQuestions } =
    React.useContext(MyQuestionsContext);
  const [studentsAnswerList, setStudentsAnswerList] = useState({
    page: 1,
    pages: 1,
    studentsAnswers: null,
  });

  const [listLoading, setListLoading] = useState(false);
  const getstudentsAnswersList = async () => {
    const config = {
      method: "GET",
      url: "api/studentsAnswer",
      headers: {},
      params: {
        pageNumber: 1,
        pageSize: 1000,
        select: " question1Answer question2Answer",
        populate: "researchQuestion",
      },
    };
    setListLoading(true);
    try {
      const response = await api.request(config);
      setStudentsAnswerList(response.data);
      console.log(response.data);
      setListLoading(false);
    } catch (error) {
      console.log(error);
      setListLoading(false);
      if (error?.response?.status == 401) {
        toast.error(error.response.data.message + ", Login to try again.", {
          position: "top-center",
        });
        router.push("/");
      } else {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    }
  };

  useEffect(() => {
    if (
      studentsAnswerList.studentsAnswers == null &&
      studentAnswersListCallCount.current < 1
    ) {
      studentAnswersListCallCount.current == 1;
      getstudentsAnswersList();
    }
  });

  useEffect(() => {
    if (studentsAnswerList.studentsAnswers !== null) {
      const answersForSQusType = studentsAnswerList.studentsAnswers.filter(
        (e) => e.researchQuestion.questionType == myQuestions.selectedType
      );
      const listOfPlottedData = [];
      for (const key in myQuestions.questions) {
        const data = {};
        const answersForCurrentQ = studentsAnswerList.studentsAnswers.filter(
          (e) => e.researchQuestion._id == myQuestions.questions[key]._id
        );
        const status_1 = answersForCurrentQ.filter(
          (e) => e.question1Answer == "status_1"
        ).length;
        const status_2 = answersForCurrentQ.filter(
          (e) => e.question1Answer == `status_2`
        ).length;
        const status_3 = answersForCurrentQ.filter(
          (e) => e.question1Answer == `status_3`
        ).length;
        const threeSum = status_1 + status_2 + status_3;
        data[`status_1`] = (Math.round((status_1 / threeSum) * 100)) || 0;
        data[`status_2`] = (Math.round((status_2 / threeSum) * 100)) || 0;
        data[`status_3`] = (100 - (data[`status_1`] + data[`status_2`])) || 0;
        listOfPlottedData.push(data);
      }
      setPlottedData(listOfPlottedData);
    }
  }, [studentsAnswerList.studentsAnswers]);

  return (
    <div className="overflow-hidden">
      <TopCardStudentsThink />
      <div className="ps-4 pe-2 widget">
        <div className="mx-3 px-1 pb-3 pt-2 relative pe-4 border-x-2 space-y-3 border-ui-violet rounded-xl bg-[#171819] text-white">
          <div className="pe-2">
            {plottedData.map((e, i) => (
              <AnswerResultsCard
                key={i}
                questionIndex={i}
                status_1={e[`status_1`]}
                status_2={e[`status_2`]}
                status_3={e[`status_3`]}
              />
            ))}
          </div>
          <div className="w-8 h-[95%] bg-ui-violet absolute right-1 top-0 rounded-tr-md rounded-br-md">
            <div className="font-bold rotate-90 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-pre text-white">Your answers</div>
          </div>
        </div>

        <div className="mx-3 px-5 pb-3 buttons flex justify-end">
          <div className=" progressive ">
            <button
              className="px-14 rounded-sm py-2 unclicked !text-white !text-xs"
              onClick={() =>
                dispatchMyQuestions({ type: "setCollectUserQuestion" })
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
