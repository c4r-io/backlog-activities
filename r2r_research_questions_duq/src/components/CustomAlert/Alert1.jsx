import React from "react";

const Alert1 = ({ title, message, onClose }) => {
  return (
    <div className="absolute w-full h-full inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg border-2 border-ui-violet p-4 animate-scale-bounce">
        <div className="text-xl font-bold mb-2 text-center">{title}</div>
        <div className="text-gray-700 text-center">{message}</div>
        <div className="buttons mt-2 w-full flex justify-center">
          <div className="progressive">
            <button
              className="unclicked px-3 py-1 rounded-lg !text-white"
              onClick={()=>onClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert1;
