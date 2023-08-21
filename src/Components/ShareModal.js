import React, { useRef } from "react";
import classes from "./DownloadModal.module.css";

import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      {" "}
    </div>
  );
};

const OverLay = (props) => {
  const [selection, setSelection] = React.useState(null);
  const ref = useRef();

  const printCurrent = (event) => {
    console.log(event.target.innerHTML);
    const URL = window.location.href;
    navigator.clipboard.writeText(URL);
    setSelection(true);
    setTimeout(() => {
      setSelection(null);
    }, 500);
  };
  return (
    <div className={classes.overLay}>
      <div className="flex flex-col px-1 py-3 h-[15vh] md:h-[25vh] space-y-2 w-auto">
       

        <h1 className="text-xl pl-2 font-bold mt-2"> Share</h1>
   
          <div className="flex flex-row  text-xs md:text-md lg:text-lg xl:text-md   w-full">
            <span className="outline-none border-2 basis-[14%] border-blue-700 h-8 rounded-md pl-2 items-center py-1  lg:py-0 font-bold">Link&nbsp;:&nbsp;</span>
            <input
              ref={ref}
              value={`  ${window.location.href}`}
              className={`${
                selection ? "bg-blue-300 text-white" : ""
              }outline-none border-2 border-blue-700 h-8  basis-[80%] rounded-md pl-2 overflow-visible w-72  text-xs md:text-md lg:text-lg xl:text-lg `}
            ></input>
            <button
              className="border-2 border-blue-900  basis-[10%] rounded-md px-1 flex items-center hover:scale-105 hover:bg-blue-700  hover:text-white ml-1  text-xs md:text-md lg:text-lg xl:text-xl "
              onClick={printCurrent}
            >
              Copy
            </button>
          </div>
       
      </div>
    </div>
  );
};

function DownloadModal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClick}></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <OverLay onClick={props.onClick} link={props.link}></OverLay>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
}

export default DownloadModal;
