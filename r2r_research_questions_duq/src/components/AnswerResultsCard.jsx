import React from "react";
import { AllQuestionsContext, MyQuestionsContext } from "../contextapi/QuestionsDataProvider";

const AnswerResultsCard = ({ questionIndex, status_1, status_2, status_3 }) => {
  const { allQuestions } =
    React.useContext(AllQuestionsContext);
  const { myQuestions } =
    React.useContext(MyQuestionsContext);
  return (
    <div className="px-3 pb-1 mt-3 text-[#666666]">
      <div className="w-full flex">
        <div className="w-4/6  min-h-[120px] rounded-md bg-white border-4 border-[#686868] p-3">
          {myQuestions?.questions[questionIndex]?.description1}
        </div>
        <div className="w-2/6 min-h-[120px] rounded-md p-1">
          <div className="space-y-1">
            <div className="flex relative h-full">
              <div className={`bg-transparent text-[#dddddd] text-sm whitespace-pre w-[94px] relative z-10 py-2 ps-1 ${myQuestions.questions[questionIndex]?.question1Answer == "status_1"?"font-bold":""}`}>
                {allQuestions.selectorContent.status_1} <span>{status_1 || 0}</span>%
              </div>
              <div className={`w-[calc(100%_-_94px)] overflow-hidden relative max-h-max`}>
                <div
                  className="bg-[#F6B26B] w-full h-full absolute top-0"
                  style={{
                    left: `-${100 - status_1}%`,
                  }}
                ></div>
              </div>
              <div
                className={`w-8 h-8 bg-ui-violet absolute rotate-45 top-0 -right-6 ${myQuestions.questions[questionIndex]?.question1Answer == "status_1"?"":"hidden"}`}
              ></div>
            </div>
            <div className="flex relative h-full">
              <div className={`bg-transparent text-[#dddddd] text-sm whitespace-pre w-[94px] relative z-10 py-2 ps-1  ${myQuestions.questions[questionIndex]?.question1Answer == "status_2"?"font-bold":""}`}>
                {allQuestions.selectorContent.status_2}{" "}
                <span>{status_2 || 0}</span>%
              </div>
              <div className={`w-[calc(100%_-_94px)] overflow-hidden relative max-h-max`}>
                <div
                  className="bg-[#FFD966] w-full h-full absolute top-0"
                  style={{
                    left: `-${100 - status_2}%`,
                  }}
                ></div>
              </div>
              <div
                className={`w-8 h-8 bg-ui-violet absolute rotate-45 top-0 -right-6 ${myQuestions.questions[questionIndex]?.question1Answer == "status_2"?"":"hidden"}`}
              ></div>
            </div>
            <div className="flex relative h-full">
              <div className={`bg-transparent text-[#dddddd] text-sm whitespace-pre w-[94px] relative z-10 py-2 ps-1 ${myQuestions.questions[questionIndex]?.question1Answer == "status_3"?"font-bold":""}`}>
                {allQuestions.selectorContent.status_3} <span>{status_3 || 0}</span>
                %
              </div>
              <div className={`w-[calc(100%_-_94px)] overflow-hidden relative max-h-max`}>
                <div
                  className="bg-[#93C47D] w-full h-full absolute top-0"
                  style={{
                    left: `-${100 - status_3}%`,
                  }}
                ></div>
              </div>

              <div
                className={`w-8 h-8 bg-ui-violet absolute rotate-45 top-0 -right-6 ${myQuestions.questions[questionIndex]?.question1Answer == "status_3"?"":"hidden"}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerResultsCard;
