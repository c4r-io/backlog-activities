const VideoListCardTopLayoutLeftImage = ({ children, imageurl }) => {
  return (
    <div className="p-3 pb-0">
      <div className="flex relative">
        <div className=" w-[300px] absolute md:left-[-74px] left-[-80px]  top-[-67px] z-10 raven-img p-20 ps-[75px] pt-[64px]">
          <img
            className=""
            src={
              imageurl ? imageurl : "/imoje-charecters/Raven-investigating.png"
            }
            width={400}
            height={450}
            alt="Raven Stop"
          />
        </div>
        <div className="bg-[#532688] text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute top-2 right-[0px] rounded-lg"></div>
        <div className="bg-[#907B9A] text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute top-1 right-[0px] rounded-lg"></div>
        <div className="bg-white text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute right-[0px] rounded-lg  "></div>
        <div className="bg-transparent text-ui-dark-gray w-[calc(100%_-40px)] ml-[40px] right-[0px] z-20">
          <div className="ml-[95px] px-2 py-2 flex flex-col justify-between h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListCardTopLayoutLeftImage;
