const TopCardGetUserQuestion = ({}) => {
  return (
    <div className="p-3 pb-0">
      <div className="flex relative">
        <div className=" w-[300px] absolute right-[-67px] top-[-67px] z-10 raven-img p-16">
          <img
            className=""
            src={"/imoje-charecters/Raven-happy-tears.svg"}
            width={400}
            height={450}
            alt="Raven Stop"
          />
        </div>
        <div className="bg-[#532688] text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute top-2 left-[0px] rounded-lg"></div>
        <div className="bg-[#907B9A] text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute top-1 left-[0px] rounded-lg"></div>
        <div className="bg-white text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute left-[0px] rounded-lg  "></div>
        <div className="bg-transparent text-ui-dark-gray w-[calc(100%_-40px)] left-[0px] z-20">
          <div className="mr-[125px] px-2 py-2 flex flex-col justify-between h-full">
            <div className="annotation min-h-[140px] flex items-center justify-center">
              <div className="header-text text-center">
                <h3 className="">Now it is your turn!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCardGetUserQuestion;
