const TopCardStudentsThink = ({}) => {
  return (
    <div className="p-3 pb-0">
      <div className="flex relative">
        <div className="w-[250px] absolute md:right-[-64px] right-[-67px] md:top-[-55px] top-[-67px] z-10 raven-img p-16">
          <img
            className=""
            src={"/imoje-charecters/Raven-thumbsup.svg"}
            width={400}
            height={450}
            alt="Raven Stop"
          />
        </div>
        <div className="bg-[#532688] text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute top-2 left-[0px] rounded-lg"></div>
        <div className="bg-[#907B9A] text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute top-1 left-[0px] rounded-lg"></div>
        <div className="bg-white text-ui-dark-gray w-[calc(100%_-40px)] h-full absolute left-[0px] rounded-lg  "></div>
        <div className="bg-transparent text-ui-dark-gray w-[calc(100%_-40px)] left-[0px] z-20">
          <div className="mr-[90px] px-8 py-2 flex flex-col justify-between h-full">
            <div className="annotation min-h-[140px] flex items-center justify-center">
            <div className="header-text text-center">
          <h3 className="">
                  What did other students think?
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCardStudentsThink;
