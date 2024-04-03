import React, { useContext, useState } from "react";
import VideoListCardLayout from "/src/components/cards/VideoListCardTopLayout";
import { UiDataContext } from "../../contextapi/UiDataProvider";

const TopCardUi = () => {
const { uiData, dispatchUiData } = useContext(UiDataContext);
  const question = "hello";
  const [answerShow, setAnswerShow] = useState(false);
  const toggleAnswerShow = () => {
    setAnswerShow(!answerShow);
  };
  return (
    <VideoListCardLayout imageurl={uiData?.uiContentss?.headerRavan?.data||"/imoje-charecters/Raven-investigating.png"}>
      <div className="annotation">
      <h4 className="title text-black">
        {uiData?.uiContentss?.headerTitle}
      </h4>
      <p className="content text-black">
        {uiData?.uiContentss?.headerContent}
      </p>
      <p className="footer text-black mt-1">
        {uiData?.uiContentss?.headerFooter}
      </p>
      </div>
    </VideoListCardLayout>
  );
};

export default TopCardUi;
