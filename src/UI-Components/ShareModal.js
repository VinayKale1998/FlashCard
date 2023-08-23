import React, { useRef } from "react";
import classes from "./ShareModal.module.css";

import ReactDOM from "react-dom";


//this modal component uses react portal to open up a modal listening to the state change in FlashCard page
//backdrop acts as a mask from the content under the modal// gray slightly opaque screen
const BackDrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      {" "}
    </div>
  );
};

//overylay creates the actual share modal which provides users to copy the link of the flashcards deck page
const OverLay = (props) => {
  //state used to provide background color when copy button is clicked
  const [selection, setSelection] = React.useState(null);

  //ref used to pass the current href to the input compnonent
  const ref = useRef();


  //uses window object and navigator to copy the link into the clipboard for the user upon copy button click 
  const printCurrent = (event) => {
    // console.log(event.target.innerHTML);
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
            {/* onClick listened by printCurrent method here */}
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

//combines backdrop and overlay and portals it to the div with id "modal" in the root html file
function ShareModal(props) {
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

export default ShareModal;
