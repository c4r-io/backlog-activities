import React, { useContext, useState } from "react";
import VideoListCardLayout from "/src/components/cards/VideoListCardTopLayout";
import { UiDataContext } from "../../contextapi/UiDataProvider";

const TopCardUi = ({ imageurl, imagewidth }) => {
  const { uiData, dispatchUiData } = useContext(UiDataContext);
  const question = "hello";
  const [answerShow, setAnswerShow] = useState(false);
  const toggleAnswerShow = () => {
    setAnswerShow(!answerShow);
  };
  return (
    <VideoListCardLayout
      imagewidth={imagewidth}
      imageurl={imageurl || "/imoje-charecters/Raven-investigating.png"}
    >
      <div className="annotation min-h-[140px] flex items-center justify-center">
        <div className="header-text text-center">
          <h3 className="">
            {uiData?.uiContents?.headerTitle}
          </h3>
          {/* <p className="content text-black">
          {uiData?.uiContents?.headerContent}
        </p>
        <p className="footer text-black mt-1">
          {uiData?.uiContents?.headerFooter}
        </p> */}
        </div>
      </div>
    </VideoListCardLayout>
  );
};

export default TopCardUi;
