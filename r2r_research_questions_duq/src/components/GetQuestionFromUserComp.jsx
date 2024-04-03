"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../utils/apibase.js";
import TopCardGetUserQuestion from "./cards/TopCardGetUserQuestion.jsx";
import { MyQuestionsContext } from "../contextapi/QuestionsDataProvider.jsx";
import Alert1 from "./CustomAlert/Alert1.jsx";
export default function EntryQuestions() {
  const { myQuestions, dispatchMyQuestions } =
    React.useContext(MyQuestionsContext);
  const [question, setQuestion] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [enterQuestionPopup, setEnterQuestionPopup] = useState(false);
  const createSampleStudentSubmittedQuestion = async () => {
    const config = {
      method: "post",
      url: "api/studentSubmittedQuestion",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        content: question,
      },
    };
    setCreateLoading(true);
    try {
      const response = await api.request(config);
      console.log(response.data);
      setCreateLoading(false);
      dispatchMyQuestions({ type: "removeCollectUserQuestion" });
      dispatchMyQuestions({ type: "removeAnswered" });
      dispatchMyQuestions({ type: "setAnswerSubmitted", payload: false });
      dispatchMyQuestions({ type: "setMyQuestions", payload: [] });
      dispatchMyQuestions({ type: "resetSteps" });
      dispatchMyQuestions({
        type: "SelectType",
        payload: "",
      });
      setQuestion("");
    } catch (error) {
      console.error(error);
      setCreateLoading(false);
    }
  };
  function update() {
    if (question) {
      createSampleStudentSubmittedQuestion();
    } else {
      setEnterQuestionPopup(true);
    }
  }
  return (
    <div className="overflow-hidden relative">
      <TopCardGetUserQuestion />
      <div className="ps-4 pe-14 widget">
        <div className="mx-3 p-1 pb-1 border-x-2 space-y-3 border-ui-violet rounded-xl bg-[#171819] text-white">
          <div className="p-3 pb-1 mt-3 text-[#666666]">
            <div>
              <div className=" bg-white border-4 border-[#686868] rounded-md p-3">
                Write a research question of your own with as much detail as you
                wish. We will revisit your research question and refine it
                throughout the course.
              </div>

              <textarea
                className="mt-3 h-[120px] w-full rounded-md bg-white border-4 border-[#686868] p-3 italic"
                placeholder="Write your own research question here."
                value={question || ""}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {/* <div className="buttons">
                <div className=" generative ">
                  <button
                    className="w-full py-2 unclicked"
                    onClick={() => update()}
                  >
                    Submit
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mx-3 px-5 pb-3 buttons flex justify-end">
          <div className=" progressive ">
            <button
              className="px-14 rounded-sm py-2 unclicked !text-white !text-xs"
              onClick={() => update()}
            >
              Done
            </button>
          </div>
        </div>
      </div>
      {enterQuestionPopup ? (
        <Alert1
          title={"Oops!"}
          message={"Please enter a research question."}
          onClose={() => setEnterQuestionPopup(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
