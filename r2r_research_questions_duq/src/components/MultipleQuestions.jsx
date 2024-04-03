"use client";
import React, { useEffect, useRef, useState } from "react";
import TopCardUiLeftImage from "./cards/TopCardUiLeftImage.jsx";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { UiDataContext } from "../contextapi/UiDataProvider.jsx";
import { api } from "../utils/apibase.js";
import { toast } from "react-toastify";
import {
  AllQuestionsContext,
  MyQuestionsContext,
} from "../contextapi/QuestionsDataProvider.jsx";
import GetQuestionFromUserComp from "/src/components/GetQuestionFromUserComp.jsx";

import UserQuestionAnswerResults from "/src/components/UserQuestionAnswerResults.jsx";
import Alert1 from "./CustomAlert/Alert1.jsx";

export default function MultipleQuestions() {
  const listOfChoose = ["Good", "Better", "Great"];
  const [createLoading, setCreateLoading] = useState(false);
  const [emptyAnswerAlert, setEmptyAnswerAlert] = useState(false);
  const { myQuestions, dispatchMyQuestions } =
    React.useContext(MyQuestionsContext);
  const { allQuestions } =
    React.useContext(AllQuestionsContext);

  function navigateNextStep() {
    if (myQuestions.currentStep <= myQuestions.questions.length - 1) {
      if (
        myQuestions?.questions[myQuestions.currentStep]?.question1Answer &&
        myQuestions?.questions[myQuestions.currentStep]?.question2Answer
      ) {
        if (myQuestions.currentStep < myQuestions.questions.length - 1) {
          dispatchMyQuestions({
            type: "next",
          });
        }
        createSampleStudentsAnswer(
          myQuestions.questions[myQuestions.currentStep],
          true
        );
      }else{
        setEmptyAnswerAlert(true);}
    }
  }
  function navigatePrevStep() {
    if (myQuestions.currentStep > 0) {
      dispatchMyQuestions({
        type: "prev",
      });
    }
  }

  const createSampleStudentsAnswer = async (e, end) => {
    const config = {
      method: "post",
      url: "api/studentsAnswer",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        researchQuestion: e._id,
        question1Answer: e.question1Answer,
        question2Answer: e.question2Answer,
      },
    };
    setCreateLoading(true);
    try {
      const response = await api.request(config);
      console.log(response.data);
      setCreateLoading(false);
      if (myQuestions.currentStep >= myQuestions.questions.length - 1) {
        dispatchMyQuestions({ type: "setAnswered" });
        dispatchMyQuestions({ type: "setAnswerSubmitted", payload: true });
      }
    } catch (error) {
      console.error(error);
      setCreateLoading(false);
    }
  };
  const submitAnswers = async () => {
    const lastInd = myQuestions.questions.length - 1;
    if (
      myQuestions.questions[lastInd].question1Answer &&
      myQuestions.questions[lastInd].question2Answer
    ) {
      for (const key in myQuestions.questions) {
        setTimeout(() => {
          createSampleStudentsAnswer(
            myQuestions.questions[key],
            key == myQuestions.questions.length - 1
          );
          if (key == myQuestions.questions.length - 1) {
            dispatchMyQuestions({ type: "setAnswerSubmitted", payload: true });
          }
        }, 1000);
      }
    } else {
      setEmptyAnswerAlert(true);
    }
  };
  return (
    <div className="relative">
      {!myQuestions.answerSubmitted ? (
        <div className="overflow-hidden">
          <TopCardUiLeftImage
            question={
              myQuestions.questions[myQuestions.currentStep]?.question1 || ""
            }
          />
          <div className="pe-4 ps-14 widget">
            <div className="mx-3 p-1 pb-1 border-x-2 space-y-3 border-ui-violet rounded-xl bg-[#171819] text-white">
              <div className="p-3 pb-1 mt-3 text-[#0E0F0F]">
                <div className="bg-white border-4 border-[#686868] rounded-md p-3">
                  {myQuestions.questions[myQuestions.currentStep]?.description1}
                  {/* {myQuestions.questions[myQuestions.currentStep]?.question1Answer} */}
                </div>
                <div className="max-w-[300px] mt-3 mx-auto flex items-center text-sm sm:text-base">
                  <div className="w-full text-white">
                    <div className="flex  p-2">
                      <div className=" w-1/3">
                        <div
                          className={`cursor-pointer pb-3 rounded-md text-center bg-[#D59BCF] ${
                            myQuestions.questions[myQuestions.currentStep]
                              ?.question1Answer == "status_1"
                              ? "border-ui-orange border-[4px]"
                              : "border-[#686868] border hover:border-white"
                          }`}
                          onClick={() =>
                            dispatchMyQuestions({
                              type: "setAnswer1",
                              payload: "status_1",
                            })
                          }
                        >
                          <img
                            src="/imoje-charecters/good.png"
                            alt={allQuestions.selectorContent.status_1}
                            width={400}
                            height={450}
                          />
                          <h6>{allQuestions.selectorContent.status_1}</h6>
                        </div>
                      </div>
                      <div className=" w-1/3">
                        <div
                          className={`cursor-pointer pb-3 rounded-md text-center bg-[#AD5EA2] ${
                            myQuestions.questions[myQuestions.currentStep]
                              ?.question1Answer == "status_2"
                              ? "border-ui-orange border-[4px]"
                              : "border-[#686868] border hover:border-white"
                          }`}
                          onClick={() =>
                            dispatchMyQuestions({
                              type: "setAnswer1",
                              payload: "status_2",
                            })
                          }
                        >
                          <img
                            src="/imoje-charecters/better.png"
                            alt={allQuestions.selectorContent.status_2}
                            width={400}
                            height={450}
                          />
                          <h6>{allQuestions.selectorContent.status_2}</h6>
                        </div>
                      </div>
                      <div className=" w-1/3">
                        <div
                          className={`cursor-pointer pb-3 rounded-md text-center bg-[#542688] ${
                            myQuestions.questions[myQuestions.currentStep]
                              ?.question1Answer == "status_3"
                              ? "border-ui-orange border-[4px]"
                              : "border-[#686868] border hover:border-white"
                          }`}
                          onClick={() =>
                            dispatchMyQuestions({
                              type: "setAnswer1",
                              payload: "status_3",
                            })
                          }
                        >
                          <img
                            src="/imoje-charecters/great.png"
                            alt={allQuestions.selectorContent.status_3}
                            width={400}
                            height={450}
                          />
                          <h6>{allQuestions.selectorContent.status_3}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-white border-4 border-[#686868] rounded-md p-3">
                  {myQuestions.questions[myQuestions.currentStep]?.question2}

                  {/* {myQuestions.questions[myQuestions.currentStep]?.question2Answer} */}
                </div>

                <textarea
                  className="mt-3 h-[120px] w-full rounded-md bg-white border-4 border-[#686868] p-3 italic"
                  placeholder={
                    myQuestions.questions[myQuestions.currentStep]
                      ?.question2Placeholder ||
                    "Describe how you would improve this research question."
                  }
                  value={
                    myQuestions.questions[myQuestions.currentStep]
                      ?.question2Answer || ""
                  }
                  onChange={(e) =>
                    dispatchMyQuestions({
                      type: "setAnswer2",
                      payload: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className=" mx-3 px-4 pb-1 buttons flex justify-end">
              <div className=" progressive ">
                <button
                  className="px-14 rounded-sm py-2 unclicked !text-white !text-xs"
                  onClick={() => navigateNextStep()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {!myQuestions.collectUserQuestion ? (
            <>
              <UserQuestionAnswerResults />
            </>
          ) : (
            <GetQuestionFromUserComp />
          )}
        </>
      )}

      {emptyAnswerAlert ? (
        <Alert1
          message={"You have forgotten to select or write."}
          title={"Oops!"}
          onClose={()=>setEmptyAnswerAlert(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
