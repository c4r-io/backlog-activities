import React, { useContext, useState } from "react";
import VideoListCardTopLayoutLeftImage from "/src/components/cards/VideoListCardTopLayoutLeftImage";
import { UiDataContext } from "../../contextapi/UiDataProvider";
import { MyQuestionsContext } from "../../contextapi/QuestionsDataProvider";

const TopCardUi = ({ question }) => {
  const { myQuestions, dispatchMyQuestions } =
    React.useContext(MyQuestionsContext);
  const { uiData, dispatchUiData } = useContext(UiDataContext);
  const [answerShow, setAnswerShow] = useState(false);
  const toggleAnswerShow = () => {
    setAnswerShow(!answerShow);
  };
  return (
    <VideoListCardTopLayoutLeftImage
      imageurl={
        uiData?.uiContents?.headerRavan?.data ||
        "/imoje-charecters/Raven-coding.svg"
      }
    >
      <div className="annotation min-h-[140px] flex items-center justify-center">
        <div className="header-text text-center">
          <h3 className="text-black">{question}</h3>
          <h3 className="text-black !font-normal">
            Question #{myQuestions.currentStep + 1}
          </h3>
          {/* <p className="content text-black">
          {uiData?.uiContents?.headerContent}
        </p>
        <p className="footer text-black mt-1">
          {uiData?.uiContents?.headerFooter}
        </p> */}
        </div>
      </div>
    </VideoListCardTopLayoutLeftImage>
  );
};

export default TopCardUi;
